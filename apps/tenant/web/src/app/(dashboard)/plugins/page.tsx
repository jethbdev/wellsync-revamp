"use client";

import * as React from "react";
import { useDashboard } from "../dashboard-context";
import { Modal, Toast, Switch } from "@healthbridge/ui";

const pluginMetadata: Record<
  string,
  {
    category: string;
    author: string;
    color: string;
    icon: React.ReactNode;
  }
> = {
  "sms-reminders": {
    category: "Communications",
    author: "Visayas HealthTech",
    color: "yellow",
    icon: (
      <svg viewBox="0 0 15 15">
        <rect x="1.5" y="2.5" width="12" height="8.5" rx="2" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M4.5 13.5l2-2.5h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  "teleconsultation": {
    category: "Clinical Extensions",
    author: "HealthBridge Labs",
    color: "green",
    icon: (
      <svg viewBox="0 0 15 15">
        <rect x="1.5" y="3" width="9" height="9" rx="2" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M10.5 6.5l3-2v6l-3-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  "queue-management": {
    category: "Clinical Extensions",
    author: "HealthBridge Labs",
    color: "blue",
    icon: (
      <svg viewBox="0 0 15 15">
        <rect x="2" y="2" width="11" height="11" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <rect x="5" y="5" width="5" height="5" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
  "clinical-inventory": {
    category: "Clinical Extensions",
    author: "HealthBridge Labs",
    color: "blue",
    icon: (
      <svg viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M7.5 1.5L2 4.5v6l5.5 3 5.5-3v-6L7.5 1.5zM2 4.5l5.5 3 5.5-3M7.5 7.5v6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
};

const pluginDetailsMap: Record<
  string,
  {
    longDescription: string;
    features: string[];
    requirements: string;
    permissions: string[];
    installedDate?: string;
  }
> = {
  "sms-reminders": {
    longDescription:
      "Sends automated appointment reminders, lab result notices, and follow-up texts to patients via SMS.",
    features: [
      "Automated appointment confirmation SMS alerts (2 days prior).",
      "Direct secure link dispatch for prescription QR codes.",
      "Staff notifications for critical inventory or vital warnings.",
      "Customizable SMS templates for multi-language localizations.",
    ],
    requirements: "Requires SMS API configuration and active internet link.",
    permissions: [
      "Send SMS notifications to patients",
      "Read patient registration contact numbers",
      "Access appointment schedules and vital records",
    ],
    installedDate: "Mar 05, 2026",
  },
  "teleconsultation": {
    longDescription:
      "Enables secure video consultations, virtual waiting rooms, and remote video diagnostics for patients directly inside the HealthBridge portal.",
    features: [
      "Auto-generated virtual meeting rooms upon appointment creation.",
      "Passcode protection for clinician and patient privacy.",
      "One-click video room launch from schedule calendar.",
      "Direct web-based WebRTC conferencing with no third-party installations.",
    ],
    requirements: "Requires modern browser, stable internet connection, and camera/microphone permissions.",
    permissions: [
      "Access and update scheduled visit credentials",
      "Generate secure room tokens and passcodes",
    ],
    installedDate: "Jun 16, 2026",
  },
  "queue-management": {
    longDescription:
      "Manages walk-in and appointment queues, generates tickets, and runs public waiting display board with TTS notifications.",
    features: [
      "Walk-in and appointment queue registrations.",
      "Printable ticket generation.",
      "Anonymous public TV display board interface.",
      "Text-to-Speech audio notifications for ticket calls.",
    ],
    requirements: "Requires sound output devices for TTS alerts.",
    permissions: [
      "Manage waiting queues",
      "Access schedule booking lists",
    ],
    installedDate: "Jun 16, 2026",
  },
  "clinical-inventory": {
    longDescription:
      "Provides a clinic-friendly inventory system to monitor shelf stocks, track drug expiry dates (FEFO), configure storage coordinates, and log waste discard metrics.",
    features: [
      "Track medicine and supply quantities on hand.",
      "Manage expiries using First Expired First Out (FEFO) rules.",
      "Generate grid storage bin coordinates for easy pick/pack routing.",
      "Chronological audit ledger log of all stock movements.",
    ],
    requirements: "Requires permissions to manage facility stock assets.",
    permissions: [
      "Read stock levels and expiration dates",
      "Receive deliveries and log discards",
      "Manage storage locations and bin grids",
    ],
    installedDate: "Jun 16, 2026",
  },
};

export default function PluginsPage() {
  const { plugins, handleTogglePlugin, handleInstallPlugin, session } = useDashboard();
  const [searchQuery, setSearchQuery] = React.useState("");
  
  const isSystemAdmin = session?.session?.roleName === "System Admin";

  if (!isSystemAdmin && session) {
    return (
      <div className="panel active">
        <div style={{ padding: "60px", textAlign: "center" }}>
          <h3 style={{ color: "var(--ink)", marginBottom: "8px" }}>Access Denied</h3>
          <p style={{ color: "var(--muted)", fontSize: "14px" }}>You need System Admin access to manage plugins.</p>
        </div>
      </div>
    );
  }
  const [categoryFilter, setCategoryFilter] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");

  // Custom toast notification details
  const [showToast, setShowToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");

  // States for handling details modal
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);
  const [selectedDetailsPlugin, setSelectedDetailsPlugin] = React.useState<any>(null);

  const triggerLocalToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
  };

  React.useEffect(() => {
    if (showToast) {
      const t = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(t);
    }
  }, [showToast]);

  const handleToggleOrEnable = async (plugin: any) => {
    if (!plugin.installed) {
      try {
        await handleInstallPlugin(plugin.id);
        triggerLocalToast(`${plugin.name} has been installed.`);
      } catch (err: any) {
        triggerLocalToast(err.message || "Failed to install plugin");
      }
    } else {
      try {
        await handleTogglePlugin(plugin.id);
        triggerLocalToast(
          `${plugin.name} has been ${plugin.isActive ? "disabled" : "enabled"}.`
        );
      } catch (err: any) {
        triggerLocalToast(err.message || "Failed to toggle plugin");
      }
    }
  };

  // Combine real plugins with their metadata
  const allPlugins = React.useMemo(() => {
    return plugins.map((p) => {
      const meta = pluginMetadata[p.id] || {
        category: "Clinical Extensions",
        author: "HealthBridge Labs",
        color: "blue",
        icon: (
          <svg viewBox="0 0 15 15">
            <rect x="1.5" y="1.5" width="12" height="12" rx="2" />
          </svg>
        ),
      };
      return {
        ...p,
        ...meta,
        isMarketplace: false,
      };
    });
  }, [plugins]);

  // Filter plugins based on search query, category and status
  const filteredPlugins = React.useMemo(() => {
    return allPlugins.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q));
      const matchesCategory = !categoryFilter || p.category === categoryFilter;
      const matchesStatus =
        !statusFilter ||
        (statusFilter === "enabled" ? p.isActive : !p.isActive);
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [allPlugins, searchQuery, categoryFilter, statusFilter]);

  const activeDetailsPlugin = React.useMemo(() => {
    if (!selectedDetailsPlugin) return null;
    return (
      allPlugins.find((p) => p.id === selectedDetailsPlugin.id) ||
      selectedDetailsPlugin
    );
  }, [allPlugins, selectedDetailsPlugin]);

  return (
    <div className="panel active">
      <div className="panel-inner">
        <div className="ph">
          <div className="ph-left">
            <h2>Plugins</h2>
            <p>Extend HealthBridge EMR with optional clinical features and integrations</p>
          </div>
        </div>

        <div
          className="tbl-head"
          style={{ padding: "0 0 16px 0", borderBottom: "none" }}
        >
          <div className="tbl-search" style={{ flex: 1, maxWidth: "320px" }}>
            <svg viewBox="0 0 16 16">
              <circle
                cx="7"
                cy="7"
                r="5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M10.5 10.5l3 3"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <input
              id="pg-search"
              type="text"
              placeholder="Search plugins…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: "none",
                background: "none",
                outline: "none",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "12px",
                color: "var(--ink)",
                width: "100%",
              }}
            />
          </div>
          <div className="tbl-filters">
            <select
              id="pg-filter-category"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{
                border: "1.5px solid var(--border-subtle)",
                borderRadius: "var(--rsm)",
                padding: "5px 10px",
                fontSize: "11px",
                fontFamily: "'DM Sans',sans-serif",
                background: "var(--white)",
                color: "var(--muted)",
                outline: "none",
              }}
            >
               <option value="">All categories</option>
              <option value="Clinical Extensions">Clinical Extensions</option>
              <option value="Communications">Communications</option>
            </select>
            <select
              id="pg-filter-status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                border: "1.5px solid var(--border-subtle)",
                borderRadius: "var(--rsm)",
                padding: "5px 10px",
                fontSize: "11px",
                fontFamily: "'DM Sans',sans-serif",
                background: "var(--white)",
                color: "var(--muted)",
                outline: "none",
              }}
            >
              <option value="">All statuses</option>
              <option value="enabled">Enabled</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>
        </div>

        {filteredPlugins.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px 0",
              color: "var(--muted)",
              background: "var(--white)",
              borderRadius: "var(--rlg)",
              border: "1px solid var(--border)",
            }}
          >
            No plugins match your current filters.
          </div>
        ) : (
          <div className="plugin-grid" id="plugin-grid">
            {filteredPlugins.map((plugin) => {
              const isEnabled = plugin.isActive;
              return (
                <div
                  key={plugin.id}
                  className={`plugin-card ${isEnabled ? "" : "disabled"}`}
                  id={`plugin-card-${plugin.id}`}
                  data-name={plugin.name}
                  data-category={plugin.category}
                  data-status={isEnabled ? "enabled" : "disabled"}
                >
                  <div className="plugin-card-top">
                    <div className={`plugin-icon ${plugin.color}`}>
                      {plugin.icon}
                    </div>
                    <div className="plugin-info">
                      <div className="plugin-name">{plugin.name}</div>
                      <div className="plugin-cat">{plugin.category}</div>
                    </div>
                  </div>
                  <div className="plugin-desc">{plugin.description}</div>
                  <div className="plugin-meta">
                    <span>v{plugin.version}</span>
                    <span>·</span>
                    <span>by {plugin.author}</span>
                  </div>
                  <div className="plugin-foot">
                    <div
                      className={`plugin-status ${isEnabled ? "on" : "off"}`}
                    >
                      <span className="dot"></span>
                      {isEnabled ? "Enabled" : "Disabled"}
                    </div>
                    <div className="plugin-actions">
                      <button
                        className="btn btn-ghost"
                        style={{ padding: "5px 12px", fontSize: "11px" }}
                        onClick={() => {
                          setSelectedDetailsPlugin(plugin);
                          setIsDetailsOpen(true);
                        }}
                      >
                        View Details
                      </button>
                      <Switch
                        checked={isEnabled}
                        onChange={() => handleToggleOrEnable(plugin)}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* View Details Modal */}
      <Modal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        title="Plugin Details"
      >
        {activeDetailsPlugin &&
          (() => {
            const details = pluginDetailsMap[activeDetailsPlugin.id] || {
              longDescription: activeDetailsPlugin.description,
              features: ["No feature summaries available."],
              requirements: "No special requirements.",
              permissions: ["General plugin access"],
            };
            const isEnabled = activeDetailsPlugin.isActive;
            const isInstalled = activeDetailsPlugin.installed;
            const installedDate =
              details.installedDate ||
              (isInstalled ? "Jun 16, 2026" : "Not Installed");

            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div className="plugin-detail-header">
                  <div className={`plugin-icon ${activeDetailsPlugin.color}`}>
                    {activeDetailsPlugin.icon}
                  </div>
                  <div>
                    <h3>{activeDetailsPlugin.name}</h3>
                    <p>
                      {activeDetailsPlugin.category} · by{" "}
                      {activeDetailsPlugin.author}
                    </p>
                  </div>
                </div>

                <div
                  className="plugin-detail-section"
                  style={{ marginTop: "18px" }}
                >
                  <div className="plugin-detail-label">Description</div>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "var(--muted)",
                      lineHeight: "1.6",
                      margin: 0,
                    }}
                  >
                    {details.longDescription}
                  </p>
                </div>

                <div className="plugin-detail-section">
                  <div className="plugin-detail-label">Plugin Info</div>
                  <div className="plugin-detail-grid">
                    <div className="plugin-detail-item">
                      <div className="k">Status</div>
                      <div className="v">
                        {isEnabled ? "Enabled" : "Disabled"}
                      </div>
                    </div>
                    <div className="plugin-detail-item">
                      <div className="k">Version</div>
                      <div className="v">{activeDetailsPlugin.version}</div>
                    </div>
                    <div className="plugin-detail-item">
                      <div className="k">Installed</div>
                      <div className="v">{installedDate}</div>
                    </div>
                    <div className="plugin-detail-item">
                      <div className="k">Developer</div>
                      <div className="v">{activeDetailsPlugin.author}</div>
                    </div>
                  </div>
                </div>

                <div className="plugin-detail-section">
                  <div className="plugin-detail-label">
                    Permissions Required
                  </div>
                  <div className="plugin-perm-list">
                    {details.permissions.map((perm: string, index: number) => (
                      <div key={index} className="plugin-perm-row">
                        <svg viewBox="0 0 13 13">
                          <path d="M2.5 6.5l3 3 5-6" />
                        </svg>
                        {perm}
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="form-actions"
                  style={{
                    marginTop: "18px",
                    justifyContent: "flex-end",
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <button
                    className="btn btn-outline"
                    onClick={() => setIsDetailsOpen(false)}
                  >
                    Close
                  </button>
                  <button
                    className={`btn ${isEnabled ? "btn-outline" : "btn-primary"}`}
                    onClick={() => {
                      handleToggleOrEnable(activeDetailsPlugin);
                      setIsDetailsOpen(false);
                    }}
                  >
                    {!isInstalled ? "Install Plugin" : isEnabled ? "Disable Plugin" : "Enable Plugin"}
                  </button>
                </div>
              </div>
            );
          })()}
      </Modal>

      <Toast message={toastMessage} isOpen={showToast} />
    </div>
  );
}
