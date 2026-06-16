import { Module } from '@nestjs/common';
import { DispensingService } from './dispensing.service.js';
import { DispensingController } from './dispensing.controller.js';

@Module({
  controllers: [DispensingController],
  providers: [DispensingService],
  exports: [DispensingService]
})
export class DispensingModule {}
