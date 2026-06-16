import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { TenantPrismaClient } from '@healthbridge/database';
import { hashPassword } from 'better-auth/crypto';

@Injectable()
export class ProfileService {
  constructor(
    @Inject('PRISMA_CLIENT') private prisma: TenantPrismaClient
  ) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        displayName: true,
        contactNumber: true,
        image: true,
        mfaEnabled: true,
        role: { select: { id: true, name: true } },
        facility: { select: { id: true, name: true } },
      },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async updateProfile(userId: string, data: { firstName?: string; lastName?: string; displayName?: string; contactNumber?: string; image?: string }) {
    const updateData: any = {};
    if (data.firstName !== undefined) updateData.firstName = data.firstName;
    if (data.lastName !== undefined) updateData.lastName = data.lastName;
    if (data.displayName !== undefined) updateData.displayName = data.displayName;
    if (data.contactNumber !== undefined) updateData.contactNumber = data.contactNumber;
    if (data.image !== undefined) updateData.image = data.image;

    return this.prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        displayName: true,
        contactNumber: true,
        image: true,
      },
    });
  }

  async changePassword(userId: string, newPassword?: string) {
    if (!newPassword || newPassword.length < 6) {
      throw new BadRequestException('New password must be at least 6 characters long');
    }

    const passwordHash = await hashPassword(newPassword);

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: userId },
        data: { passwordHash },
      }),
      this.prisma.account.updateMany({
        where: { userId, providerId: 'credential' },
        data: { password: passwordHash },
      }),
    ]);

    return { success: true };
  }
}
