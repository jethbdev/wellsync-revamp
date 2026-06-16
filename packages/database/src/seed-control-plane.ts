import { PrismaClient as ControlPlanePrismaClient } from './generated/control-plane/index.js';

const prisma = new ControlPlanePrismaClient({
  datasources: {
    db: {
      url: process.env.CONTROL_PLANE_DATABASE_URL || 'postgresql://postgres@localhost:5432/healthbridge_control_plane'
    }
  }
});

async function main() {
  console.log('🌱 Starting control plane database seed...');

  // 1. Seed Default Organization Link to Tenant Database
  console.log('Seeding default organization "cebu-clinic" in control plane...');
  const org = await prisma.cpOrganization.upsert({
    where: { slug: 'cebu-clinic' },
    update: {
      dbConnectionUri: 'postgresql://postgres@localhost:5432/healthbridge_tenant',
    },
    create: {
      name: 'Cebu Family Clinic Group',
      slug: 'cebu-clinic',
      type: 'PRIVATE_CLINIC',
      status: 'ACTIVE',
      billingPlan: 'ENTERPRISE',
      dbConnectionUri: 'postgresql://postgres@localhost:5432/healthbridge_tenant',
      dbSchemaVersion: '1.0.0',
    },
  });

  // 2. Seed Default Ops User
  console.log('Seeding default Ops User...');
  // Hashed password for 'opsadminpass' using BetterAuth
  const passwordHash = 'a405519837da3335dbb8ec6b1cb2fef8:12a8ef7f34f1abd78c1ff76f5904389ad9c6d8eec503ebcbea1f1e3dff6738e32e9feb8cf18cae2ef31e3473d652a0bb8648a8b1e2d644ca46aff7e04d6768dd';

  const opsUser = await prisma.cpUser.upsert({
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

  console.log('Seeding BetterAuth Account credentials for Ops User...');
  await prisma.cpAccount.upsert({
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

main()
  .catch((e) => {
    console.error('❌ Error during control plane seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
