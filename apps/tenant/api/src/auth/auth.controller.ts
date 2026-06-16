import { Controller, All, Req, Res, BadRequestException, Post, Body, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { toNodeHandler } from 'better-auth/node';
import { getStaffAuthForRequest, getPatientAuthForRequest, getTenantPrisma } from './tenant-auth-resolver.js';
import { StaffAuthGuard } from './staff-auth.guard.js';
import { hashPassword } from 'better-auth/crypto';

@Controller('api/auth')
export class AuthController {
  @Post('staff/change-password-first')
  @UseGuards(StaffAuthGuard)
  async changePasswordFirst(@Req() req: any, @Body() body: { newPassword?: string }) {
    if (!body.newPassword || body.newPassword.length < 6) {
      throw new BadRequestException('Password must be at least 6 characters long');
    }

    try {
      const prisma = await getTenantPrisma(req);
      const userId = req.session.user.id;
      const passwordHash = await hashPassword(body.newPassword);

      await prisma.$transaction([
        prisma.user.update({
          where: { id: userId },
          data: {
            passwordHash,
            isFirstLogin: false,
          },
        }),
        prisma.account.updateMany({
          where: { userId, providerId: 'credential' },
          data: {
            password: passwordHash,
          },
        }),
      ]);

      return { success: true };
    } catch (e: any) {
      throw new BadRequestException(e.message);
    }
  }

  @All('staff/*')
  async handleStaffAuth(@Req() req: Request, @Res() res: Response) {
    try {
      const auth = await getStaffAuthForRequest(req);
      return toNodeHandler(auth)(req, res);
    } catch (e: any) {
      throw new BadRequestException(e.message);
    }
  }

  @All('patient/*')
  async handlePatientAuth(@Req() req: Request, @Res() res: Response) {
    try {
      const auth = await getPatientAuthForRequest(req);
      return toNodeHandler(auth)(req, res);
    } catch (e: any) {
      throw new BadRequestException(e.message);
    }
  }
}
