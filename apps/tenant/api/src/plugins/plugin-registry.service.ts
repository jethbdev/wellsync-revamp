import { Injectable, Inject, Logger, BadRequestException } from '@nestjs/common';
import { TenantPrismaClient, TenantConnectionManager } from '@healthbridge/database';
import { HealthBridgePlugin, PluginContext, PrismaTransactionClient } from './types.js';

@Injectable()
export class PluginRegistryService {
  private readonly logger = new Logger(PluginRegistryService.name);
  private readonly pluginsMap = new Map<string, HealthBridgePlugin>();

  constructor(
    @Inject('PRISMA_CLIENT') private prisma: TenantPrismaClient
  ) {
    this.registerBuiltInPlugins();
  }

  /**
   * Registers a plugin implementation in the registry
   */
  registerPlugin(plugin: HealthBridgePlugin) {
    this.pluginsMap.set(plugin.id, plugin);
    this.logger.log(`Registered plugin: ${plugin.id} (v${plugin.version})`);
  }

  /**
   * Unregisters a plugin implementation
   */
  unregisterPlugin(pluginId: string) {
    this.pluginsMap.delete(pluginId);
    this.logger.log(`Unregistered plugin: ${pluginId}`);
  }

  /**
   * Resolves list of active plugins for the current tenant context
   */
  async getActivePlugins(): Promise<HealthBridgePlugin[]> {
    try {
      const activeInstalled = await this.prisma.installedPlugin.findMany({
        where: { isActive: true }
      });

      const activePlugins: HealthBridgePlugin[] = [];
      for (const inst of activeInstalled) {
        const impl = this.pluginsMap.get(inst.pluginId);
        if (impl) {
          activePlugins.push(impl);
        }
      }
      return activePlugins;
    } catch (err: any) {
      // In case table doesn't exist yet or connection is resolving, fallback gracefully
      this.logger.warn(`Failed to retrieve active plugins: ${err.message}`);
      return [];
    }
  }

  /**
   * Runs synchronous transactional interceptors within a Prisma Transaction
   */
  async runTransactionHooks(
    hookName: 'beforeConsultationCommit' | 'beforePrescriptionCommit',
    tx: PrismaTransactionClient,
    context: PluginContext
  ): Promise<void> {
    const activePlugins = await this.getActivePlugins();
    for (const plugin of activePlugins) {
      const hook = plugin[hookName];
      if (hook) {
        this.logger.log(`Executing transaction hook [${hookName}] for plugin [${plugin.id}]`);
        await hook(tx, context);
      }
    }
  }

  /**
   * Triggers asynchronous, non-blocking post-commit event emitters
   */
  async emitPostCommit(
    hookName: 'afterConsultationCommit' | 'afterPrescriptionCommit' | 'afterPatientRegister' | 'afterAppointmentCreate' | 'afterAppointmentCheckIn',
    context: PluginContext
  ): Promise<void> {
    // Run async to prevent blocking main response
    const activePlugins = await this.getActivePlugins();
    for (const plugin of activePlugins) {
      const hook = plugin[hookName];
      if (hook) {
        this.logger.log(`Emitting post-commit hook [${hookName}] for plugin [${plugin.id}]`);
        // Execute asynchronously, catch errors to ensure core stability
        Promise.resolve(hook(context)).catch((err) => {
          this.logger.error(`Error executing post-commit hook [${hookName}] in plugin [${plugin.id}]:`, err);
        });
      }
    }
  }

