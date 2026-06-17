/**
 * Layer 2 — Appointments React Query hooks (Staff)
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchAppointments,
  createAppointment,
  checkInAppointment,
  type Appointment,
} from '../../api/appointments';
import type { CreateAppointment } from '@healthbridge/contracts';

export function useAppointments() {
  return useQuery({
    queryKey: ['appointments'],
    queryFn: fetchAppointments,
  });
}

export function useCreateAppointment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateAppointment & { patientId: string }) =>
      createAppointment(data),
    onSuccess: (newAppt) => {
      // Prepend to list cache
      queryClient.setQueryData<Appointment[]>(['appointments'], (old = []) => [
        newAppt,
        ...old,
      ]);
    },
  });
}

export function useCheckInAppointment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => checkInAppointment(id),
    onSuccess: (updatedAppt) => {
      queryClient.setQueryData<Appointment[]>(['appointments'], (old = []) =>
        old.map((appt) => (appt.id === updatedAppt.id ? updatedAppt : appt))
      );
      // Invalidate queue query key so the queue UI auto-updates on check-in
      queryClient.invalidateQueries({ queryKey: ['queue'] });
    },
  });
}
