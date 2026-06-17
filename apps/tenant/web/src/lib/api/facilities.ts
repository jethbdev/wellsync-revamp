import { apiFetch } from '../api-client';

export interface Facility {
  id: string;
  name: string;
  facilityType: string;
  nhfrCode: string | null;
  address: string | null;
  contactNumber: string | null;
  email: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface CreateFacilityInput {
  name: string;
  facilityType: string;
  nhfrCode?: string;
  address?: string;
  contactNumber?: string;
  email?: string;
}

export interface UpdateFacilityInput {
  name?: string;
  facilityType?: string;
  nhfrCode?: string;
  address?: string;
  contactNumber?: string;
  email?: string;
  isActive?: boolean;
}

export async function fetchFacilities(): Promise<Facility[]> {
  return apiFetch<Facility[]>('/api/facilities');
}

export async function fetchFacilityById(id: string): Promise<Facility> {
  return apiFetch<Facility>(`/api/facilities/${id}`);
}

export async function createFacility(input: CreateFacilityInput): Promise<Facility> {
  return apiFetch<Facility>('/api/facilities', {
    method: 'POST',
    body: JSON.stringify(input)
  });
}

export async function updateFacility(id: string, input: UpdateFacilityInput): Promise<Facility> {
  return apiFetch<Facility>(`/api/facilities/${id}`, {
    method: 'PUT',
    body: JSON.stringify(input)
  });
}

export async function deleteFacility(id: string): Promise<Facility> {
  return apiFetch<Facility>(`/api/facilities/${id}`, {
    method: 'DELETE'
  });
}
