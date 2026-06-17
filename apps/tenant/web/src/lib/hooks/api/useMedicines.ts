import { useQuery } from '@tanstack/react-query';
import { searchMedicines } from '../../api/medicines';

export function useMedicinesSearch(search: string) {
  return useQuery({
    queryKey: ['medicines', search],
    queryFn: () => searchMedicines(search),
    enabled: true, // Fetch initially and on search term change
    staleTime: 30 * 1000, // Keep cached search results fresh for 30s
  });
}
