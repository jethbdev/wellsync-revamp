import { Controller, Get, Post, Param, Req, UseGuards, BadRequestException, ForbiddenException } from '@nestjs/common';
import { StaffAuthGuard } from '../auth/staff-auth.guard.js';
import { Request } from 'express';
import { TenantPrismaClient } from '@healthbridge/database';
import { Inject } from '@nestjs/common';

@Controller('api/plugins')
@UseGuards(StaffAuthGuard)
export class PluginsController {
  constructor(
    @Inject('PRISMA_CLIENT') private prisma: TenantPrismaClient
  ) {}

  private checkAdmin(req: Request & { session: any }) {
    if (req.session?.session?.roleName !== 'System Admin') {
      throw new ForbiddenException('Only System Admin can access or manage plugins');
    }
  }

  @Get()
  async list(@Req() req: Request & { session: any }) {
    this.checkAdmin(req);
    const orgId = req.session.session.orgId;
    if (!orgId) {
      throw new BadRequestException('Organization context not found in session');
    }

    const installed = await this.prisma.installedPlugin.findMany({
      where: { orgId }
    });

    const directory = [
      { id: 'sms-reminders', name: 'SMS Reminders & Notifications', version: '1.0.0', description: 'Sends automated SMS reminders to patients' },
      { id: 'teleconsultation', name: 'Teleconsultation Suite', version: '1.0.0', description: 'Enables secure video consultations, virtual waiting rooms, and passcode-based remote call controls.' },
      { id: 'queue-management', name: 'Queue Management System', version: '1.0.0', description: 'Manages walk-in and appointment queues, generates tickets, and runs public waiting display board with TTS notifications.' },
      { id: 'clinical-inventory', name: 'Clinical Inventory Management', version: '1.0.0', description: 'Monitor dispensary shelf stock levels, expiration dates, and storage coordinates.' }
    ];

    return directory.map(plugin => {
      const match = installed.find(i => i.pluginId === plugin.id);
      return {
        ...plugin,
        installed: !!match,
        isActive: match ? match.isActive : false,
        config: match ? match.config : {}
      };
    });
  }

  @Post(':pluginId/install')
  async install(
    @Param('pluginId') pluginId: string,
    @Req() req: Request & { session: any }
  ) {
    this.checkAdmin(req);
    const orgId = req.session.session.orgId;
    const facilityId = req.session.session.facilityId;
    const userId = req.session.user.id;

    if (!orgId) {
      throw new BadRequestException('Organization context not found in session');
    }

    // Check if already installed
    const existing = await this.prisma.installedPlugin.findFirst({
      where: { orgId, pluginId }
    });

    if (existing) {
      throw new BadRequestException('Plugin is already installed');
    }

    return this.prisma.installedPlugin.create({
      data: {
        orgId,
        facilityId,
        pluginId,
        installedById: userId,
        isActive: true,
        config: {}
      }
    });
  }

  @Post(':pluginId/toggle')
  async toggle(
    @Param('pluginId') pluginId: string,
    @Req() req: Request & { session: any }
  ) {
    this.checkAdmin(req);
    const orgId = req.session.session.orgId;
    if (!orgId) {
      throw new BadRequestException('Organization context not found in session');
    }

    const existing = await this.prisma.installedPlugin.findFirst({
      where: { orgId, pluginId }
    });

    if (!existing) {
      throw new BadRequestException('Plugin is not installed');
    }

    return this.prisma.installedPlugin.update({
      where: { id: existing.id },
      data: { isActive: !existing.isActive }
    });
  }
}
