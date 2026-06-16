import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class AuditLogsService {
  constructor(private prisma: PrismaService) {}

  async getTimeline() {
    const orgs = await this.prisma.cpOrganization.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20
    });

    const grants = await this.prisma.cpTempAccessGrant.findMany({
      include: { organization: true },
      orderBy: { requestedAt: 'desc' },
      take: 20
    });

    const timeline = [];

    // Map organization creations
    for (const org of orgs) {
      timeline.push({
        timestamp: org.createdAt,
        actor: 'Root Admin',
        action: 'ONBOARD_ORGANIZATION',
        target: org.name,
        details: `Provisioned database for organization: ${org.name} (${org.slug})`,
        ip: '127.0.0.1'
      });
    }

    // Map access grants
    for (const grant of grants) {
      timeline.push({
        timestamp: grant.requestedAt,
        actor: 'Support Agent',
        action: 'REQUEST_TEMP_ACCESS',
        target: grant.organization.name,
        details: `Requested ${grant.durationHours}h access. Reason: ${grant.reason}`,
        ip: '127.0.0.1'
      });

      if (grant.status === 'APPROVED') {
        timeline.push({
          timestamp: grant.approvedAt || grant.requestedAt,
          actor: grant.approvedBy || 'Root Admin',
          action: 'APPROVE_TEMP_ACCESS',
          target: grant.organization.name,
          details: `Approved temporary support access grant (${grant.scope})`,
          ip: '127.0.0.1'
        });
      } else if (grant.status === 'DENIED') {
        timeline.push({
          timestamp: grant.requestedAt,
          actor: 'Root Admin',
          action: 'DENY_TEMP_ACCESS',
          target: grant.organization.name,
          details: `Denied temporary support access request`,
          ip: '127.0.0.1'
        });
      }
    }

    // Sort by timestamp desc
    return timeline
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 30);
  }
}
