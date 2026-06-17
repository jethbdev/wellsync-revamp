import { apiFetch } from '../api-client';

export interface StorageBin {
  id: string;
  warehouseId: string;
  binCode: string;
  description: string | null;
  isActive: boolean;
}

export interface StorageArea {
  id: string;
  facilityId: string;
  name: string;
  isDefault: boolean;
  isActive: boolean;
  bins?: StorageBin[];
}

export interface InventoryBatch {
  id: string;
  inventoryItemId: string;
  warehouseId: string;
  productId: string;
  batchNumber: string;
  lotNumber: string | null;
  quantityOnHand: string | number;
  manufacturedDate: string | null;
  expiryDate: string | null;
  vvmStatus: string | null;
  unitPrice: string | number | null;
  fundingSource: string | null;
  storageLocation: string | null;
  binId: string | null;
  bin?: StorageBin | null;
  warehouse?: StorageArea | null;
}

export interface InventoryItem {
  id: string;
  facilityId: string;
  warehouseId: string;
  productId: string;
  quantityOnHand: string | number;
  lastUpdated: string;
  warehouse: StorageArea;
  batches: InventoryBatch[];
}

export interface ProductThreshold {
  id: string;
  facilityId: string;
  productId: string;
  reorderLevel: string | number | null;
  minStockLevel: string | number | null;
  maxStockLevel: string | number | null;
}

export interface ProductStock {
  id: string;
  code: string;
  genericName: string;
  brandName: string | null;
  dosageForm: string | null;
  category: 'MEDICINE' | 'SUPPLY';
  unitOfMeasure: string;
  isBatchTracked: boolean;
  isVaccine: boolean;
  requiresColdChain: boolean;
  vvmRequired: boolean;
  reorderLevel: string | number | null;
  minStockLevel: string | number | null;
  maxStockLevel: string | number | null;
  thresholds?: ProductThreshold[];
  inventoryItems?: InventoryItem[];
}

export interface ReceiveStockInput {
  productId: string;
  warehouseId: string;
  binId?: string;
  batchNumber: string;
  expiryDate?: string;
  manufacturedDate?: string;
  quantity: number;
  unitPrice: number;
  fundingSource?: string;
  storageLocationString?: string;
}

export interface DiscardStockInput {
  batchId: string;
  quantity: number;
  reason: string;
  witnessName?: string;
}

export interface StockTransaction {
  id: string;
  facilityId: string;
  warehouseId: string;
  binId: string | null;
  productId: string;
  batchId: string | null;
  transactionType: 'RECEIVE' | 'ISSUE' | 'DISPENSE' | 'TRANSFER_OUT' | 'TRANSFER_IN' | 'DISPOSAL' | 'RETURN';
  quantity: string | number;
  quantityBefore: string | number;
  quantityAfter: string | number;
  transactionDate: string;
  notes: string | null;
  createdAt: string;
  product: { id: string; code: string; genericName: string; brandName: string | null; unitOfMeasure: string };
  warehouse: { id: string; name: string };
  bin: { id: string; binCode: string } | null;
  batch: { id: string; batchNumber: string } | null;
  creator: { firstName: string; lastName: string; displayName: string | null } | null;
}

export async function fetchStorageLocations(): Promise<StorageArea[]> {
  return apiFetch<StorageArea[]>('/api/inventory/locations');
}

export async function createStorageLocation(name: string): Promise<StorageArea> {
  return apiFetch<StorageArea>('/api/inventory/locations', {
    method: 'POST',
    body: JSON.stringify({ name }),
  });
}

export async function generateBins(warehouseId: string, shelvesCount: number, binsPerShelf: number): Promise<StorageBin[]> {
  return apiFetch<StorageBin[]>('/api/inventory/bins/generate', {
    method: 'POST',
    body: JSON.stringify({ warehouseId, shelvesCount, binsPerShelf }),
  });
}

export async function quickAddBin(warehouseId: string, binCode: string): Promise<StorageBin> {
  return apiFetch<StorageBin>('/api/inventory/bins/quick-add', {
    method: 'POST',
    body: JSON.stringify({ warehouseId, binCode }),
  });
}

export async function fetchStockLevels(): Promise<ProductStock[]> {
  return apiFetch<ProductStock[]>('/api/inventory/stock');
}

export async function receiveStock(data: ReceiveStockInput): Promise<{ success: boolean; batchId: string }> {
  return apiFetch<{ success: boolean; batchId: string }>('/api/inventory/receive', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function discardStock(data: DiscardStockInput): Promise<{ success: boolean }> {
  return apiFetch<{ success: boolean }>('/api/inventory/discard', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function fetchStockLedger(): Promise<StockTransaction[]> {
  return apiFetch<StockTransaction[]>('/api/inventory/ledger');
}
