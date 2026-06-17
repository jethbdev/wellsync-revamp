import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchStorageLocations,
  createStorageLocation,
  generateBins,
  quickAddBin,
  fetchStockLevels,
  receiveStock,
  discardStock,
  fetchStockLedger,
  type ReceiveStockInput,
  type DiscardStockInput,
  type StorageArea,
  type ProductStock,
  type StockTransaction
} from '../../api/inventory';

export function useStorageLocations() {
  return useQuery({
    queryKey: ['inventory', 'locations'],
    queryFn: fetchStorageLocations,
  });
}

export function useCreateStorageLocation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => createStorageLocation(name),
    onSuccess: (newLocation) => {
      queryClient.setQueryData<StorageArea[]>(['inventory', 'locations'], (old = []) => [
        ...old,
        { ...newLocation, bins: [] },
      ]);
    },
  });
}

export function useGenerateBins() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ warehouseId, shelvesCount, binsPerShelf }: { warehouseId: string; shelvesCount: number; binsPerShelf: number }) =>
      generateBins(warehouseId, shelvesCount, binsPerShelf),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory', 'locations'] });
    },
  });
}

export function useQuickAddBin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ warehouseId, binCode }: { warehouseId: string; binCode: string }) =>
      quickAddBin(warehouseId, binCode),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory', 'locations'] });
    },
  });
}

export function useStockLevels() {
  return useQuery({
    queryKey: ['inventory', 'stock'],
    queryFn: fetchStockLevels,
  });
}

export function useReceiveStock() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ReceiveStockInput) => receiveStock(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory', 'stock'] });
      queryClient.invalidateQueries({ queryKey: ['inventory', 'ledger'] });
      queryClient.invalidateQueries({ queryKey: ['inventory', 'locations'] });
    },
  });
}

export function useDiscardStock() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DiscardStockInput) => discardStock(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory', 'stock'] });
      queryClient.invalidateQueries({ queryKey: ['inventory', 'ledger'] });
    },
  });
}

export function useStockLedger() {
  return useQuery({
    queryKey: ['inventory', 'ledger'],
    queryFn: fetchStockLedger,
  });
}
