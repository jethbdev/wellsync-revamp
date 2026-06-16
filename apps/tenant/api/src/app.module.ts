import { Module, NestModule, MiddlewareConsumer, Get, Controller } from '@nestjs/common';
import { coreVersion } from '@healthbridge/core';
import { testVal } from '@healthbridge/contracts';
import { PrismaModule } from './prisma/prisma.module.js';
import { TenantMiddleware } from './prisma/tenant.middleware.js';
import { AuthController } from './auth/auth.controller.js';
import { PatientsModule } from './patients/patients.module.js';
import { HouseholdsModule } from './households/households.module.js';
import { ConsultationsModule } from './consultations/consultations.module.js';
import { AppointmentsModule } from './appointments/appointments.module.js';
import { ReferralsModule } from './referrals/referrals.module.js';
import { AuditModule } from './audit/audit.module.js';
import { PatientPortalModule } from './patient-portal/patient-portal.module.js';
import { PluginsModule } from './plugins/plugins.module.js';
import { StaffModule } from './staff/staff.module.js';
import { FacilitiesModule } from './facilities/facilities.module.js';
import { RolesModule } from './roles/roles.module.js';
import { MedicinesModule } from './medicines/medicines.module.js';
import { SettingsModule } from './settings/settings.module.js';
import { ProfileModule } from './profile/profile.module.js';
import { QueueModule } from './plugins/queue/queue.module.js';
import { ReportsModule } from './reports/reports.module.js';
import { InventoryModule } from './inventory/inventory.module.js';
import { DispensingModule } from './dispensing/dispensing.module.js';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return `HealthBridge Tenant API - Version ${coreVersion} - Status: ${testVal}`;
  }
}

@Module({
  imports: [
    PrismaModule,
    PatientsModule,
    HouseholdsModule,
    ConsultationsModule,
    AppointmentsModule,
    ReferralsModule,
    AuditModule,
    PatientPortalModule,
    PluginsModule,
    StaffModule,
    FacilitiesModule,
    RolesModule,
    MedicinesModule,
    SettingsModule,
    ProfileModule,
    QueueModule,
    ReportsModule,
    InventoryModule,
    DispensingModule
  ],
  controllers: [AppController, AuthController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware)
      .exclude('api/auth/*')
      .forRoutes('*');
  }
}
