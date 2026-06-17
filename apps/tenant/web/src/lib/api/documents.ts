import { apiFetch } from '../api-client';

export interface PatientDocument {
  id: string;
  patientId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileUrl: string;
  uploadedBy: string | null;
  createdAt: string;
  uploader?: {
    id: string;
    firstName: string;
    lastName: string;
    displayName: string | null;
  } | null;
}

export async function fetchPatientDocuments(patientId: string): Promise<PatientDocument[]> {
  return apiFetch<PatientDocument[]>(`/api/patients/${patientId}/documents`);
}

export interface UploadDocumentInput {
  patientId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileUrl: string;
}

export async function uploadPatientDocument({ patientId, ...data }: UploadDocumentInput): Promise<PatientDocument> {
  return apiFetch<PatientDocument>(`/api/patients/${patientId}/documents`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function deletePatientDocument(patientId: string, docId: string): Promise<void> {
  return apiFetch<void>(`/api/patients/${patientId}/documents/${docId}`, {
    method: 'DELETE',
  });
}
