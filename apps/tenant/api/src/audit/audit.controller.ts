import { Controller, Get, Req, UseGuards, BadRequestException, Inject } from '@nestjs/common';
import { StaffAuthGuard } from '../auth/staff-auth.guard.js';
import { RequirePermission } from '../auth/rbac.decorator.js';
import { Request } from 'express';
import { TenantPrismaClient } from '@healthbridge/database';

@Controller('api/audit-logs')
@UseGuards(StaffAuthGuard)
export class AuditController {
  constructor(
    @Inject('PRISMA_CLIENT') private prisma: TenantPrismaClient
  ) {}

  @Get()
  @RequirePermission('audit', 'view')
  async getTimeline(@Req() req: Request & { session: any }) {
    const facilityId = req.session.session.facilityId;
    if (!facilityId) {
      throw new BadRequestException('User is not associated with any facility');
    }

    const logs = await this.prisma.auditLog.findMany({
      where: { facilityId },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 50
    });

    // Handle BigInt serialization for log ID
    return logs.map(log => ({
      ...log,
      id: log.id.toString()
    }));
  }
}
