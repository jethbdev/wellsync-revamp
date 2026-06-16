import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { TenantPrismaClient } from '@healthbridge/database';

export interface DispenseLineInput {
  medicationOrderId: string;
  productId: string;
  batchId: string;
  quantity: number;
}

export interface DispensePrescriptionDto {
  prescriptionId: string;
  dispenseType: 'OUTPATIENT' | 'WARD' | 'LGU_PROGRAM';
  destination?: string;
  programName?: string;
  notes?: string;
  lines: DispenseLineInput[];
}

@Injectable()
export class DispensingService {
  constructor(
    @Inject('PRISMA_CLIENT') private prisma: TenantPrismaClient
  ) {}

  async listPendingPrescriptions(facilityId: string) {
    return this.prisma.prescription.findMany({
      where: {
        status: 'ACTIVE',
        consultation: { facilityId },
        medicationOrders: {
          some: { status: 'PENDING' }
        }
      },
      include: {
        patient: {
          select: {
            id: true,
            pin: true,
            firstName: true,
            lastName: true,
            birthDate: true,
            sex: true,
          }
        },
        prescribedBy: {
          select: {
            id: true,
            displayName: true,
            firstName: true,
            lastName: true,
          }
        },
        _count: {
          select: {
            medicationOrders: {
              where: { status: 'PENDING' }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getPrescriptionDetails(prescriptionId: string, facilityId: string) {
    const rx = await this.prisma.prescription.findFirst({
      where: {
        id: prescriptionId,
        consultation: { facilityId }
      },
      include: {
        patient: {
          select: {
            id: true,
            pin: true,
            firstName: true,
            lastName: true,
            birthDate: true,
            sex: true,
          }
        },
        prescribedBy: {
          select: {
            id: true,
            displayName: true,
            firstName: true,
            lastName: true,
          }
        },
        medicationOrders: {
          include: {
            product: true
          }
        }
      }
    });

    if (!rx) {
      throw new NotFoundException('Prescription not found');
    }

    const ordersWithStock = [];
    for (const order of rx.medicationOrders) {
      let stockBatches: any[] = [];
      if (order.productId) {
        stockBatches = await this.prisma.inventoryBatch.findMany({
          where: {
            productId: order.productId,
            quantityOnHand: { gt: 0 },
            inventoryItem: {
              facilityId
            }
          },
          include: {
            warehouse: true,
            bin: true
          },
          orderBy: { expiryDate: 'asc' } // FEFO
        });
      }

      ordersWithStock.push({
        ...order,
        availableBatches: stockBatches
      });
    }

    return {
      ...rx,
      medicationOrders: ordersWithStock
    };
  }

  async dispensePrescription(facilityId: string, userId: string, dto: DispensePrescriptionDto) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Resolve prescription
      const rx = await tx.prescription.findFirst({
        where: {
          id: dto.prescriptionId,
          consultation: { facilityId }
        },
        include: {
          patient: true
        }
      });

      if (!rx) {
        throw new NotFoundException('Prescription not found or does not belong to this facility');
      }

      if (rx.status === 'DISPENSED') {
        throw new BadRequestException('Prescription has already been fully dispensed');
      }

      // 2. Create DispenseRecord header
      const dispenseNumber = `DISP-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const record = await tx.dispenseRecord.create({
        data: {
          facilityId,
          dispenseNumber,
          consultationId: rx.consultationId,
          patientId: rx.patientId,
          dispenseType: dto.dispenseType,
          destination: dto.destination || null,
          programName: dto.programName || null,
          dispenseDate: new Date(),
          dispenseTime: new Date().toLocaleTimeString('en-US', { hour12: false }),
          dispensedById: userId,
          notes: dto.notes || null,
          status: 'COMPLETED'
        }
      });

      // 3. Process each line
      for (const line of dto.lines) {
        // Resolve MedicationOrder
        const order = await tx.medicationOrder.findUnique({
          where: { id: line.medicationOrderId }
        });

        if (!order) {
          throw new NotFoundException(`Medication order ${line.medicationOrderId} not found`);
        }

        if (order.status === 'DISPENSED') {
          throw new BadRequestException(`Medication order for "${order.medicineName}" is already dispensed`);
        }

        // Resolve InventoryBatch
        const batch = await tx.inventoryBatch.findUnique({
          where: { id: line.batchId },
          include: {
            inventoryItem: true,
            product: true
          }
        });

        if (!batch) {
          throw new NotFoundException(`Inventory batch ${line.batchId} not found`);
        }

        const batchQtyBefore = Number(batch.quantityOnHand);
        if (batchQtyBefore < line.quantity) {
          throw new BadRequestException(`Insufficient stock in batch ${batch.batchNumber} (Available: ${batchQtyBefore}, Requested: ${line.quantity})`);
        }

        const batchQtyAfter = batchQtyBefore - line.quantity;

        // Decrement Batch Stock
        await tx.inventoryBatch.update({
          where: { id: batch.id },
          data: {
            quantityOnHand: batchQtyAfter
          }
        });

        // Decrement InventoryItem Stock
        const itemQtyBefore = Number(batch.inventoryItem.quantityOnHand);
        const itemQtyAfter = itemQtyBefore - line.quantity;
        await tx.inventoryItem.update({
          where: { id: batch.inventoryItemId },
          data: {
            quantityOnHand: itemQtyAfter,
            lastUpdated: new Date()
          }
        });

        // Create StockTransaction
        const txLog = await tx.stockTransaction.create({
          data: {
            facilityId,
            warehouseId: batch.warehouseId,
            binId: batch.binId,
            productId: line.productId,
            batchId: batch.id,
            transactionType: 'DISPENSE',
            quantity: line.quantity,
            quantityBefore: batchQtyBefore,
            quantityAfter: batchQtyAfter,
            patientId: rx.patientId,
            consultationId: rx.consultationId,
            transactionDate: new Date(),
            notes: `Dispensed for Patient: ${rx.patient.firstName} ${rx.patient.lastName} (Rx Token: ${rx.prescriptionToken})`,
            createdById: userId
          }
        });

        // Create DispenseLine
        await tx.dispenseLine.create({
          data: {
            dispenseRecordId: record.id,
            medicationOrderId: line.medicationOrderId,
            productId: line.productId,
            batchId: line.batchId,
            quantityDispensed: line.quantity,
            unitOfMeasure: batch.product?.unitOfMeasure || 'unit',
            dose: order.dose,
            frequency: order.frequency,
            duration: order.duration,
            instructions: order.instructions || '',
            stockBefore: batchQtyBefore,
            stockAfter: batchQtyAfter,
            stockTransactionId: txLog.id
          }
        });

        // Mark MedicationOrder as Dispensed
        await tx.medicationOrder.update({
          where: { id: line.medicationOrderId },
          data: { status: 'DISPENSED' }
        });
      }

      // 4. Update prescription status if all items are fully dispensed
      const pendingOrdersCount = await tx.medicationOrder.count({
        where: {
          prescriptionId: dto.prescriptionId,
          status: 'PENDING'
        }
      });

      if (pendingOrdersCount === 0) {
        await tx.prescription.update({
          where: { id: dto.prescriptionId },
          data: { status: 'DISPENSED' }
        });
      }

      return { success: true, dispenseNumber };
    });
  }
}
