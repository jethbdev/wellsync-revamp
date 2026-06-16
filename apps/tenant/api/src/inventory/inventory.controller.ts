import { Controller, Get, Post, Body, Req, UseGuards, BadRequestException } from '@nestjs/common';
import { InventoryService, ReceiveStockDto, DiscardStockDto } from './inventory.service.js';
import { StaffAuthGuard } from '../auth/staff-auth.guard.js';
import { RequirePermission } from '../auth/rbac.decorator.js';
import { Request } from 'express';

@Controller('api/inventory')
@UseGuards(StaffAuthGuard)
export class InventoryController {
  constructor(private readonly service: InventoryService) {}

  @Get('locations')
  @RequirePermission('inventory', 'read')
  async listLocations(@Req() req: Request & { session: any }) {
    const facilityId = req.session.session.facilityId;
    if (!facilityId) {
      throw new BadRequestException('User is not associated with any facility');
    }
    return this.service.listStorageLocations(facilityId);
  }

  @Post('locations')
  @RequirePermission('inventory', 'write')
  async createLocation(
    @Body('name') name: string,
    @Req() req: Request & { session: any }
  ) {
    const facilityId = req.session.session.facilityId;
    if (!facilityId) {
      throw new BadRequestException('User is not associated with any facility');
    }
    if (!name || name.trim() === '') {
      throw new BadRequestException('Storage location name is required');
    }
    return this.service.createStorageLocation(facilityId, name.trim());
  }

  @Post('bins/generate')
  @RequirePermission('inventory', 'write')
  async generateBins(
    @Body('warehouseId') warehouseId: string,
    @Body('shelvesCount') shelvesCount: number,
    @Body('binsPerShelf') binsPerShelf: number,
    @Req() req: Request & { session: any }
  ) {
    const facilityId = req.session.session.facilityId;
    if (!facilityId) {
      throw new BadRequestException('User is not associated with any facility');
    }
    if (!warehouseId) {
      throw new BadRequestException('warehouseId is required');
    }
    const shelves = Number(shelvesCount);
    const bins = Number(binsPerShelf);
    if (isNaN(shelves) || shelves <= 0 || isNaN(bins) || bins <= 0) {
      throw new BadRequestException('shelvesCount and binsPerShelf must be positive numbers');
    }
    return this.service.generateBins(facilityId, warehouseId, shelves, bins);
  }

  @Post('bins/quick-add')
  @RequirePermission('inventory', 'write')
  async quickAddBin(
    @Body('warehouseId') warehouseId: string,
    @Body('binCode') binCode: string,
    @Req() req: Request & { session: any }
  ) {
    const facilityId = req.session.session.facilityId;
    if (!facilityId) {
      throw new BadRequestException('User is not associated with any facility');
    }
    if (!warehouseId) {
      throw new BadRequestException('warehouseId is required');
    }
    if (!binCode || binCode.trim() === '') {
      throw new BadRequestException('binCode is required');
    }
    return this.service.quickAddBin(facilityId, warehouseId, binCode);
  }

  @Get('stock')
  @RequirePermission('inventory', 'read')
  async listStock(@Req() req: Request & { session: any }) {
    const facilityId = req.session.session.facilityId;
    if (!facilityId) {
      throw new BadRequestException('User is not associated with any facility');
    }
    return this.service.listStockLevels(facilityId);
  }

  @Post('receive')
  @RequirePermission('inventory', 'write')
  async receiveStock(
    @Body() dto: ReceiveStockDto,
    @Req() req: Request & { session: any }
  ) {
    const facilityId = req.session.session.facilityId;
    const userId = req.session.user.id;
    if (!facilityId) {
      throw new BadRequestException('User is not associated with any facility');
    }
    if (!dto.productId) {
      throw new BadRequestException('productId is required');
    }
    if (!dto.warehouseId) {
      throw new BadRequestException('warehouseId is required');
    }
    if (!dto.batchNumber || dto.batchNumber.trim() === '') {
      throw new BadRequestException('batchNumber is required');
    }
    if (typeof dto.quantity !== 'number' || dto.quantity <= 0) {
      throw new BadRequestException('quantity must be a positive number');
    }
    if (typeof dto.unitPrice !== 'number' || dto.unitPrice < 0) {
      throw new BadRequestException('unitPrice must be a non-negative number');
    }
    return this.service.receiveStock(facilityId, userId, dto);
  }

  @Post('discard')
  @RequirePermission('inventory', 'write')
  async discardStock(
    @Body() dto: DiscardStockDto,
    @Req() req: Request & { session: any }
  ) {
    const facilityId = req.session.session.facilityId;
    const userId = req.session.user.id;
    if (!facilityId) {
      throw new BadRequestException('User is not associated with any facility');
    }
    if (!dto.batchId) {
      throw new BadRequestException('batchId is required');
    }
    if (!dto.reason || dto.reason.trim() === '') {
      throw new BadRequestException('reason is required');
    }
    if (typeof dto.quantity !== 'number' || dto.quantity <= 0) {
      throw new BadRequestException('quantity must be a positive number');
    }
    return this.service.discardStock(facilityId, userId, dto);
  }

  @Get('ledger')
  @RequirePermission('inventory', 'read')
  async listLedger(@Req() req: Request & { session: any }) {
    const facilityId = req.session.session.facilityId;
    if (!facilityId) {
      throw new BadRequestException('User is not associated with any facility');
    }
    return this.service.listStockLedger(facilityId);
  }
}
