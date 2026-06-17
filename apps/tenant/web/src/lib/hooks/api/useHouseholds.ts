import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchFamilyTree,
  addRelationship,
  createHousehold,
  type PatientRelationship,
  type AddRelationshipInput,
  type CreateHouseholdInput,
} from '../../api/households';

export function useFamilyTree(patientId: string) {
  return useQuery({
    queryKey: ['family-tree', patientId],
    queryFn: () => fetchFamilyTree(patientId),
    enabled: !!patientId,
  });
}

export function useAddRelationship(patientId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<AddRelationshipInput, 'patientId'>) =>
      addRelationship({ patientId, ...data }),
    onSuccess: (newRel) => {
      queryClient.setQueryData<PatientRelationship[]>(
        ['family-tree', patientId],
        (old = []) => {
          const existsIndex = old.findIndex(
            (r) =>
              (r.patientId === newRel.patientId &&
                r.relatedPatientId === newRel.relatedPatientId) ||
              (r.patientId === newRel.relatedPatientId &&
                r.relatedPatientId === newRel.patientId)
          );
          if (existsIndex > -1) {
            const updated = [...old];
            updated[existsIndex] = newRel;
            return updated;
          }
          return [newRel, ...old];
        }
      );
    },
  });
}

export function useCreateHousehold() {
  return useMutation({
    mutationFn: (data: CreateHouseholdInput) => createHousehold(data),
  });
}
