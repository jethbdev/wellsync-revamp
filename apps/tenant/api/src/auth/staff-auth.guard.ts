import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { REQUIRE_PERMISSION_KEY, PermissionRequirement } from './rbac.decorator.js';
import { getStaffAuthForRequest } from './tenant-auth-resolver.js';

@Injectable()
export class StaffAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request & { session?: any }>();
    
    // 1. Resolve staff BetterAuth instance
    let auth;
    try {
      auth = await getStaffAuthForRequest(req);
    } catch (e: any) {
      throw new UnauthorizedException(`Auth instance resolution failed: ${e.message}`);
    }

    // 2. Fetch session from request headers
    const session = await auth.api.getSession({
      headers: req.headers as any
    });

    if (!session) {
      throw new UnauthorizedException('Authentication session required');
    }

    // Attach session to request for downstream usage
    req.session = session;

    // 3. First-login forced password change check
    const isChangePasswordRoute = req.path.includes('/api/auth/staff/change-password') || 
                                  req.path.includes('/api/auth/staff/update-password');

    if (session.user.isFirstLogin && !isChangePasswordRoute) {
      throw new ForbiddenException('FIRST_LOGIN_CHANGE_PASSWORD_REQUIRED');
    }

    // 4. RBAC Permission Check
    const requiredPermission = this.reflector.getAllAndOverride<PermissionRequirement>(
      REQUIRE_PERMISSION_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (requiredPermission) {
      const userPermissions: string[] = session.session?.permissions || [];
      const permissionStr = `${requiredPermission.resource}:${requiredPermission.action}`;
      
      const hasPermission = userPermissions.includes(permissionStr);
      if (!hasPermission) {
        throw new ForbiddenException('INSUFFICIENT_PERMISSIONS');
      }
    }

    return true;
  }
}
