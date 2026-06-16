import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { TenantPrismaClient, TenantConnectionManager } from '@healthbridge/database';
import { CreateReferral } from '@healthbridge/contracts';

@Injectable()
export class ReferralsService {
  constructor(
    @Inject('PRISMA_CLIENT') private prisma: TenantPrismaClient
  ) {}

  async create(consultationId: string, data: CreateReferral & { referringFacilityId: string; createdById: string; patientId?: string }) {
    let consultation = await this.prisma.consultations.findFirst({
      where: { id: consultationId, facilityId: data.referringFacilityId },
      include: {
        patient: true,
        vitalSigns: true,
        prescriptions: true,
        diagnoses: true
      }
    }) as any;

    if (!consultation) {
      // Look up patient using either data.patientId or treating consultationId as patientId
      const targetPatientId = data.patientId || consultationId;
      const patient = await this.prisma.patient.findFirst({
        where: { id: targetPatientId }
      });
      if (!patient) {
        throw new NotFoundException('Patient or Consultation not found');
      }

      // Create a dummy consultation to satisfy foreign key constraint
      consultation = await this.prisma.consultations.create({
        data: {
          facilityId: data.referringFacilityId,
          patientId: patient.id,
          consultationDate: new Date(),
          consultationTime: new Date().toLocaleTimeString('en-US', { hour12: false }).substring(0, 8),
          natureOfVisit: 'NEW_CASE',
          modeOfTransaction: 'WALK_IN',
          status: 'COMPLETED',
          patientAgeYears: 30,
          createdById: data.createdById
        },
        include: {
          patient: true,
          vitalSigns: true,
          prescriptions: true,
          diagnoses: true
        }
      }) as any;
    }

    // Build referral packet if cross-org
    let referralPacket: any = null;
    if (data.receivingOrgSlug) {
      referralPacket = {
        patient: {
          firstName: consultation.patient.firstName,
          lastName: consultation.patient.lastName,
          email: consultation.patient.email,
          contactNumber: consultation.patient.contactNumber,
          birthDate: consultation.patient.birthDate.toISOString(),
          sex: consultation.patient.sex,
          bloodType: consultation.patient.bloodType
        },
        consultation: {
          chiefComplaint: consultation.chiefComplaint || 'Consultation referral',
          treatmentPlan: consultation.treatmentPlan || 'Treatment referral',
          referralReason: data.referralReason,
          clinicalSummary: data.clinicalSummary,
          urgency: data.urgency
        },
        vitals: data.consentLevel === 'FULL' ? consultation.vitalSigns.map((v: any) => ({
          bpSystolic: v.bpSystolic,
          bpDiastolic: v.bpDiastolic,
          heartRate: v.heartRate,
          temperature: v.temperature,
          weightKg: v.weightKg,
          heightCm: v.heightCm
        })) : [],
        prescriptions: data.consentLevel === 'FULL' ? consultation.prescriptions.map((p: any) => ({
          brandName: p.brandName,
          genericName: p.genericName,
          dosage: p.dosage,
          frequency: p.frequency,
          durationDays: p.durationDays
        })) : [],
        diagnoses: data.consentLevel === 'FULL' ? consultation.diagnoses.map((d: any) => ({
          icd10Code: d.icd10Code,
          description: d.icd10Description
        })) : []
      };
    }

    const referral = await this.prisma.referral.create({
      data: {
        consultationId: consultation.id,
        patientId: consultation.patientId,
        referringFacilityId: data.referringFacilityId,
        referralType: data.referralType,
        urgency: data.urgency,
        referralReason: data.referralReason,
        clinicalSummary: data.clinicalSummary || null,
        consentLevel: data.consentLevel || 'FULL',
        consentRecordedAt: data.receivingOrgSlug ? new Date() : null,
        receivingFacilityId: data.receivingFacilityId || null,
        receivingOrgSlug: data.receivingOrgSlug || null,
        receivingFacilityName: data.receivingFacilityName || null,
        referralPacket: referralPacket || null,
        createdById: data.createdById,
        status: 'PENDING'
      }
    });

    // If cross-org, sync to target database
    if (data.receivingOrgSlug) {
      try {
        const targetPrisma = await TenantConnectionManager.getClient(data.receivingOrgSlug);
        
        const targetFacility = await targetPrisma.facility.findFirst({
          where: { name: { contains: data.receivingFacilityName || '' } }
        }) || await targetPrisma.facility.findFirst();

        if (targetFacility) {
          let targetPatient = await targetPrisma.patient.findFirst({
            where: {
              firstName: consultation.patient.firstName,
              lastName: consultation.patient.lastName,
              birthDate: consultation.patient.birthDate
            }
          });

          if (!targetPatient) {
            targetPatient = await targetPrisma.patient.create({
              data: {
                facilityId: targetFacility.id,
                firstName: consultation.patient.firstName,
                lastName: consultation.patient.lastName,
                email: consultation.patient.email,
                contactNumber: consultation.patient.contactNumber,
                birthDate: consultation.patient.birthDate,
                sex: consultation.patient.sex,
                bloodType: consultation.patient.bloodType || 'O_POSITIVE',
                pin: consultation.patient.pin || `PIN-${Math.random().toString(36).substring(3, 9).toUpperCase()}`
              }
            });
          }

          await targetPrisma.referral.create({
            data: {
              id: referral.id,
              consultationId: referral.consultationId,
              patientId: targetPatient.id,
              referringFacilityId: referral.referringFacilityId,
              referralType: referral.referralType,
              urgency: referral.urgency,
              referralReason: referral.referralReason,
              clinicalSummary: referral.clinicalSummary,
              consentLevel: referral.consentLevel,
              receivingFacilityId: targetFacility.id,
              receivingOrgSlug: referral.receivingOrgSlug,
              receivingFacilityName: referral.receivingFacilityName,
              referralPacket: referralPacket || null,
              status: 'PENDING'
            }
          });
        }
      } catch (e) {
        console.error('Failed to sync cross-org referral to target tenant', e);
      }
    }

    return referral;
  }

