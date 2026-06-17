import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { OrganizationsService } from '../organizations/organizations.service.js';
import { TenantPrismaClient } from '@healthbridge/database';
import { hashPassword } from 'better-auth/crypto';
import { randomUUID } from 'crypto';

export interface ProvisionInput {
  orgName: string;
  orgType: 'GOVERNMENT_LGU' | 'PRIVATE_CLINIC';
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
  adminPassword: string;
}

@Injectable()
export class ProvisionService {
  constructor(
    private prisma: PrismaService,
    private orgsService: OrganizationsService,
  ) {}

  async provision(input: ProvisionInput) {
    const { orgName, orgType, adminFirstName, adminLastName, adminEmail, adminPassword } = input;

    if (!orgName || !adminEmail || !adminPassword || !adminFirstName || !adminLastName) {
      throw new BadRequestException(
        'orgName, adminFirstName, adminLastName, adminEmail, and adminPassword are required',
      );
    }
    if (adminPassword.length < 8) {
      throw new BadRequestException('Password must be at least 8 characters');
    }

    // Generate slug from org name
    const slug = orgName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    if (!slug) {
      throw new BadRequestException('Could not generate a valid slug from org name');
    }

    // Uniqueness check before any expensive work
    const existing = await this.prisma.cpOrganization.findUnique({ where: { slug } });
    if (existing) {
      throw new ConflictException(
        `An organization named "${orgName}" already exists. Please choose a different name.`,
      );
    }

    // Steps 1-4: create DB + push schema + seed + create CpOrganization record
    const org = await this.orgsService.create({
      name: orgName,
      slug,
      type: orgType,
      billingEmail: adminEmail,
    });

    // Step 5: create the first admin user in the new tenant DB
    const dbConnectionUri = org.dbConnectionUri!;
    const tenantPrisma = new TenantPrismaClient({
      datasources: { db: { url: dbConnectionUri } },
    });

    try {
      // Find the System Admin role created by the seed
      const adminRole = await tenantPrisma.role.findFirst({
        where: { name: 'System Admin' },
      });

      if (!adminRole) {
        throw new BadRequestException('Seed did not create a System Admin role. Check the seed script.');
      }

      // Get default facility
      const facility = await tenantPrisma.facility.findFirst();

      // Hash password using BetterAuth format
      const passwordHash = await hashPassword(adminPassword);

      // Create the User (app model)
      const userId = randomUUID();
      await tenantPrisma.user.create({
        data: {
          id: userId,
          email: adminEmail.toLowerCase(),
          passwordHash,
          firstName: adminFirstName,
          lastName: adminLastName,
          displayName: `${adminFirstName} ${adminLastName}`,
          roleId: adminRole.id,
          facilityId: facility?.id ?? null,
          isActive: true,
          isFirstLogin: true,
        },
      });

      // Create BetterAuth Account row so staff can log in via /api/auth/staff/sign-in/email
      await tenantPrisma.account.create({
        data: {
          id: randomUUID(),
          accountId: userId,
          providerId: 'credential',
          userId,
          password: passwordHash,
        },
      });

      const baseDomain = process.env.BASE_DOMAIN;
      const loginUrl = baseDomain
        ? `https://${slug}.${baseDomain}/login?registered=true`
        : `http://${slug}.localhost:3000/login?registered=true`;

      return {
        success: true,
        slug,
        orgName,
        loginUrl,
        message: `Organization "${orgName}" provisioned successfully`,
      };
    } finally {
      await tenantPrisma.$disconnect();
    }
  }
}
