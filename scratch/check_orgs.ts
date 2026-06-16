import { PrismaClient as ControlPlanePrisma } from '../packages/database/src/generated/control-plane';

async function main() {
  const cpPrisma = new ControlPlanePrisma({
    datasources: {
      db: {
        url: process.env.CONTROL_PLANE_DATABASE_URL || 'postgresql://postgres@localhost:5432/healthbridge_control_plane'
      }
    }
  });

  try {
    const orgs = await cpPrisma.cpOrganization.findMany();
    console.log('--- Organizations in Control Plane ---');
    console.log(orgs.map(o => ({ id: o.id, name: o.name, slug: o.slug, db: o.dbConnectionUri })));
  } catch (err) {
    console.error('Error querying Control Plane:', err);
  } finally {
    await cpPrisma.$disconnect();
  }
}

main();
