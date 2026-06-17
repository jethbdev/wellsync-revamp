"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Button,
  ThemeToggle,
  Modal,
  Toast,
  Field,
  Input,
  Select,
} from "@healthbridge/ui";
import { authClient } from "../../lib/auth-client";
import { apiFetch } from "../../lib/api-client";

interface OpsContextType {
  organizations: any[];
  accessRequests: any[];
  auditLogs: any[];
  activeOrgsCount: number;
  cpuUsage: number;
  activeGrants: number;
  dailyEvents: number;
  loading: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  triggerToast: (msg: string, type?: "check" | "alert") => void;
  loadDashboardData: () => Promise<void>;
  handleApproveRequest: (realId: string) => Promise<void>;
  handleDenyRequest: (realId: string) => Promise<void>;
  navigateTo: (path: string) => void;
}

const OpsContext = React.createContext<OpsContextType | undefined>(undefined);

export function useOps() {
  const context = React.useContext(OpsContext);
  if (!context) {
    throw new Error("useOps must be used within an OpsProvider");
  }
  return context;
}

export default function OpsDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = React.useState(true);
  const [authLoading, setAuthLoading] = React.useState(true);

  // Dialog & Notification states
  const [showModal, setShowModal] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");
  const [toastType, setToastType] = React.useState<"check" | "alert">("check");

  // Organizations registry data
  const [organizations, setOrganizations] = React.useState<any[]>([]);

  // Temporary maintenance database access requests
  const [accessRequests, setAccessRequests] = React.useState<any[]>([]);

  // System audit logs
  const [auditLogs, setAuditLogs] = React.useState<any[]>([]);

  // Provision organization form state
  const [orgName, setOrgName] = React.useState("");
  const [orgType, setOrgType] = React.useState("Government");
  const [orgDb, setOrgDb] = React.useState("");
  const [orgRegion, setOrgRegion] = React.useState("NCR - District 1");
  const [orgAdmin, setOrgAdmin] = React.useState("");

  // System stats load metrics
  const [activeOrgsCount, setActiveOrgsCount] = React.useState(0);
  const [cpuUsage, setCpuUsage] = React.useState(0);
  const [activeGrants, setActiveGrants] = React.useState(0);
  const [dailyEvents, setDailyEvents] = React.useState(0);

  const navigateTo = React.useCallback(
    (path: string) => {
      router.push(path);
    },
    [router],
  );

  const triggerToast = React.useCallback(
    (msg: string, type: "check" | "alert" = "check") => {
      setToastMessage(msg);
      setToastType(type);
      setShowToast(true);
    },
    [],
  );

  React.useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const loadDashboardData = React.useCallback(async () => {
    try {
      setLoading(true);

      // 1. Fetch Organizations
      const orgs = await apiFetch<any[]>("/api/organizations");
      setOrganizations(
        orgs.map((o: any) => ({
          id: o.id.substring(0, 8).toUpperCase(),
          realId: o.id,
          name: o.name,
          type: o.type === "PRIVATE_CLINIC" ? "Private" : "Government",
          status: o.status === "ACTIVE" ? "Active" : "Suspended",
          database: o.slug + "-db",
          regions: o.slug,
          admin: o.billingEmail || "admin@healthbridge.dev",
        })),
      );

      // 2. Fetch Temp Access Grants
      const grants = await apiFetch<any[]>("/api/temp-access-grants");
      setAccessRequests(
        grants.map((g: any) => ({
          id: g.id.substring(0, 8).toUpperCase(),
          realId: g.id,
          actor: g.requestedBy.substring(0, 8).toUpperCase(),
          targetDb: g.orgId.substring(0, 8).toUpperCase(),
          reason: g.reason,
          limit: `${g.durationHours} hours`,
          status: g.status,
          ip: "127.0.0.1",
        })),
      );

      // 3. Fetch Audit Logs
      const logs = await apiFetch<any[]>("/api/audit-logs");
      setAuditLogs(logs);

      // 4. Update Dashboard metrics
      setActiveOrgsCount(orgs.length);
      setCpuUsage(12 + orgs.length * 2);
      setActiveGrants(
        grants.filter((r: any) => r.status === "APPROVED").length,
      );
      setDailyEvents(logs.length);
    } catch (e: any) {
      console.error(e);
      triggerToast("Failed to load platform data", "alert");
    } finally {
      setLoading(false);
    }
  }, [triggerToast]);

  React.useEffect(() => {
    // Verify Authentication on mount
    authClient
      .getSession()
      .then((session) => {
        if (!session.data) {
          window.location.href = "/login";
        } else {
          setAuthLoading(false);
          loadDashboardData();
        }
      })
      .catch(() => {
        window.location.href = "/login";
      });
  }, [loadDashboardData]);

  const handleApproveRequest = async (realId: string) => {
    try {
      await apiFetch(`/api/temp-access-grants/${realId}/approve`, {
        method: "PUT",
      });
      triggerToast(`Database Access Request Approved`, "check");
      await loadDashboardData();
    } catch (e: any) {
      triggerToast(`Approval failed: ${e.message}`, "alert");
    }
  };

  const handleDenyRequest = async (realId: string) => {
    try {
      await apiFetch(`/api/temp-access-grants/${realId}/deny`, {
        method: "PUT",
      });
      triggerToast(`Database Access Request Denied`, "check");
      await loadDashboardData();
    } catch (e: any) {
      triggerToast(`Denial failed: ${e.message}`, "alert");
    }
  };

  const handleProvisionOrg = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName || !orgAdmin) {
      triggerToast("Please fill in Organization Name and Admin Email", "alert");
      return;
    }

    const orgSlug = orgName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    try {
      setShowModal(false);
      triggerToast(`Provisioning database for ${orgName}...`, "check");

      await apiFetch("/api/organizations", {
        method: "POST",
        body: JSON.stringify({
          name: orgName,
          slug: orgSlug,
          type: orgType === "Private" ? "PRIVATE_CLINIC" : "GOVERNMENT_LGU",
          billingEmail: orgAdmin,
        }),
      });

      setOrgName("");
      setOrgDb("");
      setOrgAdmin("");
      triggerToast(
        `Organization ${orgName} provisioned successfully!`,
        "check",
      );
      navigateTo("/organizations");
      await loadDashboardData();
    } catch (e: any) {
      triggerToast(`Onboarding failed: ${e.message}`, "alert");
    }
  };

  const isRouteActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  if (authLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          color: "var(--text-muted)",
          background: "var(--surface)",
        }}
      >
        <span>Checking operations session credentials...</span>
      </div>
    );
  }

  return (
    <OpsContext.Provider
      value={{
        organizations,
        accessRequests,
        auditLogs,
        activeOrgsCount,
        cpuUsage,
        activeGrants,
        dailyEvents,
        loading,
        setShowModal,
        triggerToast,
        loadDashboardData,
        handleApproveRequest,
        handleDenyRequest,
        navigateTo,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflow: "hidden",
        }}
      >
        {/* TOPBAR */}
        <div className="topbar">
          <div
            className="tb-logo"
            onClick={() => navigateTo("/")}
            style={{ cursor: "pointer" }}
          >
            <div className="tb-logo-icon" style={{ background: "none" }}>
              <img src="/favicon.png" alt="Logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <span>Wellsync Console</span>
          </div>

          <div className="tb-right" style={{ marginLeft: "auto" }}>
            <ThemeToggle />
            <div className="tb-divider" />
            <div className="tb-avatar" style={{ background: "var(--accent)" }}>
              CP
            </div>
            <div className="tb-user">
              <div className="tb-user-name">SysAdmin Portal</div>
              <div className="tb-user-role">Root Access</div>
            </div>
          </div>
        </div>

        {/* APP BODY */}
        <div className="app-body">
          {/* SIDEBAR */}
          <div className="sidebar">
            <span className="sb-section">Main</span>

            <div
              className={`sb-item ${isRouteActive("/") ? "active" : ""}`}
              onClick={() => navigateTo("/")}
            >
              <svg viewBox="0 0 15 15">
                <rect x="1.5" y="1.5" width="5" height="5" rx="1" />
                <rect x="8.5" y="1.5" width="5" height="5" rx="1" />
                <rect x="1.5" y="8.5" width="5" height="5" rx="1" />
                <rect x="8.5" y="8.5" width="5" height="5" rx="1" />
              </svg>
              <span>Dashboard</span>
            </div>

            <div
              className={`sb-item ${isRouteActive("/organizations") ? "active" : ""}`}
              onClick={() => navigateTo("/organizations")}
            >
              <svg viewBox="0 0 15 15">
                <circle cx="7.5" cy="5" r="3" />
                <path d="M1 14c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6" />
              </svg>
              <span>Organizations</span>
              <span className="sb-badge">{organizations.length}</span>
            </div>

            <div
              className={`sb-item ${isRouteActive("/tempaccess") ? "active" : ""}`}
              onClick={() => navigateTo("/tempaccess")}
            >
              <svg viewBox="0 0 15 15">
                <rect x="1.5" y="2.5" width="12" height="11" rx="2" />
                <path d="M5 1.5v2M10 1.5v2M1.5 6.5h12" />
              </svg>
              <span>Access Grants</span>
              {accessRequests.filter((r) => r.status === "Pending").length >
                0 && (
                <span className="sb-badge warn">
                  {accessRequests.filter((r) => r.status === "Pending").length}
                </span>
              )}
            </div>

            <span className="sb-section">System Compliance</span>

            <div
              className={`sb-item ${isRouteActive("/auditlogs") ? "active" : ""}`}
              onClick={() => navigateTo("/auditlogs")}
            >
              <svg viewBox="0 0 15 15">
                <rect x="2" y="1.5" width="11" height="12" rx="2" />
                <path d="M5 5.5h5M5 8h5M5 10.5h3" />
              </svg>
              <span>Audit Trails</span>
            </div>
          </div>

          {/* CONTENT PANEL */}
          <div className="content">
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  color: "var(--text-muted)",
                }}
              >
                <span>Loading Operations metrics...</span>
              </div>
            ) : (
              children
            )}
          </div>
        </div>

        {/* PROVISION TENANT MODAL */}
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Provision New Tenant Organization"
        >
          <form onSubmit={handleProvisionOrg}>
            <div
              className="form-wrap"
              style={{ boxShadow: "none", padding: 0, margin: 0 }}
            >
              <div className="form-grid">
                <Field label="Organization Name">
                  <Input
                    type="text"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="e.g. Manila General Hospital"
                    required
                  />
                </Field>
                <Field label="Profile Type">
                  <Select
                    value={orgType}
                    onChange={(e) => setOrgType(e.target.value)}
                    options={[
                      {
                        value: "Government",
                        label: "Government / Public Health Profile",
                      },
                      {
                        value: "Private",
                        label: "Private / Commercial Clinic Profile",
                      },
                    ]}
                  />
                </Field>
              </div>

              <div className="form-grid">
                <Field label="Database Schema Target (Custom)">
                  <Input
                    type="text"
                    value={orgDb}
                    onChange={(e) => setOrgDb(e.target.value)}
                    placeholder="e.g. manila-emr-prod"
                  />
                </Field>
                <Field label="Region Scope">
                  <Select
                    value={orgRegion}
                    onChange={(e) => setOrgRegion(e.target.value)}
                    options={[
                      { value: "NCR - District 1", label: "NCR - District 1" },
                      { value: "NCR - District 2", label: "NCR - District 2" },
                      { value: "NCR - District 3", label: "NCR - District 3" },
                      { value: "Cebu Region VII", label: "Cebu Region VII" },
                    ]}
                  />
                </Field>
              </div>

              <div className="form-grid full">
                <Field label="Administrator Email Address">
                  <Input
                    type="email"
                    value={orgAdmin}
                    onChange={(e) => setOrgAdmin(e.target.value)}
                    placeholder="e.g. admin@manilahospital.ph"
                    required
                  />
                </Field>
              </div>

              <div className="form-actions" style={{ marginTop: 24 }}>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Provision Tenant
                </Button>
              </div>
            </div>
          </form>
        </Modal>

        {/* TOAST alerts */}
        <Toast message={toastMessage} isOpen={showToast} iconType={toastType} />
      </div>
    </OpsContext.Provider>
  );
}
