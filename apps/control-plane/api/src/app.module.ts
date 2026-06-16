import { Module, Get, Controller } from '@nestjs/common';
import { coreVersion } from '@healthbridge/core';
import { AuthController } from './auth/auth.controller.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { OrganizationsModule } from './organizations/organizations.module.js';
import { AccessGrantsModule } from './access-grants/access-grants.module.js';
import { AuditLogsModule } from './audit-logs/audit-logs.module.js';
import { ProvisionModule } from './provision/provision.module.js';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return `HealthBridge Control Plane API - Version ${coreVersion} - Status: ACTIVE`;
  }
}

@Module({
  imports: [
    PrismaModule,
    OrganizationsModule,
    AccessGrantsModule,
    AuditLogsModule,
    ProvisionModule,
  ],
  controllers: [AppController, AuthController],
  providers: [],
})
export class AppModule {}
