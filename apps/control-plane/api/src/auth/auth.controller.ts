import { Controller, All, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { toNodeHandler } from 'better-auth/node';
import { getOpsAuth } from './ops-auth.js';
import { ControlPlanePrismaClient } from '@healthbridge/database';

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

  @All('*')
  async handleOpsAuth(@Req() req: Request, @Res() res: Response) {
    return toNodeHandler(this.auth)(req, res);
  }
}
