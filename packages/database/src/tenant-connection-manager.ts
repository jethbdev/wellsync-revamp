import { PrismaClient as TenantPrismaClient } from './generated/tenant/index.js';
import { PrismaClient as ControlPlanePrismaClient } from './generated/control-plane/index.js';

export class TenantConnectionManager {
  private static clients = new Map<string, TenantPrismaClient>();
  
  private static cpClient = new ControlPlanePrismaClient({
    datasources: {
      db: {
        url: process.env.CONTROL_PLANE_DATABASE_URL || 'postgresql://postgres@localhost:5432/healthbridge_control_plane'
      }
    }
  });

  static getControlPlaneClient(): ControlPlanePrismaClient {
    return this.cpClient;
  }

  static async getClient(tenantSlug: string): Promise<TenantPrismaClient> {
    if (!tenantSlug) {
      throw new Error('Tenant slug is required');
    }

    if (this.clients.has(tenantSlug)) {
      return this.clients.get(tenantSlug)!;
    }

    // Lookup organization dbConnectionUri in control-plane database
    const org = await this.cpClient.cpOrganization.findUnique({
      where: { slug: tenantSlug }
    });

    if (!org) {
      throw new Error(`Tenant '${tenantSlug}' not found`);
    }

    if (org.status === 'SUSPENDED') {
      throw new Error(`Tenant '${tenantSlug}' is suspended`);
    }

    if (!org.dbConnectionUri) {
      throw new Error(`Tenant '${tenantSlug}' has no database connection configured`);
    }

    const client = new TenantPrismaClient({
      datasources: {
        db: {
          url: org.dbConnectionUri
        }
      }
    });

    this.clients.set(tenantSlug, client);
    return client;
  }

  // Helper method to clear clients cache (useful for testing or scaling connection pools)
  static async disconnectAll(): Promise<void> {
    for (const client of this.clients.values()) {
      await client.$disconnect();
    }
    this.clients.clear();
    await this.cpClient.$disconnect();
  }
}
