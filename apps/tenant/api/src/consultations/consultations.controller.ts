import { Controller, Get, Post, Put, Body, Param, Req, UseGuards, BadRequestException } from '@nestjs/common';
import { ConsultationsService } from './consultations.service.js';
import { StaffAuthGuard } from '../auth/staff-auth.guard.js';
import { RequirePermission } from '../auth/rbac.decorator.js';
import { Request } from 'express';

@Controller('api/consultations')
@UseGuards(StaffAuthGuard)
export class ConsultationsController {
  constructor(private readonly service: ConsultationsService) {}

  @Post()
  @RequirePermission('consultations', 'create')
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

  @Put(':id')
  @RequirePermission('consultations', 'update')
  async update(
    @Param('id') id: string,
    @Body() body: any,
    @Req() req: Request & { session: any }
  ) {
    const facilityId = req.session.session.facilityId;
    if (!facilityId) {
      throw new BadRequestException('User is not associated with any facility');
    }

    return this.service.update(id, body, facilityId);
  }

  @Post(':id/vitals')
  @RequirePermission('vitals', 'enter')
  async addVitals(
    @Param('id') id: string,
    @Body() body: any,
    @Req() req: Request & { session: any }
  ) {
    const facilityId = req.session.session.facilityId;
    if (!facilityId) {
      throw new BadRequestException('User is not associated with any facility');
    }
    const createdById = req.session.user.id;

    return this.service.addVitals(id, body, facilityId, createdById);
  }

  @Post(':id/physical-exams')
  @RequirePermission('consultations', 'update')
  async addPhysicalExam(
    @Param('id') id: string,
    @Body() body: any,
    @Req() req: Request & { session: any }
  ) {
    const facilityId = req.session.session.facilityId;
    if (!facilityId) {
      throw new BadRequestException('User is not associated with any facility');
    }
    const createdById = req.session.user.id;

    return this.service.addPhysicalExam(id, body, facilityId, createdById);
  }

  @Post(':id/diagnoses')
  @RequirePermission('consultations', 'update')
  async addDiagnosis(
    @Param('id') id: string,
    @Body() body: any,
    @Req() req: Request & { session: any }
  ) {
    const facilityId = req.session.session.facilityId;
    if (!facilityId) {
      throw new BadRequestException('User is not associated with any facility');
    }
    const createdById = req.session.user.id;

    return this.service.addDiagnosis(id, body, facilityId, createdById);
  }

  @Post(':id/prescriptions')
  @RequirePermission('prescriptions', 'create')
  async addPrescription(
    @Param('id') id: string,
    @Body() body: any,
    @Req() req: Request & { session: any }
  ) {
    const facilityId = req.session.session.facilityId;
    if (!facilityId) {
      throw new BadRequestException('User is not associated with any facility');
    }
    const createdById = req.session.user.id;

    return this.service.addPrescription(id, body, facilityId, createdById);
  }

  @Post(':id/complete')
  @RequirePermission('consultations', 'update')
  async complete(
    @Param('id') id: string,
    @Req() req: Request & { session: any }
  ) {
    const facilityId = req.session.session.facilityId;
    if (!facilityId) {
      throw new BadRequestException('User is not associated with any facility');
    }

    return this.service.complete(id, facilityId);
  }

  @Get(':id')
  @RequirePermission('consultations', 'read')
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
}