  async findAll(facilityId: string) {
    return this.prisma.referral.findMany({
      where: {
        OR: [
          { referringFacilityId: facilityId },
          { receivingFacilityId: facilityId }
        ]
      },
      include: {
        patient: true,
        referringFacility: true,
        receivingFacility: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findNetworkOrgs() {
    const cpClient = TenantConnectionManager.getControlPlaneClient();
    return cpClient.cpOrganization.findMany({
      where: { allowCrossOrgReferrals: true },
      select: {
        id: true,
        name: true,
        slug: true,
        referralCapacityStatus: true,
        referralGeographicScope: true,
        acceptedReferralTypes: true
      }
    });
  }

  async accept(id: string, facilityId: string) {
    const referral = await this.prisma.referral.update({
      where: { id },
      data: {
        status: 'ACCEPTED',
        acceptedAt: new Date(),
        receivingFacilityId: facilityId
      }
    });

    // Sync status back to other databases
    await this.syncStatusToOtherDBs(id, 'ACCEPTED');
    return referral;
  }

  async decline(id: string, reason: string) {
    const referral = await this.prisma.referral.update({
      where: { id },
      data: {
        status: 'DECLINED',
        declinedAt: new Date(),
        declineReason: reason
      }
    });

    // Sync status back to other databases
    await this.syncStatusToOtherDBs(id, 'DECLINED', reason);
    return referral;
  }

  async saveOutcome(id: string, notes: string) {
    const referral = await this.prisma.referral.update({
      where: { id },
      data: {
        outcomeNotes: notes,
        outcomeSentAt: new Date()
      }
    });

    // Sync outcome back to other databases
    await this.syncOutcomeToOtherDBs(id, notes);
    return referral;
  }

  private async syncStatusToOtherDBs(id: string, status: string, declineReason?: string) {
    try {
      const cpClient = TenantConnectionManager.getControlPlaneClient();
      const allOrgs = await cpClient.cpOrganization.findMany();
      for (const org of allOrgs) {
        try {
          const client = await TenantConnectionManager.getClient(org.slug);
          const exists = await client.referral.findUnique({ where: { id } });
          if (exists) {
            await client.referral.update({
              where: { id },
              data: {
                status,
                acceptedAt: status === 'ACCEPTED' ? new Date() : null,
                declinedAt: status === 'DECLINED' ? new Date() : null,
                declineReason: declineReason || null
              }
            });
          }
        } catch {}
      }
    } catch (e) {
      console.error('Failed to sync status to other databases', e);
    }
  }

  private async syncOutcomeToOtherDBs(id: string, outcomeNotes: string) {
    try {
      const cpClient = TenantConnectionManager.getControlPlaneClient();
      const allOrgs = await cpClient.cpOrganization.findMany();
      for (const org of allOrgs) {
        try {
          const client = await TenantConnectionManager.getClient(org.slug);
          const exists = await client.referral.findUnique({ where: { id } });
          if (exists) {
            await client.referral.update({
              where: { id },
              data: {
                outcomeNotes,
                outcomeSentAt: new Date()
              }
            });
          }
        } catch {}
      }
    } catch (e) {
      console.error('Failed to sync outcome to other databases', e);
    }
  }
}
