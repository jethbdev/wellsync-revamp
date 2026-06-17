import { betterAuth } from 'better-auth';
import { prismaAdapter } from '@better-auth/prisma-adapter';
import { TenantPrismaClient } from '@healthbridge/database';

export const getPatientAuth = (prisma: TenantPrismaClient): any => betterAuth({
  database: prismaAdapter(prisma, { provider: 'postgresql' }),
  secret: process.env.BETTER_AUTH_SECRET || 'a-very-long-and-secure-32-character-secret-key-patient',
  basePath: '/api/auth/patient',

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
      '*.wellsync.jethb.space',
      '*.patient.wellsync.jethb.space'
    ],
    fallback: 'http://localhost:3002'
  },

  emailAndPassword: {
    enabled: true
  },

  user: {
    modelName: 'Patient',
    fields: {
      // BetterAuth requires a 'name' field; map it to firstName on the Patient model
      name: 'firstName'
    }
  },

  session: {
    modelName: 'PatientSession',
    fields: {
      // BetterAuth internally uses 'userId'; our model calls it 'patientId'
      userId: 'patientId'
    },
    expiresIn: 60 * 60, // 60 minutes
    additionalFields: {
      facilityId: { type: 'string', required: false },
      orgId: { type: 'string', required: false }
    }
  },

  advanced: {
    cookiePrefix: 'hb-patient',
    database: {
      generateId: 'uuid'
    }
  },

  account: {
    modelName: 'PatientAccount',
    fields: {
      // BetterAuth internally uses 'userId'; our model calls it 'patientId'
      userId: 'patientId'
    }
  },

  verification: {
    modelName: 'PatientVerification'
  },

  databaseHooks: {
    session: {
      create: {
        before: async (session) => {
          const patient = await prisma.patient.findUnique({
            where: { id: session.userId },
            include: {
              facility: true
            }
          });
          
          if (patient) {
            return {
              data: {
                ...session,
                facilityId: patient.facilityId,
                orgId: patient.facility?.organizationId || null
              }
            };
          }
          return { data: session };
        }
      }
    }
  }
});
