import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { execSync } from 'child_process';
import * as path from 'path';
import * as crypto from 'crypto';
import * as fs from 'fs';
import { Client } from 'pg';
import { TenantConnectionManager } from '@healthbridge/database';

function getMonorepoRoot(): string {
  if (process.env.MONOREPO_ROOT) {
    return process.env.MONOREPO_ROOT;
  }
  let currentDir = __dirname;
  for (let i = 0; i < 6; i++) {
    if (fs.existsSync(path.join(currentDir, 'packages')) && fs.existsSync(path.join(currentDir, 'package.json'))) {
      return currentDir;
    }
    currentDir = path.dirname(currentDir);
  }
  if (fs.existsSync('/app/packages')) {
    return '/app';
  }
  return '/home/jyty/Personal/healthbridge';
}

@Injectable()
export class OrganizationsService {
  constructor(private prisma: PrismaService) {}

  private async waitForDbConnection(connectionUri: string): Promise<void> {
    const maxRetries = 20;
    const delayMs = 1500;
    
    for (let i = 1; i <= maxRetries; i++) {
      const client = new Client({ connectionString: connectionUri });
      try {
        await client.connect();
        await client.end();
        console.log(`[Provisioning] Successfully established database connection!`);
        return;
      } catch (err: any) {
        console.log(`[Provisioning] Database connection attempt ${i}/${maxRetries} failed: ${err.message}. Retrying in ${delayMs}ms...`);
        try {
          await client.end();
        } catch {}
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
    throw new Error(`Failed to establish database connection after ${maxRetries} retries.`);
  }

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
    let dbConnectionUri = `postgresql://postgres@localhost:5432/${dbName}`;

    const useDokploy = !!(process.env.DOKPLOY_API_KEY && process.env.DOKPLOY_ENVIRONMENT_ID);

    if (useDokploy) {
      const dokployApiUrl = process.env.DOKPLOY_API_URL || 'http://localhost:3000/api';
      const dokployApiKey = process.env.DOKPLOY_API_KEY!;
      const environmentId = process.env.DOKPLOY_ENVIRONMENT_ID!;
      const dbPassword = crypto.randomBytes(16).toString('hex');
      const dbUser = 'postgres';
      const serviceName = `healthbridge-tenant-${cleanSlug}`;

      console.log(`[Provisioning] Creating Dokploy Postgres service: ${serviceName}...`);

      try {
        const createRes = await fetch(`${dokployApiUrl}/postgres.create`, {
          method: 'POST',
          headers: {
            'x-api-key': dokployApiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: serviceName,
            databaseName: dbName,
            databaseUser: dbUser,
            databasePassword: dbPassword,
            environmentId,
          }),
        });

        if (!createRes.ok) {
          const errMsg = await createRes.text();
          throw new Error(`Dokploy API postgres.create failed: ${errMsg}`);
        }

        const createData = await createRes.json();
        const postgresId = createData.data?.postgresId || createData.postgresId || createData.result?.data?.postgresId || createData.id;
        const appName = createData.data?.appName || createData.appName || createData.result?.data?.appName;

        if (!postgresId) {
          throw new Error(`Dokploy API did not return postgresId. Response: ${JSON.stringify(createData)}`);
        }

        console.log(`[Provisioning] Dokploy Postgres service created with postgresId: ${postgresId}, appName: ${appName}`);

        console.log(`[Provisioning] Deploying Dokploy Postgres service...`);
        const deployRes = await fetch(`${dokployApiUrl}/postgres.deploy`, {
          method: 'POST',
          headers: {
            'x-api-key': dokployApiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            postgresId,
          }),
        });

        if (!deployRes.ok) {
          const errMsg = await deployRes.text();
          throw new Error(`Dokploy API postgres.deploy failed: ${errMsg}`);
        }

        const dbHost = appName ? `dokploy-${appName}` : serviceName;
        dbConnectionUri = `postgresql://${dbUser}:${dbPassword}@${dbHost}:5432/${dbName}`;

        console.log(`[Provisioning] Dokploy connection string resolved: postgresql://${dbUser}:****@${dbHost}:5432/${dbName}`);

        console.log(`[Provisioning] Waiting for Postgres database at ${dbHost}:5432 to accept connections...`);
        await this.waitForDbConnection(dbConnectionUri);

      } catch (e: any) {
        console.error('Failed to create/deploy database via Dokploy', e);
        throw new BadRequestException(`Dokploy database provisioning failed: ${e.message}`);
      }
    } else {
      console.log(`[Provisioning] Creating local database ${dbName}...`);
      try {
        await this.prisma.$executeRawUnsafe(`CREATE DATABASE "${dbName}"`);
      } catch (e: any) {
        if (!e.message.includes('already exists')) {
          console.error('Failed to create database', e);
          throw new BadRequestException(`Database creation failed: ${e.message}`);
        }
      }
    }

    // 2. Run Prisma schema push on the newly created database
    console.log(`[Provisioning] Pushing schema to ${dbName}...`);
    const rootDir = getMonorepoRoot();
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
