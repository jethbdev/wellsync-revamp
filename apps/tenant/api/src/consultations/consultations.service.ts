import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { TenantPrismaClient } from '@healthbridge/database';
import { CreateConsultation, VitalSigns, PhysicalExam, Diagnosis, CreatePrescription } from '@healthbridge/contracts';
import { randomUUID } from 'crypto';
import { PluginRegistryService } from '../plugins/plugin-registry.service.js';

@Injectable()
export class ConsultationsService {
  constructor(
    @Inject('PRISMA_CLIENT') private prisma: TenantPrismaClient,
    private readonly pluginRegistry: PluginRegistryService
  ) {}

  async create(data: CreateConsultation & { patientId: string; facilityId: string; createdById: string }) {
    const patient = await this.prisma.patient.findFirst({
      where: { id: data.patientId, facilityId: data.facilityId }
    });
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    // Calculate age details
    const birthDate = new Date(patient.birthDate);
    const today = new Date();
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageDays < 0) {
      ageMonths--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      ageDays += prevMonth.getDate();
    }
    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }

    const consultationNumber = `CON-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    return this.prisma.$transaction(async (tx) => {
      const org = await tx.organization.findFirst();
      const consultation = await tx.consultations.create({
        data: {
          facilityId: data.facilityId,
          patientId: data.patientId,
          consultationNumber,
          consultationDate: new Date(),
          consultationTime: new Date().toLocaleTimeString('en-US', { hour12: false }),
          natureOfVisit: data.natureOfVisit,
          modeOfTransaction: data.modeOfTransaction,
          patientAgeYears: ageYears,
          patientAgeMonths: ageMonths,
          patientAgeDays: ageDays,
          patientConsent: data.patientConsent,
          chiefComplaint: data.chiefComplaint,
          historyOfIllness: data.historyOfIllness,
          treatmentPlan: data.treatmentPlan,
          followUpInstructions: data.followUpInstructions,
          attendingProviderId: data.createdById,
          createdById: data.createdById,
          status: 'DRAFT'
        }
      });

      // Synchronous transactional hook execution
      await this.pluginRegistry.runTransactionHooks('beforeConsultationCommit', tx, {
        orgId: org?.id || '',
        facilityId: data.facilityId,
        userId: data.createdById,
        payload: {
          consultationId: consultation.id,
          patientId: consultation.patientId,
          natureOfVisit: consultation.natureOfVisit,
          chiefComplaint: consultation.chiefComplaint,
          status: consultation.status
        }
      });

      return consultation;
    }).then(async (consultation) => {
      const org = await this.prisma.organization.findFirst();
      // Asynchronous post-commit hook emission
      await this.pluginRegistry.emitPostCommit('afterConsultationCommit', {
        orgId: org?.id || '',
        facilityId: data.facilityId,
        userId: data.createdById,
        payload: consultation
      });
      return consultation;
    });
  }

  async update(id: string, data: Partial<CreateConsultation>, facilityId: string) {
    const consultation = await this.prisma.consultations.findFirst({
      where: { id, facilityId }
    });
    if (!consultation) {
      throw new NotFoundException('Consultation not found');
    }
    if (consultation.status === 'COMPLETED') {
      throw new BadRequestException('Cannot modify a completed consultation');
    }

    return this.prisma.consultations.update({
      where: { id },
      data
    });
  }

  async addVitals(id: string, vitals: VitalSigns, facilityId: string, createdById: string) {
    const consultation = await this.prisma.consultations.findFirst({
      where: { id, facilityId }
    });
    if (!consultation) {
      throw new NotFoundException('Consultation not found');
    }
    if (consultation.status === 'COMPLETED') {
      throw new BadRequestException('Cannot add vitals to a completed consultation');
    }

    let bmi: number | undefined;
    let bmiCategory: string | undefined;

    if (vitals.weightKg && vitals.heightCm) {
      const heightM = vitals.heightCm / 100;
      bmi = parseFloat((vitals.weightKg / (heightM * heightM)).toFixed(2));

      if (bmi < 18.5) {
        bmiCategory = 'UNDERWEIGHT';
      } else if (bmi < 24.9) {
        bmiCategory = 'NORMAL';
      } else if (bmi < 29.9) {
        bmiCategory = 'OVERWEIGHT';
      } else {
        bmiCategory = 'OBESE';
      }
    }

    return this.prisma.vitalSigns.create({
      data: {
        consultationId: id,
        bpSystolic: vitals.bpSystolic,
        bpDiastolic: vitals.bpDiastolic,
        bpAssessment: vitals.bpAssessment,
        respiratoryRate: vitals.respiratoryRate,
        temperatureCelsius: vitals.temperatureCelsius,
        heartRate: vitals.heartRate,
        oxygenSaturation: vitals.oxygenSaturation,
        heightCm: vitals.heightCm,
        weightKg: vitals.weightKg,
        bmi,
        bmiCategory,
        createdById
      }
    });
  }

  async addPhysicalExam(id: string, exam: PhysicalExam, facilityId: string, createdById: string) {
    const consultation = await this.prisma.consultations.findFirst({
      where: { id, facilityId }
    });
    if (!consultation) {
      throw new NotFoundException('Consultation not found');
    }
    if (consultation.status === 'COMPLETED') {
      throw new BadRequestException('Cannot add physical exams to a completed consultation');
    }

    return this.prisma.physicalExam.create({
      data: {
        consultationId: id,
        systemName: exam.systemName,
        findings: exam.findings,
        isNormal: exam.isNormal,
        createdById
      }
    });
  }

  async addDiagnosis(id: string, diagnosis: Diagnosis, facilityId: string, createdById: string) {
    const consultation = await this.prisma.consultations.findFirst({
      where: { id, facilityId }
    });
    if (!consultation) {
      throw new NotFoundException('Consultation not found');
    }
    if (consultation.status === 'COMPLETED') {
      throw new BadRequestException('Cannot add diagnoses to a completed consultation');
    }

    // Verify ICD-10 code exists
    const icd10 = await this.prisma.icd10Code.findUnique({
      where: { code: diagnosis.icd10Code }
    });
    if (!icd10) {
      throw new BadRequestException(`ICD-10 code ${diagnosis.icd10Code} does not exist`);
    }

    return this.prisma.diagnosis.create({
      data: {
        consultationId: id,
        icd10Code: diagnosis.icd10Code,
        icd10Description: icd10.description,
        diagnosisType: diagnosis.diagnosisType,
        isPrimary: diagnosis.isPrimary,
        remarks: diagnosis.remarks,
        createdById
      }
    });
  }

  async addPrescription(id: string, data: CreatePrescription, facilityId: string, createdById: string) {
    const consultation = await this.prisma.consultations.findFirst({
      where: { id, facilityId }
    });
    if (!consultation) {
      throw new NotFoundException('Consultation not found');
    }
    if (consultation.status === 'COMPLETED') {
      throw new BadRequestException('Cannot add prescriptions to a completed consultation');
    }

    const prescriptionToken = `RX-TOKEN-${Date.now()}-${randomUUID().substring(0, 8)}`;

    return this.prisma.$transaction(async (tx) => {
      const org = await tx.organization.findFirst();
      const prescription = await tx.prescription.create({
        data: {
          consultationId: id,
          patientId: consultation.patientId,
          prescriptionToken,
          validUntil: data.validUntil ? new Date(data.validUntil) : null,
          prescribedById: createdById,
          status: 'ACTIVE'
        }
      });

      for (const order of data.medicationOrders) {
        await tx.medicationOrder.create({
          data: {
            consultationId: id,
            patientId: consultation.patientId,
            prescriptionId: prescription.id,
            productId: order.productId || null,
            medicineName: order.medicineName,
            dose: order.dose,
            frequency: order.frequency,
            duration: order.duration,
            quantity: order.quantity,
            unit: order.unit || null,
            instructions: order.instructions || '',
            prescribedById: createdById,
            status: 'PENDING'
          }
        });
      }

      // Run synchronous transactional hooks (like test-limiter)
      await this.pluginRegistry.runTransactionHooks('beforePrescriptionCommit', tx, {
        orgId: org?.id || '',
        facilityId,
        userId: createdById,
        payload: {
          prescriptionId: prescription.id,
          patientId: consultation.patientId,
          medicationOrders: data.medicationOrders
        }
      });

      return prescription;
    }).then(async (prescription) => {
      const org = await this.prisma.organization.findFirst();
      // Run async post-commit notifications
      await this.pluginRegistry.emitPostCommit('afterPrescriptionCommit', {
        orgId: org?.id || '',
        facilityId,
        userId: createdById,
        payload: {
          prescriptionId: prescription.id,
          patientId: consultation.patientId,
          prescriptionToken
        }
      });
      return prescription;
    });
  }

  async complete(id: string, facilityId: string) {
    const consultation = await this.prisma.consultations.findFirst({
      where: { id, facilityId }
    });
    if (!consultation) {
      throw new NotFoundException('Consultation not found');
    }

    return this.prisma.consultations.update({
      where: { id },
      data: { status: 'COMPLETED' }
    });
  }

  async findOne(id: string, facilityId: string) {
    const consultation = await this.prisma.consultations.findFirst({
      where: { id, facilityId },
      include: {
        patient: true,
        vitalSigns: true,
        physicalExams: true,
        diagnoses: true,
        prescriptions: {
          include: {
            medicationOrders: true
          }
        }
      }
    });

    if (!consultation) {
      throw new NotFoundException('Consultation not found');
    }

    return consultation;
  }
}
