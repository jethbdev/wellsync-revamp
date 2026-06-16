import { Injectable, Inject } from '@nestjs/common';
import { TenantPrismaClient } from '@healthbridge/database';

@Injectable()
export class ReportsService {
  constructor(
    @Inject('PRISMA_CLIENT') private readonly prisma: TenantPrismaClient
  ) {}

  async getSummary(facilityId: string) {
    // 1. Patients aggregations
    const patientsTotal = await this.prisma.patient.count({
      where: { facilityId, isMerged: false }
    });

    const patientGenderGroups = await this.prisma.patient.groupBy({
      by: ['sex'],
      where: { facilityId, isMerged: false },
      _count: true
    });

    const patientsList = await this.prisma.patient.findMany({
      where: { facilityId, isMerged: false },
      select: { birthDate: true }
    });

    // Compute age groups in JS memory
    const today = new Date();
    const byAgeGroup = {
      '0-18': 0,
      '19-35': 0,
      '36-50': 0,
      '51+': 0
    };

    for (const p of patientsList) {
      if (!p.birthDate) continue;
      const birthDate = new Date(p.birthDate);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age <= 18) {
        byAgeGroup['0-18']++;
      } else if (age <= 35) {
        byAgeGroup['19-35']++;
      } else if (age <= 50) {
        byAgeGroup['36-50']++;
      } else {
        byAgeGroup['51+']++;
      }
    }

    const byGender = {
      MALE: 0,
      FEMALE: 0
    };
    for (const group of patientGenderGroups) {
      if (group.sex === 'MALE' || group.sex === 'FEMALE') {
        byGender[group.sex] = group._count;
      }
    }

    // 2. Appointments aggregations
    const appointmentsTotal = await this.prisma.scheduledVisit.count({
      where: { facilityId }
    });

    const apptStatusGroups = await this.prisma.scheduledVisit.groupBy({
      by: ['status'],
      where: { facilityId },
      _count: true
    });

    const byStatus: Record<string, number> = {
      SCHEDULED: 0,
      CHECKED_IN: 0,
      COMPLETED: 0,
      CANCELLED: 0
    };
    for (const group of apptStatusGroups) {
      byStatus[group.status] = group._count;
    }

    // 3. Consultations aggregations
    const consultationsTotal = await this.prisma.consultations.count({
      where: { facilityId }
    });

    const consultModeGroups = await this.prisma.consultations.groupBy({
      by: ['modeOfTransaction'],
      where: { facilityId },
      _count: true
    });

    const byMode: Record<string, number> = {
      WALK_IN: 0,
      TELECONSULTATION: 0
    };
    for (const group of consultModeGroups) {
      byMode[group.modeOfTransaction] = group._count;
    }

    // 4. Prescriptions count
    const prescriptionsTotal = await this.prisma.prescription.count({
      where: { consultation: { facilityId } }
    });

    // 5. Vital signs averages
    const vitalsAvg = await this.prisma.vitalSigns.aggregate({
      where: { consultation: { facilityId } },
      _avg: {
        bpSystolic: true,
        bpDiastolic: true,
        temperatureCelsius: true,
        heartRate: true,
        bmi: true
      }
    });

    return {
      patients: {
        total: patientsTotal,
        byGender,
        byAgeGroup
      },
      appointments: {
        total: appointmentsTotal,
        byStatus
      },
      consultations: {
        total: consultationsTotal,
        byMode
      },
      prescriptions: {
        total: prescriptionsTotal
      },
      vitalsAverages: {
        bpSystolic: vitalsAvg._avg.bpSystolic ? Math.round(Number(vitalsAvg._avg.bpSystolic)) : null,
        bpDiastolic: vitalsAvg._avg.bpDiastolic ? Math.round(Number(vitalsAvg._avg.bpDiastolic)) : null,
        temperatureCelsius: vitalsAvg._avg.temperatureCelsius ? Number(Number(vitalsAvg._avg.temperatureCelsius).toFixed(1)) : null,
        heartRate: vitalsAvg._avg.heartRate ? Math.round(Number(vitalsAvg._avg.heartRate)) : null,
        bmi: vitalsAvg._avg.bmi ? Number(Number(vitalsAvg._avg.bmi).toFixed(1)) : null
      }
    };
  }

  private buildDateFilter(field: string, startDate?: string, endDate?: string) {
    const filter: any = {};
    if (startDate) {
      filter.gte = new Date(startDate);
    }
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      filter.lte = end;
    }
    return Object.keys(filter).length > 0 ? { [field]: filter } : {};
  }

  async getPatientsReport(facilityId: string, startDate?: string, endDate?: string) {
    const dateFilter = this.buildDateFilter('createdAt', startDate, endDate);
    return this.prisma.patient.findMany({
      where: {
        facilityId,
        isMerged: false,
        ...dateFilter
      },
      orderBy: { createdAt: 'asc' }
    });
  }

  async getAppointmentsReport(facilityId: string, startDate?: string, endDate?: string) {
    const dateFilter = this.buildDateFilter('scheduledDate', startDate, endDate);
    return this.prisma.scheduledVisit.findMany({
      where: {
        facilityId,
        ...dateFilter
      },
      include: {
        patient: {
          select: {
            firstName: true,
            lastName: true,
            pin: true
          }
        }
      },
      orderBy: { scheduledDate: 'asc' }
    });
  }

  async getConsultationsReport(facilityId: string, startDate?: string, endDate?: string) {
    const dateFilter = this.buildDateFilter('consultationDate', startDate, endDate);
    return this.prisma.consultations.findMany({
      where: {
        facilityId,
        ...dateFilter
      },
      include: {
        patient: {
          select: {
            firstName: true,
            lastName: true,
            pin: true
          }
        },
        attendingProvider: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      },
      orderBy: { consultationDate: 'asc' }
    });
  }

  async getPrescriptionsReport(facilityId: string, startDate?: string, endDate?: string) {
    const dateFilter = this.buildDateFilter('createdAt', startDate, endDate);
    return this.prisma.prescription.findMany({
      where: {
        consultation: {
          facilityId
        },
        ...dateFilter
      },
      include: {
        patient: {
          select: {
            firstName: true,
            lastName: true,
            pin: true
          }
        },
        prescribedBy: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      },
      orderBy: { createdAt: 'asc' }
    });
  }
}

