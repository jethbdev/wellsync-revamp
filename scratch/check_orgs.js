const { Client } = require('pg');

async function main() {
  const client = new Client({
    connectionString: process.env.CONTROL_PLANE_DATABASE_URL || 'postgresql://postgres@localhost:5432/healthbridge_control_plane'
  });

  try {
    await client.connect();
    
    // Check organizations
    const resOrgs = await client.query('SELECT id, name, slug, db_connection_uri FROM cp_organizations');
    console.log('--- Organizations in Control Plane ---');
    console.log(resOrgs.rows);

    for (const org of resOrgs.rows) {
      console.log(`\n--- Users in Tenant Database: ${org.slug} ---`);
      const tenantClient = new Client({
        connectionString: org.db_connection_uri || `postgresql://postgres@localhost:5432/healthbridge_tenant_${org.slug}`
      });
      try {
        await tenantClient.connect();
        const resUsers = await tenantClient.query('SELECT id, email, first_name, last_name, is_active, is_first_login FROM users');
        console.log(resUsers.rows);
      } catch (err) {
        console.error(`Error querying tenant DB ${org.slug}:`, err.message);
      } finally {
        await tenantClient.end();
      }
    }

  } catch (err) {
    console.error('Error querying Control Plane:', err);
  } finally {
    await client.end();
  }
}

main();
