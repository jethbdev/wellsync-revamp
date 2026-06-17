import { betterAuth } from 'better-auth';
import { prismaAdapter } from '@better-auth/prisma-adapter';
import { TenantPrismaClient } from '@healthbridge/database';

export const statement = {
  users: ['create', 'read', 'update', 'delete', 'manage'],
  facilities: ['create', 'read', 'update', 'delete'],
  roles: ['create', 'read', 'update', 'delete', 'manage'],
  audit: ['read'],
  reports: ['read'],
  patients: ['create', 'read', 'update', 'delete'],
  consultations: ['create', 'read', 'update'],
  vitals: ['create', 'read', 'update'],
  prescriptions: ['create', 'read', 'update'],
  referrals: ['create', 'read', 'update'],
  schedules: ['create', 'read', 'update', 'delete', 'manage'],
  // Extended/optional plugins statement schema
  inventory: ['read', 'write', 'view', 'manage'],
  requisitions: ['create', 'view'],
  orders: ['create', 'view'],
  dispense: ['create', 'read'],
  transfers: ['create', 'read']
} as const;

export const staticRolePermissions: Record<string, string[]> = {
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

export const getStaffAuth = (prisma: TenantPrismaClient): any => betterAuth({
  database: prismaAdapter(prisma, { provider: 'postgresql' }),
  secret: process.env.BETTER_AUTH_SECRET || 'a-very-long-and-secure-32-character-secret-key-staff',
  basePath: '/api/auth/staff',
  
  baseURL: {
    allowedHosts: [
      'healthbridge.dev',
      '*.healthbridge.dev',
      'localhost:3000',
      '*.localhost:3000',
      'localhost:3001',
      '*.localhost:3001',
      'localhost:3002',
      '*.localhost:3002',
      'localhost:4000',
      '*.localhost:4000',
      'wellsync.jethb.space',
      '*.wellsync.jethb.space'
    ],
    fallback: 'http://localhost:3000'
  },

  emailAndPassword: {
    enabled: true
  },

  user: {
    additionalFields: {
      roleId: { type: 'string' },
      facilityId: { type: 'string', required: false },
      isFirstLogin: { type: 'boolean', required: false, defaultValue: true },
      isAcceptingConsultations: { type: 'boolean', required: false, defaultValue: true }
    }
  },

  session: {
    expiresIn: 30 * 60, // 30 minutes
    additionalFields: {
      facilityId: { type: 'string', required: false },
      orgId: { type: 'string', required: false },
      roleName: { type: 'string', required: false },
      permissions: { type: 'string[]', required: false }
    }
  },

  advanced: {
    cookiePrefix: 'hb-staff',
    database: {
      generateId: 'uuid'
    }
  },

  databaseHooks: {
    session: {
      create: {
        before: async (session) => {
          const user = await prisma.user.findUnique({
            where: { id: session.userId },
            include: {
              role: {
                include: {
                  permissions: true
                }
              },
              facility: true
            }
          });
          
          if (user) {
            const roleName = user.role?.name || '';
            const resolvedPermissions = user.role?.permissions?.map(p => p.permission) || [];
            
            return {
              data: {
                ...session,
                facilityId: user.facilityId,
                orgId: user.facility?.organizationId || null,
                roleName: roleName,
                permissions: resolvedPermissions
              }
            };
          }
          return { data: session };
        }
      }
    }
  }
});
