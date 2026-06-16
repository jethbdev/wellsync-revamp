import { Controller, Get, Post, Body, Param, Put, UseGuards, Req } from '@nestjs/common';
import { AccessGrantsService } from './access-grants.service.js';
import { OpsAuthGuard } from '../auth/ops.guard.js';

@Controller('api/temp-access-grants')
@UseGuards(OpsAuthGuard)
export class AccessGrantsController {
  constructor(private service: AccessGrantsService) {}

  @Post()
  create(@Req() req: any, @Body() body: { orgId: string; reason: string; scope: string; durationHours: number }) {
    const userId = req.session.user.id;
    return this.service.create(userId, body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Put(':id/approve')
  approve(@Req() req: any, @Param('id') id: string) {
    const adminName = req.session.user.name || 'Ops Admin';
    return this.service.approve(id, adminName);
  }

  @Put(':id/deny')
  deny(@Param('id') id: string) {
    return this.service.deny(id);
  }
}
