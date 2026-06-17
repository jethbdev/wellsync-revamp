/**
 * Layer 2 — Queue React Query hooks (Staff & Kiosk)
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchQueue,
  callTicket,
  completeTicket,
  skipTicket,
  createWalkInTicket,
  fetchPublicQueue,
  type QueueEntry,
} from '../../api/queue';

export function useQueue(doctorId?: string) {
  return useQuery({
    queryKey: ['queue', doctorId],
    queryFn: () => fetchQueue(doctorId),
    refetchInterval: 3000, // Poll every 3 seconds for real-time updates
  });
}

export function usePublicQueue(facilityId: string, doctorId?: string) {
  return useQuery({
    queryKey: ['public-queue', facilityId, doctorId],
    queryFn: () => fetchPublicQueue(facilityId, doctorId),
    refetchInterval: 3000, // Poll every 3 seconds for real-time updates
    enabled: !!facilityId,
  });
}

export function useCallTicket() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, calledRoom }: { id: string; calledRoom: string }) =>
      callTicket(id, calledRoom),
    onSuccess: (updated) => {
      queryClient.setQueryData<QueueEntry[]>(['queue', updated.doctorId || undefined], (old = []) =>
        old.map((item) => (item.id === updated.id ? updated : item))
      );
      // Also invalidate overall queue just in case
      queryClient.invalidateQueries({ queryKey: ['queue'] });
    },
  });
}

export function useCompleteTicket() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => completeTicket(id),
    onSuccess: (updated) => {
      // Complete removes ticket from active queue list
      queryClient.setQueryData<QueueEntry[]>(['queue', updated.doctorId || undefined], (old = []) =>
        old.filter((item) => item.id !== updated.id)
      );
      queryClient.invalidateQueries({ queryKey: ['queue'] });
      // Invalidate appointments since this also completes the associated appointment
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
}

export function useSkipTicket() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => skipTicket(id),
    onSuccess: (updated) => {
      // Skip removes ticket from active queue list
      queryClient.setQueryData<QueueEntry[]>(['queue', updated.doctorId || undefined], (old = []) =>
        old.filter((item) => item.id !== updated.id)
      );
      queryClient.invalidateQueries({ queryKey: ['queue'] });
    },
  });
}

export function useCreateWalkInTicket() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ patientId, doctorId }: { patientId: string; doctorId?: string }) =>
      createWalkInTicket(patientId, doctorId),
    onSuccess: (newTicket) => {
      queryClient.setQueryData<QueueEntry[]>(['queue', newTicket.doctorId || undefined], (old = []) => [
        ...old,
        newTicket,
      ]);
      queryClient.invalidateQueries({ queryKey: ['queue'] });
    },
  });
}
