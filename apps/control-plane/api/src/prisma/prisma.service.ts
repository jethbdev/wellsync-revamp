import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ControlPlanePrismaClient } from '@healthbridge/database';

@Injectable()
export class PrismaService extends ControlPlanePrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.CONTROL_PLANE_DATABASE_URL || 'postgresql://postgres@localhost:5432/healthbridge_control_plane'
        }
      }
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
