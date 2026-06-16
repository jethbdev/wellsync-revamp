"use client";

import * as React from "react";
import { useDashboard } from "../dashboard-context";
import { Button } from "@healthbridge/ui";

export default function NotificationsPage() {
  const { alerts: notifications, handleResolveAlerts, handleDismissAlert } = useDashboard();

  return (
    <div className="panel active">
      <div className="panel-inner">
        <div className="ph">
          <div className="ph-left">
            <h2>Clinical & Platform Notifications</h2>
            <p>System alerts, clinical updates, and pharmacy inventory reorder tasks.</p>
          </div>
          {notifications.length > 0 && (
            <Button variant="outline" onClick={handleResolveAlerts}>
              Dismiss All Notifications
            </Button>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {notifications.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 0", color: "var(--muted)" }}>
              No active notifications.
            </div>
          ) : (
            notifications.map((notif) => {
              const isCrit = notif.type === "crit";
              const isWarn = notif.type === "warn";
              const typeClass = isCrit ? "crit" : isWarn ? "warn" : "ok";
              
              return (
                <div key={notif.id} className={`alert-card ${typeClass}`}>
                  <div className={`al-icon ${typeClass}`}>
                    <svg viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0-10v5m0 2h.01" /></svg>
                  </div>
                  <div className="al-body">
                    <div className="al-title">{notif.title}</div>
                    <div className="al-sub">{notif.desc}</div>
                  </div>
                  <div className="al-time">{notif.time}</div>
                  <button className="al-dismiss" onClick={() => handleDismissAlert(notif.id)} title="Dismiss">
                    <svg viewBox="0 0 15 15">
                      <path d="M3.5 3.5l8 8M11.5 3.5l-8 8" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
