import { betterAuth } from 'better-auth';
import { prismaAdapter } from '@better-auth/prisma-adapter';
import { twoFactor } from 'better-auth/plugins';
import { ControlPlanePrismaClient } from '@healthbridge/database';

export const getOpsAuth = (prisma: ControlPlanePrismaClient): any => betterAuth({
  database: prismaAdapter(prisma, { provider: 'postgresql' }),
  secret: process.env.BETTER_AUTH_SECRET || 'a-very-long-and-secure-32-character-secret-key-ops',
  appName: 'HealthBridge Control Plane',

  baseURL: {
    allowedHosts: [
      'healthbridge.dev',
      '*.healthbridge.dev',
      'localhost:3000',
      '*.localhost:3000',
      'localhost:3001',
      '*.localhost:3001',
      'localhost:4000',
      '*.localhost:4000',
      'jethb.space',
      '*.jethb.space',
      'wellsync.jethb.space',
      '*.wellsync.jethb.space'
    ],
    fallback: 'http://localhost:4001'
  },

  emailAndPassword: {
    enabled: true
  },

  user: {
    modelName: 'CpUser'
  },

  session: {
    modelName: 'CpSession',
    expiresIn: 30 * 60 // 30 minutes
  },

  advanced: {
    cookiePrefix: 'hb-ops',
    database: {
      generateId: 'uuid'
    }
  },

  account: {
    modelName: 'CpAccount'
  },

  verification: {
    modelName: 'CpVerification'
  },

  plugins: [
    twoFactor()
  ]
});
