import { Injectable, Inject, BadRequestException, NotFoundException, Optional } from '@nestjs/common';
import { TenantPrismaClient } from '@healthbridge/database';
import { hashPassword } from 'better-auth/crypto';
import { PluginRegistryService } from '../plugins/plugin-registry.service.js';

@Injectable()
export class PatientPortalService {
  constructor(
    @Inject('PRISMA_CLIENT') private prisma: TenantPrismaClient,
    @Optional() private readonly pluginRegistry?: PluginRegistryService
  ) {}

  async claim(data: { pin: string; email: string; passwordHashOrPlain: string; birthDate: string }) {
    const patient = await this.prisma.patient.findFirst({
      where: { pin: data.pin }
    });

    if (!patient) {
      throw new NotFoundException('Patient record with this claim PIN was not found');
    }

    if (patient.isMerged || patient.portalAccountId) {
      throw new BadRequestException('This patient profile has already been claimed or merged');
    }

    // Birthdate Security Challenge
    const dbBirth = new Date(patient.birthDate).toISOString().split('T')[0];
    const inputBirth = new Date(data.birthDate).toISOString().split('T')[0];

    if (dbBirth !== inputBirth) {
      throw new BadRequestException('Security challenge failed: birthdate does not match our records');
    }

    // Hash the password
    const hashedPassword = await hashPassword(data.passwordHashOrPlain);

    return this.prisma.$transaction(async (tx) => {
      // 1. Create PatientAccount record
      await tx.patientAccount.create({
        data: {
          accountId: patient.id,  // BetterAuth credential provider uses userId as accountId
          providerId: 'credential',
          patientId: patient.id,
          password: hashedPassword
        }
      });

      // 2. Link patient profile
      return tx.patient.update({
        where: { id: patient.id },
        data: {
          email: data.email,
          emailVerified: true,
          portalAccountId: patient.id
        }
      });
    });
  }

  async getProfile(patientId: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { id: patientId },
      include: {
        facility: {
          include: {
            organization: true
          }
        },
        allergies: true,
        alerts: true,
        consultations: {
          include: {
            vitalSigns: true,
            physicalExams: true,
            diagnoses: true,
            prescriptions: {
              include: {
                medicationOrders: true
              }
            }
          },
          orderBy: { consultationDate: 'desc' }
        },
        scheduledVisits: {
          orderBy: { scheduledDate: 'desc' }
        },
        referrals: {
          include: {
            referringFacility: true,
            receivingFacility: true
          },
          orderBy: { createdAt: 'desc' }
        },
        documents: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!patient) {
      throw new NotFoundException('Patient profile not found');
    }

    let isTeleconsultationActive = false;
    try {
      const telePlugin = await this.prisma.installedPlugin.findFirst({
        where: { pluginId: 'teleconsultation', isActive: true }
      });
      isTeleconsultationActive = !!telePlugin;
    } catch {
      // Fallback in case table or connection is not ready
    }

    return {
      ...patient,
      isTeleconsultationActive,
    };
  }

  async updateAppointmentStatus(appointmentId: string, patientId: string, status: 'CONFIRMED' | 'CANCELLED') {
    const visit = await this.prisma.scheduledVisit.findFirst({
      where: { id: appointmentId, patientId }
    });

    if (!visit) {
      throw new NotFoundException('Scheduled visit not found');
    }

    return this.prisma.scheduledVisit.update({
      where: { id: appointmentId },
      data: { status }
    });
  }

  async bookAppointment(patientId: string, data: { scheduledDate: string; scheduledTime?: string; purpose: string }) {
    const patient = await this.prisma.patient.findUnique({
      where: { id: patientId }
    });
    if (!patient) {
      throw new NotFoundException('Patient record not found');
    }

    const visit = await this.prisma.scheduledVisit.create({
      data: {
        patientId,
        facilityId: patient.facilityId,
        scheduledDate: new Date(data.scheduledDate),
        scheduledTime: data.scheduledTime || null,
        purpose: data.purpose,
        status: 'PENDING'
      }
    });

    if (this.pluginRegistry) {
      const org = await this.prisma.organization.findFirst();
      await this.pluginRegistry.emitPostCommit('afterAppointmentCreate', {
        orgId: org?.id || '',
        facilityId: patient.facilityId,
        payload: {
          visitId: visit.id,
          patientId: visit.patientId,
          scheduledDate: data.scheduledDate,
          scheduledTime: visit.scheduledTime
        }
      });
    }

    return visit;
  }

  async getOrganizationInfo() {
    const org = await this.prisma.organization.findFirst({
      select: {
        name: true,
        slug: true,
        type: true
      }
    });
    if (!org) {
      throw new NotFoundException('Organization details not found');
    }
    return org;
  }

  async updateProfile(
    patientId: string,
    data: { firstName?: string; lastName?: string; contactNumber?: string; photoUrl?: string }
  ) {
    const updateData: any = {};
    if (data.firstName !== undefined) updateData.firstName = data.firstName;
    if (data.lastName !== undefined) updateData.lastName = data.lastName;
    if (data.contactNumber !== undefined) updateData.contactNumber = data.contactNumber;
    if (data.photoUrl !== undefined) updateData.photoUrl = data.photoUrl;

    return this.prisma.patient.update({
      where: { id: patientId },
      data: updateData,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        contactNumber: true,
        photoUrl: true,
      },
    });
  }

  async changePassword(patientId: string, newPassword?: string) {
    if (!newPassword || newPassword.length < 6) {
      throw new BadRequestException('New password must be at least 6 characters long');
    }

    const hashedPassword = await hashPassword(newPassword);

    await this.prisma.patientAccount.updateMany({
      where: { patientId, providerId: 'credential' },
      data: { password: hashedPassword },
    });

    return { success: true };
  }
}
