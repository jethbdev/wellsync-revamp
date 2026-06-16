import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { TenantPrismaClient } from '@healthbridge/database';
import { hashPassword } from 'better-auth/crypto';
import { randomUUID, randomBytes } from 'crypto';

export interface CreateStaffDto {
  firstName: string;
  lastName: string;
  email: string;
  roleName: string;
  facilityId?: string;
}

@Injectable()
export class StaffService {
  constructor(
    @Inject('PRISMA_CLIENT') private prisma: TenantPrismaClient
  ) {}

  async listStaff() {
    return this.prisma.user.findMany({
      where: { isActive: true },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        isFirstLogin: true,
        isActive: true,
        isAcceptingConsultations: true,
        facilityId: true,
        createdAt: true,
        role: { select: { id: true, name: true } },
        facility: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async createStaff(dto: CreateStaffDto) {
    // Check email uniqueness
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() }
    });
    if (existing) {
      throw new BadRequestException(`A user with email ${dto.email} already exists`);
    }

    // Resolve role
    const role = await this.prisma.role.findFirst({
      where: { name: dto.roleName }
    });
    if (!role) {
      throw new NotFoundException(`Role "${dto.roleName}" not found`);
    }

    // Generate temporary password
    const tempPassword = randomBytes(4).toString('hex'); // e.g. "a3f1b2c4"
    const passwordHash = await hashPassword(tempPassword);
    const userId = randomUUID();

    // Create User
    await this.prisma.user.create({
      data: {
        id: userId,
        email: dto.email.toLowerCase(),
        passwordHash,
        firstName: dto.firstName,
        lastName: dto.lastName,
        displayName: `${dto.firstName} ${dto.lastName}`,
        roleId: role.id,
        facilityId: dto.facilityId ?? null,
        isActive: true,
        isFirstLogin: true,
      },
    });

    // Create BetterAuth Account row
    await this.prisma.account.create({
      data: {
        id: randomUUID(),
        accountId: userId,
        providerId: 'credential',
        userId,
        password: passwordHash,
      },
    });

    return {
      userId,
      email: dto.email.toLowerCase(),
      firstName: dto.firstName,
      lastName: dto.lastName,
      roleName: dto.roleName,
      tempPassword,
    };
  }

  async updateStaff(userId: string, data: { roleName?: string; facilityId?: string; isActive?: boolean; isAcceptingConsultations?: boolean }) {
    const updateData: any = {};
    if (data.roleName !== undefined) {
      const role = await this.prisma.role.findFirst({ where: { name: data.roleName } });
      if (!role) {
        throw new NotFoundException(`Role "${data.roleName}" not found`);
      }
      updateData.roleId = role.id;
    }
    if (data.facilityId !== undefined) {
      updateData.facilityId = data.facilityId || null;
    }
    if (data.isActive !== undefined) {
      updateData.isActive = data.isActive;
    }
    if (data.isAcceptingConsultations !== undefined) {
      updateData.isAcceptingConsultations = data.isAcceptingConsultations;
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: { id: true, firstName: true, lastName: true, email: true, isActive: true, isAcceptingConsultations: true },
    });
  }

  async updateSelfAvailability(userId: string, isAccepting: boolean) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { isAcceptingConsultations: isAccepting },
      select: { id: true, firstName: true, lastName: true, isAcceptingConsultations: true }
    });
  }

  async deactivateStaff(userId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { isActive: false },
      select: { id: true, email: true },
    });
  }

  async listRoles() {
    return this.prisma.role.findMany({
      select: { id: true, name: true, description: true, scope: true, color: true, icon: true }
    });
  }
}
