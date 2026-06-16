import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { TenantPrismaClient } from '@healthbridge/database';
import { CreateAppointment } from '@healthbridge/contracts';
import { PluginRegistryService } from '../plugins/plugin-registry.service.js';

@Injectable()
export class AppointmentsService {
  constructor(
    @Inject('PRISMA_CLIENT') private prisma: TenantPrismaClient,
    private readonly pluginRegistry: PluginRegistryService
  ) {}

  async create(data: CreateAppointment & { patientId: string; facilityId: string; createdById: string; doctorId?: string }) {
    const patient = await this.prisma.patient.findFirst({
      where: { id: data.patientId, facilityId: data.facilityId }
    });
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    return this.prisma.scheduledVisit.create({
      data: {
        facilityId: data.facilityId,
        patientId: data.patientId,
        scheduledDate: new Date(data.scheduledDate),
        scheduledTime: data.scheduledTime || null,
        purpose: data.purpose,
        createdById: data.createdById,
        doctorId: data.doctorId || null,
        status: 'PENDING'
      }
    }).then(async (visit) => {
      const org = await this.prisma.organization.findFirst();
      await this.pluginRegistry.emitPostCommit('afterAppointmentCreate', {
        orgId: org?.id || '',
        facilityId: data.facilityId,
        userId: data.createdById,
        payload: {
          visitId: visit.id,
          patientId: visit.patientId,
          scheduledDate: data.scheduledDate,
          scheduledTime: visit.scheduledTime
        }
      });
      return visit;
    });
  }

  async findAll(facilityId: string) {
    return this.prisma.scheduledVisit.findMany({
      where: { facilityId },
      include: {
        patient: true,
        doctor: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        }
      },
      orderBy: {
        scheduledDate: 'asc'
      }
    });
  }

  async checkIn(id: string, facilityId: string) {
    const visit = await this.prisma.scheduledVisit.findFirst({
      where: { id, facilityId }
    });
    if (!visit) {
      throw new NotFoundException('Appointment not found');
    }

    const updatedVisit = await this.prisma.scheduledVisit.update({
      where: { id },
      data: { status: 'CHECKED_IN' },
      include: { patient: true }
    });

    const org = await this.prisma.organization.findFirst();
    await this.pluginRegistry.emitPostCommit('afterAppointmentCheckIn', {
      orgId: org?.id || '',
      facilityId,
      payload: {
        visitId: updatedVisit.id,
        patientId: updatedVisit.patientId,
        scheduledDate: updatedVisit.scheduledDate,
        scheduledTime: updatedVisit.scheduledTime,
        status: updatedVisit.status,
        doctorId: updatedVisit.doctorId
      }
    });

    return updatedVisit;
  }
}
