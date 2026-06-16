import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards, UnauthorizedException } from '@nestjs/common';
import { StaffService, CreateStaffDto } from './staff.service.js';
import { StaffAuthGuard } from '../auth/staff-auth.guard.js';
import { RequirePermission } from '../auth/rbac.decorator.js';

@Controller('api/staff')
@UseGuards(StaffAuthGuard)
export class StaffController {
  constructor(private readonly service: StaffService) {}

  @Get()
  @RequirePermission('users', 'read')
  list() {
    return this.service.listStaff();
  }

  @Post()
  @RequirePermission('users', 'create')
  create(@Body() body: CreateStaffDto) {
    return this.service.createStaff(body);
  }

  @Put('self/availability')
  updateSelfAvailability(@Req() req: any, @Body() body: { isAcceptingConsultations: boolean }) {
    const userId = req.session?.user?.id;
    if (!userId) {
      throw new UnauthorizedException('User session not found');
    }
    return this.service.updateSelfAvailability(userId, body.isAcceptingConsultations);
  }

  @Put(':id')
  @RequirePermission('users', 'update')
  update(@Param('id') id: string, @Body() body: { roleName?: string; facilityId?: string; isActive?: boolean; isAcceptingConsultations?: boolean }) {
    return this.service.updateStaff(id, body);
  }

  @Delete(':id')
  @RequirePermission('users', 'delete')
  deactivate(@Param('id') id: string) {
    return this.service.deactivateStaff(id);
  }

  @Get('roles')
  @RequirePermission('users', 'read')
  roles() {
    return this.service.listRoles();
  }
}
