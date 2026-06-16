import { Controller, Get, Put, Post, Body, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service.js';
import { StaffAuthGuard } from '../auth/staff-auth.guard.js';

@Controller('api/profile')
@UseGuards(StaffAuthGuard)
export class ProfileController {
  constructor(private service: ProfileService) {}

  @Get()
  getProfile(@Req() req: any) {
    return this.service.getProfile(req.session.user.id);
  }

  @Put()
  updateProfile(@Req() req: any, @Body() body: { firstName?: string; lastName?: string; displayName?: string; contactNumber?: string; image?: string }) {
    return this.service.updateProfile(req.session.user.id, body);
  }

  @Post('change-password')
  changePassword(@Req() req: any, @Body() body: { newPassword?: string }) {
    return this.service.changePassword(req.session.user.id, body.newPassword);
  }
}
