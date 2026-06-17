import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { OrganizationsService } from './organizations.service.js';

@Controller('api/organizations/lookup')
export class OrganizationsLookupController {
  constructor(private service: OrganizationsService) {}

  @Get()
  async lookup(@Query('email') email: string) {
    if (!email) {
      throw new BadRequestException('Email query parameter is required');
    }
    return this.service.lookupTenantByEmail(email);
  }
}