  private registerBuiltInPlugins() {
    // 1. SMS Reminders Plugin
    this.registerPlugin({
      id: 'sms-reminders',
      name: 'SMS Reminders & Notifications',
      version: '1.0.0',
      afterPatientRegister: async (ctx) => {
        const { payload } = ctx;
        const orgSlug = await this.getTenantSlug();
        const claimUrl = `http://${orgSlug}.localhost:3002/claim?tenant=${orgSlug}`;
        this.logger.log(`[SMS Reminders Plugin] Sent SMS invitation to patient ${payload.firstName} ${payload.lastName} (PIN: ${payload.pin}). Claim account at: ${claimUrl}`);
        await this.incrementSmsCount();
      },
      afterAppointmentCreate: async (ctx) => {
        const { payload } = ctx;
        const visitId = payload.visitId;
        if (visitId) {
          await this.prisma.scheduledVisit.update({
            where: { id: visitId },
            data: { smsSent: true }
          });
        }
        this.logger.log(`[SMS Reminders Plugin] Sent SMS confirmation to patient ${payload.patientId} for appointment on ${payload.scheduledDate} at ${payload.scheduledTime}`);
        await this.incrementSmsCount();
      },
      afterPrescriptionCommit: async (ctx) => {
        const { payload } = ctx;
        this.logger.log(`[SMS Reminders Plugin] Sent SMS notification to patient ${payload.patientId}. Prescription Token: ${payload.prescriptionToken}`);
        await this.incrementSmsCount();
      }
    });

    // 2. Teleconsultation Plugin
    this.registerPlugin({
      id: 'teleconsultation',
      name: 'Teleconsultation Suite',
      version: '1.0.0',
      afterAppointmentCreate: async (ctx) => {
        const { payload } = ctx;
        const visitId = payload.visitId;
        if (!visitId) return;

        // Generate mock meeting link and passcode
        const orgSlug = await this.getTenantSlug();
        const meetingLink = `http://${orgSlug}.localhost:3002/room/${visitId}`;
        const passcode = Math.random().toString(36).substring(2, 8).toUpperCase();

        // Save it to the database
        await this.prisma.scheduledVisit.update({
          where: { id: visitId },
          data: {
            meetingLink,
            passcode
          }
        });
        this.logger.log(`[Teleconsultation Plugin] Generated meeting room for visit ${visitId}: Link = ${meetingLink}, Passcode = ${passcode}`);
      }
    });

    // 5. Queue Management Plugin
    this.registerPlugin({
      id: 'queue-management',
      name: 'Queue Management System',
      version: '1.0.0',
      afterAppointmentCheckIn: async (ctx) => {
        const { payload, facilityId } = ctx;
        const visitId = payload.visitId;
        if (!visitId || !facilityId) return;

        // Generate ticket number (A-001, A-002, etc. for appointments)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const count = await this.prisma.queueEntry.count({
          where: {
            facilityId,
            createdAt: { gte: today }
          }
        });

        const ticketNumber = `A-${String(count + 1).padStart(3, '0')}`;
        const doctorId = payload.doctorId;

        // Create Queue Entry
        await this.prisma.queueEntry.create({
          data: {
            facilityId,
            visitId,
            patientId: payload.patientId,
            ticketNumber,
            status: 'WAITING',
            doctorId: doctorId || null
          }
        });
        this.logger.log(`[Queue Plugin] Generated queue ticket ${ticketNumber} for checked-in appointment ${visitId} (Doctor: ${doctorId || 'none'})`);
      }
    });

    // 6. Clinical Inventory Plugin
    this.registerPlugin({
      id: 'clinical-inventory',
      name: 'Clinical Inventory Management',
      version: '1.0.0'
    });
  }

  private async incrementSmsCount() {
    try {
      const orgSlug = await this.getTenantSlug();
      const cpClient = TenantConnectionManager.getControlPlaneClient();
      const org = await cpClient.cpOrganization.findUnique({
        where: { slug: orgSlug }
      });
      if (org) {
        // Find the latest usage metric or create one if not exists
        const latestMetric = await cpClient.cpUsageMetric.findFirst({
          where: { orgId: org.id },
          orderBy: { recordedAt: 'desc' }
        });
        if (latestMetric) {
          await cpClient.cpUsageMetric.update({
            where: { id: latestMetric.id },
            data: { smsSentThisMonth: { increment: 1 } }
          });
          this.logger.log(`[Plugin Metrics] Incremented SMS usage counter for organization: ${org.name}`);
        }
      }
    } catch (err: any) {
      this.logger.error(`[Plugin Metrics] Failed to increment SMS counter on control plane: ${err.message}`);
    }
  }

  private async getTenantSlug(): Promise<string> {
    try {
      const dbResult = await this.prisma.$queryRaw<Array<{ current_database: string }>>`SELECT current_database()`;
      const dbName = dbResult?.[0]?.current_database || '';
      if (dbName.startsWith('healthbridge_tenant_')) {
        return dbName.replace('healthbridge_tenant_', '');
      }
      if (dbName === 'healthbridge_tenant') {
        return 'cebu-clinic';
      }
      const org = await this.prisma.organization.findFirst();
      return org?.slug || 'unknown';
    } catch {
      const org = await this.prisma.organization.findFirst();
      return org?.slug || 'unknown';
    }
  }
}
