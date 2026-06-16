"use client";

import * as React from "react";
import { useDashboard } from "./dashboard-context";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  TableWrap,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Pill,
} from "@healthbridge/ui";

export default function DashboardPage() {
  const {
    statPatients,
    statLabs,
    statRx,
    statAppts,
    appointments,
    patients,
    setSelectedPatientId,
    navigateTo,
    triggerToast,
    setShowModal,
  } = useDashboard();

  return (
    <div className="panel active">
      <div className="panel-inner">
        <div className="ph">
          <div className="ph-left">
            <h2>Good morning, Dr. Santos 👋</h2>
            <p>Sunday, June 14, 2026 · Internal Medicine Ward</p>
          </div>
          <div className="ph-actions">
            <Button variant="ghost" onClick={() => triggerToast("Prescription submitted successfully")} title="Preview toast notifications" style={{ gap: 6 }}>
              <svg viewBox="0 0 13 13" style={{ width: 13, height: 13, stroke: "currentColor", fill: "none", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" }}><rect x="1" y="7" width="11" height="4.5" rx="1.5"/><path d="M4 7V4a2.5 2.5 0 0 1 5 0v3"/></svg>
              Toast
            </Button>
            <Button variant="outline" onClick={() => navigateTo("/schedule")} style={{ gap: 7 }}>
              <svg viewBox="0 0 13 13" style={{ width: 14, height: 14, stroke: "currentColor", fill: "none", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }}><rect x="1" y="2" width="11" height="10" rx="1.5"/><path d="M4 1v2M9 1v2M1 5h11"/></svg>
              View Schedule
            </Button>
            <Button variant="primary" onClick={() => setShowModal(true)} style={{ gap: 7 }}>
              <svg viewBox="0 0 13 13" style={{ width: 14, height: 14, stroke: "currentColor", fill: "none", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }}><circle cx="6.5" cy="5" r="2.5"/><path d="M1 12c0-3 2.5-5 5.5-5"/><path d="M9.5 9.5h3M11 8v3"/></svg>
              New Patient
            </Button>
          </div>
        </div>

        {/* STATS GRID */}
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-card-top">
              <span className="stat-lbl">Patients Today</span>
              <div className="stat-icon green">
                <svg viewBox="0 0 15 15"><circle cx="7.5" cy="5" r="3" /><path d="M1 14c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6" /></svg>
              </div>
            </div>
            <div className="stat-val">{statPatients}</div>
            <div className="stat-chg">↑ 3 from yesterday</div>
          </div>

          <div className="stat-card">
            <div className="stat-card-top">
              <span className="stat-lbl">Pending Labs</span>
              <div className="stat-icon yellow">
                <svg viewBox="0 0 15 15"><path d="M5.5 1.5v5.5L2 12.5a1 1 0 0 0 .9 1.5h9.2a1 1 0 0 0 .9-1.5L9.5 7V1.5" /><path d="M4.5 1.5h6" /></svg>
              </div>
            </div>
            <div className="stat-val" style={{ color: "var(--warn-text)" }}>{statLabs}</div>
            <div className="stat-chg warn">2 critical</div>
          </div>

          <div className="stat-card">
            <div className="stat-card-top">
              <span className="stat-lbl">Pending Rx</span>
              <div className="stat-icon green">
                <svg viewBox="0 0 15 15"><path d="M5 2h5l2 3H3L5 2z" /><rect x="2" y="5" width="11" height="8" rx="1.5" /><path d="M5 9h5M7.5 7.5v3" /></svg>
              </div>
            </div>
            <div className="stat-val">{statRx}</div>
            <div className="stat-chg">↓ 2 from avg</div>
          </div>

          <div className="stat-card">
            <div className="stat-card-top">
              <span className="stat-lbl">Upcoming Appts</span>
              <div className="stat-icon blue">
                <svg viewBox="0 0 15 15"><rect x="1.5" y="2.5" width="12" height="11" rx="2" /><path d="M5 1.5v2M10 1.5v2M1.5 6.5h12" /></svg>
              </div>
            </div>
            <div className="stat-val">{statAppts}</div>
            <div className="stat-chg">Next: 9:00 AM</div>
          </div>
        </div>

        {/* CARD ROW */}
        <div className="card-row">
          <Card>
            <CardHeader>
              <CardTitle>Patient Visits — Last 7 Days</CardTitle>
              <span className="pill ok">This Week</span>
            </CardHeader>
            <CardBody>
              <div className="mini-bars">
                <div className="mini-bar" style={{ height: "60%" }} />
                <div className="mini-bar" style={{ height: "75%" }} />
                <div className="mini-bar" style={{ height: "50%" }} />
                <div className="mini-bar" style={{ height: "90%" }} />
                <div className="mini-bar" style={{ height: "65%" }} />
                <div className="mini-bar" style={{ height: "40%" }} />
                <div className="mini-bar hi" style={{ height: "80%" }} />
              </div>
              <div className="chart-labels">
                <span className="chart-label">Mon</span><span className="chart-label">Tue</span>
                <span className="chart-label">Wed</span><span className="chart-label">Thu</span>
                <span className="chart-label">Fri</span><span className="chart-label">Sat</span>
                <span className="chart-label">Sun</span>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Today's Activity</CardTitle>
              <Button variant="ghost" style={{ padding: "4px 8px", fontSize: 11 }}>View all</Button>
            </CardHeader>
            <CardBody style={{ paddingTop: 4 }}>
              <div className="activity-item">
                <div className="activity-dot ok" />
                <div className="activity-body">
                  <div className="activity-text">Lab results received for <strong>Juan Dela Cruz</strong> — CBC normal</div>
                  <div className="activity-time">8 minutes ago</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-dot warn" />
                <div className="activity-body">
                  <div className="activity-text">Rx renewed for <strong>Maria Reyes</strong> — Losartan 50mg ×30</div>
                  <div className="activity-time">24 minutes ago</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-dot crit" />
                <div className="activity-body">
                  <div className="activity-text">Critical potassium level flagged — <strong>Roberto Cruz</strong></div>
                  <div className="activity-time">1 hour ago</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-dot ok" />
                <div className="activity-body">
                  <div className="activity-text">New patient registered: <strong>Ana Villanueva</strong></div>
                  <div className="activity-time">2 hours ago</div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* TABLE: APPOINTMENTS */}
        <TableWrap>
          <div className="tbl-head">
            <span className="tbl-title">Today's Appointments</span>
            <div className="tbl-filters">
              <div className="tbl-search">
                <svg viewBox="0 0 16 16"><circle cx="7" cy="7" r="5" /><path d="M10.5 10.5l3 3" /></svg>
                Filter appointments
              </div>
              <Button variant="outline" style={{ padding: "5px 12px", fontSize: 11, height: "28px" }} onClick={() => navigateTo("/schedule")}>
                Full schedule
              </Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Visit Type</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} style={{ textAlign: "center", padding: "32px 16px", color: "var(--muted)", fontSize: 13 }}>
                    No appointments scheduled for today
                  </TableCell>
                </TableRow>
              ) : (
                appointments.map((appt) => {
                  const pat = patients.find(p => p.id === appt.patientId) || patients[0];
                  if (!pat) return null;
                  return (
                    <TableRow key={appt.id}>
                      <TableCell className="td-bold">{appt.time}</TableCell>
                      <TableCell>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div className="pt-avatar" style={{ background: appt.color }}>
                            {pat.name.split(" ").map((n: string) => n[0]).join("")}
                          </div>
                          <div>
                            <div className="td-bold">{pat.name}</div>
                            <div className="td-muted">{pat.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Pill variant={appt.type === "Urgent" ? "crit" : appt.type === "New Patient" ? "new" : "ok"}>
                          {appt.type}
                        </Pill>
                      </TableCell>
                      <TableCell className="td-muted">{appt.reason}</TableCell>
                      <TableCell>
                        <Pill variant={appt.status === "In room" ? "crit" : appt.status === "Checked in" ? "info" : appt.status === "Waiting" ? "warn" : "neutral"}>
                          {appt.status}
                        </Pill>
                      </TableCell>
                      <TableCell>
                        <div className="td-actions">
                          <div className="td-btn" title="Open Chart" onClick={() => {
                            setSelectedPatientId(pat.id);
                            navigateTo("/records");
                          }}>
                            <svg viewBox="0 0 12 12"><rect x="1" y="1" width="10" height="10" rx="1.5" /><path d="M3.5 4.5h5M3.5 6.5h5M3.5 8.5h3" /></svg>
                          </div>
                          <div className="td-btn" title="Dispense Rx" onClick={() => {
                            setSelectedPatientId(pat.id);
                            navigateTo("/newvisit");
                          }}>
                            <svg viewBox="0 0 12 12"><path d="M4 1.5h4l1.5 2.5h-7L4 1.5z" /><rect x="1.5" y="4" width="9" height="6.5" rx="1" /><path d="M4 7h4M6 6v2" /></svg>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableWrap>
      </div>
    </div>
  );
}
