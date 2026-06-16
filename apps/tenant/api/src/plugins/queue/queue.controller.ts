import { Controller, Get, Post, Body, Param, Req, UseGuards, BadRequestException, Query } from '@nestjs/common';
import { QueueService } from './queue.service.js';
import { StaffAuthGuard } from '../../auth/staff-auth.guard.js';
import { RequirePermission } from '../../auth/rbac.decorator.js';
import { Request } from 'express';

@Controller('api/queue')
export class QueueController {
  constructor(private readonly service: QueueService) {}

  @Get('public')
  async getPublicQueue(
    @Query('facilityId') facilityId: string,
    @Query('doctorId') doctorId?: string
  ) {
    if (!facilityId) {
      throw new BadRequestException('facilityId query parameter is required');
    }
    return this.service.getPublicQueue(facilityId, doctorId || undefined);
  }

  @Get()
  @UseGuards(StaffAuthGuard)
  @RequirePermission('schedules', 'read')
  async getActiveQueue(
    @Query('doctorId') doctorId: string,
    @Req() req: Request & { session: any }
  ) {
    const facilityId = req.session.session.facilityId;
    if (!facilityId) {
      throw new BadRequestException('User is not associated with any facility');
    }
    return this.service.getActiveQueue(facilityId, doctorId || undefined);
  }

  @Post(':id/call')
  @UseGuards(StaffAuthGuard)
  @RequirePermission('schedules', 'manage')
  async call(
    @Param('id') id: string,
    @Body() body: { calledRoom: string },
    @Req() req: Request & { session: any }
  ) {
    const facilityId = req.session.session.facilityId;
    if (!facilityId) {
      throw new BadRequestException('User is not associated with any facility');
    }
    if (!body.calledRoom) {
      throw new BadRequestException('calledRoom is required');
    }
    return this.service.callTicket(id, facilityId, body.calledRoom);
  }

  @Post(':id/complete')
  @UseGuards(StaffAuthGuard)
  @RequirePermission('schedules', 'manage')
  async complete(
    @Param('id') id: string,
    @Req() req: Request & { session: any }
  ) {
    const facilityId = req.session.session.facilityId;
    if (!facilityId) {
      throw new BadRequestException('User is not associated with any facility');
    }
    return this.service.completeTicket(id, facilityId);
  }

  @Post(':id/skip')
  @UseGuards(StaffAuthGuard)
  @RequirePermission('schedules', 'manage')
  async skip(
    @Param('id') id: string,
    @Req() req: Request & { session: any }
  ) {
    const facilityId = req.session.session.facilityId;
    if (!facilityId) {
      throw new BadRequestException('User is not associated with any facility');
    }
    return this.service.skipTicket(id, facilityId);
  }

  @Post('walk-in')
  @UseGuards(StaffAuthGuard)
  @RequirePermission('schedules', 'manage')
  async createWalkIn(
    @Body() body: { patientId: string; doctorId?: string },
    @Req() req: Request & { session: any }
  ) {
    const facilityId = req.session.session.facilityId;
    if (!facilityId) {
      throw new BadRequestException('User is not associated with any facility');
    }
    if (!body.patientId) {
      throw new BadRequestException('patientId is required');
    }
    return this.service.createWalkIn(body.patientId, facilityId, body.doctorId);
  }
}
