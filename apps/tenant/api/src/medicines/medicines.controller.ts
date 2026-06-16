import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { MedicinesService } from './medicines.service.js';
import { StaffAuthGuard } from '../auth/staff-auth.guard.js';

@Controller('api/medicines')
@UseGuards(StaffAuthGuard)
export class MedicinesController {
  constructor(private readonly service: MedicinesService) {}

  @Get()
  async search(
    @Query('search') search: string,
    @Query('limit') limitStr?: string
  ) {
    const limit = limitStr ? parseInt(limitStr, 10) : 50;
    return this.service.search(search, limit);
  }
}
