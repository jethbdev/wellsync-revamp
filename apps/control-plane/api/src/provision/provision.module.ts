import { Module } from '@nestjs/common';
import { ProvisionController } from './provision.controller.js';
import { ProvisionService } from './provision.service.js';
import { OrganizationsModule } from '../organizations/organizations.module.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule, OrganizationsModule],
  controllers: [ProvisionController],
  providers: [ProvisionService],
})
export class ProvisionModule {}
