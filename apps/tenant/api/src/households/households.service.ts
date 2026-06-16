import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { TenantPrismaClient } from '@healthbridge/database';

@Injectable()
export class HouseholdsService {
  constructor(
    @Inject('PRISMA_CLIENT') private prisma: TenantPrismaClient
  ) {}

  async createHousehold(data: { address: string; barangayCode: string; householdCode?: string; facilityId: string }) {
    const householdCode = data.householdCode || `HH-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    return this.prisma.household.create({
      data: {
        address: data.address,
        barangayCode: data.barangayCode,
        householdCode,
        facilityId: data.facilityId
      }
    });
  }

  async addRelationship(data: {
    patientId: string;
    relatedPatientId: string;
    relationshipType: string;
    householdId?: string;
    isHead?: boolean;
  }) {
    if (data.patientId === data.relatedPatientId) {
      throw new BadRequestException('A patient cannot have a relationship with themselves');
    }

    // Upsert relationship
    return this.prisma.patientRelationship.upsert({
      where: {
        patientId_relatedPatientId: {
          patientId: data.patientId,
          relatedPatientId: data.relatedPatientId
        }
      },
      update: {
        relationshipType: data.relationshipType,
        householdId: data.householdId,
        isHead: data.isHead ?? false
      },
      create: {
        patientId: data.patientId,
        relatedPatientId: data.relatedPatientId,
        relationshipType: data.relationshipType,
        householdId: data.householdId,
        isHead: data.isHead ?? false
      },
      include: {
        patient: true,
        relatedPatient: true,
        household: true
      }
    });
  }

  async getFamilyTree(patientId: string) {
    return this.prisma.patientRelationship.findMany({
      where: {
        OR: [
          { patientId },
          { relatedPatientId: patientId }
        ]
      },
      include: {
        patient: true,
        relatedPatient: true,
        household: true
      }
    });
  }
}
