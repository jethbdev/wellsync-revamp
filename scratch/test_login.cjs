const { TenantConnectionManager } = require('../packages/database/dist/index.js');
const { getStaffAuth } = require('../apps/tenant/api/dist/auth/staff-auth.js');

async function test() {
  console.log('Resolving tenant client for lapu-lapu-city...');
  try {
    const prisma = await TenantConnectionManager.getClient('cebu-clinic');
    console.log('Tenant client resolved successfully.');

    console.log('Initializing BetterAuth instance...');
    const auth = getStaffAuth(prisma);
    console.log('BetterAuth initialized.');

    console.log('Attempting sign-in programmatically...');
    const res = await auth.api.signInEmail({
      body: {
        email: 'admin@healthbridge.dev',
        password: 'adminpass',
      },
    });
    console.log('Result:', JSON.stringify(res, null, 2));
  } catch (error) {
    console.error('Error during programmatic sign-in:', error);
  } finally {
    await TenantConnectionManager.disconnectAll();
  }
}

test();
