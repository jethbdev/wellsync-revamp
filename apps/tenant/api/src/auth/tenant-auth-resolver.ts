import { Request } from 'express';
import { TenantConnectionManager, TenantPrismaClient } from '@healthbridge/database';
import { getStaffAuth } from './staff-auth.js';
import { getPatientAuth } from './patient-auth.js';

// Cache BetterAuth instances per tenant slug
const staffAuthCache = new Map<string, any>();
const patientAuthCache = new Map<string, any>();

export function getTenantSlug(req: Request): string {
  const slugHeader = req.headers['x-tenant-slug'];
  if (slugHeader && typeof slugHeader === 'string') {
    return slugHeader;
  }
  
  const host = req.headers.host || '';
  const hostName = host.split(':')[0];
  
  const isIP = /^[0-9.]+$/.test(hostName);
  const isExactLocalhost = hostName === 'localhost';
  
  if (!isIP && !isExactLocalhost) {
    const parts = hostName.split('.');
    if (parts.length > 1) {
      const subdomain = parts[0];
      // Ignore standard subdomains to extract organic tenant slug
      if (subdomain !== 'www' && subdomain !== 'ops' && subdomain !== 'api') {
        return subdomain;
      }
    }
  }
  return '';
}

export async function getTenantPrisma(req: Request): Promise<TenantPrismaClient> {
  const slug = getTenantSlug(req);
  if (!slug) {
    throw new Error('Tenant context missing (header x-tenant-slug or subdomain not provided)');
  }
  return TenantConnectionManager.getClient(slug);
}

export async function getStaffAuthForRequest(req: Request) {
  const slug = getTenantSlug(req);
  if (!slug) {
    throw new Error('Tenant context missing');
  }
  let auth = staffAuthCache.get(slug);
  if (!auth) {
    const prisma = await TenantConnectionManager.getClient(slug);
    auth = getStaffAuth(prisma);
    staffAuthCache.set(slug, auth);
  }
  return auth;
}

export async function getPatientAuthForRequest(req: Request) {
  const slug = getTenantSlug(req);
  if (!slug) {
    throw new Error('Tenant context missing');
  }
  let auth = patientAuthCache.get(slug);
  if (!auth) {
    const prisma = await TenantConnectionManager.getClient(slug);
    auth = getPatientAuth(prisma);
    patientAuthCache.set(slug, auth);
  }
  return auth;
}
