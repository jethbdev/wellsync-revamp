import { TenantConnectionManager } from '../packages/database/src/index.js';
import { getStaffAuth } from '../apps/tenant/api/src/auth/staff-auth.js';

async function test() {
  console.log('Resolving tenant client for lapu-lapu-city...');
  try {
    const prisma = await TenantConnectionManager.getClient('lapu-lapu-city');
    console.log('Tenant client resolved successfully.');

    console.log('Initializing BetterAuth instance...');
    const auth = getStaffAuth(prisma);
    console.log('BetterAuth initialized.');

    console.log('Attempting sign-in programmatically...');
    const res = await auth.api.signInWithEmail({
      body: {
        email: 'hannah@gmail.com',
        password: 'adminpass',
      },
    });
    console.log('Result:', res);
  } catch (error: any) {
    console.error('Error during programmatic sign-in:', error);
  } finally {
    await TenantConnectionManager.disconnectAll();
  }
}

test();
