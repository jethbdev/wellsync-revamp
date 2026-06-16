import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';
import { getOpsAuth } from './ops-auth.js';
import { ControlPlanePrismaClient } from '@healthbridge/database';

@Injectable()
export class OpsAuthGuard implements CanActivate {
  private prisma = new ControlPlanePrismaClient({
    datasources: {
      db: {
        url: process.env.CONTROL_PLANE_DATABASE_URL || 'postgresql://postgres@localhost:5432/healthbridge_control_plane'
      }
    }
  });
  private auth = getOpsAuth(this.prisma);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request & { session?: any }>();

    // 1. IP Whitelist Check
    const clientIp = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const whitelistStr = process.env.OPS_IP_WHITELIST;
    
    if (whitelistStr) {
      const whitelist = whitelistStr.split(',').map(ip => ip.trim());
      // Handle IPv4-mapped IPv6 address formats
      const cleanIp = typeof clientIp === 'string' ? clientIp.replace(/^::ffff:/, '') : '';
      
      const isAllowed = whitelist.some(allowedIp => {
        return cleanIp === allowedIp || cleanIp === '::1' && allowedIp === '127.0.0.1';
      });

      if (!isAllowed) {
        throw new ForbiddenException('IP_ADDRESS_NOT_WHITELISTED');
      }
    }

    // 2. Fetch Session via BetterAuth
    const session = await this.auth.api.getSession({
      headers: req.headers as any
    });

    if (!session) {
      throw new UnauthorizedException('Ops session required');
    }

    // Attach session to request
    req.session = session;

    // 3. Enforce MFA (Mandatory for Control Plane Ops)
    // BetterAuth twoFactor plugin sets twoFactorEnabled on user and twoFactorVerified on session
    const isMfaRoute = req.path.includes('/api/auth/two-factor') || 
                       req.path.includes('/api/auth/verify');

    if (session.user.twoFactorEnabled && !(session.session as any).twoFactorVerified && !isMfaRoute) {
      throw new ForbiddenException('MFA_REQUIRED');
    }

    return true;
  }
}
