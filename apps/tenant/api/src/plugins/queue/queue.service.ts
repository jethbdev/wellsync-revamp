import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { TenantPrismaClient } from '@healthbridge/database';

@Injectable()
export class QueueService {
  constructor(
    @Inject('PRISMA_CLIENT') private prisma: TenantPrismaClient
  ) {}

  async getActiveQueue(facilityId: string, doctorId?: string) {
    try {
      // 1. Find all currently CHECKED_IN visits for this facility
      const checkedInVisits = await this.prisma.scheduledVisit.findMany({
        where: {
          facilityId,
          status: 'CHECKED_IN'
        }
      });

      // 2. Sync any visit that doesn't have a QueueEntry yet
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      for (const visit of checkedInVisits) {
        const existing = await this.prisma.queueEntry.findFirst({
          where: { visitId: visit.id }
        });

        if (!existing) {
          const count = await this.prisma.queueEntry.count({
            where: {
              facilityId,
              createdAt: { gte: today }
            }
          });
          const ticketNumber = `A-${String(count + 1).padStart(3, '0')}`;

          await this.prisma.queueEntry.create({
            data: {
              facilityId,
              visitId: visit.id,
              patientId: visit.patientId,
              ticketNumber,
              status: 'WAITING',
              doctorId: visit.doctorId
            }
          });
        }
      }
    } catch (err) {
      // Gracefully log error but continue to return active queue
      console.error('[Queue Service] Failed to sync checked-in visits to queue entries:', err);
    }

    const whereClause: any = {
      facilityId,
      status: { in: ['WAITING', 'CALLING'] }
    };

    if (doctorId) {
      whereClause.doctorId = doctorId;
    }

    return this.prisma.queueEntry.findMany({
      where: whereClause,
      include: {
        patient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            pin: true
          }
        },
        doctor: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        }
      },
      orderBy: { createdAt: 'asc' }
    });
  }

  async callTicket(id: string, facilityId: string, calledRoom: string) {
    const entry = await this.prisma.queueEntry.findFirst({
      where: { id, facilityId }
    });
    if (!entry) throw new NotFoundException('Queue ticket not found');

    return this.prisma.queueEntry.update({
      where: { id },
      data: {
        status: 'CALLING',
        calledRoom,
        updatedAt: new Date()
      },
      include: {
        patient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            pin: true
          }
        },
        doctor: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });
  }

  async completeTicket(id: string, facilityId: string) {
    const entry = await this.prisma.queueEntry.findFirst({
      where: { id, facilityId }
    });
    if (!entry) throw new NotFoundException('Queue ticket not found');

    return this.prisma.$transaction(async (tx) => {
      // 1. Update queue entry status
      const updated = await tx.queueEntry.update({
        where: { id },
        data: {
          status: 'COMPLETED',
          updatedAt: new Date()
        }
      });

      // 2. If this was linked to an appointment, complete the appointment status too
      if (entry.visitId) {
        await tx.scheduledVisit.update({
          where: { id: entry.visitId },
          data: { status: 'COMPLETED' }
        });
      }

      return updated;
    });
  }

  async skipTicket(id: string, facilityId: string) {
    const entry = await this.prisma.queueEntry.findFirst({
      where: { id, facilityId }
    });
    if (!entry) throw new NotFoundException('Queue ticket not found');

    return this.prisma.queueEntry.update({
      where: { id },
      data: {
        status: 'SKIPPED',
        updatedAt: new Date()
      }
    });
  }

  async createWalkIn(patientId: string, facilityId: string, doctorId?: string) {
    const patient = await this.prisma.patient.findFirst({
      where: { id: patientId, facilityId }
    });
    if (!patient) throw new NotFoundException('Patient not found');

    // Generate ticket number
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const count = await this.prisma.queueEntry.count({
      where: {
        facilityId,
        createdAt: { gte: today }
      }
    });

    const ticketNumber = `W-${String(count + 1).padStart(3, '0')}`;

    return this.prisma.queueEntry.create({
      data: {
        facilityId,
        patientId,
        ticketNumber,
        status: 'WAITING',
        doctorId: doctorId || null
      },
      include: {
        patient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            pin: true
          }
        },
        doctor: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });
  }

  async getPublicQueue(facilityId: string, doctorId?: string) {
    const whereClause: any = {
      facilityId,
      status: { in: ['WAITING', 'CALLING'] }
    };

    if (doctorId) {
      whereClause.doctorId = doctorId;
    }

    const entries = await this.prisma.queueEntry.findMany({
      where: whereClause,
      include: {
        doctor: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        }
      },
      orderBy: { createdAt: 'asc' }
    });

    return entries.map((entry) => ({
      id: entry.id,
      ticketNumber: entry.ticketNumber,
      status: entry.status,
      calledRoom: entry.calledRoom,
      updatedAt: entry.updatedAt,
      doctor: entry.doctor ? {
        id: entry.doctor.id,
        firstName: entry.doctor.firstName,
        lastName: entry.doctor.lastName
      } : null
    }));
  }
}

