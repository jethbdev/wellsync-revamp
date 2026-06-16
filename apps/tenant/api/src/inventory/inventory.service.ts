import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { TenantPrismaClient } from '@healthbridge/database';

export interface ReceiveStockDto {
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

export interface DiscardStockDto {
  batchId: string;
  quantity: number;
  reason: string;
  witnessName?: string;
}

@Injectable()
export class InventoryService {
  constructor(
    @Inject('PRISMA_CLIENT') private prisma: TenantPrismaClient
  ) {}

  async listStorageLocations(facilityId: string) {
    return this.prisma.warehouse.findMany({
      where: { facilityId, isActive: true },
      include: {
        bins: {
          where: { isActive: true },
          orderBy: { binCode: 'asc' },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  async createStorageLocation(facilityId: string, name: string) {
    return this.prisma.warehouse.create({
      data: {
        facilityId,
        name,
        isActive: true,
        isDefault: false,
      },
    });
  }

  async generateBins(facilityId: string, warehouseId: string, shelvesCount: number, binsPerShelf: number) {
    const warehouse = await this.prisma.warehouse.findFirst({
      where: { id: warehouseId, facilityId },
    });
    if (!warehouse) {
      throw new NotFoundException('Storage location not found');
    }

    const createdBins = [];
    for (let shelf = 1; shelf <= shelvesCount; shelf++) {
      for (let binIdx = 1; binIdx <= binsPerShelf; binIdx++) {
        const binCode = `Shelf ${shelf} - Bin ${String.fromCharCode(64 + binIdx)}`;
        const bin = await this.prisma.storageBin.upsert({
          where: {
            warehouseId_binCode: { warehouseId, binCode },
          },
          update: { isActive: true },
          create: {
            warehouseId,
            binCode,
            description: `Auto-generated grid bin`,
            isActive: true,
          },
        });
        createdBins.push(bin);
      }
    }
    return createdBins;
  }

  async quickAddBin(facilityId: string, warehouseId: string, binCode: string) {
    const warehouse = await this.prisma.warehouse.findFirst({
      where: { id: warehouseId, facilityId },
    });
    if (!warehouse) {
      throw new NotFoundException('Storage location not found');
    }

    return this.prisma.storageBin.upsert({
      where: {
        warehouseId_binCode: { warehouseId, binCode: binCode.trim() },
      },
      update: { isActive: true },
      create: {
        warehouseId,
        binCode: binCode.trim(),
        description: 'Added on the fly',
        isActive: true,
      },
    });
  }

  async listStockLevels(facilityId: string) {
    return this.prisma.product.findMany({
      where: { isActive: true },
      include: {
        thresholds: {
          where: { facilityId },
        },
        inventoryItems: {
          where: { facilityId },
          include: {
            warehouse: true,
            batches: {
              where: { quantityOnHand: { gt: 0 } },
              include: {
                bin: true,
                warehouse: true,
              },
              orderBy: { expiryDate: 'asc' }, // FEFO order
            },
          },
        },
      },
      orderBy: { genericName: 'asc' },
    });
  }

  async receiveStock(facilityId: string, userId: string, dto: ReceiveStockDto) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Resolve product
      const product = await tx.product.findUnique({
        where: { id: dto.productId },
      });
      if (!product) {
        throw new NotFoundException('Product not found');
      }

      // 2. Resolve warehouse
      const warehouse = await tx.warehouse.findFirst({
        where: { id: dto.warehouseId, facilityId },
      });
      if (!warehouse) {
        throw new NotFoundException('Storage location not found');
      }

      // 3. Resolve bin if provided
      if (dto.binId) {
        const bin = await tx.storageBin.findFirst({
          where: { id: dto.binId, warehouseId: dto.warehouseId },
        });
        if (!bin) {
          throw new NotFoundException('Bin location not found in the selected storage area');
        }
      }

      // 4. Find or create InventoryItem
      let inventoryItem = await tx.inventoryItem.findUnique({
        where: {
          warehouseId_productId: {
            warehouseId: dto.warehouseId,
            productId: dto.productId,
          },
        },
      });

      if (!inventoryItem) {
        inventoryItem = await tx.inventoryItem.create({
          data: {
            facilityId,
            warehouseId: dto.warehouseId,
            productId: dto.productId,
            quantityOnHand: 0,
          },
        });
      }

      // 5. Find or create InventoryBatch
      let batch = await tx.inventoryBatch.findFirst({
        where: {
          inventoryItemId: inventoryItem.id,
          batchNumber: dto.batchNumber.trim(),
          binId: dto.binId || null,
        },
      });

      if (!batch) {
        batch = await tx.inventoryBatch.create({
          data: {
            inventoryItemId: inventoryItem.id,
            warehouseId: dto.warehouseId,
            productId: dto.productId,
            batchNumber: dto.batchNumber.trim(),
            binId: dto.binId || null,
            quantityOnHand: 0,
            expiryDate: dto.expiryDate ? new Date(dto.expiryDate) : null,
            manufacturedDate: dto.manufacturedDate ? new Date(dto.manufacturedDate) : null,
            unitPrice: dto.unitPrice,
            fundingSource: dto.fundingSource || null,
            storageLocation: dto.storageLocationString || null,
            status: 'ACTIVE',
            createdById: userId,
          },
        });
      }

      const batchQtyBefore = Number(batch.quantityOnHand);
      const batchQtyAfter = batchQtyBefore + dto.quantity;

      // 6. Update batch quantity
      await tx.inventoryBatch.update({
        where: { id: batch.id },
        data: {
          quantityOnHand: batchQtyAfter,
        },
      });

      // 7. Update inventory item quantity
      const itemQtyBefore = Number(inventoryItem.quantityOnHand);
      const itemQtyAfter = itemQtyBefore + dto.quantity;
      await tx.inventoryItem.update({
        where: { id: inventoryItem.id },
        data: {
          quantityOnHand: itemQtyAfter,
          lastUpdated: new Date(),
        },
      });

      // 8. Log the StockTransaction
      await tx.stockTransaction.create({
        data: {
          facilityId,
          warehouseId: dto.warehouseId,
          binId: dto.binId || null,
          productId: dto.productId,
          batchId: batch.id,
          transactionType: 'RECEIVE',
          quantity: dto.quantity,
          quantityBefore: batchQtyBefore,
          quantityAfter: batchQtyAfter,
          transactionDate: new Date(),
          notes: `Received stock delivery. Cost: ₱${Number(dto.unitPrice).toFixed(2)}`,
          createdById: userId,
        },
      });

      return { success: true, batchId: batch.id };
    });
  }

  async discardStock(facilityId: string, userId: string, dto: DiscardStockDto) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Fetch batch
      const batch = await tx.inventoryBatch.findUnique({
        where: { id: dto.batchId },
        include: {
          inventoryItem: true,
        },
      });

      if (!batch) {
        throw new NotFoundException('Batch not found');
      }

      if (batch.warehouseId !== batch.inventoryItem.warehouseId) {
        throw new BadRequestException('Data mismatch: Batch warehouse does not match InventoryItem warehouse');
      }

      const batchQtyBefore = Number(batch.quantityOnHand);
      if (batchQtyBefore < dto.quantity) {
        throw new BadRequestException(`Insufficient quantity on hand (Available: ${batchQtyBefore}, Requested: ${dto.quantity})`);
      }

      const batchQtyAfter = batchQtyBefore - dto.quantity;

      // 2. Update batch quantity
      await tx.inventoryBatch.update({
        where: { id: batch.id },
        data: {
          quantityOnHand: batchQtyAfter,
        },
      });

      // 3. Update inventory item quantity
      const itemQtyBefore = Number(batch.inventoryItem.quantityOnHand);
      const itemQtyAfter = itemQtyBefore - dto.quantity;
      await tx.inventoryItem.update({
        where: { id: batch.inventoryItemId },
        data: {
          quantityOnHand: itemQtyAfter,
          lastUpdated: new Date(),
        },
      });

      // 4. Log the StockTransaction
      await tx.stockTransaction.create({
        data: {
          facilityId,
          warehouseId: batch.warehouseId,
          binId: batch.binId,
          productId: batch.productId,
          batchId: batch.id,
          transactionType: 'DISPOSAL',
          quantity: dto.quantity,
          quantityBefore: batchQtyBefore,
          quantityAfter: batchQtyAfter,
          transactionDate: new Date(),
          notes: `Discarded stock. Reason: ${dto.reason}. Witness: ${dto.witnessName || 'None'}`,
          createdById: userId,
        },
      });

      return { success: true };
    });
  }

  async listStockLedger(facilityId: string) {
    return this.prisma.stockTransaction.findMany({
      where: { facilityId },
      include: {
        product: true,
        warehouse: true,
        bin: true,
        batch: true,
        creator: {
          select: {
            firstName: true,
            lastName: true,
            displayName: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
