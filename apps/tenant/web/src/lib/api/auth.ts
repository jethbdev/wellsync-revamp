/**
 * Layer 1 — Auth API (Staff)
 * Pure fetch functions — no React, no hooks.
 */
import { authClient } from '../auth-client';

export async function signInStaff(email: string, password: string) {
  const result = await authClient.signIn.email({ email, password });
  if (result.error) throw new Error(result.error.message || 'Invalid credentials');
  return result.data;
}

export async function signOutStaff() {
  await authClient.signOut();
}

export async function getStaffSession() {
  const result = await authClient.getSession();
  return result.data;
}
