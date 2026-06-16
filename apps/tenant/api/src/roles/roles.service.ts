import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { TenantPrismaClient } from '@healthbridge/database';

export interface CreateRoleDto {
  name: string;
  description?: string;
  scope: string; // FACILITY or ORG_WIDE
  permissions: string[];
  color?: string;
  icon?: string;
}

export interface UpdateRoleDto {
  name?: string;
  description?: string;
  scope?: string;
  permissions?: string[];
  color?: string;
  icon?: string;
}

@Injectable()
export class RolesService {
  constructor(
    @Inject('PRISMA_CLIENT') private prisma: TenantPrismaClient
  ) {}

  async listRoles() {
    const roles = await this.prisma.role.findMany({
      include: {
        permissions: { select: { permission: true } }
      },
      orderBy: { name: 'asc' }
    });

    return roles.map(role => ({
      id: role.id,
      name: role.name,
      description: role.description,
      scope: role.scope,
      color: role.color,
      icon: role.icon,
      permissions: role.permissions.map(p => p.permission)
    }));
  }

  async findOne(id: string) {
    const role = await this.prisma.role.findUnique({
      where: { id },
      include: {
        permissions: { select: { permission: true } }
      }
    });

    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    return {
      id: role.id,
      name: role.name,
      description: role.description,
      scope: role.scope,
      color: role.color,
      icon: role.icon,
      permissions: role.permissions.map(p => p.permission)
    };
  }

  async createRole(dto: CreateRoleDto) {
    // Validate scope
    if (dto.scope !== 'FACILITY' && dto.scope !== 'ORG_WIDE') {
      throw new BadRequestException('Scope must be either FACILITY or ORG_WIDE');
    }

    const existing = await this.prisma.role.findFirst({
      where: { name: { equals: dto.name, mode: 'insensitive' } }
    });
    if (existing) {
      throw new BadRequestException(`Role "${dto.name}" already exists`);
    }

    return this.prisma.$transaction(async (tx) => {
      const role = await tx.role.create({
        data: {
          name: dto.name,
          description: dto.description || null,
          scope: dto.scope,
          color: dto.color || null,
          icon: dto.icon || null,
        }
      });

      if (dto.permissions && dto.permissions.length > 0) {
        await tx.permission.createMany({
          data: dto.permissions.map(perm => ({
            roleId: role.id,
            permission: perm
          }))
        });
      }

      return {
        id: role.id,
        name: role.name,
        description: role.description,
        scope: role.scope,
        color: role.color,
        icon: role.icon,
        permissions: dto.permissions
      };
    });
  }

  async updateRole(id: string, dto: UpdateRoleDto) {
    const existing = await this.prisma.role.findUnique({
      where: { id }
    });
    if (!existing) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    const DEFAULT_ROLES = ['System Admin'];
    
    if (DEFAULT_ROLES.includes(existing.name)) {
      if (dto.name && dto.name !== existing.name) {
        throw new BadRequestException(`Cannot rename default system role "${existing.name}"`);
      }
      if (dto.permissions !== undefined) {
        throw new BadRequestException(`Cannot modify permissions of default system role "${existing.name}"`);
      }
      if (dto.description !== undefined && dto.description !== (existing.description || undefined)) {
        throw new BadRequestException(`Cannot modify description of default system role "${existing.name}"`);
      }
      if (dto.scope !== undefined && dto.scope !== existing.scope) {
        throw new BadRequestException(`Cannot modify scope of default system role "${existing.name}"`);
      }
      if (dto.color !== undefined && dto.color !== (existing.color || undefined)) {
        throw new BadRequestException(`Cannot modify color of default system role "${existing.name}"`);
      }
      if (dto.icon !== undefined && dto.icon !== (existing.icon || undefined)) {
        throw new BadRequestException(`Cannot modify icon of default system role "${existing.name}"`);
      }
    }

    return this.prisma.$transaction(async (tx) => {
      const role = await tx.role.update({
        where: { id },
        data: {
          name: dto.name,
          description: dto.description !== undefined ? dto.description : undefined,
          scope: dto.scope !== undefined ? dto.scope : undefined,
          color: dto.color !== undefined ? dto.color : undefined,
          icon: dto.icon !== undefined ? dto.icon : undefined,
        }
      });

      if (dto.permissions !== undefined) {
        // Clear old permissions
        await tx.permission.deleteMany({
          where: { roleId: id }
        });

        // Add new permissions
        if (dto.permissions.length > 0) {
          await tx.permission.createMany({
            data: dto.permissions.map(perm => ({
              roleId: id,
              permission: perm
            }))
          });
        }
      }

      return {
        id: role.id,
        name: role.name,
        description: role.description,
        scope: role.scope,
        color: role.color,
        icon: role.icon,
        permissions: dto.permissions !== undefined ? dto.permissions : []
      };
    });
  }

  async deleteRole(id: string) {
    const existing = await this.prisma.role.findUnique({
      where: { id }
    });
    if (!existing) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    const DEFAULT_ROLES = ['System Admin'];
    if (DEFAULT_ROLES.includes(existing.name)) {
      throw new BadRequestException(`Default system role "${existing.name}" cannot be deleted`);
    }

    // Check if role is in use
    const userCount = await this.prisma.user.count({
      where: { roleId: id }
    });
    if (userCount > 0) {
      throw new BadRequestException(`Cannot delete role "${existing.name}" because it is currently assigned to ${userCount} user(s)`);
    }

    // Delete permissions first
    await this.prisma.permission.deleteMany({
      where: { roleId: id }
    });

    return this.prisma.role.delete({
      where: { id }
    });
  }
}
