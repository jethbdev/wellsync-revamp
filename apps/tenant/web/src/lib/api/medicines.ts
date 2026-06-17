import { apiFetch } from '../api-client';

export interface MedicineOption {
  value: string;
  label: string;
  molecule: string;
  route: string;
  spec: string;
  atcCode: string;
}

export async function searchMedicines(search: string): Promise<MedicineOption[]> {
  const query = search ? `?search=${encodeURIComponent(search)}` : '';
  return apiFetch<MedicineOption[]>(`/api/medicines${query}`);
}
