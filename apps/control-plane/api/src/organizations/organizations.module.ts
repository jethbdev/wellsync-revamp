import { Module } from '@nestjs/common';
import { OrganizationsController } from './organizations.controller.js';
import { PatientIndexController } from './patient-index.controller.js';
import { OrganizationsService } from './organizations.service.js';

@Module({
  controllers: [OrganizationsController, PatientIndexController],
  providers: [OrganizationsService],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}
