import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchFacilities,
  createFacility,
  updateFacility,
  deleteFacility,
  type Facility,
  type CreateFacilityInput,
  type UpdateFacilityInput
} from '../../api/facilities';

export function useFacilities() {
  return useQuery({
    queryKey: ['facilities'],
    queryFn: () => fetchFacilities(),
  });
}

export function useCreateFacility() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateFacilityInput) => createFacility(input),
    onSuccess: (newFacility: Facility) => {
      queryClient.setQueryData<Facility[]>(['facilities'], (old = []) => {
        return [...old, newFacility];
      });
    }
  });
}

export function useUpdateFacility() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateFacilityInput }) =>
      updateFacility(id, data),
    onSuccess: (updatedFacility: Facility) => {
      queryClient.setQueryData<Facility[]>(['facilities'], (old = []) =>
        old.map(f => f.id === updatedFacility.id ? updatedFacility : f)
      );
    }
  });
}

export function useDeleteFacility() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteFacility(id),
    onSuccess: (deletedFacility: Facility) => {
      // In soft-deleting, we toggle isActive to false. Update in cache.
      queryClient.setQueryData<Facility[]>(['facilities'], (old = []) =>
        old.map(f => f.id === deletedFacility.id ? deletedFacility : f)
      );
    }
  });
}
