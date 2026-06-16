"use client";

import * as React from "react";
import { useDashboard } from "../dashboard-context";
import { Button } from "@healthbridge/ui";

export default function AlertsPage() {
  const { alerts, handleResolveAlerts, handleDismissAlert } = useDashboard();

  return (
    <div className="panel active">
      <div className="panel-inner">
        <div className="ph">
          <div className="ph-left">
            <h2>Active Platform Alerts</h2>
            <p>Unresolved health warnings and supply chain reorder logs.</p>
          </div>
          {alerts.length > 0 && (
            <Button variant="outline" onClick={handleResolveAlerts}>
              Resolve All Alerts
            </Button>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {alerts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 0", color: "var(--muted)" }}>
              All alerts resolved.
            </div>
          ) : (
            alerts.map((al) => (
              <div key={al.id} className={`alert-card ${al.type}`}>
                <div className={`al-icon ${al.type}`}>
                  <svg viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0-10v5m0 2h.01" /></svg>
                </div>
                <div className="al-body">
                  <div className="al-title">{al.title}</div>
                  <div className="al-sub">{al.desc}</div>
                </div>
                <div className="al-time">{al.time}</div>
                <button className="al-dismiss" onClick={() => handleDismissAlert(al.id)}>
                  <svg viewBox="0 0 15 15">
                    <path d="M3.5 3.5l8 8M11.5 3.5l-8 8" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
