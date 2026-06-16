import { SetMetadata } from '@nestjs/common';
import { statement } from './staff-auth.js';

export type ResourceType = keyof typeof statement;
export type ActionType<T extends ResourceType> = typeof statement[T][number];

export interface PermissionRequirement {
  resource: ResourceType;
  action: string;
}

export const REQUIRE_PERMISSION_KEY = 'require_permission';

export const RequirePermission = (resource: ResourceType, action: string) => 
  SetMetadata(REQUIRE_PERMISSION_KEY, { resource, action } as PermissionRequirement);
