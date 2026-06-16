import { Controller, Get, Post, Body, Param, Req, UseGuards, BadRequestException } from '@nestjs/common';
import { HouseholdsService } from './households.service.js';
import { StaffAuthGuard } from '../auth/staff-auth.guard.js';
import { RequirePermission } from '../auth/rbac.decorator.js';
import { Request } from 'express';

@Controller('api')
@UseGuards(StaffAuthGuard)
export class HouseholdsController {
  constructor(private readonly service: HouseholdsService) {}

  @Post('households')
  @RequirePermission('patients', 'create')
  async createHousehold(
    @Body() body: { address: string; barangayCode: string; householdCode?: string },
    @Req() req: Request & { session: any }
  ) {
    const facilityId = req.session.session.facilityId;
    if (!facilityId) {
      throw new BadRequestException('User is not associated with any facility');
    }

    return this.service.createHousehold({
      ...body,
      facilityId
    });
  }

  @Post('patients/:id/relationships')
  @RequirePermission('patients', 'update')
  async addRelationship(
    @Param('id') id: string,
    @Body() body: { relatedPatientId: string; relationshipType: string; householdId?: string; isHead?: boolean }
  ) {
    return this.service.addRelationship({
      patientId: id,
      ...body
    });
  }

  @Get('patients/:id/family-tree')
  @RequirePermission('patients', 'read')
  async getFamilyTree(@Param('id') id: string) {
    return this.service.getFamilyTree(id);
  }
}
