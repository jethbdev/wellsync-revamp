import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';
import { TenantPrismaClient } from '@healthbridge/database';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(
    @Inject('PRISMA_CLIENT') private prisma: TenantPrismaClient
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const req = httpContext.getRequest<Request & { session?: any; prisma?: any }>();
    const method = req.method;

    // Log only data-modifying mutations
    if (method === 'GET') {
      return next.handle();
    }

    const startTime = Date.now();
    const ipAddress = (req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').toString();
    const userAgent = req.headers['user-agent'] || '';

    return next.handle().pipe(
      tap(async (responseBody) => {
        try {
          const session = req.session;
          const userId = session?.user?.id || null;
          const facilityId = session?.session?.facilityId || null;

          // Determine action name and table name from path
          const path = req.path;
          let action = `${method} ${path}`;
          let tableName = 'unknown';
          let recordId = null;

          if (path.includes('/api/patients')) {
            tableName = 'patients';
            action = method === 'POST' ? 'CREATE_PATIENT' : 'UPDATE_PATIENT';
            if (responseBody?.id) recordId = responseBody.id;
          } else if (path.includes('/api/consultations')) {
            tableName = 'consultations';
            action = method === 'POST' ? 'CREATE_CONSULTATION' : 'UPDATE_CONSULTATION';
            if (responseBody?.id) recordId = responseBody.id;
          } else if (path.includes('/api/appointments')) {
            tableName = 'scheduled_visits';
            action = 'CREATE_APPOINTMENT';
            if (responseBody?.id) recordId = responseBody.id;
          } else if (path.includes('/api/households')) {
            tableName = 'households';
            action = 'CREATE_HOUSEHOLD';
            if (responseBody?.id) recordId = responseBody.id;
          }

          // Save audit log to database
          if (req.prisma) {
            await req.prisma.auditLog.create({
              data: {
                userId,
                facilityId,
                action,
                tableName,
                recordId: recordId || null,
                oldValues: null, // Diff-checks can be added later
                newValues: req.body ? req.body : null,
                ipAddress,
                userAgent
              }
            });
          }
        } catch (err) {
          console.error('[AuditInterceptor] Failed to write audit log:', err);
        }
      })
    );
  }
}
