/**
 * Layer 1 — Consultations API (Staff)
 * Pure fetch functions — no React, no hooks.
 */
import { apiFetch } from '../api-client';
import type {
  CreateConsultation,
  VitalSigns,
  PhysicalExam,
  Diagnosis,
  CreatePrescription,
} from '@healthbridge/contracts';

export interface Consultation {
  id: string;
  patientId: string;
  facilityId: string;
  status: 'DRAFT' | 'IN_PROGRESS' | 'COMPLETED';
  consultationDate: string;
  chiefComplaint?: string;
  natureOfVisit?: string;
  createdAt: string;
}

export async function createConsultation(
  data: CreateConsultation & { patientId: string }
): Promise<Consultation> {
  return apiFetch<Consultation>('/api/consultations', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateConsultation(
  id: string,
  data: Partial<CreateConsultation>
): Promise<Consultation> {
  return apiFetch<Consultation>(`/api/consultations/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function fetchConsultation(id: string): Promise<Consultation> {
  return apiFetch<Consultation>(`/api/consultations/${id}`);
}

export async function addVitals(id: string, data: VitalSigns): Promise<unknown> {
  return apiFetch(`/api/consultations/${id}/vitals`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function addPhysicalExam(id: string, data: PhysicalExam): Promise<unknown> {
  return apiFetch(`/api/consultations/${id}/physical-exams`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function addDiagnosis(id: string, data: Diagnosis): Promise<unknown> {
  return apiFetch(`/api/consultations/${id}/diagnoses`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function addPrescription(id: string, data: CreatePrescription): Promise<unknown> {
  return apiFetch(`/api/consultations/${id}/prescriptions`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function completeConsultation(id: string): Promise<Consultation> {
  return apiFetch<Consultation>(`/api/consultations/${id}/complete`, {
    method: 'POST',
  });
}

// -------------------------------------------------------
// Orchestrated multi-step flow for "New Visit" submission
// -------------------------------------------------------
export interface NewVisitPayload {
  patientId: string;
  chiefComplaint: string;
  soapNotes?: string;
  vitals?: VitalSigns;
  icd10Code?: string;
  icd10Description?: string;
  diagnosisType?: 'WORKING' | 'FINAL';
  prescription?: {
    medicineName: string;
    dose: string;
    frequency: string;
    duration: string;
    quantity: number;
  };
  prescriptions?: Array<{
    medicineName: string;
    dose: string;
    frequency: string;
    duration: string;
    quantity: number;
  }>;
  modeOfTransaction?: string;
}

export async function submitNewVisit(payload: NewVisitPayload): Promise<Consultation> {
  const consultation = await createConsultation({
    patientId: payload.patientId,
    natureOfVisit: 'GENERAL_CONSULTATION',
    modeOfTransaction: payload.modeOfTransaction || 'WALK_IN',
    patientConsent: true,
    chiefComplaint: payload.chiefComplaint || 'Routine Consultation',
    historyOfIllness: payload.soapNotes || '',
    treatmentPlan: 'See prescription',
    followUpInstructions: '',
  });

  if (payload.vitals && Object.values(payload.vitals).some(Boolean)) {
    await addVitals(consultation.id, payload.vitals);
  }

  if (payload.icd10Code) {
    await addDiagnosis(consultation.id, {
      icd10Code: payload.icd10Code,
      icd10Description: payload.icd10Description,
      diagnosisType: payload.diagnosisType || 'FINAL',
      isPrimary: true,
    });
  }

  if (payload.prescriptions && payload.prescriptions.length > 0) {
    await addPrescription(consultation.id, {
      medicationOrders: payload.prescriptions.map((p) => ({
        medicineName: p.medicineName,
        dose: p.dose,
        frequency: p.frequency,
        duration: p.duration,
        quantity: p.quantity,
      })),
    });
  } else if (payload.prescription) {
    await addPrescription(consultation.id, {
      medicationOrders: [
        {
          medicineName: payload.prescription.medicineName,
          dose: payload.prescription.dose,
          frequency: payload.prescription.frequency,
          duration: payload.prescription.duration,
          quantity: payload.prescription.quantity,
        },
      ],
    });
  }

  return completeConsultation(consultation.id);
}
