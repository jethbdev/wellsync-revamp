import { apiFetch } from '../api-client';

export interface ReportsSummary {
  patients: {
    total: number;
    byGender: { MALE: number; FEMALE: number };
    byAgeGroup: { '0-18': number; '19-35': number; '36-50': number; '51+': number };
  };
  appointments: {
    total: number;
    byStatus: Record<string, number>;
  };
  consultations: {
    total: number;
    byMode: Record<string, number>;
  };
  prescriptions: {
    total: number;
  };
  vitalsAverages: {
    bpSystolic: number | null;
    bpDiastolic: number | null;
    temperatureCelsius: number | null;
    heartRate: number | null;
    bmi: number | null;
  };
}

export interface PatientsReportItem {
  id: string;
  pin: string;
  firstName: string;
  lastName: string;
  sex: 'MALE' | 'FEMALE';
  birthDate: string;
  contactNumber?: string;
  createdAt: string;
}

export interface AppointmentsReportItem {
  id: string;
  scheduledDate: string;
  scheduledTime: string;
  purpose: string;
  status: string;
  patient: {
    pin: string;
    firstName: string;
    lastName: string;
  };
}

export interface ConsultationsReportItem {
  id: string;
  consultationDate: string;
  consultationTime: string;
  consultationNumber?: string;
  chiefComplaint?: string;
  modeOfTransaction: string;
  status: string;
  patient: {
    firstName: string;
    lastName: string;
    pin: string;
  };
  attendingProvider?: {
    firstName: string;
    lastName: string;
  };
}

export interface PrescriptionsReportItem {
  id: string;
  prescriptionToken: string;
  createdAt: string;
  validUntil?: string;
  status: string;
  patient: {
    firstName: string;
    lastName: string;
    pin: string;
  };
  prescribedBy?: {
    firstName: string;
    lastName: string;
  };
}

export async function fetchReportsSummary(): Promise<ReportsSummary> {
  return apiFetch<ReportsSummary>('/api/reports/summary');
}

function buildQueryString(startDate?: string, endDate?: string): string {
  const params = new URLSearchParams();
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);
  const str = params.toString();
  return str ? `?${str}` : '';
}

export async function fetchPatientsReport(startDate?: string, endDate?: string): Promise<PatientsReportItem[]> {
  return apiFetch<PatientsReportItem[]>(`/api/reports/patients${buildQueryString(startDate, endDate)}`);
}

export async function fetchAppointmentsReport(startDate?: string, endDate?: string): Promise<AppointmentsReportItem[]> {
  return apiFetch<AppointmentsReportItem[]>(`/api/reports/appointments${buildQueryString(startDate, endDate)}`);
}

export async function fetchConsultationsReport(startDate?: string, endDate?: string): Promise<ConsultationsReportItem[]> {
  return apiFetch<ConsultationsReportItem[]>(`/api/reports/consultations${buildQueryString(startDate, endDate)}`);
}

export async function fetchPrescriptionsReport(startDate?: string, endDate?: string): Promise<PrescriptionsReportItem[]> {
  return apiFetch<PrescriptionsReportItem[]>(`/api/reports/prescriptions${buildQueryString(startDate, endDate)}`);
}
