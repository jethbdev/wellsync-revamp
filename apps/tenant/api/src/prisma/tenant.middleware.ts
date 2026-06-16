import { Injectable, NestMiddleware, BadRequestException, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { getTenantPrisma } from '../auth/tenant-auth-resolver.js';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  async use(req: Request & { prisma?: any }, res: Response, next: NextFunction) {
    try {
      const prisma = await getTenantPrisma(req);
      req.prisma = prisma;
      next();
    } catch (e: any) {
      if (e.message.includes('suspended')) {
        throw new ForbiddenException('TENANT_SUSPENDED_LOCK');
      }
      throw new BadRequestException(`Tenant resolution failed: ${e.message}`);
    }
  }
}
