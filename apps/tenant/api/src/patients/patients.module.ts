import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service.js';
import { PatientsController } from './patients.controller.js';
import { EMRPullController } from './emr-pull.controller.js';
import { DocumentsService } from './documents.service.js';
import { DocumentsController } from './documents.controller.js';

@Module({
  controllers: [PatientsController, EMRPullController, DocumentsController],
  providers: [PatientsService, DocumentsService],
  exports: [PatientsService, DocumentsService]
})
export class PatientsModule {}
