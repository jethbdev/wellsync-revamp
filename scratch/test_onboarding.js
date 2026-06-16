import { PrismaService } from '../apps/control-plane/api/dist/prisma/prisma.service.js';
import { OrganizationsService } from '../apps/control-plane/api/dist/organizations/organizations.service.js';

async function main() {
  const prisma = new PrismaService();
  await prisma.$connect();
  const service = new OrganizationsService(prisma);
  
  const slug = 'cavite-clinic';
  
  // Clean up existing if needed to ensure idempotency/re-runnability
  try {
    const existing = await prisma.cpOrganization.findUnique({ where: { slug } });
    if (existing) {
      console.log(`[Test Setup] Removing existing test organization '${slug}'...`);
      await prisma.cpOrganization.delete({ where: { slug } });
    }
  } catch (err) {
    console.log('[Test Setup] No existing organization to clean.');
  }

  // Drop tenant database if exists
  try {
    console.log(`[Test Setup] Dropping database healthbridge_tenant_${slug} if exists...`);
    await prisma.$executeRawUnsafe(`DROP DATABASE IF EXISTS "healthbridge_tenant_${slug}"`);
  } catch (err) {
    console.log('[Test Setup] Failed to drop database:', err);
  }

  console.log('Onboarding Cavite Clinic...');
  const org = await service.create({
    name: 'Cavite Clinic',
    slug: slug,
    type: 'LGU_HEALTH_CENTER',
    billingEmail: 'cavite@healthbridge.gov'
  });
  
  console.log('Successfully onboarded:', org);
  await prisma.$disconnect();
}

main().catch(console.error);
