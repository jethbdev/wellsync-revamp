/**
 * Shared fetch utility for the Ops Control Plane frontend.
 * In dev: sends requests to localhost:4001.
 * In prod: sends requests to api.console.<domain> (same origin scheme, derived from window.location).
 */

function getApiBaseUrl(): string {
  if (typeof window === 'undefined') return 'http://localhost:4001';
  if (process.env.NEXT_PUBLIC_CP_API_URL) return process.env.NEXT_PUBLIC_CP_API_URL;
  const { hostname, protocol } = window.location;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:4001';
  }
  // hostname is e.g. "console.wellsync.jethb.space" → strip "console." prefix
  const baseDomain = hostname.replace(/^console\./, '');
  return `${protocol}//api.console.${baseDomain}`;
}

export async function apiFetch<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${getApiBaseUrl()}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
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
    throw new Error((body as any).message || `HTTP error! status: ${res.status}`);
  }

  const text = await res.text();
  return text ? (JSON.parse(text) as T) : ({} as T);
}
