"use client";

import * as React from "react";
import { useOps } from "./layout";
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

export default function OpsDashboard() {
  const {
    activeOrgsCount,
    cpuUsage,
    activeGrants,
    dailyEvents,
    auditLogs,
    accessRequests,
    handleApproveRequest,
    handleDenyRequest,
    setShowModal,
  } = useOps();

  return (
    <div className="panel active">
      <div className="panel-inner">
        <div className="ph">
          <div className="ph-left">
            <h2>Wellsync Console Overview</h2>
            <p>Global monitor dashboard for provisioned health tenants and database health.</p>
          </div>
          <div className="ph-actions">
            <Button variant="primary" onClick={() => setShowModal(true)}>
              + Provision Org
            </Button>
          </div>
        </div>

        {/* STATS */}
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-card-top">
              <span className="stat-lbl">Active Tenants</span>
              <div className="stat-icon green"><svg viewBox="0 0 15 15"><circle cx="7.5" cy="5" r="3" /><path d="M1 14c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6" /></svg></div>
            </div>
            <div className="stat-val">{activeOrgsCount}</div>
            <div className="stat-chg">LGUs &amp; Private clinics</div>
          </div>

          <div className="stat-card">
            <div className="stat-card-top">
              <span className="stat-lbl">System CPU Load</span>
              <div className="stat-icon blue"><svg viewBox="0 0 15 15"><rect x="1.5" y="1.5" width="12" height="12" rx="2" /><path d="M7.5 4.5v6M4.5 7.5h6" /></svg></div>
            </div>
            <div className="stat-val">{cpuUsage}%</div>
            <div className="stat-chg">All clusters healthy</div>
          </div>

          <div className="stat-card">
            <div className="stat-card-top">
              <span className="stat-lbl">Active Access Grants</span>
              <div className="stat-icon yellow"><svg viewBox="0 0 15 15"><rect x="1.5" y="2.5" width="12" height="11" rx="2" /><path d="M1.5 6.5h12" /></svg></div>
            </div>
            <div className="stat-val" style={{ color: "var(--warn-text)" }}>{activeGrants}</div>
            <div className="stat-chg warn">MFA forced sessions</div>
          </div>

          <div className="stat-card">
            <div className="stat-card-top">
              <span className="stat-lbl">Daily Audit Events</span>
              <div className="stat-icon red"><svg viewBox="0 0 15 15"><rect x="2" y="1.5" width="11" height="12" rx="2" /></svg></div>
            </div>
            <div className="stat-val">{dailyEvents}</div>
            <div className="stat-chg">JSONB diff records log</div>
          </div>
        </div>

        {/* CARD ROW */}
        <div className="card-row">
          {/* System Load */}
          <Card>
            <CardHeader>
              <CardTitle>Global Platform Traffic Load</CardTitle>
              <span className="pill ok">Active</span>
            </CardHeader>
            <CardBody>
              <div className="mini-bars" style={{ height: 120 }}>
                <div className="mini-bar hi" style={{ height: "40%", flex: 1 }} />
                <div className="mini-bar hi" style={{ height: "55%", flex: 1 }} />
                <div className="mini-bar" style={{ height: "30%", flex: 1 }} />
                <div className="mini-bar" style={{ height: "25%", flex: 1 }} />
                <div className="mini-bar hi" style={{ height: "60%", flex: 1 }} />
                <div className="mini-bar" style={{ height: "50%", flex: 1 }} />
                <div className="mini-bar hi" style={{ height: "45%", flex: 1 }} />
              </div>
              <div className="chart-labels" style={{ marginTop: 12 }}>
                <span className="chart-label">Mon</span><span className="chart-label">Tue</span>
                <span className="chart-label">Wed</span><span className="chart-label">Thu</span>
                <span className="chart-label">Fri</span><span className="chart-label">Sat</span>
                <span className="chart-label">Sun</span>
              </div>
            </CardBody>
          </Card>

          {/* Audit highlights */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Critical Audit Events</CardTitle>
            </CardHeader>
            <CardBody style={{ paddingTop: 4 }}>
              {auditLogs.slice(0, 3).map((log, idx) => (
                <div className="activity-item" key={idx}>
                  <div className={`activity-dot ${log.action.includes("APPROVE") ? "ok" : "warn"}`} />
                  <div className="activity-body">
                    <div className="activity-text">{log.details}</div>
                    <div className="activity-time">{new Date(log.timestamp).toLocaleTimeString()}</div>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>

        {/* TABLE: ACCESS GRANTS IN DASHBOARD */}
        <TableWrap>
          <div className="tbl-head">
            <span className="tbl-title">Active Database Temp Access Requests</span>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Developer / Actor</TableHead>
                <TableHead>Target DB</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Time Limit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accessRequests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell className="td-bold">{req.id}</TableCell>
                  <TableCell>
                    <div className="td-bold">{req.actor}</div>
                    <div className="td-muted">IP: {req.ip}</div>
                  </TableCell>
                  <TableCell className="td-bold">{req.targetDb}</TableCell>
                  <TableCell className="td-muted">{req.reason}</TableCell>
                  <TableCell>{req.limit}</TableCell>
                  <TableCell>
                    <Pill variant={req.status === "APPROVED" ? "ok" : req.status === "DENIED" ? "crit" : "warn"}>
                      {req.status}
                    </Pill>
                  </TableCell>
                  <TableCell>
                    {req.status === "PENDING" && (
                      <div className="td-actions">
                        <button className="td-btn" title="Approve Access" onClick={() => handleApproveRequest(req.realId)}>
                          <svg viewBox="0 0 15 15"><path d="M3 7.5l3 3 6-6" stroke="currentColor" fill="none" strokeWidth="2" /></svg>
                        </button>
                        <button className="td-btn" title="Deny Access" onClick={() => handleDenyRequest(req.realId)}>
                          <svg viewBox="0 0 15 15"><path d="M3.5 3.5l8 8M11.5 3.5l-8 8" stroke="currentColor" fill="none" strokeWidth="2" /></svg>
                        </button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWrap>
      </div>
    </div>
  );
}
