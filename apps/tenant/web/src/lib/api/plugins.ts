/**
 * Layer 1 — Plugins API (Staff)
 * Pure fetch functions — no React, no hooks.
 */
import { apiFetch } from '../api-client';

export interface Plugin {
  id: string;
  name: string;
  description?: string;
  version?: string;
  installed: boolean;
  isActive: boolean;
  category?: string;
}

export interface InstalledPluginRow {
  id: string;
  orgId: string;
  facilityId?: string | null;
  pluginId: string;
  installedById: string;
  isActive: boolean;
  config: any;
  createdAt: string;
  updatedAt: string;
}

export async function fetchPlugins(): Promise<Plugin[]> {
  return apiFetch<Plugin[]>('/api/plugins');
}

export async function togglePlugin(id: string): Promise<InstalledPluginRow> {
  return apiFetch<InstalledPluginRow>(`/api/plugins/${id}/toggle`, { method: 'POST' });
}

export async function installPlugin(id: string): Promise<InstalledPluginRow> {
  return apiFetch<InstalledPluginRow>(`/api/plugins/${id}/install`, { method: 'POST' });
}
