import { PrismaClient as ControlPlanePrismaClient } from './generated/control-plane/index.js';
import { execSync } from 'child_process';
import path from 'path';

const cpClient = new ControlPlanePrismaClient({
  datasources: {
    db: {
      url: process.env.CONTROL_PLANE_DATABASE_URL || 'postgresql://postgres@localhost:5432/healthbridge_control_plane'
    }
  }
});

async function main() {
  console.log('🔍 Querying organizations from control plane...');
  const orgs = await cpClient.cpOrganization.findMany();
  
  if (orgs.length === 0) {
    console.log('No organizations found in control plane database.');
    return;
  }

  console.log(`Found ${orgs.length} organization(s). Running migrations...`);
  
  const schemaPath = path.resolve(__dirname, '../prisma/tenant.schema.prisma');
  
  for (const org of orgs) {
    if (!org.dbConnectionUri) {
      console.log(`⚠️ Org "${org.name}" (${org.slug}) has no dbConnectionUri. Skipping.`);
      continue;
    }

    console.log(`\n🚀 Migrating database for tenant "${org.name}" (${org.slug})...`);
    console.log(`URI: ${org.dbConnectionUri}`);
    
    try {
      execSync(`npx prisma db push --schema="${schemaPath}" --accept-data-loss`, {
        env: {
          ...process.env,
          DATABASE_URL: org.dbConnectionUri
        },
        stdio: 'inherit'
      });
      console.log(`✅ Successfully migrated database for "${org.name}".`);
    } catch (error) {
      console.error(`❌ Failed to migrate database for "${org.name}":`, error);
    }
  }
}

main()
  .catch(err => {
    console.error('Fatal error during migration runner:', err);
    process.exit(1);
  })
  .finally(async () => {
    await cpClient.$disconnect();
  });
