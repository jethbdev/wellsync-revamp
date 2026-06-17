/**
 * Layer 2 — Consultations React Query hooks (Staff)
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchConsultation,
  submitNewVisit,
  type NewVisitPayload,
  type Consultation,
} from '../../api/consultations';

export function useConsultation(id: string) {
  return useQuery({
    queryKey: ['consultations', id],
    queryFn: () => fetchConsultation(id),
    enabled: !!id,
  });
}

/**
 * Orchestrated mutation: create → vitals → diagnosis → prescription → complete.
 * On success, seeds the consultation detail cache and invalidates the patient list
 * (consultation completion affects patient's lastVisit display).
 */
export function useSubmitNewVisit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: NewVisitPayload) => submitNewVisit(payload),
    onSuccess: (consultation: Consultation) => {
      // Seed detail cache for this consultation
      queryClient.setQueryData(['consultations', consultation.id], consultation);
      // Patient's record is now updated — refresh the list
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });
}
