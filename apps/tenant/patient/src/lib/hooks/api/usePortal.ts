/**
 * Layer 2 — Patient Portal React Query hooks
 * Manual cache updates — no invalidateQueries in onSuccess.
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchProfile,
  confirmAppointment,
  cancelAppointment,
  bookAppointment,
  type PatientProfile,
  type ScheduledVisit,
  type BookAppointmentInput,
} from '../../api/portal';
import { getTenantSlug } from '../../api-client';

export function useProfile() {
  return useQuery({
    queryKey: ['portal-profile'],
    queryFn: fetchProfile,
    retry: false, // on 401, apiFetch redirects — don't retry
  });
}

export function useConfirmAppointment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => confirmAppointment(id),
    onSuccess: (_data, id) => {
      // Update appointment status in profile cache without a refetch
      queryClient.setQueryData<PatientProfile>(['portal-profile'], (old) => {
        if (!old) return old;
        return {
          ...old,
          scheduledVisits: old.scheduledVisits.map((v: ScheduledVisit) =>
            v.id === id ? { ...v, status: 'CONFIRMED' as const } : v
          ),
        };
      });
    },
  });
}

export function useCancelAppointment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => cancelAppointment(id),
    onSuccess: (_data, id) => {
      // Update appointment status in profile cache
      queryClient.setQueryData<PatientProfile>(['portal-profile'], (old) => {
        if (!old) return old;
        return {
          ...old,
          scheduledVisits: old.scheduledVisits.map((v: ScheduledVisit) =>
            v.id === id ? { ...v, status: 'CANCELLED' as const } : v
          ),
        };
      });
    },
  });
}

export function useBookAppointment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: BookAppointmentInput) => bookAppointment(input),
    onSuccess: (newVisit) => {
      // Prepend the newly booked appointment to the list in cache
      queryClient.setQueryData<PatientProfile>(['portal-profile'], (old) => {
        if (!old) return old;
        return {
          ...old,
          scheduledVisits: [newVisit, ...old.scheduledVisits],
        };
      });
    },
  });
}
