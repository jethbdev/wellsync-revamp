"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { ThemeToggle, Toast } from "@healthbridge/ui";
import { useProfile, useConfirmAppointment, useCancelAppointment } from "../../lib/hooks/api/usePortal";
import { authClient } from "../../lib/auth-client";

// ──────────────────────────────────────────────────────────────────────
// Context
// ──────────────────────────────────────────────────────────────────────
import { PatientContext, type PatientContextType } from "./patient-context";

// ──────────────────────────────────────────────────────────────────────
// Inner layout (has access to useSearchParams)
// ──────────────────────────────────────────────────────────────────────
function PatientDashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const navigateTo = React.useCallback(
    (path: string) => router.push(path),
    [router]
  );

  // ── React Query ───────────────────────────────────────────────────────
  const { data: profile, isLoading, error } = useProfile();
  const confirmMutation = useConfirmAppointment();
  const cancelMutation = useCancelAppointment();

  // ── Toast ─────────────────────────────────────────────────────────────
  const [showToast, setShowToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");

  const triggerToast = React.useCallback((msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
  }, []);

  React.useEffect(() => {
    if (showToast) {
      const t = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(t);
    }
  }, [showToast]);

  // ── 401 redirect (handled by apiFetch, but guard here too) ────────────
  React.useEffect(() => {
    if (error) {
      const msg = (error as Error).message ?? "";
      if (msg.includes("Unauthorized") || msg.includes("401")) {
        window.location.href = "/login";
      }
    }
  }, [error]);

  // ── Derived data ──────────────────────────────────────────────────────
  const allConsultations: any[] = profile?.consultations ?? [];
  const vitalsLog: any[] = allConsultations.flatMap((c: any) =>
    (c.vitalSigns ?? []).map((v: any) => ({ ...v, date: c.consultationDate }))
  );
  const prescriptionsList: any[] = allConsultations.flatMap((c: any) => c.prescriptions ?? []);
  const activeRx = prescriptionsList.filter((r: any) => r.status === "ACTIVE");
  const upcomingAppointments = (profile?.scheduledVisits ?? []).filter(
    (v: any) => v.status === "PENDING" || v.status === "CONFIRMED"
  );

  // ── Patient notifications (local state / derived) ───────────────────
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const notificationsRef = React.useRef<HTMLDivElement>(null);
  const notificationBellRef = React.useRef<HTMLButtonElement>(null);

  // Deriving some nice contextual notifications from patient data
  const [notifications, setNotifications] = React.useState<any[]>([]);
  const [readNotifIds, setReadNotifIds] = React.useState<string[]>([]);
  const [dismissedNotifIds, setDismissedNotifIds] = React.useState<string[]>([]);

  const markAsRead = React.useCallback((id: string) => {
    setReadNotifIds((prev) => prev.includes(id) ? prev : [...prev, id]);
  }, []);

  const markAllAsRead = React.useCallback(() => {
    setReadNotifIds(notifications.map((n) => n.id));
  }, [notifications]);

  const dismissNotification = React.useCallback((id: string) => {
    setDismissedNotifIds((prev) => prev.includes(id) ? prev : [...prev, id]);
  }, []);

  const dismissAll = React.useCallback(() => {
    setDismissedNotifIds(notifications.map((n) => n.id));
  }, [notifications]);

  React.useEffect(() => {
    if (profile) {
      const list: any[] = [];
      
      // 1. Upcoming Appointments
      upcomingAppointments.forEach((appt: any, idx: number) => {
        list.push({
          id: `appt-${appt.id || idx}`,
          type: "info",
          title: `Upcoming Visit: ${appt.purpose || "Consultation"}`,
          desc: `Scheduled on ${new Date(appt.scheduledDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} at ${appt.scheduledTime || "Scheduled Time"}`,
          category: "Visits",
          time: "1d ago"
        });
      });

      // 2. Active Prescriptions
      activeRx.slice(0, 2).forEach((rx: any, idx: number) => {
        list.push({
          id: `rx-${rx.id || idx}`,
          type: "ok",
          title: `Active Prescription: ${rx.brandName || "Medication"}`,
          desc: `${rx.dosage} • QR Pharmacy Voucher ready`,
          category: "Prescriptions",
          time: "2h ago"
        });
      });

      // 3. Clinical Advisories / Care Advice
      allConsultations.slice(0, 1).forEach((c: any, idx: number) => {
        if (c.treatmentPlan) {
          list.push({
            id: `note-${c.id || idx}`,
            type: "info",
            title: `Care Advice: ${c.natureOfVisit || "Follow-up"}`,
            desc: `${c.treatmentPlan.slice(0, 60)}...`,
            category: "Clinical Notes",
            time: "3d ago"
          });
        }
      });

      setNotifications(list);
    }
  }, [profile, upcomingAppointments.length, activeRx.length]);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationsOpen &&
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node) &&
        notificationBellRef.current &&
        !notificationBellRef.current.contains(event.target as Node)
      ) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [notificationsOpen]);


  // ── Mutation handlers ─────────────────────────────────────────────────
  const handleConfirmAppointment = async (id: string) => {
    try {
      await confirmMutation.mutateAsync(id);
      triggerToast("Appointment confirmed!");
    } catch {
      triggerToast("Error confirming appointment");
    }
  };

  const handleCancelAppointment = async (id: string) => {
    try {
      await cancelMutation.mutateAsync(id);
      triggerToast("Appointment cancelled");
    } catch {
      triggerToast("Error cancelling appointment");
    }
  };

  // ── Route helpers ─────────────────────────────────────────────────────
  const isRouteActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  // ── Loading / error states ─────────────────────────────────────────────
  if (isLoading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "var(--surface)" }}>
        <p style={{ fontFamily: "Sora, sans-serif", fontWeight: 600 }}>Loading secure patient data...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "var(--surface)" }}>
        <p>Could not resolve patient session. <a href="/login" style={{ color: "var(--accent)" }}>Sign in again</a></p>
      </div>
    );
  }

  return (
    <PatientContext.Provider
      value={{
        profile,
        isLoading,
        activeRx,
        allConsultations,
        vitalsLog,
        upcomingAppointments,
        triggerToast,
        handleConfirmAppointment,
        handleCancelAppointment,
        navigateTo,
        notifications,
        readNotifIds,
        dismissedNotifIds,
        markAsRead,
        markAllAsRead,
        dismissNotification,
        dismissAll,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
        <style>{`
          @media (max-width: 768px) {
            .sidebar {
              display: none !important;
            }
            .content {
              padding-bottom: 0px !important;
            }
            .panel-inner {
              padding: 16px 16px 24px 16px !important;
            }
            .mobile-bottom-nav {
              display: flex !important;
              height: 56px;
              background: var(--white);
              border-top: 1px solid var(--border-subtle);
              box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.04);
              z-index: 100;
              width: 100%;
              justify-content: space-around;
              align-items: center;
              flex-shrink: 0;
              box-sizing: border-box;
            }
            .mobile-nav-item {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              gap: 4px;
              color: var(--muted);
              cursor: pointer;
              flex: 1;
              height: 100%;
              font-size: 10px;
              font-weight: 600;
              transition: color 0.15s ease;
              position: relative;
            }
            .mobile-nav-item svg {
              width: 18px;
              height: 18px;
              stroke: currentColor;
              fill: none;
              stroke-width: 1.5;
              transition: transform 0.15s ease;
            }
            .mobile-nav-item.active {
              color: var(--accent);
            }
            .mobile-nav-item.active svg {
              transform: translateY(-1px);
            }
            .mobile-nav-badge {
              position: absolute;
              top: 4px;
              right: 25%;
              background: var(--accent);
              color: white;
              font-size: 8px;
              font-weight: 700;
              min-width: 14px;
              height: 14px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 0 3px;
              box-sizing: border-box;
              border: 1.5px solid var(--white);
            }
            .topbar {
              padding: 0 14px !important;
            }
            .tb-logo span {
              font-size: 15px !important;
            }
            .tb-logo-icon {
              width: 28px !important;
              height: 28px !important;
            }
            .tb-user {
              display: none !important;
            }
          }
          @media (min-width: 769px) {
            .mobile-bottom-nav {
              display: none !important;
            }
          }
          .notifications-dropdown {
            position: absolute;
            right: 0;
            top: 48px;
            width: 340px;
            background: var(--white);
            border: 1px solid var(--border-subtle);
            border-radius: var(--rmd);
            box-shadow: var(--card-shadow);
            z-index: 1000;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            text-align: left;
          }
          .notif-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 16px;
            border-bottom: 1px solid var(--border-subtle);
          }
          .notif-header span {
            font-family: 'Sora', sans-serif;
            font-weight: 700;
            font-size: 14px;
            color: var(--ink);
          }
          .notif-close-btn {
            background: transparent;
            border: none;
            cursor: pointer;
            color: var(--muted);
            padding: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.15s, color 0.15s;
          }
          .notif-close-btn:hover {
            background: var(--surface);
            color: var(--ink);
          }
          .notif-close-btn svg {
            width: 14px;
            height: 14px;
          }
          .notif-body {
            max-height: 280px;
            overflow-y: auto;
          }
          .notif-item {
            display: flex;
            gap: 12px;
            padding: 12px 16px;
            border-bottom: 1px solid var(--border-subtle);
            cursor: pointer;
            transition: background 0.15s;
          }
          .notif-item.unread {
            background: rgba(124, 58, 237, 0.04);
          }
          .notif-item.unread .notif-title {
            font-weight: 700;
          }
          .notif-item:last-child {
            border-bottom: none;
          }
          .notif-item:hover {
            background: var(--surface);
          }
          .notif-avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 12px;
            flex-shrink: 0;
            position: relative;
          }
          .notif-dot {
            position: absolute;
            bottom: -1px;
            right: -1px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            border: 1.5px solid var(--white);
          }
          .notif-content {
            display: flex;
            flex-direction: column;
            gap: 2px;
            flex: 1;
            min-width: 0;
          }
          .notif-title {
            font-size: 12px;
            font-weight: 600;
            color: var(--ink);
            line-height: 1.4;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .notif-meta {
            font-size: 10.5px;
            color: var(--muted);
          }
          .notif-empty {
            padding: 24px;
            text-align: center;
            color: var(--muted);
            font-size: 13px;
          }
          .notif-footer {
            padding: 10px 16px;
            border-top: 1px solid var(--border-subtle);
            background: var(--surface);
            display: flex;
          }
          .notif-view-all {
            width: 100%;
            background: transparent;
            border: 1px solid var(--border);
            border-radius: var(--rsm);
            padding: 8px;
            font-family: 'DM Sans', sans-serif;
            font-size: 12px;
            font-weight: 600;
            color: var(--ink);
            cursor: pointer;
            transition: background 0.15s, border-color 0.15s;
            text-align: center;
          }
          .notif-view-all:hover {
            background: var(--white);
            border-color: var(--accent);
            color: var(--accent);
          }
        `}</style>


        {/* TOPBAR */}
        <div className="topbar">
          <div className="tb-logo" onClick={() => navigateTo("/")} style={{ cursor: "pointer" }}>
            <div className="tb-logo-icon">
              <svg viewBox="0 0 20 20">
                <path d="M10 2a1 1 0 0 1 1 1v1h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3V3a1 1 0 0 1 1-1zm0 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
              </svg>
            </div>
            <span>HealthBridge Patient</span>
          </div>

          <div className="tb-search">
            <svg className="tb-search-icon" viewBox="0 0 16 16">
              <circle cx="7" cy="7" r="5" />
              <path d="M10.5 10.5l3 3" />
            </svg>
            <input type="text" placeholder="Search medical records, vitals, prescriptions..." />
          </div>

          <div className="tb-right" style={{ position: "relative" }}>
            <div style={{ position: "relative" }}>
              {/* Notification bell — badge shows pending/confirmed appointments */}
              <button
                className={`tb-icon-btn ${notificationsOpen ? "active" : ""}`}
                title="Notifications"
                ref={notificationBellRef}
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <svg viewBox="0 0 16 16">
                  <path d="M8 1.5v.8a5 5 0 0 1 4 4.9v2.3l1 2H3l1-2V7.2A5 5 0 0 1 8 2.3V1.5z" />
                  <path d="M6.5 12.5a1.5 1.5 0 0 0 3 0" />
                </svg>
                {notifications.filter(n => !dismissedNotifIds.includes(n.id) && !readNotifIds.includes(n.id)).length > 0 && (
                  <span className="tb-badge" />
                )}
              </button>

              {/* Notifications Dropdown */}
              {notificationsOpen && (
                <div className="notifications-dropdown" ref={notificationsRef} style={{ top: "42px" }}>
                  <div className="notif-header">
                    <span>Notifications</span>
                    <button className="notif-close-btn" onClick={() => setNotificationsOpen(false)}>
                      <svg viewBox="0 0 15 15">
                        <path d="M3.25 3.25l8.5 8.5M11.75 3.25l-8.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                  <div className="notif-body">
                    {notifications.filter(n => !dismissedNotifIds.includes(n.id)).length > 0 ? (
                      notifications.filter(n => !dismissedNotifIds.includes(n.id)).map((notif) => {
                        const isRead = readNotifIds.includes(notif.id);
                        const dotColor = notif.category === "Vitals" ? "var(--crit-text)" : notif.category === "Prescriptions" ? "var(--accent)" : "var(--info-text)";
                        
                        // Avatar initials & color based on category
                        let initials = "SY";
                        let avatarBg = "var(--accent-light)";
                        let avatarColor = "var(--accent)";
                        
                        if (notif.category === "Visits") {
                          initials = "VS";
                          avatarBg = "rgba(59, 130, 246, 0.12)";
                          avatarColor = "#3b82f6";
                        } else if (notif.category === "Prescriptions") {
                          initials = "RX";
                          avatarBg = "rgba(124, 58, 237, 0.12)";
                          avatarColor = "var(--accent)";
                        } else if (notif.category === "Clinical Notes") {
                          initials = "CL";
                          avatarBg = "rgba(34, 197, 94, 0.12)";
                          avatarColor = "#16a34a";
                        }

                        return (
                          <div
                            key={notif.id}
                            className={`notif-item ${isRead ? "" : "unread"}`}
                            onClick={() => {
                              markAsRead(notif.id);
                              setNotificationsOpen(false);
                              navigateTo("/notifications");
                            }}
                          >
                            <div className="notif-avatar" style={{ background: avatarBg, color: avatarColor }}>
                              {initials}
                              {!isRead && <span className="notif-dot" style={{ background: dotColor }} />}
                            </div>
                            <div className="notif-content">
                              <div className="notif-title" title={notif.title}>{notif.title}</div>
                              <div className="notif-meta">
                                {notif.category} • {notif.time}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="notif-empty">No new notifications</div>
                    )}
                  </div>
                  <div className="notif-footer">
                    <button
                      className="notif-view-all"
                      onClick={() => {
                        setNotificationsOpen(false);
                        navigateTo("/notifications");
                      }}
                    >
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            <ThemeToggle />
            <div className="tb-divider" />


            <div
              className="tb-avatar"
              title="View Profile"
              style={{ cursor: "pointer" }}
              onClick={() => navigateTo("/profile")}
            >
              {profile.firstName[0]}{profile.lastName[0]}
            </div>
            <div
              className="tb-user"
              style={{ cursor: "pointer" }}
              onClick={() => navigateTo("/profile")}
            >
              <div className="tb-user-name">{profile.firstName} {profile.lastName}</div>
              <div className="tb-user-role">PIN: {profile.pin}</div>
            </div>

            {/* Logout button */}
            <button
              className="tb-icon-btn"
              title="Sign out"
              onClick={async () => {
                await authClient.signOut();
                window.location.href = "/login";
              }}
            >
              <svg viewBox="0 0 16 16"><path d="M6 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3M10 11l4-4-4-4M14 8H6" /></svg>
            </button>
          </div>

        </div>

        {/* APP BODY */}
        <div className="app-body">
          {/* SIDEBAR */}
          <div className="sidebar">
            <div className="sb-facility" style={{ marginBottom: 16 }}>
              <div className="sb-facility-btn" style={{ cursor: "default", pointerEvents: "none" }}>
                <div className="sb-facility-icon">
                  <svg viewBox="0 0 15 15">
                    <path d="M2 13.5V4.5L7.5 1.5 13 4.5v9" />
                    <path d="M5.5 13.5V10h4v3.5" />
                    <path d="M4.5 6.5H6M9 6.5h1.5" />
                  </svg>
                </div>
                <div className="sb-facility-text">
                  <div className="sb-facility-org">{profile.facility?.organization?.name || "HealthBridge Group"}</div>
                  <div className="sb-facility-name">
                    {profile.facility?.name || "Primary Clinic"}
                  </div>
                </div>
              </div>
            </div>

            <span className="sb-section">Main</span>

            <div className={`sb-item ${isRouteActive("/") ? "active" : ""}`} onClick={() => navigateTo("/")}>
              <svg viewBox="0 0 15 15"><rect x="1.5" y="1.5" width="5" height="5" rx="1" /><rect x="8.5" y="1.5" width="5" height="5" rx="1" /><rect x="1.5" y="8.5" width="5" height="5" rx="1" /><rect x="8.5" y="8.5" width="5" height="5" rx="1" /></svg>
              <span>My Dashboard</span>
            </div>

            <div className={`sb-item ${isRouteActive("/rx") ? "active" : ""}`} onClick={() => navigateTo("/rx")}>
              <svg viewBox="0 0 15 15"><path d="M5 2h5l2 3H3L5 2z" /><rect x="2" y="5" width="11" height="8" rx="1.5" /><path d="M5 8.5h5M7.5 7v3" /></svg>
              <span>Prescriptions</span>
              {activeRx.length > 0 && <span className="sb-badge">{activeRx.length}</span>}
            </div>

            <div className={`sb-item ${isRouteActive("/vitals") ? "active" : ""}`} onClick={() => navigateTo("/vitals")}>
              <svg viewBox="0 0 15 15"><rect x="2" y="1.5" width="11" height="12" rx="2" /><path d="M5 5.5h5M5 8h5M5 10.5h3" /></svg>
              <span>Vitals Log</span>
            </div>

            <div className={`sb-item ${isRouteActive("/appointments") ? "active" : ""}`} onClick={() => navigateTo("/appointments")}>
              <svg viewBox="0 0 15 15"><rect x="1.5" y="2.5" width="12" height="11" rx="2" /><path d="M5 1.5v2M10 1.5v2M1.5 6.5h12" /></svg>
              <span>Appointments</span>
              {upcomingAppointments.length > 0 && (
                <span className="sb-badge">{upcomingAppointments.length}</span>
              )}
            </div>

            <div className={`sb-item ${isRouteActive("/documents") ? "active" : ""}`} onClick={() => navigateTo("/documents")}>
              <svg viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="3" y="1.5" width="9" height="12" rx="1.5" /><path d="M5.5 4.5h4M5.5 7.5h4M5.5 10.5h4" /></svg>
              <span>My Documents</span>
              {profile.documents && profile.documents.length > 0 && (
                <span className="sb-badge">{profile.documents.length}</span>
              )}
            </div>

            <div className="sb-footer">
              <div className={`sb-item ${isRouteActive("/profile") ? "active" : ""}`} onClick={() => navigateTo("/profile")}>
                <svg viewBox="0 0 15 15" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <circle cx="7.5" cy="5" r="2.5" />
                  <path d="M1.5 12.5c0-2.5 2.5-4 6-4s6 1.5 6 4" />
                </svg>
                <span>My Profile</span>
              </div>
            </div>
          </div>

          {/* CONTENT PANEL */}
          <div className="content">{children}</div>
        </div>

        {/* BOTTOM NAVIGATION (MOBILE ONLY) */}
        <div className="mobile-bottom-nav">
          <div className={`mobile-nav-item ${isRouteActive("/") ? "active" : ""}`} onClick={() => navigateTo("/")}>
            <svg viewBox="0 0 15 15">
              <rect x="1.5" y="1.5" width="5" height="5" rx="1" />
              <rect x="8.5" y="1.5" width="5" height="5" rx="1" />
              <rect x="1.5" y="8.5" width="5" height="5" rx="1" />
              <rect x="8.5" y="8.5" width="5" height="5" rx="1" />
            </svg>
            <span>Dashboard</span>
          </div>

          <div className={`mobile-nav-item ${isRouteActive("/rx") ? "active" : ""}`} onClick={() => navigateTo("/rx")}>
            <svg viewBox="0 0 15 15">
              <path d="M5 2h5l2 3H3L5 2z" />
              <rect x="2" y="5" width="11" height="8" rx="1.5" />
              <path d="M5 8.5h5M7.5 7v3" />
            </svg>
            {activeRx.length > 0 && <span className="mobile-nav-badge">{activeRx.length}</span>}
            <span>Meds</span>
          </div>

          <div className={`mobile-nav-item ${isRouteActive("/vitals") ? "active" : ""}`} onClick={() => navigateTo("/vitals")}>
            <svg viewBox="0 0 15 15">
              <rect x="2" y="1.5" width="11" height="12" rx="2" />
              <path d="M5 5.5h5M5 8h5M5 10.5h3" />
            </svg>
            <span>Vitals</span>
          </div>

          <div className={`mobile-nav-item ${isRouteActive("/appointments") ? "active" : ""}`} onClick={() => navigateTo("/appointments")}>
            <svg viewBox="0 0 15 15">
              <rect x="1.5" y="2.5" width="12" height="11" rx="2" />
              <path d="M5 1.5v2M10 1.5v2M1.5 6.5h12" />
            </svg>
            {upcomingAppointments.length > 0 && (
              <span className="mobile-nav-badge">{upcomingAppointments.length}</span>
            )}
            <span>Visits</span>
          </div>

          <div className={`mobile-nav-item ${isRouteActive("/documents") ? "active" : ""}`} onClick={() => navigateTo("/documents")}>
            <svg viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.2">
              <rect x="3" y="1.5" width="9" height="12" rx="1.5" />
              <path d="M5.5 4.5h4M5.5 7.5h4M5.5 10.5h4" />
            </svg>
            {profile.documents && profile.documents.length > 0 && (
              <span className="mobile-nav-badge">{profile.documents.length}</span>
            )}
            <span>Files</span>
          </div>
        </div>

        <Toast message={toastMessage} isOpen={showToast} />
      </div>
    </PatientContext.Provider>
  );
}

export default function PatientDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <React.Suspense fallback={
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "var(--surface)" }}>
        <p style={{ fontFamily: "Sora, sans-serif", fontWeight: 600 }}>Loading secure patient layout...</p>
      </div>
    }>
      <PatientDashboardLayoutContent>{children}</PatientDashboardLayoutContent>
    </React.Suspense>
  );
}
