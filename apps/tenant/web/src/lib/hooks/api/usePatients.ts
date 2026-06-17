/**
 * Layer 2 — Patients React Query hooks (Staff)
 * Wraps Layer 1 fetch functions.
 * Uses manual cache updates — never invalidateQueries in onSuccess.
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchPatients,
  fetchPatient,
  createPatient,
  pullRequest,
  pullConfirm,
  updatePatient,
  type PatientListItem,
} from '../../api/patients';
import type { CreatePatient } from '@healthbridge/contracts';

export function usePatients(search?: string) {
  return useQuery({
    queryKey: ['patients', search ?? ''],
    queryFn: () => fetchPatients(search),
  });
}

export function usePatient(id: string) {
  return useQuery({
    queryKey: ['patients', id],
    queryFn: () => fetchPatient(id),
    enabled: !!id,
  });
}

export function useCreatePatient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePatient) => createPatient(data),
    onSuccess: (newPatient) => {
      // Prepend to list cache
      queryClient.setQueryData<PatientListItem[]>(['patients', ''], (old = []) => [
        newPatient,
        ...old,
      ]);
      // Seed detail cache
      queryClient.setQueryData(['patients', newPatient.id], newPatient);
    },
  });
}

export function usePullRequest() {
  return useMutation({
    mutationFn: (patientPin: string) => pullRequest(patientPin),
  });
}

export function usePullConfirm() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ patientPin, otp }: { patientPin: string; otp: string }) =>
      pullConfirm(patientPin, otp),
    onSuccess: () => {
      // Refetch patient list after pull — this is a structural import so it warrants a refresh
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });
}

export function useUpdatePatient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updatePatient(id, data),
    onSuccess: (updatedPatient) => {
      // Update detail cache
      queryClient.setQueryData(['patients', updatedPatient.id], updatedPatient);
      // Invalidate list queries
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });
}
