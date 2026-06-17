import { apiFetch } from '../api-client';
import type { PatientListItem } from './patients';

export interface PatientRelationship {
  id: string;
  patientId: string;
  relatedPatientId: string;
  relationshipType: string;
  householdId: string | null;
  isHead: boolean;
  createdAt: string;
  patient: PatientListItem;
  relatedPatient: PatientListItem;
  household?: {
    id: string;
    householdCode: string | null;
    address: string | null;
    barangayCode: string | null;
  } | null;
}

export async function fetchFamilyTree(patientId: string): Promise<PatientRelationship[]> {
  return apiFetch<PatientRelationship[]>(`/api/patients/${patientId}/family-tree`);
}

export interface AddRelationshipInput {
  patientId: string;
  relatedPatientId: string;
  relationshipType: string;
  householdId?: string;
  isHead?: boolean;
}

export async function addRelationship({ patientId, ...data }: AddRelationshipInput): Promise<PatientRelationship> {
  return apiFetch<PatientRelationship>(`/api/patients/${patientId}/relationships`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export interface CreateHouseholdInput {
  address: string;
  barangayCode: string;
  householdCode?: string;
}

export interface Household {
  id: string;
  householdCode: string | null;
  address: string | null;
  barangayCode: string | null;
  facilityId: string;
  createdAt: string;
}

export async function createHousehold(data: CreateHouseholdInput): Promise<Household> {
  return apiFetch<Household>('/api/households', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
