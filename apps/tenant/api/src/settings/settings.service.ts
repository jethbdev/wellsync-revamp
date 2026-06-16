import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { TenantPrismaClient, TenantConnectionManager } from '@healthbridge/database';

@Injectable()
export class SettingsService {
  constructor(
    @Inject('PRISMA_CLIENT') private prisma: TenantPrismaClient
  ) {}

  async getSettings(orgId: string, tenantSlug: string) {
    const org = await this.prisma.organization.findUnique({
      where: { id: orgId }
    });
    if (!org) {
      throw new NotFoundException('Organization not found');
    }

    const staffCount = await this.prisma.user.count({ where: { isActive: true } });
    const patientCount = await this.prisma.patient.count();

    let subscription: any = null;
    try {
      const cpClient = TenantConnectionManager.getControlPlaneClient();
      const cpOrg = await cpClient.cpOrganization.findUnique({
        where: { slug: tenantSlug }
      });
      if (cpOrg) {
        subscription = {
          billingPlan: cpOrg.billingPlan,
          maxStaffSeats: cpOrg.maxStaffSeats,
          maxPatientRecords: cpOrg.maxPatientRecords,
          maxStorageMb: cpOrg.maxStorageMb ? Number(cpOrg.maxStorageMb) : 1024,
          customDomain: cpOrg.customDomain,
          status: cpOrg.status,
          trialEndsAt: cpOrg.trialEndsAt,
        };
      }
    } catch (e) {
      console.error('Failed to fetch subscription from control plane', e);
    }

    return {
      id: org.id,
      name: org.name,
      slug: org.slug,
      type: org.type,
      billingEmail: org.billingEmail,
      allowCrossOrgReferrals: org.allowCrossOrgReferrals,
      referralCapacityStatus: org.referralCapacityStatus,
      referralGeographicScope: org.referralGeographicScope,
      acceptedReferralTypes: org.acceptedReferralTypes,
      subscription,
      usage: {
        staffCount,
        patientCount,
        storageMb: 145,
      }
    };
  }

  async updateSettings(
    orgId: string,
    tenantSlug: string,
    data: {
      name?: string;
      billingEmail?: string;
      type?: string;
      allowCrossOrgReferrals?: boolean;
      referralCapacityStatus?: string;
      referralGeographicScope?: string;
      acceptedReferralTypes?: string;
      billingPlan?: string;
    }
  ) {
    // 1. Update local tenant organization table
    const localUpdateData: any = {};
    if (data.name !== undefined) localUpdateData.name = data.name;
    if (data.billingEmail !== undefined) localUpdateData.billingEmail = data.billingEmail;
    if (data.type !== undefined) localUpdateData.type = data.type;
    if (data.allowCrossOrgReferrals !== undefined) localUpdateData.allowCrossOrgReferrals = data.allowCrossOrgReferrals;
    if (data.referralCapacityStatus !== undefined) localUpdateData.referralCapacityStatus = data.referralCapacityStatus;
    if (data.referralGeographicScope !== undefined) localUpdateData.referralGeographicScope = data.referralGeographicScope;
    if (data.acceptedReferralTypes !== undefined) localUpdateData.acceptedReferralTypes = data.acceptedReferralTypes;

    const localOrg = await this.prisma.organization.update({
      where: { id: orgId },
      data: localUpdateData,
    });

    // 2. Sync to Control Plane database
    try {
      const cpClient = TenantConnectionManager.getControlPlaneClient();
      const cpUpdateData: any = {};
      if (data.name !== undefined) cpUpdateData.name = data.name;
      if (data.billingEmail !== undefined) cpUpdateData.billingEmail = data.billingEmail;
      if (data.type !== undefined) cpUpdateData.type = data.type;
      if (data.allowCrossOrgReferrals !== undefined) cpUpdateData.allowCrossOrgReferrals = data.allowCrossOrgReferrals;
      if (data.referralCapacityStatus !== undefined) cpUpdateData.referralCapacityStatus = data.referralCapacityStatus;
      if (data.referralGeographicScope !== undefined) cpUpdateData.referralGeographicScope = data.referralGeographicScope;
      if (data.acceptedReferralTypes !== undefined) cpUpdateData.acceptedReferralTypes = data.acceptedReferralTypes;

      if (data.billingPlan !== undefined) {
        cpUpdateData.billingPlan = data.billingPlan;
        if (data.billingPlan === 'FREE_TRIAL') {
          cpUpdateData.maxStaffSeats = 5;
          cpUpdateData.maxPatientRecords = 500;
          cpUpdateData.maxStorageMb = 1024;
        } else if (data.billingPlan === 'PROFESSIONAL') {
          cpUpdateData.maxStaffSeats = 20;
          cpUpdateData.maxPatientRecords = 5000;
          cpUpdateData.maxStorageMb = 10240;
        } else if (data.billingPlan === 'ENTERPRISE') {
          cpUpdateData.maxStaffSeats = 9999;
          cpUpdateData.maxPatientRecords = 999999;
          cpUpdateData.maxStorageMb = 102400;
        }
      }

      await cpClient.cpOrganization.update({
        where: { slug: tenantSlug },
        data: cpUpdateData,
      });
    } catch (e) {
      console.error('Failed to sync settings to control plane', e);
    }

    return localOrg;
  }
}
