import { createAuthClient } from 'better-auth/client';
import { getTenantSlug, getApiBaseUrl } from './api-client';

export const authClient = createAuthClient({
  baseURL: getApiBaseUrl(),
  basePath: '/api/auth/patient',
  advanced: {
    cookiePrefix: 'hb-patient',
  },
  fetchOptions: {
    onRequest: (context) => {
      if (typeof window !== 'undefined') {
        const slug = getTenantSlug();
        if (slug) {
          context.headers.set('x-tenant-slug', slug);
        }
      }
    }
  }
});
