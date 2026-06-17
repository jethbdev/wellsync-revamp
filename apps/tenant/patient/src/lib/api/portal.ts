/**
 * Layer 1 — Patient Portal API
 * Pure fetch functions — no React, no hooks.
 */
import { apiFetch } from '../api-client';

export interface PatientDocument {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileUrl: string;
  createdAt: string;
}

export interface PatientAllergy {
  id: string;
  allergenType: string;
  allergenName: string;
  reaction?: string | null;
  severity?: string | null;
  createdAt: string;
}

export interface PatientAlert {
  id: string;
  alertType: string;
  description?: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface OrganizationDetails {
  id: string;
  name: string;
  slug: string;
  type: string;
}

export interface FacilityDetails {
  id: string;
  name: string;
  facilityType: string;
  organization?: OrganizationDetails;
}

export interface PatientProfile {
  id: string;
  pin: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  sex: 'MALE' | 'FEMALE';
  bloodType?: string;
  contactNumber?: string;
  consultations: Consultation[];
  scheduledVisits: ScheduledVisit[];
  documents?: PatientDocument[];
  allergies?: PatientAllergy[];
  alerts?: PatientAlert[];
  facility?: FacilityDetails;
  isTeleconsultationActive?: boolean;
}

export interface Consultation {
  id: string;
  consultationDate: string;
  status: string;
  chiefComplaint?: string;
  natureOfVisit?: string;
  vitalSigns?: VitalSign[];
  prescriptions?: Prescription[];
  diagnoses?: Diagnosis[];
}

export interface VitalSign {
  id: string;
  bpSystolic?: number;
  bpDiastolic?: number;
  heartRate?: number;
  temperatureCelsius?: number;
  oxygenSaturation?: number;
  heightCm?: number;
  weightKg?: number;
  bmi?: number;
  recordedAt: string;
}

export interface Prescription {
  id: string;
  status: 'ACTIVE' | 'DISPENSED' | 'PARTIALLY_DISPENSED' | 'CANCELLED';
  validUntil?: string;
  createdAt: string;
  medicationOrders: MedicationOrder[];
}

export interface MedicationOrder {
  id: string;
  medicineName: string;
  dose: string;
  frequency: string;
  duration: string;
  quantity: number;
  instructions?: string;
}

export interface Diagnosis {
  id: string;
  icd10Code: string;
  icd10Description?: string;
  diagnosisType: string;
  isPrimary: boolean;
}

export interface ScheduledVisit {
  id: string;
  scheduledDate: string;
  scheduledTime?: string;
  purpose: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  meetingLink?: string;
  passcode?: string;
}

export async function fetchProfile(): Promise<PatientProfile> {
  return apiFetch<PatientProfile>('/api/patient-portal/profile');
}

export async function confirmAppointment(id: string): Promise<void> {
  return apiFetch<void>(`/api/patient-portal/appointments/${id}/confirm`, {
    method: 'POST',
  });
}

export async function cancelAppointment(id: string): Promise<void> {
  return apiFetch<void>(`/api/patient-portal/appointments/${id}/cancel`, {
    method: 'POST',
  });
}

export interface BookAppointmentInput {
  scheduledDate: string;
  scheduledTime?: string;
  purpose: string;
}

export async function bookAppointment(input: BookAppointmentInput): Promise<ScheduledVisit> {
  return apiFetch<ScheduledVisit>('/api/patient-portal/appointments', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}
