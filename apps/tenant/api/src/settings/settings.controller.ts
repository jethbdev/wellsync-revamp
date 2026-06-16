import { Controller, Get, Put, Body, Req, UseGuards, ForbiddenException, BadRequestException } from '@nestjs/common';
import { SettingsService } from './settings.service.js';
import { StaffAuthGuard } from '../auth/staff-auth.guard.js';
import { getTenantSlug } from '../auth/tenant-auth-resolver.js';
import { Request } from 'express';

@Controller('api/organization/settings')
@UseGuards(StaffAuthGuard)
export class SettingsController {
  constructor(private readonly service: SettingsService) {}

  private verifyAdmin(req: Request & { session: any }) {
    const roleName = req.session.session?.roleName;
    if (roleName !== 'System Admin') {
      throw new ForbiddenException('Only System Admins can manage organization settings');
    }
    const orgId = req.session.session?.orgId;
    if (!orgId) {
      throw new BadRequestException('Organization identifier missing from session');
    }
    return orgId;
  }

  @Get()
  async getSettings(@Req() req: Request & { session: any }) {
    const orgId = this.verifyAdmin(req);
    const tenantSlug = getTenantSlug(req);
    if (!tenantSlug) {
      throw new BadRequestException('Tenant slug could not be determined');
    }
    return this.service.getSettings(orgId, tenantSlug);
  }

  @Put()
  async updateSettings(
    @Req() req: Request & { session: any },
    @Body() body: {
      name?: string;
      billingEmail?: string;
      type?: string;
      allowCrossOrgReferrals?: boolean;
      referralCapacityStatus?: string;
      referralGeographicScope?: string;
      acceptedReferralTypes?: string;
      billingPlan?: string;
    }
  ) {
    const orgId = this.verifyAdmin(req);
    const tenantSlug = getTenantSlug(req);
    if (!tenantSlug) {
      throw new BadRequestException('Tenant slug could not be determined');
    }
    return this.service.updateSettings(orgId, tenantSlug, body);
  }
}
