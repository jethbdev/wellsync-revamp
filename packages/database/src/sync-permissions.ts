import { TenantConnectionManager } from './tenant-connection-manager';

const staticRolePermissions: Record<string, string[]> = {
  'System Admin': [
    'users:create', 'users:read', 'users:update', 'users:delete', 'users:manage',
    'facilities:create', 'facilities:read', 'facilities:update', 'facilities:delete',
    'roles:create', 'roles:read', 'roles:update', 'roles:delete', 'roles:manage',
    'audit:read',
    'reports:read',
    'patients:create', 'patients:read', 'patients:update', 'patients:delete',
    'consultations:create', 'consultations:read', 'consultations:update',
    'vitals:create', 'vitals:read', 'vitals:update',
    'prescriptions:create', 'prescriptions:read', 'prescriptions:update',
    'referrals:create', 'referrals:read', 'referrals:update',
    'schedules:create', 'schedules:read', 'schedules:update', 'schedules:delete', 'schedules:manage',
    'inventory:read', 'inventory:write',
    'dispense:read', 'dispense:create'
  ],
  'Clinic Manager': [
    'users:read',
    'facilities:read', 'facilities:update',
    'roles:read',
    'reports:read',
    'patients:read',
    'consultations:read',
    'vitals:read',
    'prescriptions:read',
    'referrals:read',
    'schedules:read',
    'inventory:read', 'inventory:write',
    'dispense:read', 'dispense:create'
  ],
  'Attending Doctor': [
    'users:read',
    'reports:read',
    'patients:create', 'patients:read', 'patients:update',
    'consultations:create', 'consultations:read', 'consultations:update',
    'vitals:create', 'vitals:read', 'vitals:update',
    'prescriptions:create', 'prescriptions:read', 'prescriptions:update',
    'referrals:create', 'referrals:read', 'referrals:update',
    'schedules:create', 'schedules:read', 'schedules:update',
    'inventory:read'
  ],
  'Nurse': [
    'users:read',
    'reports:read',
    'patients:create', 'patients:read', 'patients:update',
    'consultations:read',
    'vitals:create', 'vitals:read', 'vitals:update',
    'referrals:read',
    'schedules:create', 'schedules:read', 'schedules:update', 'schedules:manage',
    'inventory:read'
  ],
  'Pharmacist': [
    'users:read',
    'patients:read',
    'prescriptions:read',
    'schedules:read',
    'inventory:read', 'inventory:write',
    'dispense:read', 'dispense:create'
  ]
};

async function main() {
  const cpClient = TenantConnectionManager.getControlPlaneClient();
  const orgs = await cpClient.cpOrganization.findMany();

  for (const org of orgs) {
    console.log(`Syncing roles & permissions in database for tenant: ${org.name} (${org.slug})`);
    try {
      const prisma = await TenantConnectionManager.getClient(org.slug);

      // Update each static role's permissions in the DB
      for (const [roleName, permissions] of Object.entries(staticRolePermissions)) {
        const role = await prisma.role.findFirst({
          where: { name: roleName }
        });

        if (role) {
          // 1. Delete all existing permissions for this role
          await prisma.permission.deleteMany({
            where: { roleId: role.id }
          });

          // 2. Insert new standardized permissions
          for (const perm of permissions) {
            await prisma.permission.create({
              data: {
                roleId: role.id,
                permission: perm
              }
            });
          }
          console.log(`  Updated permissions for role: ${roleName}`);
        } else {
          console.log(`  ⚠️ Role "${roleName}" not found in database.`);
        }
      }

      // 3. Clean up active Session records in this tenant database (remove old inventory-related permissions)
      const sessions = await prisma.session.findMany();
      let updatedSessionsCount = 0;
      for (const session of sessions) {
        if (session.permissions && Array.isArray(session.permissions)) {
          const originalLength = session.permissions.length;
          const filteredPerms = session.permissions.filter((p: string) => 
            !p.startsWith('requisitions:') &&
            !p.startsWith('orders:') &&
            !p.startsWith('dispense:') &&
            !p.startsWith('transfers:')
          );

          if (filteredPerms.length !== originalLength) {
            await prisma.session.update({
              where: { id: session.id },
              data: { permissions: filteredPerms }
            });
            updatedSessionsCount++;
          }
        }
      }
      if (updatedSessionsCount > 0) {
        console.log(`  Filtered old permissions in ${updatedSessionsCount} active session(s).`);
      }

    } catch (err: any) {
      console.error(`  Error:`, err.message);
    }
  }

  console.log("Sync completed successfully!");
}

main()
  .catch(err => console.error("Error:", err))
  .finally(async () => {
    // Disconnect control plane client
    const cpClient = TenantConnectionManager.getControlPlaneClient();
    await cpClient.$disconnect();
  });
