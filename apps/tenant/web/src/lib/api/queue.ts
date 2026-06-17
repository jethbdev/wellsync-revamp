/**
 * Layer 1 — Queue API (Staff & Kiosk)
 * Pure fetch functions — no React, no hooks.
 */
import { apiFetch } from '../api-client';

export interface QueueEntry {
  id: string;
  facilityId: string;
  visitId: string | null;
  patientId: string;
  ticketNumber: string;
  status: 'WAITING' | 'CALLING' | 'COMPLETED' | 'SKIPPED';
  calledRoom: string | null;
  createdAt: string;
  updatedAt: string;
  doctorId?: string | null;
  doctor?: {
    id: string;
    firstName: string;
    lastName: string;
  } | null;
  patient?: {
    id: string;
    firstName: string;
    lastName: string;
    pin: string;
  };
}

export async function fetchQueue(doctorId?: string): Promise<QueueEntry[]> {
  const url = doctorId ? `/api/queue?doctorId=${doctorId}` : '/api/queue';
  return apiFetch<QueueEntry[]>(url);
}

export async function fetchPublicQueue(facilityId: string, doctorId?: string): Promise<QueueEntry[]> {
  const url = doctorId
    ? `/api/queue/public?facilityId=${facilityId}&doctorId=${doctorId}`
    : `/api/queue/public?facilityId=${facilityId}`;
  return apiFetch<QueueEntry[]>(url);
}

export async function callTicket(id: string, calledRoom: string): Promise<QueueEntry> {
  return apiFetch<QueueEntry>(`/api/queue/${id}/call`, {
    method: 'POST',
    body: JSON.stringify({ calledRoom }),
  });
}

export async function completeTicket(id: string): Promise<QueueEntry> {
  return apiFetch<QueueEntry>(`/api/queue/${id}/complete`, {
    method: 'POST',
  });
}

export async function skipTicket(id: string): Promise<QueueEntry> {
  return apiFetch<QueueEntry>(`/api/queue/${id}/skip`, {
    method: 'POST',
  });
}

export async function createWalkInTicket(patientId: string, doctorId?: string): Promise<QueueEntry> {
  return apiFetch<QueueEntry>('/api/queue/walk-in', {
    method: 'POST',
    body: JSON.stringify({ patientId, doctorId }),
  });
}
