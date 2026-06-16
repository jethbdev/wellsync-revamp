import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuditLogsService } from './audit-logs.service.js';
import { OpsAuthGuard } from '../auth/ops.guard.js';

@Controller('api/audit-logs')
@UseGuards(OpsAuthGuard)
export class AuditLogsController {
  constructor(private service: AuditLogsService) {}

  @Get()
  getTimeline() {
    return this.service.getTimeline();
  }
}
