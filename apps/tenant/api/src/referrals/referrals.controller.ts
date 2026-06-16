import { Controller, Get, Post, Body, Param, Req, UseGuards, BadRequestException } from '@nestjs/common';
import { ReferralsService } from './referrals.service.js';
import { StaffAuthGuard } from '../auth/staff-auth.guard.js';
import { RequirePermission } from '../auth/rbac.decorator.js';
import { Request } from 'express';

@Controller('api')
@UseGuards(StaffAuthGuard)
export class ReferralsController {
  constructor(private readonly service: ReferralsService) {}

  @Post('consultations/:consultationId/referrals')
  @RequirePermission('referrals', 'create')
  async create(
    @Param('consultationId') consultationId: string,
    @Body() body: any,
    @Req() req: Request & { session: any }
  ) {
    const facilityId = req.session.session.facilityId;
    if (!facilityId) {
      throw new BadRequestException('User is not associated with any facility');
    }
    const createdById = req.session.user.id;

    return this.service.create(consultationId, {
      ...body,
      referringFacilityId: facilityId,
      createdById
    });
  }

  @Get('referrals')
  @RequirePermission('consultations', 'read')
  async findAll(@Req() req: Request & { session: any }) {
    const facilityId = req.session.session.facilityId;
    if (!facilityId) {
      throw new BadRequestException('User is not associated with any facility');
    }

    return this.service.findAll(facilityId);
  }

  @Get('referrals/network-organizations')
  @RequirePermission('consultations', 'read')
  async findNetworkOrgs() {
    return this.service.findNetworkOrgs();
  }

  @Post('referrals/:id/accept')
  @RequirePermission('consultations', 'update')
  async accept(
    @Param('id') id: string,
    @Req() req: Request & { session: any }
  ) {
    const facilityId = req.session.session.facilityId;
    if (!facilityId) {
      throw new BadRequestException('User is not associated with any facility');
    }
    return this.service.accept(id, facilityId);
  }

  @Post('referrals/:id/decline')
  @RequirePermission('consultations', 'update')
  async decline(
    @Param('id') id: string,
    @Body() body: { reason: string }
  ) {
    if (!body.reason) {
      throw new BadRequestException('Decline reason is required');
    }
    return this.service.decline(id, body.reason);
  }

  @Post('referrals/:id/outcome')
  @RequirePermission('consultations', 'update')
  async saveOutcome(
    @Param('id') id: string,
    @Body() body: { notes: string }
  ) {
    if (!body.notes) {
      throw new BadRequestException('Outcome notes are required');
    }
    return this.service.saveOutcome(id, body.notes);
  }
}
