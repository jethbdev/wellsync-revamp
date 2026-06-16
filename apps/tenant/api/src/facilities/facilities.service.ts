import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { TenantPrismaClient } from '@healthbridge/database';

export interface CreateFacilityDto {
  name: string;
  facilityType: string;
  nhfrCode?: string;
  address?: string;
  contactNumber?: string;
  email?: string;
}

export interface UpdateFacilityDto {
  name?: string;
  facilityType?: string;
  nhfrCode?: string;
  address?: string;
  contactNumber?: string;
  email?: string;
  isActive?: boolean;
}

@Injectable()
export class FacilitiesService {
  constructor(
    @Inject('PRISMA_CLIENT') private prisma: TenantPrismaClient
  ) {}

  async listFacilities() {
    return this.prisma.facility.findMany({
      orderBy: { name: 'asc' }
    });
  }

  async findOne(id: string) {
    const facility = await this.prisma.facility.findUnique({
      where: { id }
    });
    if (!facility) {
      throw new NotFoundException(`Facility with ID ${id} not found`);
    }
    return facility;
  }

  async createFacility(dto: CreateFacilityDto) {
    const org = await this.prisma.organization.findFirst();
    if (!org) {
      throw new BadRequestException('Organization context not found');
    }

    if (dto.nhfrCode) {
      const existing = await this.prisma.facility.findUnique({
        where: { nhfrCode: dto.nhfrCode }
      });
      if (existing) {
        throw new BadRequestException(`Facility with NHFR Code "${dto.nhfrCode}" already exists`);
      }
    }

    return this.prisma.facility.create({
      data: {
        organizationId: org.id,
        name: dto.name,
        facilityType: dto.facilityType,
        nhfrCode: dto.nhfrCode || null,
        address: dto.address || null,
        contactNumber: dto.contactNumber || null,
        email: dto.email || null,
        isActive: true,
      }
    });
  }

  async updateFacility(id: string, dto: UpdateFacilityDto) {
    const existing = await this.prisma.facility.findUnique({
      where: { id }
    });
    if (!existing) {
      throw new NotFoundException(`Facility with ID ${id} not found`);
    }

    if (dto.nhfrCode && dto.nhfrCode !== existing.nhfrCode) {
      const duplicate = await this.prisma.facility.findUnique({
        where: { nhfrCode: dto.nhfrCode }
      });
      if (duplicate) {
        throw new BadRequestException(`Facility with NHFR Code "${dto.nhfrCode}" already exists`);
      }
    }

    return this.prisma.facility.update({
      where: { id },
      data: {
        name: dto.name,
        facilityType: dto.facilityType,
        nhfrCode: dto.nhfrCode !== undefined ? dto.nhfrCode : undefined,
        address: dto.address !== undefined ? dto.address : undefined,
        contactNumber: dto.contactNumber !== undefined ? dto.contactNumber : undefined,
        email: dto.email !== undefined ? dto.email : undefined,
        isActive: dto.isActive !== undefined ? dto.isActive : undefined,
      }
    });
  }

  async deleteFacility(id: string) {
    const existing = await this.prisma.facility.findUnique({
      where: { id }
    });
    if (!existing) {
      throw new NotFoundException(`Facility with ID ${id} not found`);
    }

    return this.prisma.facility.update({
      where: { id },
      data: { isActive: false }
    });
  }
}
