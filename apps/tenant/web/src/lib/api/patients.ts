/**
 * Layer 1 — Patients API (Staff)
 * Pure fetch functions — no React, no hooks.
 * Typed with shared contract schemas.
 */
import { apiFetch } from '../api-client';
import type { CreatePatient } from '@healthbridge/contracts';

export interface PatientListItem {
  id: string;
  pin: string;
  firstName: string;
  lastName: string;
  sex: 'MALE' | 'FEMALE';
  birthDate: string;
  contactNumber?: string;
  bloodType?: string;
  status?: string;
  civilStatus?: string;
  updatedAt: string;
  patientAgeYears?: number;
}

export async function fetchPatients(search?: string): Promise<PatientListItem[]> {
  const qs = search ? `?search=${encodeURIComponent(search)}` : '';
  return apiFetch<PatientListItem[]>(`/api/patients${qs}`);
}

export async function fetchPatient(id: string): Promise<PatientListItem> {
  return apiFetch<PatientListItem>(`/api/patients/${id}`);
}

export async function createPatient(data: CreatePatient & { facilityId?: string }): Promise<PatientListItem> {
  return apiFetch<PatientListItem>('/api/patients', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function pullRequest(patientPin: string): Promise<{ targetOrgSlug: string }> {
  return apiFetch<{ targetOrgSlug: string }>('/api/patients/pull-request', {
    method: 'POST',
    body: JSON.stringify({ patientPin }),
  });
}

export async function pullConfirm(patientPin: string, otp: string): Promise<void> {
  return apiFetch<void>('/api/patients/pull-confirm', {
    method: 'POST',
    body: JSON.stringify({ patientPin, otp }),
  });
}

export async function updatePatient(id: string, data: any): Promise<PatientListItem> {
  return apiFetch<PatientListItem>(`/api/patients/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}
