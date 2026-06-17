import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ControlPlanePrismaClient } from '@healthbridge/database';

@Injectable()
export class PrismaService extends ControlPlanePrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.CONTROL_PLANE_DATABASE_URL || 'postgresql://postgres@localhost:5432/healthbridge_control_plane'
        }
      }
    });
  }

  async onModuleInit() {
    await this.$connect();
    await this.seedIfNeeded();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  private async seedIfNeeded() {
    try {
      const userCount = await this.cpUser.count();
      if (userCount === 0) {
        console.log('🌱 Control plane database is empty. Seeding default data...');

        // 1. Seed Default Organization Link to Tenant Database
        console.log('Seeding default organization "cebu-clinic" in control plane...');
        await this.cpOrganization.upsert({
          where: { slug: 'cebu-clinic' },
          update: {
            dbConnectionUri: process.env.DEFAULT_TENANT_DATABASE_URL || 'postgresql://postgres@localhost:5432/healthbridge_tenant',
          },
          create: {
            name: 'Cebu Family Clinic Group',
            slug: 'cebu-clinic',
            type: 'PRIVATE_CLINIC',
            status: 'ACTIVE',
            billingPlan: 'ENTERPRISE',
            dbConnectionUri: process.env.DEFAULT_TENANT_DATABASE_URL || 'postgresql://postgres@localhost:5432/healthbridge_tenant',
            dbSchemaVersion: '1.0.0',
          },
        });

        // 2. Seed Default Ops User
        console.log('Seeding default Ops User...');
        const passwordHash = 'a405519837da3335dbb8ec6b1cb2fef8:12a8ef7f34f1abd78c1ff76f5904389ad9c6d8eec503ebcbea1f1e3dff6738e32e9feb8cf18cae2ef31e3473d652a0bb8648a8b1e2d644ca46aff7e04d6768dd';

        const opsUser = await this.cpUser.upsert({
          where: { email: 'ops@healthbridge.dev' },
          update: {
            passwordHash,
          },
          create: {
            email: 'ops@healthbridge.dev',
            name: 'Operations Admin',
            passwordHash,
            mfaEnabled: true,
            isActive: true,
          },
        });

        // 3. Seed BetterAuth Account
        console.log('Seeding BetterAuth Account credentials for Ops User...');
        await this.cpAccount.upsert({
          where: {
            providerId_accountId: {
              providerId: 'credential',
              accountId: opsUser.id,
            },
          },
          update: {
            password: passwordHash,
          },
          create: {
            accountId: opsUser.id,
            providerId: 'credential',
            userId: opsUser.id,
            password: passwordHash,
          },
        });

        console.log('✅ Control plane seed completed successfully!');
      }
    } catch (e) {
      console.error('❌ Error during control plane seeding:', e);
    }
  }
}
