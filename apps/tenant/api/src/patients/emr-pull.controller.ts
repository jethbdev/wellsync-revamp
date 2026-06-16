import { Controller, Get, Post, Body, Req, UseGuards, BadRequestException, NotFoundException, Inject, Query } from '@nestjs/common';
import { StaffAuthGuard } from '../auth/staff-auth.guard.js';
import { Request } from 'express';
import { TenantPrismaClient } from '@healthbridge/database';

// Global temporary cache for pending OTPs
export const pendingPullRequests = new Map<string, { otp: string; pin: string; targetOrgSlug: string }>();

@Controller('api/patients')
export class EMRPullController {
  constructor(
    @Inject('PRISMA_CLIENT') private prisma: TenantPrismaClient
  ) {}

  @Post('pull-request')
  @UseGuards(StaffAuthGuard)
  async pullRequest(@Body() body: { patientPin: string }) {
    const { patientPin } = body;
    if (!patientPin) {
      throw new BadRequestException('Patient PIN is required');
    }

    // 1. Search Control Plane index
    try {
      const indexRes = await fetch(`http://127.0.0.1:4001/api/patient-index/search?patientPin=${patientPin}`);
      if (!indexRes.ok) {
        throw new Error('Index directory lookup failed');
      }
      const matches = await indexRes.json();
      if (!matches || matches.length === 0) {
        throw new NotFoundException(`Patient with PIN ${patientPin} not found in global directory`);
      }

      const match = matches[0];

      // 2. Generate OTP and cache
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      pendingPullRequests.set(patientPin, {
        otp,
        pin: patientPin,
        targetOrgSlug: match.orgSlug
      });

      console.log(`\n=============================================================`);
      console.log(`[OTP Gate] EMR Pull Request generated for PIN: ${patientPin}`);
      console.log(`[OTP Gate] Target Source Tenant Slug: ${match.orgSlug}`);
      console.log(`[OTP Gate] SMS Verification Code: ${otp}`);
      console.log(`=============================================================\n`);

      return {
        success: true,
        message: 'OTP challenge initiated successfully. Enter the verification code sent to the patient.',
        targetOrgSlug: match.orgSlug
      };
    } catch (err: any) {
      throw new BadRequestException(err.message || 'Failed to initiate pull request');
    }
  }

  @Post('pull-confirm')
  @UseGuards(StaffAuthGuard)
  async pullConfirm(
    @Body() body: { patientPin: string; otp: string },
    @Req() req: Request & { session: any }
  ) {
    const { patientPin, otp } = body;
    const facilityId = req.session.session.facilityId;
    const userId = req.session.user.id;

    if (!patientPin || !otp) {
      throw new BadRequestException('PIN and OTP code are required');
    }

    const pending = pendingPullRequests.get(patientPin);
    if (!pending || pending.otp !== otp) {
      throw new BadRequestException('Invalid or expired OTP code');
    }

    // Clear pending cache
    pendingPullRequests.delete(patientPin);

    // 3. Fetch EMR packet from source organization
    try {
      const exportRes = await fetch(`http://127.0.0.1:4000/api/patients/export/data?patientPin=${patientPin}`, {
        headers: {
          'x-tenant-slug': pending.targetOrgSlug
        }
      });

      if (!exportRes.ok) {
        throw new Error(`Failed to export patient records from ${pending.targetOrgSlug}`);
      }

      const packet = await exportRes.json();

      // 4. Write record atomically inside local database transaction
      const localPatient = await this.prisma.$transaction(async (tx) => {
        // Verify we don't already have this patient locally
        const existing = await tx.patient.findFirst({
          where: { pin: patientPin }
        });
        if (existing) {
          return existing;
        }

        const patient = await tx.patient.create({
          data: {
            firstName: packet.firstName,
            lastName: packet.lastName,
            middleName: packet.middleName,
            suffix: packet.suffix,
            sex: packet.sex,
            birthDate: new Date(packet.birthDate),
            pin: patientPin,
            facilityId,
            createdById: userId,
            status: 'ACTIVE'
          }
        });

        // Copy vitals history, diagnostics, and prescriptions linked to consultations
        for (const consult of packet.consultations) {
          const localConsult = await tx.consultations.create({
            data: {
              facilityId,
              patientId: patient.id,
              consultationNumber: consult.consultationNumber,
              consultationDate: new Date(consult.consultationDate),
              consultationTime: consult.consultationTime,
              natureOfVisit: consult.natureOfVisit,
              modeOfTransaction: consult.modeOfTransaction,
              chiefComplaint: consult.chiefComplaint,
              historyOfIllness: consult.historyOfIllness,
              treatmentPlan: consult.treatmentPlan,
              status: consult.status,
              createdById: userId
            }
          });

          for (const vit of consult.vitalSigns) {
            await tx.vitalSigns.create({
              data: {
                consultationId: localConsult.id,
                bpSystolic: vit.bpSystolic,
                bpDiastolic: vit.bpDiastolic,
                temperatureCelsius: vit.temperatureCelsius,
                heartRate: vit.heartRate,
                weightKg: vit.weightKg,
                heightCm: vit.heightCm,
                bmi: vit.bmi,
                bmiCategory: vit.bmiCategory,
                createdById: userId
              }
            });
          }

          for (const diag of consult.diagnoses) {
            await tx.diagnosis.create({
              data: {
                consultationId: localConsult.id,
                icd10Code: diag.icd10Code,
                icd10Description: diag.icd10Description,
                diagnosisType: diag.diagnosisType,
                isPrimary: diag.isPrimary,
                remarks: diag.remarks,
                createdById: userId
              }
            });
          }
        }

        return patient;
      });

      return {
        success: true,
        message: 'EMR record imported successfully',
        patient: localPatient
      };
    } catch (err: any) {
      throw new BadRequestException(`EMR import failed: ${err.message}`);
    }
  }

  @Get('export/data')
  async exportData(@Query('patientPin') patientPin: string) {
    if (!patientPin) {
      throw new BadRequestException('Patient PIN parameter is required');
    }

    const patient = await this.prisma.patient.findFirst({
      where: { pin: patientPin },
      include: {
        consultations: {
          include: {
            vitalSigns: true,
            diagnoses: true,
            prescriptions: true
          }
        }
      }
    });

    if (!patient) {
      throw new NotFoundException(`Patient with PIN ${patientPin} not found`);
    }

    return patient;
  }
}
