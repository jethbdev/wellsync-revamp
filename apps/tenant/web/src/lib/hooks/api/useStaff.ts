import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchStaff,
  fetchRoles,
  fetchAdminRoles,
  createStaff,
  updateStaff,
  deactivateStaff,
  changePasswordFirst,
  updateSelfAvailability,
  createRole,
  updateRole,
  deleteRole,
  type StaffMember,
  type Role,
  type CreateStaffInput,
  type CreateStaffResult
} from '../../api/staff';

export function useStaff() {
  return useQuery({
    queryKey: ['staff'],
    queryFn: () => fetchStaff(),
  });
}

export function useRoles() {
  return useQuery({
    queryKey: ['roles'],
    queryFn: () => fetchRoles(),
  });
}

export function useAdminRoles() {
  return useQuery({
    queryKey: ['admin-roles'],
    queryFn: () => fetchAdminRoles(),
  });
}

export function useCreateStaff() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateStaffInput) => createStaff(input),
    onSuccess: (result: CreateStaffResult, variables) => {
      queryClient.setQueryData<StaffMember[]>(['staff'], (old = []) => {
        const newMember: StaffMember = {
          id: result.userId,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          isFirstLogin: true,
          isActive: true,
          isAcceptingConsultations: true,
          facilityId: variables.facilityId ?? null,
          createdAt: new Date().toISOString(),
          role: { id: '', name: result.roleName },
          facility: null, // Can map if needed
        };
        return [...old, newMember];
      });
    }
  });
}

export function useUpdateStaff() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { roleName?: string; facilityId?: string; isActive?: boolean } }) =>
      updateStaff(id, data),
    onSuccess: (updatedMember) => {
      queryClient.setQueryData<StaffMember[]>(['staff'], (old = []) =>
        old.map(m => m.id === updatedMember.id ? { ...m, ...updatedMember } : m)
      );
    }
  });
}

export function useDeactivateStaff() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deactivateStaff(id),
    onSuccess: (result) => {
      // result has { id, email }
      queryClient.setQueryData<StaffMember[]>(['staff'], (old = []) =>
        old.filter(m => m.id !== result.id)
      );
    }
  });
}

export function useChangePasswordFirst() {
  return useMutation({
    mutationFn: (newPassword: string) => changePasswordFirst(newPassword)
  });
}

export function useCreateRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { name: string; description?: string; scope: string; permissions: string[]; color?: string; icon?: string }) =>
      createRole(input),
    onSuccess: (newRole: Role) => {
      queryClient.setQueryData<Role[]>(['admin-roles'], (old = []) => {
        return [...old, newRole];
      });
      // Invalidate the basic staff roles list to ensure onboarding dropdown gets the new role
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    }
  });
}

export function useUpdateRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name?: string; description?: string; scope?: string; permissions?: string[]; color?: string; icon?: string } }) =>
      updateRole(id, data),
    onSuccess: (updatedRole: Role) => {
      queryClient.setQueryData<Role[]>(['admin-roles'], (old = []) =>
        old.map(r => r.id === updatedRole.id ? updatedRole : r)
      );
      // Invalidate basic roles list as well
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    }
  });
}

export function useDeleteRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteRole(id),
    onSuccess: (deletedRole: Role) => {
      queryClient.setQueryData<Role[]>(['admin-roles'], (old = []) =>
        old.filter(r => r.id !== deletedRole.id)
      );
      // Invalidate basic roles list as well
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    }
  });
}

export function useUpdateSelfAvailability() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (isAccepting: boolean) => updateSelfAvailability(isAccepting),
    onSuccess: (updated) => {
      queryClient.setQueryData<StaffMember[]>(['staff'], (old = []) =>
        old.map(m => m.id === updated.id ? { ...m, ...updated } : m)
      );
      queryClient.invalidateQueries({ queryKey: ['staff'] });
    }
  });
}
