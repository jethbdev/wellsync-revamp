import { Controller, Get, Req, Query, UseGuards, BadRequestException } from '@nestjs/common';
import { ReportsService } from './reports.service.js';
import { StaffAuthGuard } from '../auth/staff-auth.guard.js';
import { RequirePermission } from '../auth/rbac.decorator.js';
import { Request } from 'express';

@Controller('api/reports')
@UseGuards(StaffAuthGuard)
export class ReportsController {
  constructor(private readonly service: ReportsService) {}

  @Get('summary')
  @RequirePermission('reports', 'read')
  async getSummary(@Req() req: Request & { session: any }) {
    const facilityId = req.session.session.facilityId;
    if (!facilityId) {
      throw new BadRequestException('User is not associated with any facility');
    }

    return this.service.getSummary(facilityId);
  }

  @Get('patients')
  @RequirePermission('reports', 'read')
  async getPatientsReport(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Req() req: Request & { session: any }
  ) {
    const facilityId = req.session.session.facilityId;
    if (!facilityId) throw new BadRequestException('User is not associated with any facility');
    return this.service.getPatientsReport(facilityId, startDate, endDate);
  }

  @Get('appointments')
  @RequirePermission('reports', 'read')
  async getAppointmentsReport(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Req() req: Request & { session: any }
  ) {
    const facilityId = req.session.session.facilityId;
    if (!facilityId) throw new BadRequestException('User is not associated with any facility');
    return this.service.getAppointmentsReport(facilityId, startDate, endDate);
  }

  @Get('consultations')
  @RequirePermission('reports', 'read')
  async getConsultationsReport(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Req() req: Request & { session: any }
  ) {
    const facilityId = req.session.session.facilityId;
    if (!facilityId) throw new BadRequestException('User is not associated with any facility');
    return this.service.getConsultationsReport(facilityId, startDate, endDate);
  }

  @Get('prescriptions')
  @RequirePermission('reports', 'read')
  async getPrescriptionsReport(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Req() req: Request & { session: any }
  ) {
    const facilityId = req.session.session.facilityId;
    if (!facilityId) throw new BadRequestException('User is not associated with any facility');
    return this.service.getPrescriptionsReport(facilityId, startDate, endDate);
  }
}
