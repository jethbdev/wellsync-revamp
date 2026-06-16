import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ProvisionService, type ProvisionInput } from './provision.service.js';

/**
 * Public endpoint — no auth guard.
 * Called by the landing page /signup to self-serve provision a new organization.
 */
@Controller('api/provision')
export class ProvisionController {
  constructor(private service: ProvisionService) {}

  @Post()
  @HttpCode(201)
  provision(@Body() body: ProvisionInput) {
    return this.service.provision(body);
  }
}
