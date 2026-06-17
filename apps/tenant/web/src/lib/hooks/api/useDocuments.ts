import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchPatientDocuments,
  uploadPatientDocument,
  deletePatientDocument,
  type PatientDocument,
  type UploadDocumentInput,
} from '../../api/documents';

export function usePatientDocuments(patientId: string) {
  return useQuery({
    queryKey: ['patient-documents', patientId],
    queryFn: () => fetchPatientDocuments(patientId),
    enabled: !!patientId,
  });
}

export function useUploadDocument(patientId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<UploadDocumentInput, 'patientId'>) =>
      uploadPatientDocument({ patientId, ...data }),
    onSuccess: (newDoc) => {
      queryClient.setQueryData<PatientDocument[]>(
        ['patient-documents', patientId],
        (old = []) => [newDoc, ...old]
      );
    },
  });
}

export function useDeleteDocument(patientId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (docId: string) => deletePatientDocument(patientId, docId),
    onSuccess: (_, docId) => {
      queryClient.setQueryData<PatientDocument[]>(
        ['patient-documents', patientId],
        (old = []) => old.filter((d) => d.id !== docId)
      );
    },
  });
}
