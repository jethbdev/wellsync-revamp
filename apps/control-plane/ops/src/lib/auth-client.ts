import { createAuthClient } from 'better-auth/client';
import { twoFactorClient } from 'better-auth/client/plugins';

function getBaseURL(): string {
  if (typeof window === 'undefined') return 'http://localhost:4001';
  if (process.env.NEXT_PUBLIC_CP_API_URL) return process.env.NEXT_PUBLIC_CP_API_URL;
  const { hostname, protocol } = window.location;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:4001';
  }
  const baseDomain = hostname.replace(/^console\./, '');
  return `${protocol}//api.console.${baseDomain}`;
}

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
  plugins: [
    twoFactorClient()
  ]
});
