import { Controller, Get, Post, Put, Body, Req, UseGuards, Param, BadRequestException } from '@nestjs/common';
import { PatientPortalService } from './patient-portal.service.js';
import { PatientAuthGuard } from '../auth/patient-auth.guard.js';
import { Request } from 'express';

@Controller('api/patient-portal')
export class PatientPortalController {
  constructor(private readonly service: PatientPortalService) {}

  @Get('organization')
  async getOrganization() {
    return this.service.getOrganizationInfo();
  }

  @Post('claim')
  async claim(
    @Body() body: { pin: string; email: string; passwordHashOrPlain: string; birthDate: string }
  ) {
    if (!body.pin || !body.email || !body.passwordHashOrPlain || !body.birthDate) {
      throw new BadRequestException('PIN, email, password, and birthDate are required');
    }

    return this.service.claim(body);
  }

  @Get('profile')
  @UseGuards(PatientAuthGuard)
  async getProfile(@Req() req: Request & { session: any }) {
    const patientId = req.session.user.id;
    return this.service.getProfile(patientId);
  }

  @Post('appointments')
  @UseGuards(PatientAuthGuard)
  async bookAppointment(
    @Body() body: { scheduledDate: string; scheduledTime?: string; purpose: string },
    @Req() req: Request & { session: any }
  ) {
    if (!body.scheduledDate || !body.purpose) {
      throw new BadRequestException('scheduledDate and purpose are required');
    }
    const patientId = req.session.user.id;
    return this.service.bookAppointment(patientId, body);
  }

  @Post('appointments/:id/confirm')
  @UseGuards(PatientAuthGuard)
  async confirmAppointment(
    @Param('id') id: string,
    @Req() req: Request & { session: any }
  ) {
    const patientId = req.session.user.id;
    return this.service.updateAppointmentStatus(id, patientId, 'CONFIRMED');
  }

  @Post('appointments/:id/cancel')
  @UseGuards(PatientAuthGuard)
  async cancelAppointment(
    @Param('id') id: string,
    @Req() req: Request & { session: any }
  ) {
    const patientId = req.session.user.id;
    return this.service.updateAppointmentStatus(id, patientId, 'CANCELLED');
  }

  @Put('profile')
  @UseGuards(PatientAuthGuard)
  async updateProfile(
    @Body() body: { firstName?: string; lastName?: string; contactNumber?: string; photoUrl?: string },
    @Req() req: Request & { session: any }
  ) {
    const patientId = req.session.user.id;
    return this.service.updateProfile(patientId, body);
  }

  @Post('profile/change-password')
  @UseGuards(PatientAuthGuard)
  async changePassword(
    @Body() body: { newPassword?: string },
    @Req() req: Request & { session: any }
  ) {
    const patientId = req.session.user.id;
    return this.service.changePassword(patientId, body.newPassword);
  }
}
