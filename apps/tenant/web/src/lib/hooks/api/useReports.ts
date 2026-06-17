import { useQuery, useMutation } from '@tanstack/react-query';
import {
  fetchReportsSummary,
  fetchPatientsReport,
  fetchAppointmentsReport,
  fetchConsultationsReport,
  fetchPrescriptionsReport
} from '../../api/reports';

export function useReportsSummary() {
  return useQuery({
    queryKey: ['reports-summary'],
    queryFn: () => fetchReportsSummary(),
  });
}

export function usePatientsReport() {
  return useMutation({
    mutationFn: ({ startDate, endDate }: { startDate?: string; endDate?: string }) =>
      fetchPatientsReport(startDate, endDate)
  });
}

export function useAppointmentsReport() {
  return useMutation({
    mutationFn: ({ startDate, endDate }: { startDate?: string; endDate?: string }) =>
      fetchAppointmentsReport(startDate, endDate)
  });
}

export function useConsultationsReport() {
  return useMutation({
    mutationFn: ({ startDate, endDate }: { startDate?: string; endDate?: string }) =>
      fetchConsultationsReport(startDate, endDate)
  });
}

export function usePrescriptionsReport() {
  return useMutation({
    mutationFn: ({ startDate, endDate }: { startDate?: string; endDate?: string }) =>
      fetchPrescriptionsReport(startDate, endDate)
  });
}
