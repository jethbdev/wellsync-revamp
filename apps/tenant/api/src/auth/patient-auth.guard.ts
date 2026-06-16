import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { getPatientAuthForRequest } from './tenant-auth-resolver.js';

@Injectable()
export class PatientAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request & { session?: any }>();
    
    // 1. Resolve patient BetterAuth instance
    let auth;
    try {
      auth = await getPatientAuthForRequest(req);
    } catch (e: any) {
      throw new UnauthorizedException(`Auth instance resolution failed: ${e.message}`);
    }

    // 2. Fetch session from request headers
    const session = await auth.api.getSession({
      headers: req.headers as any
    });

    if (!session) {
      throw new UnauthorizedException('Patient authentication session required');
    }

    // Attach session to request
    req.session = session;
    return true;
  }
}
