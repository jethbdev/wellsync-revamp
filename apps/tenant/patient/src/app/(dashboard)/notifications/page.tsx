"use client";

import * as React from "react";
import { usePatient } from "../patient-context";
import { Button } from "@healthbridge/ui";

export default function PatientNotifications() {
  const {
    notifications,
    readNotifIds,
    dismissedNotifIds,
    markAsRead,
    markAllAsRead,
    dismissNotification,
    dismissAll,
  } = usePatient();

  const activeNotifications = notifications.filter(
    (n) => !dismissedNotifIds.includes(n.id)
  );

  const hasUnread = activeNotifications.some(
    (n) => !readNotifIds.includes(n.id)
  );

  return (
    <div className="panel active">
      <div className="panel-inner">
        <style>{`
          .notifications-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 12px 0;
          }
          .ph-actions {
            display: flex;
            gap: 12px;
            align-items: center;
          }
          .notif-page-card {
            background: var(--white);
            border: 1px solid var(--border-subtle);
            border-radius: var(--rmd);
            padding: 16px 20px;
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 12px;
            transition: all 0.2s ease;
            position: relative;
            cursor: pointer;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.01);
          }
          .notif-page-card:hover {
            transform: translateY(-1px);
            border-color: var(--border);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
          }
          .notif-page-card.unread {
            background: rgba(124, 58, 237, 0.02);
            border-left: 3px solid var(--accent);
          }
          html.dark .notif-page-card.unread {
            background: rgba(124, 58, 237, 0.04);
          }
          .notif-page-avatar {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Sora', sans-serif;
            font-weight: 700;
            font-size: 14px;
            flex-shrink: 0;
            position: relative;
          }
          .notif-page-dot {
            position: absolute;
            bottom: 0px;
            right: 0px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            border: 2px solid var(--white);
          }
          .notif-page-content {
            flex: 1;
            min-width: 0;
          }
          .notif-page-title {
            font-family: 'Sora', sans-serif;
            font-size: 14px;
            font-weight: 600;
            color: var(--ink);
            margin-bottom: 4px;
          }
          .notif-page-card.unread .notif-page-title {
            font-weight: 700;
          }
          .notif-page-desc {
            font-size: 12.5px;
            color: var(--muted);
            line-height: 1.4;
          }
          .notif-page-meta {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-top: 6px;
            font-size: 11px;
            color: var(--muted);
          }
          .notif-badge-pill {
            font-weight: 600;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 10px;
          }
          .notif-page-actions {
            display: flex;
            align-items: center;
            gap: 8px;
            opacity: 0.8;
            transition: opacity 0.2s;
          }
          .notif-page-card:hover .notif-page-actions {
            opacity: 1;
          }
          .action-btn {
            background: transparent;
            border: 1px solid var(--border-subtle);
            color: var(--muted);
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.15s ease;
          }
          .action-btn:hover {
            background: var(--surface);
            color: var(--ink);
            border-color: var(--border);
          }
          .action-btn.read-toggle:hover {
            color: var(--accent);
            background: rgba(124, 58, 237, 0.06);
          }
          .action-btn.dismiss-btn:hover {
            color: var(--crit-text);
            background: rgba(239, 68, 68, 0.06);
          }
          .action-btn svg {
            width: 14px;
            height: 14px;
          }
          .notif-empty-state {
            text-align: center;
            padding: 64px 32px;
            background: var(--white);
            border: 1px solid var(--border-subtle);
            border-radius: var(--rmd);
            color: var(--muted);
          }
          .notif-empty-icon {
            width: 48px;
            height: 48px;
            color: var(--muted);
            margin: 0 auto 16px;
            opacity: 0.5;
          }
          .notif-empty-state h3 {
            font-family: 'Sora', sans-serif;
            font-size: 16px;
            font-weight: 700;
            color: var(--ink);
            margin-bottom: 6px;
          }
          .notif-empty-state p {
            font-size: 13px;
            max-width: 360px;
            margin: 0 auto;
          }
        `}</style>

        <div className="notifications-container">
          <div className="ph">
            <div className="ph-left">
              <h2>My Notifications</h2>
              <p>Keep track of vital signs, prescription release vouchers, and clinic appointment notices.</p>
            </div>
            {activeNotifications.length > 0 && (
              <div className="ph-actions">
                {hasUnread && (
                  <Button variant="outline" onClick={markAllAsRead}>
                    Mark All Read
                  </Button>
                )}
                <Button variant="ghost" onClick={dismissAll}>
                  Clear All
                </Button>
              </div>
            )}
          </div>

          <div style={{ marginTop: "16px" }}>
            {activeNotifications.length === 0 ? (
              <div className="notif-empty-state">
                <div className="notif-empty-icon">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                  </svg>
                </div>
                <h3>No notifications</h3>
                <p>You're all caught up! Updates regarding prescriptions, appointments, or laboratory documents will show here.</p>
              </div>
            ) : (
              activeNotifications.map((notif) => {
                const isRead = readNotifIds.includes(notif.id);
                const dotColor =
                  notif.category === "Vitals"
                    ? "var(--crit-text)"
                    : notif.category === "Prescriptions"
                    ? "var(--accent)"
                    : "var(--info-text)";

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
                    className={`notif-page-card ${isRead ? "" : "unread"}`}
                    onClick={() => markAsRead(notif.id)}
                  >
                    <div
                      className="notif-page-avatar"
                      style={{ background: avatarBg, color: avatarColor }}
                    >
                      {initials}
                      {!isRead && (
                        <span
                          className="notif-page-dot"
                          style={{ background: dotColor }}
                        />
                      )}
                    </div>

                    <div className="notif-page-content">
                      <div className="notif-page-title">{notif.title}</div>
                      <div className="notif-page-desc">{notif.desc}</div>
                      <div className="notif-page-meta">
                        <span
                          className="notif-badge-pill"
                          style={{
                            background: avatarBg,
                            color: avatarColor,
                          }}
                        >
                          {notif.category}
                        </span>
                        <span>•</span>
                        <span>{notif.time}</span>
                      </div>
                    </div>

                    <div
                      className="notif-page-actions"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {!isRead && (
                        <button
                          className="action-btn read-toggle"
                          onClick={() => markAsRead(notif.id)}
                          title="Mark as read"
                        >
                          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                      )}
                      <button
                        className="action-btn dismiss-btn"
                        onClick={() => dismissNotification(notif.id)}
                        title="Dismiss notification"
                      >
                        <svg viewBox="0 0 15 15">
                          <path
                            d="M3.5 3.5l8 8M11.5 3.5l-8 8"
                            stroke="currentColor"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
