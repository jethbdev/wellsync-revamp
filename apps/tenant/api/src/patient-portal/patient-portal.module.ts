import { Module } from '@nestjs/common';
import { PatientPortalService } from './patient-portal.service.js';
import { PatientPortalController } from './patient-portal.controller.js';

@Module({
  controllers: [PatientPortalController],
  providers: [PatientPortalService],
  exports: [PatientPortalService]
})
export class PatientPortalModule {}
