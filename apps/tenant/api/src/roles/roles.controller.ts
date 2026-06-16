import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { RolesService, CreateRoleDto, UpdateRoleDto } from './roles.service.js';
import { StaffAuthGuard } from '../auth/staff-auth.guard.js';
import { RequirePermission } from '../auth/rbac.decorator.js';

@Controller('api/roles')
@UseGuards(StaffAuthGuard)
export class RolesController {
  constructor(private readonly service: RolesService) {}

  @Get()
  @RequirePermission('roles', 'manage')
  list() {
    return this.service.listRoles();
  }

  @Get(':id')
  @RequirePermission('roles', 'manage')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @RequirePermission('roles', 'manage')
  create(@Body() body: CreateRoleDto) {
    return this.service.createRole(body);
  }

  @Put(':id')
  @RequirePermission('roles', 'manage')
  update(@Param('id') id: string, @Body() body: UpdateRoleDto) {
    return this.service.updateRole(id, body);
  }

  @Delete(':id')
  @RequirePermission('roles', 'manage')
  delete(@Param('id') id: string) {
    return this.service.deleteRole(id);
  }
}
