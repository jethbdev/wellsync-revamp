/**
 * Layer 2 — Plugins React Query hooks (Staff)
 * Manual cache updates per spec §3.6 mutation rules.
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchPlugins,
  togglePlugin,
  installPlugin,
  type Plugin,
  type InstalledPluginRow,
} from '../../api/plugins';

export function usePlugins() {
  return useQuery({
    queryKey: ['plugins'],
    queryFn: fetchPlugins,
  });
}

export function useTogglePlugin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => togglePlugin(id),
    onSuccess: (updatedPlugin: InstalledPluginRow) => {
      // Update status field in list cache matching pluginId
      queryClient.setQueryData<Plugin[]>(['plugins'], (old = []) =>
        old.map((p) =>
          p.id === updatedPlugin.pluginId
            ? { ...p, isActive: updatedPlugin.isActive }
            : p
        )
      );
    },
  });
}

export function useInstallPlugin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => installPlugin(id),
    onSuccess: (updatedPlugin: InstalledPluginRow) => {
      // Update installation and active status in list cache matching pluginId
      queryClient.setQueryData<Plugin[]>(['plugins'], (old = []) =>
        old.map((p) =>
          p.id === updatedPlugin.pluginId
            ? { ...p, installed: true, isActive: updatedPlugin.isActive }
            : p
        )
      );
    },
  });
}
