import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { TenantPrismaClient } from '@healthbridge/database';
import { CreatePatient } from '@healthbridge/contracts';
import { PluginRegistryService } from '../plugins/plugin-registry.service.js';

@Injectable()
export class PatientsService {
  constructor(
    @Inject('PRISMA_CLIENT') private prisma: TenantPrismaClient,
    private readonly pluginRegistry: PluginRegistryService
  ) {}

  async create(data: CreatePatient & { facilityId: string; createdById?: string; forceSave?: boolean }) {
    const { orgType, forceSave, facilityId, createdById, ...patientData } = data;

    // 1. Fuzzy-matching duplicate checks
    if (!forceSave) {
      const duplicates = await this.prisma.patient.findMany({
        where: {
          firstName: { equals: patientData.firstName, mode: 'insensitive' },
          lastName: { equals: patientData.lastName, mode: 'insensitive' },
          sex: patientData.sex,
          birthDate: new Date(patientData.birthDate),
          isMerged: false,
          facilityId
        }
      });

      if (duplicates.length > 0) {
        throw new BadRequestException({
          message: 'DUPLICATE_WARNING',
          duplicates: duplicates.map(d => ({
            id: d.id,
            pin: d.pin,
            firstName: d.firstName,
            lastName: d.lastName,
            birthDate: d.birthDate
          }))
        });
      }
    }

    // 2. Generate unique PIN if not provided (must fit in @db.VarChar(20))
    const pin = `P${Math.floor(100000000 + Math.random() * 900000000)}`;

    // 3. Create Patient
    return this.prisma.patient.create({
      data: {
        ...patientData,
        birthDate: new Date(patientData.birthDate),
        pin,
        facilityId,
        createdById,
        status: 'ACTIVE'
      }
    }).then(async (patient) => {
      const org = await this.prisma.organization.findFirst();
      await this.pluginRegistry.emitPostCommit('afterPatientRegister', {
        orgId: org?.id || '',
        facilityId,
        userId: createdById,
        payload: patient
      });

      // Register index on Control Plane
      if (org) {
        fetch('http://127.0.0.1:4001/api/patient-index', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            patientPin: patient.pin,
            firstName: patient.firstName,
            lastName: patient.lastName,
            birthDate: patient.birthDate.toISOString().split('T')[0],
            sex: patient.sex,
            orgSlug: org.slug
          })
        }).catch((err: any) => {
          console.error('[Patient Index Registry] Failed to register patient index:', err.message);
        });
      }

      return patient;
    });
  }

  async findAll(facilityId: string, search?: string) {
    if (search) {
      return this.prisma.patient.findMany({
        where: {
          facilityId,
          isMerged: false,
          OR: [
            { firstName: { contains: search, mode: 'insensitive' } },
            { lastName: { contains: search, mode: 'insensitive' } },
            { pin: { contains: search, mode: 'insensitive' } }
          ]
        }
      });
    }

    return this.prisma.patient.findMany({
      where: { facilityId, isMerged: false }
    });
  }

  async findOne(id: string, facilityId: string) {
    const patient = await this.prisma.patient.findFirst({
      where: { id, facilityId },
      include: {
        allergies: true,
        alerts: true
      }
    });

    if (!patient) {
      throw new NotFoundException(`Patient not found`);
    }

    return patient;
  }

  async merge(sourceId: string, targetId: string, facilityId: string) {
    if (sourceId === targetId) {
      throw new BadRequestException('Cannot merge a patient into themselves');
    }

    const sourcePatient = await this.prisma.patient.findFirst({
      where: { id: sourceId, facilityId }
    });
    const targetPatient = await this.prisma.patient.findFirst({
      where: { id: targetId, facilityId }
    });

    if (!sourcePatient || !targetPatient) {
      throw new NotFoundException('Source or target patient not found');
    }

    if (sourcePatient.isMerged) {
      throw new BadRequestException('Source patient is already merged');
    }

    // Run updates in a single transaction block
    return this.prisma.$transaction(async (tx) => {
      // 1. Update Consultation records
      await tx.consultations.updateMany({
        where: { patientId: sourceId },
        data: { patientId: targetId }
      });

      // 2. Update Prescriptions & Medication Orders
      await tx.prescription.updateMany({
        where: { patientId: sourceId },
        data: { patientId: targetId }
      });

      await tx.medicationOrder.updateMany({
        where: { patientId: sourceId },
        data: { patientId: targetId }
      });

      // 3. Update Scheduled Visits
      await tx.scheduledVisit.updateMany({
        where: { patientId: sourceId },
        data: { patientId: targetId }
      });

      // 4. Update Stock Transactions & Dispense Records
      await tx.stockTransaction.updateMany({
        where: { patientId: sourceId },
        data: { patientId: targetId }
      });

      await tx.dispenseRecord.updateMany({
        where: { patientId: sourceId },
        data: { patientId: targetId }
      });

      // 5. Update Referrals & FHSIS records
      await tx.referral.updateMany({
        where: { patientId: sourceId },
        data: { patientId: targetId }
      });

      await tx.fhsisServiceRecord.updateMany({
        where: { patientId: sourceId },
        data: { patientId: targetId }
      });

      // 6. Update Allergies & Alerts
      await tx.patientAllergy.updateMany({
        where: { patientId: sourceId },
        data: { patientId: targetId }
      });

      await tx.patientAlert.updateMany({
        where: { patientId: sourceId },
        data: { patientId: targetId }
      });

      // 7. Update Relationships where source is patient or related
      await tx.patientRelationship.updateMany({
        where: { patientId: sourceId },
        data: { patientId: targetId }
      });

      await tx.patientRelationship.updateMany({
        where: { relatedPatientId: sourceId },
        data: { relatedPatientId: targetId }
      });

      // 8. Mark source as merged
      return tx.patient.update({
        where: { id: sourceId },
        data: {
          isMerged: true,
          mergedIntoId: targetId,
          status: 'INACTIVE'
        }
      });
    });
  }

  async update(id: string, facilityId: string, data: any) {
    const patient = await this.prisma.patient.findFirst({
      where: { id, facilityId }
    });
    if (!patient) {
      throw new NotFoundException(`Patient not found`);
    }

    const { allergies, alerts, ...patientData } = data;

    const updateData = { ...patientData };
    if (updateData.birthDate) {
      updateData.birthDate = new Date(updateData.birthDate);
    }

    return this.prisma.patient.update({
      where: { id },
      data: updateData
    });
  }
}
