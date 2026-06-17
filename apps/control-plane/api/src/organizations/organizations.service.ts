import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { execSync } from 'child_process';
import * as path from 'path';
import { TenantConnectionManager } from '@healthbridge/database';

@Injectable()
export class OrganizationsService {
  constructor(private prisma: PrismaService) {}

  async create(data: { name: string; slug: string; type: string; billingEmail?: string }) {
    const cleanSlug = data.slug.replace(/[^a-z0-9_-]/g, '').toLowerCase();
    if (!cleanSlug) {
      throw new BadRequestException('Invalid organization slug');
    }

    const existing = await this.prisma.cpOrganization.findUnique({
      where: { slug: cleanSlug }
    });
    if (existing) {
      throw new BadRequestException(`Organization with slug '${cleanSlug}' already exists`);
    }

    const dbName = `healthbridge_tenant_${cleanSlug}`;
    const dbConnectionUri = `postgresql://postgres@localhost:5432/${dbName}`;

    // 1. Create Database dynamically in PostgreSQL
    console.log(`[Provisioning] Creating database ${dbName}...`);
    try {
      await this.prisma.$executeRawUnsafe(`CREATE DATABASE "${dbName}"`);
    } catch (e: any) {
      if (!e.message.includes('already exists')) {
        console.error('Failed to create database', e);
        throw new BadRequestException(`Database creation failed: ${e.message}`);
      }
    }

    // 2. Run Prisma schema push on the newly created database
    console.log(`[Provisioning] Pushing schema to ${dbName}...`);
    const rootDir = '/home/jyty/Personal/healthbridge';
    const schemaPath = path.join(rootDir, 'packages/database/prisma/tenant.schema.prisma');
    try {
      execSync(`npx prisma db push --schema="${schemaPath}" --accept-data-loss`, {
        env: {
          ...process.env,
          DATABASE_URL: dbConnectionUri
        }
      });
    } catch (e: any) {
      console.error('Failed to push schema', e);
      throw new BadRequestException(`Database schema push failed: ${e.message}`);
    }

    // 3. Seed EMR tables in the new tenant database
    console.log(`[Provisioning] Seeding EMR tenant database ${dbName}...`);
    const seedPath = path.join(rootDir, 'packages/database/src/seed.ts');
    try {
      execSync(`npx ts-node "${seedPath}"`, {
        env: {
          ...process.env,
          DATABASE_URL: dbConnectionUri
        }
      });
    } catch (e: any) {
      console.error('Failed to seed tenant database', e);
      throw new BadRequestException(`Database seeding failed: ${e.message}`);
    }

    // 4. Create CpOrganization in Control Plane
    const org = await this.prisma.cpOrganization.create({
      data: {
        name: data.name,
        slug: cleanSlug,
        type: data.type,
        status: 'ACTIVE',
        billingEmail: data.billingEmail,
        dbConnectionUri,
        dbSchemaVersion: '1.0.0'
      }
    });

    // 5. Create default feature flags
    await this.prisma.cpFeatureFlag.createMany({
      data: [
        { orgId: org.id, featureKey: 'telehealth', isEnabled: false },
        { orgId: org.id, featureKey: 'pacs', isEnabled: false },
        { orgId: org.id, featureKey: 'analytics', isEnabled: false }
      ]
    });

    // 6. Record initial usage metrics
    await this.prisma.cpUsageMetric.create({
      data: {
        orgId: org.id,
        activeStaffCount: 1, // Default Admin
        patientRecordsCount: 0,
        storageBytesUsed: BigInt(0),
        smsSentThisMonth: 0,
        apiRequestsCount: 0
      }
    });

    return org;
  }

  async findAll() {
    return this.prisma.cpOrganization.findMany({
      include: {
        featureFlags: true,
        usageMetrics: {
          orderBy: { recordedAt: 'desc' },
          take: 1
        }
      }
    });
  }

  async getMetrics(orgId: string) {
    return this.prisma.cpUsageMetric.findMany({
      where: { orgId },
      orderBy: { recordedAt: 'desc' },
      take: 6
    });
  }

  async toggleFeatureFlag(orgId: string, featureKey: string, isEnabled: boolean) {
    return this.prisma.cpFeatureFlag.upsert({
      where: {
        orgId_featureKey: { orgId, featureKey }
      },
      update: { isEnabled },
      create: { orgId, featureKey, isEnabled }
    });
  }

  async updateBranding(orgId: string, branding: { primaryColor: string; secondaryColor: string; logoUrl?: string }) {
    return this.prisma.cpOrganization.update({
      where: { id: orgId },
      data: {
        primaryColor: branding.primaryColor,
        secondaryColor: branding.secondaryColor,
        logoUrl: branding.logoUrl
      }
    });
  }

  async updateDomain(orgId: string, domainData: { customDomain: string }) {
    return this.prisma.cpOrganization.update({
      where: { id: orgId },
      data: {
        customDomain: domainData.customDomain,
        customDomainStatus: 'PENDING',
        dnsVerificationToken: `txt-verify-${Math.random().toString(36).substring(7)}`,
        sslStatus: 'PENDING'
      }
    });
  }

  async updateStatus(orgId: string, status: string) {
    return this.prisma.cpOrganization.update({
      where: { id: orgId },
      data: { status }
    });
  }

  async lookupTenantByEmail(email: string) {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      throw new BadRequestException('Invalid email');
    }

    const orgs = await this.prisma.cpOrganization.findMany({
      where: { status: 'ACTIVE' }
    });

    const matchPromises = orgs.map(async (org) => {
      try {
        const tenantClient = await TenantConnectionManager.getClient(org.slug);
        const roles: ('staff' | 'patient')[] = [];

        const [staffUser, patientUser] = await Promise.all([
          tenantClient.user.findUnique({ where: { email: cleanEmail } }),
          tenantClient.patient.findFirst({ where: { email: cleanEmail } })
        ]);

        if (staffUser) roles.push('staff');
        if (patientUser) roles.push('patient');

        if (roles.length > 0) {
          return { slug: org.slug, name: org.name, roles };
        }
      } catch (err) {
        console.error(`Failed to lookup email in tenant ${org.slug}`, err);
      }
      return null;
    });

    const results = await Promise.all(matchPromises);
    return results.filter((r): r is NonNullable<typeof r> => r !== null);
  }
}
