import { TenantPrismaClient } from '@healthbridge/database';

export interface PluginContext {
  orgId: string;
  facilityId?: string;
  userId?: string;
  payload: any;
}

export type PrismaTransactionClient = Omit<
  TenantPrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

export interface HealthBridgePlugin {
  id: string;
  name: string;
  version: string;
  
  // Synchronous transactional hooks (runs inside transaction, throws to rollback)
  beforeConsultationCommit?: (tx: PrismaTransactionClient, ctx: PluginContext) => Promise<void>;
  beforePrescriptionCommit?: (tx: PrismaTransactionClient, ctx: PluginContext) => Promise<void>;

  // Asynchronous post-commit hooks (runs after commit, non-blocking)
  afterConsultationCommit?: (ctx: PluginContext) => Promise<void>;
  afterPrescriptionCommit?: (ctx: PluginContext) => Promise<void>;
  afterPatientRegister?: (ctx: PluginContext) => Promise<void>;
  afterAppointmentCreate?: (ctx: PluginContext) => Promise<void>;
  afterAppointmentCheckIn?: (ctx: PluginContext) => Promise<void>;
}
