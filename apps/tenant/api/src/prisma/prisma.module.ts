import { Module, Scope, Global } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { TenantPrismaClient } from '@healthbridge/database';

@Global()
@Module({
  providers: [
    {
      provide: 'PRISMA_CLIENT',
      scope: Scope.REQUEST,
      inject: [REQUEST],
      useFactory: (req: any): TenantPrismaClient => {
        if (!req.prisma) {
          throw new Error('Prisma Client not initialized on request. Ensure dynamic client resolution middleware/guard is run.');
        }
        return req.prisma;
      }
    }
  ],
  exports: ['PRISMA_CLIENT']
})
export class PrismaModule {}
