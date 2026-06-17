import { apiFetch } from '../api-client';

export interface PendingPrescription {
  id: string;
  consultationId: string;
  patientId: string;
  prescriptionToken: string;
  validUntil: string | null;
  status: string;
  prescribedById: string | null;
  createdAt: string;
  patient: {
    id: string;
    pin: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    sex: string;
  };
  prescribedBy: {
    id: string;
    displayName: string;
    firstName: string;
    lastName: string;
  } | null;
  _count: {
    medicationOrders: number;
  };
}

export interface MedicationOrderWithStock {
  id: string;
  consultationId: string;
  patientId: string;
  prescriptionId: string | null;
  productId: string | null;
  medicineName: string | null;
  dose: string | null;
  frequency: string | null;
  duration: string | null;
  quantity: string | number; // Decimal
  unit: string | null;
  instructions: string | null;
  status: string;
  prescribedById: string | null;
  createdAt: string;
  product?: {
    id: string;
    code: string;
    genericName: string;
    brandName: string | null;
    unitOfMeasure: string;
    category: string;
  } | null;
  availableBatches: Array<{
    id: string;
    inventoryItemId: string;
    warehouseId: string;
    binId: string | null;
    productId: string;
    batchNumber: string;
    lotNumber: string | null;
    quantityOnHand: string | number;
    expiryDate: string | null;
    manufacturedDate: string | null;
    unitPrice: string | number | null;
    fundingSource: string | null;
    warehouse: {
      id: string;
      name: string;
    };
    bin: {
      id: string;
      binCode: string;
    } | null;
  }>;
}

export interface PrescriptionDetails {
  id: string;
  consultationId: string;
  patientId: string;
  prescriptionToken: string;
  validUntil: string | null;
  status: string;
  prescribedById: string | null;
  createdAt: string;
  patient: {
    id: string;
    pin: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    sex: string;
  };
  prescribedBy: {
    id: string;
    displayName: string;
    firstName: string;
    lastName: string;
  } | null;
  medicationOrders: MedicationOrderWithStock[];
}

export interface DispenseLineInput {
  medicationOrderId: string;
  productId: string;
  batchId: string;
  quantity: number;
}

export interface DispensePrescriptionInput {
  prescriptionId: string;
  dispenseType: 'OUTPATIENT' | 'WARD' | 'LGU_PROGRAM';
  destination?: string;
  programName?: string;
  notes?: string;
  lines: DispenseLineInput[];
}

export async function fetchPendingPrescriptions(): Promise<PendingPrescription[]> {
  return apiFetch<PendingPrescription[]>('/api/dispensing/prescriptions');
}

export async function fetchPrescriptionDetails(id: string): Promise<PrescriptionDetails> {
  return apiFetch<PrescriptionDetails>(`/api/dispensing/prescriptions/${id}`);
}

export async function submitDispense(input: DispensePrescriptionInput): Promise<{ success: boolean; dispenseNumber: string }> {
  return apiFetch<{ success: boolean; dispenseNumber: string }>('/api/dispensing/dispense', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}
