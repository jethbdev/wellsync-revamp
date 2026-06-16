import { Controller, Get, Post, Body, Param, Req, UseGuards } from '@nestjs/common';
import { DispensingService, DispensePrescriptionDto } from './dispensing.service.js';
import { StaffAuthGuard } from '../auth/staff-auth.guard.js';
import { RequirePermission } from '../auth/rbac.decorator.js';

@Controller('api/dispensing')
@UseGuards(StaffAuthGuard)
export class DispensingController {
  constructor(private service: DispensingService) {}

  @Get('prescriptions')
  @RequirePermission('dispense', 'read')
  listPending(@Req() req: any) {
    return this.service.listPendingPrescriptions(req.facilityId);
  }

  @Get('prescriptions/:id')
  @RequirePermission('dispense', 'read')
  details(@Req() req: any, @Param('id') id: string) {
    return this.service.getPrescriptionDetails(id, req.facilityId);
  }

  @Post('dispense')
  @RequirePermission('dispense', 'create')
  dispense(@Req() req: any, @Body() body: DispensePrescriptionDto) {
    // req.user.id is the authenticated staff member ID
    const userId = req.user?.id;
    return this.service.dispensePrescription(req.facilityId, userId, body);
  }
}
