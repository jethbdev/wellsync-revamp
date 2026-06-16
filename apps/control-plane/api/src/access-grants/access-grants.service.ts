import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class AccessGrantsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: { orgId: string; reason: string; scope: string; durationHours: number }) {
    return this.prisma.cpTempAccessGrant.create({
      data: {
        orgId: data.orgId,
        requestedBy: userId,
        reason: data.reason,
        scope: data.scope,
        durationHours: data.durationHours,
        status: 'PENDING'
      }
    });
  }

  async findAll() {
    return this.prisma.cpTempAccessGrant.findMany({
      include: {
        organization: true
      },
      orderBy: { requestedAt: 'desc' }
    });
  }

  async approve(id: string, adminName: string) {
    const grant = await this.prisma.cpTempAccessGrant.findUnique({
      where: { id }
    });
    if (!grant) {
      throw new NotFoundException('Access grant not found');
    }

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + grant.durationHours);

    return this.prisma.cpTempAccessGrant.update({
      where: { id },
      data: {
        status: 'APPROVED',
        approvedAt: new Date(),
        approvedBy: adminName,
        expiresAt
      }
    });
  }

  async deny(id: string) {
    return this.prisma.cpTempAccessGrant.update({
      where: { id },
      data: {
        status: 'DENIED'
      }
    });
  }
}
