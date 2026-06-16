import { Controller, Get, Post, Body, Param, Put, UseGuards } from '@nestjs/common';
import { OrganizationsService } from './organizations.service.js';
import { OpsAuthGuard } from '../auth/ops.guard.js';

@Controller('api/organizations')
@UseGuards(OpsAuthGuard)
export class OrganizationsController {
  constructor(private service: OrganizationsService) {}

  @Post()
  create(@Body() body: { name: string; slug: string; type: string; billingEmail?: string }) {
    return this.service.create(body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id/metrics')
  getMetrics(@Param('id') id: string) {
    return this.service.getMetrics(id);
  }

  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.service.updateStatus(id, body.status);
  }

  @Post(':id/feature-flags')
  toggleFeatureFlag(@Param('id') id: string, @Body() body: { featureKey: string; isEnabled: boolean }) {
    return this.service.toggleFeatureFlag(id, body.featureKey, body.isEnabled);
  }

  @Put(':id/branding')
  updateBranding(@Param('id') id: string, @Body() body: { primaryColor: string; secondaryColor: string; logoUrl?: string }) {
    return this.service.updateBranding(id, body);
  }

  @Put(':id/domain')
  updateDomain(@Param('id') id: string, @Body() body: { customDomain: string }) {
    return this.service.updateDomain(id, body);
  }
}
