import { Controller, Get, Post, Put, Body, Param, Query, Req, UseGuards, BadRequestException } from '@nestjs/common';
import { PatientsService } from './patients.service.js';
import { StaffAuthGuard } from '../auth/staff-auth.guard.js';
import { RequirePermission } from '../auth/rbac.decorator.js';
import { Request } from 'express';

@Controller('api/patients')
@UseGuards(StaffAuthGuard)
export class PatientsController {
  constructor(private readonly service: PatientsService) {}

  @Post()
  @RequirePermission('patients', 'create')
  async create(
    @Body() body: any,
    @Req() req: Request & { session: any }
  ) {
    const facilityId = req.session.session.facilityId;
    if (!facilityId) {
      throw new BadRequestException('User is not associated with any facility');
    }

    const createdById = req.session.user.id;

    return this.service.create({
      ...body,
      facilityId,
      createdById
    });
  }

  @Get()
  @RequirePermission('patients', 'read')
  async findAll(
    @Query('search') search: string,
    @Req() req: Request & { session: any }
  ) {
    const facilityId = req.session.session.facilityId;
    if (!facilityId) {
      throw new BadRequestException('User is not associated with any facility');
    }

    return this.service.findAll(facilityId, search);
  }

  @Get(':id')
  @RequirePermission('patients', 'read')
  async findOne(
    @Param('id') id: string,
    @Req() req: Request & { session: any }
  ) {
    const facilityId = req.session.session.facilityId;
    if (!facilityId) {
      throw new BadRequestException('User is not associated with any facility');
    }

    return this.service.findOne(id, facilityId);
  }

  @Post(':id/merge')
  @RequirePermission('patients', 'update')
  async merge(
    @Param('id') id: string,
    @Body('targetPatientId') targetPatientId: string,
    @Req() req: Request & { session: any }
  ) {
    const facilityId = req.session.session.facilityId;
    if (!facilityId) {
      throw new BadRequestException('User is not associated with any facility');
    }

    return this.service.merge(id, targetPatientId, facilityId);
  }

  @Put(':id')
  @RequirePermission('patients', 'update')
  async update(
    @Param('id') id: string,
    @Body() body: any,
    @Req() req: Request & { session: any }
  ) {
    const facilityId = req.session.session.facilityId;
    if (!facilityId) {
      throw new BadRequestException('User is not associated with any facility');
    }

    return this.service.update(id, facilityId, body);
  }
}
