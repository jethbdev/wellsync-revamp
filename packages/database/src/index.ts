import { PrismaClient as TenantPrismaClient } from './generated/tenant/index.js';
import { PrismaClient as ControlPlanePrismaClient } from './generated/control-plane/index.js';
import { TenantConnectionManager } from './tenant-connection-manager.js';

export { TenantPrismaClient, ControlPlanePrismaClient, TenantConnectionManager };

// Export the full namespace types under aliases to prevent naming collisions in consumer apps
export * as TenantTypes from './generated/tenant/index.js';
export * as ControlPlaneTypes from './generated/control-plane/index.js';
