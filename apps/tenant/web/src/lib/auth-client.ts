import { createAuthClient } from 'better-auth/client';
import { getTenantSlug } from './api-client';

const getBaseURL = () => {
  if (typeof window !== 'undefined') {
    return `${window.location.protocol}//${window.location.host}`;
  }
  return 'http://localhost:4000';
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
  basePath: '/api/auth/staff',
  advanced: {
    cookiePrefix: 'hb-staff',
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
