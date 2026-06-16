import { Controller, Get, Post, Body, Req, UseGuards, BadRequestException, Param } from '@nestjs/common';
import { AppointmentsService } from './appointments.service.js';
import { StaffAuthGuard } from '../auth/staff-auth.guard.js';
import { RequirePermission } from '../auth/rbac.decorator.js';
import { Request } from 'express';

@Controller('api/appointments')
@UseGuards(StaffAuthGuard)
export class AppointmentsController {
  constructor(private readonly service: AppointmentsService) {}

  @Post()
  @RequirePermission('schedules', 'manage')
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
  @RequirePermission('schedules', 'manage')
  async findAll(@Req() req: Request & { session: any }) {
    const facilityId = req.session.session.facilityId;
    if (!facilityId) {
      throw new BadRequestException('User is not associated with any facility');
    }

    return this.service.findAll(facilityId);
  }

  @Post(':id/check-in')
  @RequirePermission('schedules', 'manage')
  async checkIn(
    @Param('id') id: string,
    @Req() req: Request & { session: any }
  ) {
    const facilityId = req.session.session.facilityId;
    if (!facilityId) {
      throw new BadRequestException('User is not associated with any facility');
    }

    return this.service.checkIn(id, facilityId);
  }
}
