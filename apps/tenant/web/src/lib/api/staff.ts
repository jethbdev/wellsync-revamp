import { apiFetch } from '../api-client';

export interface StaffMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isFirstLogin: boolean;
  isActive: boolean;
  isAcceptingConsultations: boolean;
  facilityId: string | null;
  createdAt: string;
  role: { id: string; name: string };
  facility: { id: string; name: string } | null;
}

export interface CreateStaffInput {
  firstName: string;
  lastName: string;
  email: string;
  roleName: string;
  facilityId?: string;
}

export interface CreateStaffResult {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  roleName: string;
  tempPassword: string;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  scope: string;
  color?: string;
  icon?: string;
  permissions?: string[];
}

export async function fetchStaff(): Promise<StaffMember[]> {
  return apiFetch<StaffMember[]>('/api/staff');
}

export async function fetchRoles(): Promise<Role[]> {
  return apiFetch<Role[]>('/api/staff/roles');
}

export async function fetchAdminRoles(): Promise<Role[]> {
  return apiFetch<Role[]>('/api/roles');
}

export async function createRole(input: { name: string; description?: string; scope: string; permissions: string[]; color?: string; icon?: string }): Promise<Role> {
  return apiFetch<Role>('/api/roles', {
    method: 'POST',
    body: JSON.stringify(input)
  });
}

export async function updateRole(id: string, input: { name?: string; description?: string; scope?: string; permissions?: string[]; color?: string; icon?: string }): Promise<Role> {
  return apiFetch<Role>(`/api/roles/${id}`, {
    method: 'PUT',
    body: JSON.stringify(input)
  });
}

export async function deleteRole(id: string): Promise<Role> {
  return apiFetch<Role>(`/api/roles/${id}`, {
    method: 'DELETE'
  });
}

export async function createStaff(input: CreateStaffInput): Promise<CreateStaffResult> {
  return apiFetch<CreateStaffResult>('/api/staff', {
    method: 'POST',
    body: JSON.stringify(input)
  });
}

export async function updateStaff(id: string, data: { roleName?: string; facilityId?: string; isActive?: boolean }): Promise<any> {
  return apiFetch(`/api/staff/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
}

export async function deactivateStaff(id: string): Promise<any> {
  return apiFetch(`/api/staff/${id}`, {
    method: 'DELETE'
  });
}

export async function changePasswordFirst(newPassword: string): Promise<{ success: boolean }> {
  return apiFetch<{ success: boolean }>('/api/auth/staff/change-password-first', {
    method: 'POST',
    body: JSON.stringify({ newPassword })
  });
}

export async function updateSelfAvailability(isAcceptingConsultations: boolean): Promise<any> {
  return apiFetch('/api/staff/self/availability', {
    method: 'PUT',
    body: JSON.stringify({ isAcceptingConsultations })
  });
}
