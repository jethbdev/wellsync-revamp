/**
 * Layer 1 — Appointments API (Staff)
 * Pure fetch functions — no React, no hooks.
 */
import { apiFetch } from '../api-client';
import type { CreateAppointment } from '@healthbridge/contracts';

export interface Appointment {
  id: string;
  patientId: string;
  facilityId: string;
  scheduledDate: string;
  scheduledTime?: string;
  purpose: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'CHECKED_IN';
  createdAt: string;
  meetingLink?: string;
  passcode?: string;
  doctorId?: string;
  doctor?: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export async function fetchAppointments(): Promise<Appointment[]> {
  return apiFetch<Appointment[]>('/api/appointments');
}

export async function createAppointment(
  data: CreateAppointment & { patientId: string }
): Promise<Appointment> {
  return apiFetch<Appointment>('/api/appointments', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function checkInAppointment(id: string): Promise<Appointment> {
  return apiFetch<Appointment>(`/api/appointments/${id}/check-in`, {
    method: 'POST',
  });
}
