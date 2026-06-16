const { Client } = require('pg');
const crypto = require('crypto');

async function main() {
  const cpClient = new Client({
    connectionString: process.env.CONTROL_PLANE_DATABASE_URL || 'postgresql://postgres@localhost:5432/healthbridge_control_plane'
  });

  try {
    await cpClient.connect();
    const resOrgs = await cpClient.query('SELECT slug, db_connection_uri FROM cp_organizations');

    for (const org of resOrgs.rows) {
      console.log(`Processing database for tenant: ${org.slug}`);
      const tenantClient = new Client({
        connectionString: org.db_connection_uri || `postgresql://postgres@localhost:5432/healthbridge_tenant_${org.slug}`
      });

      try {
        await tenantClient.connect();
        
        // Find admin user ID
        const resUser = await tenantClient.query("SELECT id, password_hash FROM users WHERE email = 'admin@healthbridge.dev'");
        if (resUser.rows.length === 0) {
          console.log(`  No admin@healthbridge.dev user found in ${org.slug}`);
          continue;
        }

        const admin = resUser.rows[0];
        const userId = admin.id;
        const passwordHash = admin.password_hash;

        // Check if accounts row exists
        const resAccount = await tenantClient.query("SELECT id FROM accounts WHERE user_id = $1 AND provider_id = 'credential'", [userId]);
        if (resAccount.rows.length > 0) {
          console.log(`  BetterAuth accounts row already exists for admin in ${org.slug}`);
        } else {
          const accountId = crypto.randomUUID();
          await tenantClient.query(
            "INSERT INTO accounts (id, account_id, provider_id, user_id, password, created_at, updated_at) VALUES ($1, $2, 'credential', $3, $4, NOW(), NOW())",
            [accountId, userId, userId, passwordHash]
          );
          console.log(`  Successfully inserted BetterAuth credentials row for admin in ${org.slug}`);
        }
      } catch (err) {
        console.error(`  Error processing tenant ${org.slug}:`, err.message);
      } finally {
        await tenantClient.end();
      }
    }
  } catch (err) {
    console.error('Error connecting to control plane database:', err);
  } finally {
    await cpClient.end();
  }
}

main();
