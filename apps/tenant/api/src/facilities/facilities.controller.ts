import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { FacilitiesService, CreateFacilityDto, UpdateFacilityDto } from './facilities.service.js';
import { StaffAuthGuard } from '../auth/staff-auth.guard.js';
import { RequirePermission } from '../auth/rbac.decorator.js';

@Controller('api/facilities')
@UseGuards(StaffAuthGuard)
export class FacilitiesController {
  constructor(private readonly service: FacilitiesService) {}

  @Get()
  @RequirePermission('facilities', 'read')
  list() {
    return this.service.listFacilities();
  }

  @Get(':id')
  @RequirePermission('facilities', 'read')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @RequirePermission('facilities', 'create')
  create(@Body() body: CreateFacilityDto) {
    return this.service.createFacility(body);
  }

  @Put(':id')
  @RequirePermission('facilities', 'update')
  update(@Param('id') id: string, @Body() body: UpdateFacilityDto) {
    return this.service.updateFacility(id, body);
  }

  @Delete(':id')
  @RequirePermission('facilities', 'update')
  delete(@Param('id') id: string) {
    return this.service.deleteFacility(id);
  }
}
