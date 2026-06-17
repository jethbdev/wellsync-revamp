import { Controller, All, Req, Res, Post, Body, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';
import { toNodeHandler } from 'better-auth/node';
import { getOpsAuth } from './ops-auth.js';
import { ControlPlanePrismaClient } from '@healthbridge/database';
import { hashPassword } from 'better-auth/crypto';

@Controller('api/auth')
export class AuthController {
  private prisma = new ControlPlanePrismaClient({
    datasources: {
      db: {
        url: process.env.CONTROL_PLANE_DATABASE_URL || 'postgresql://postgres@localhost:5432/healthbridge_control_plane'
      }
    }
  });
  private auth = getOpsAuth(this.prisma);

  @Post('register-ops')
  async registerOps(@Body() body: any) {
    const { email, name, password } = body;
    if (!email || !name || !password) {
      throw new BadRequestException('Email, name, and password are required');
    }
    if (password.length < 8) {
      throw new BadRequestException('Password must be at least 8 characters');
    }

    const existingUser = await this.prisma.cpUser.findUnique({
      where: { email: email.toLowerCase() }
    });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const passwordHash = await hashPassword(password);

    const user = await this.prisma.cpUser.create({
      data: {
        email: email.toLowerCase(),
        name,
        passwordHash,
        isActive: true,
      }
    });

    await this.prisma.cpAccount.create({
      data: {
        accountId: user.id,
        providerId: 'credential',
        userId: user.id,
        password: passwordHash,
      }
    });

    return {
      success: true,
      message: `Ops User ${name} registered successfully`,
      userId: user.id
    };
  }

  @All('*')
  async handleOpsAuth(@Req() req: Request, @Res() res: Response) {
    return toNodeHandler(this.auth)(req, res);
  }
}
