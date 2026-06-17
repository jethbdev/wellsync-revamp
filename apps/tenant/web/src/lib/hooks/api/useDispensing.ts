import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchPendingPrescriptions,
  fetchPrescriptionDetails,
  submitDispense,
  type DispensePrescriptionInput,
  type PendingPrescription,
  type PrescriptionDetails
} from '../../api/dispensing';

export function usePendingPrescriptions() {
  return useQuery({
    queryKey: ['dispensing', 'prescriptions'],
    queryFn: fetchPendingPrescriptions,
  });
}

export function usePrescriptionDetails(prescriptionId: string | null) {
  return useQuery({
    queryKey: ['dispensing', 'prescription', prescriptionId],
    queryFn: () => fetchPrescriptionDetails(prescriptionId!),
    enabled: !!prescriptionId,
  });
}

export function useDispensePrescription() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DispensePrescriptionInput) => submitDispense(data),
    onSuccess: () => {
      // Invalidate active prescriptions list
      queryClient.invalidateQueries({ queryKey: ['dispensing', 'prescriptions'] });
      // Invalidate specific details if loaded
      queryClient.invalidateQueries({ queryKey: ['dispensing', 'prescription'] });
      // Invalidate inventory stock levels and movements since quantities changed
      queryClient.invalidateQueries({ queryKey: ['inventory', 'stock'] });
      queryClient.invalidateQueries({ queryKey: ['inventory', 'ledger'] });
    },
  });
}
