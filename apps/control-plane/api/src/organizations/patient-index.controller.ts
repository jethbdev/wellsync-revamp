import { Controller, Get, Post, Body, Query, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Controller('api/patient-index')
export class PatientIndexController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async register(
    @Body() body: {
      patientPin: string;
      firstName: string;
      lastName: string;
      birthDate: string;
      sex: string;
      orgId?: string;
      orgSlug: string;
    }
  ) {
    if (!body.patientPin || !body.firstName || !body.lastName || !body.birthDate || !body.sex || !body.orgSlug) {
      throw new BadRequestException('Missing required fields for patient index registration');
    }

    // Resolve orgId if not provided
    let orgId = body.orgId;
    if (!orgId) {
      const org = await this.prisma.cpOrganization.findUnique({
        where: { slug: body.orgSlug }
      });
      if (!org) {
        throw new BadRequestException(`Organization slug ${body.orgSlug} not found`);
      }
      orgId = org.id;
    }

    // Upsert the patient index to ensure idempotency
    return this.prisma.cpPatientIndex.upsert({
      where: { patientPin: body.patientPin },
      update: {
        firstName: body.firstName,
        lastName: body.lastName,
        birthDate: new Date(body.birthDate),
        sex: body.sex,
        orgId,
        orgSlug: body.orgSlug
      },
      create: {
        patientPin: body.patientPin,
        firstName: body.firstName,
        lastName: body.lastName,
        birthDate: new Date(body.birthDate),
        sex: body.sex,
        orgId,
        orgSlug: body.orgSlug
      }
    });
  }

  @Get('search')
  async search(
    @Query('patientPin') patientPin?: string,
    @Query('firstName') firstName?: string,
    @Query('lastName') lastName?: string,
    @Query('birthDate') birthDate?: string,
    @Query('sex') sex?: string
  ) {
    if (patientPin) {
      const match = await this.prisma.cpPatientIndex.findUnique({
        where: { patientPin }
      });
      return match ? [match] : [];
    }

    if (!firstName || !lastName || !birthDate || !sex) {
      throw new BadRequestException('Fuzzy search requires firstName, lastName, birthDate, and sex');
    }

    return this.prisma.cpPatientIndex.findMany({
      where: {
        firstName: { equals: firstName, mode: 'insensitive' },
        lastName: { equals: lastName, mode: 'insensitive' },
        birthDate: new Date(birthDate),
        sex: { equals: sex, mode: 'insensitive' }
      }
    });
  }
}
