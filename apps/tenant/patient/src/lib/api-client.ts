/**
 * Shared fetch utility for the Patient Portal frontend.
 * Resolves tenant slug from URL query param or subdomain.
 * Adds x-tenant-slug header and credentials for cookie-based auth.
 * Redirects to /login on 401.
 */
export function getTenantSlug(): string {
  if (typeof window === 'undefined') return '';
  
  // 1. Check URL query parameter (dev mode override)
  const urlParams = new URLSearchParams(window.location.search);
  let slug = urlParams.get('tenant');
  
  // 2. Persist to/from sessionStorage in dev mode so client-side navigation works
  if (slug) {
    sessionStorage.setItem('hb_tenant_slug', slug);
  } else {
    slug = sessionStorage.getItem('hb_tenant_slug');
  }

  if (slug) return slug;

  // 3. Fallback to subdomain resolution for production
  // Production pattern: patient.<slug>.wellsync.jethb.space
  const hostname = window.location.hostname;
  const isIP = /^[0-9.]+$/.test(hostname);
  const isExactLocalhost = hostname === 'localhost';

  if (!isIP && !isExactLocalhost) {
    const parts = hostname.split('.');
    // patient.<slug>.<baseDomain> → parts[0]='patient', parts[1]=slug
    if (parts[0] === 'patient' && parts.length > 2) {
      return parts[1];
    }
  }
  return '';
}

export function getApiBaseUrl(): string {
  if (typeof window === 'undefined') return 'http://localhost:4000';
  const { hostname, protocol } = window.location;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:4000';
  }
  // Production pattern: patient.<slug>.wellsync.jethb.space
  // Strip 'patient' + slug prefix → wellsync.jethb.space → api.wellsync.jethb.space
  const parts = hostname.split('.');
  const baseDomain = parts.slice(2).join('.');
  return `${protocol}//api.${baseDomain}`;
}

export async function apiFetch<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const slug = getTenantSlug();
  const baseURL = getApiBaseUrl();

  const res = await fetch(`${baseURL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(slug ? { 'x-tenant-slug': slug } : {}),
      ...options.headers,
    },
    credentials: 'include',
  });

  if (!res.ok) {
    if (res.status === 401) {
      window.location.href = '/login';
      throw new Error('Unauthorized');
    }
    const body = await res.json().catch(() => ({}));
    throw new Error((body as any).message || `API Error: ${res.statusText}`);
  }

  const text = await res.text();
  return text ? (JSON.parse(text) as T) : ({} as T);
}
