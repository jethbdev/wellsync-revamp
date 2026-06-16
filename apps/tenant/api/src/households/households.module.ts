import { Module } from '@nestjs/common';
import { HouseholdsService } from './households.service.js';
import { HouseholdsController } from './households.controller.js';

@Module({
  controllers: [HouseholdsController],
  providers: [HouseholdsService],
  exports: [HouseholdsService]
})
export class HouseholdsModule {}
