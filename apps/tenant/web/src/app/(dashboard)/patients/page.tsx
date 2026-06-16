"use client";

import * as React from "react";
import { useDashboard } from "../dashboard-context";
import {
  Button,
  Pill,
  PaginatedTable,
  TableColumn,
  Select,
} from "@healthbridge/ui";

export default function PatientsPage() {
  const {
    patients,
    setSelectedPatientId,
    navigateTo,
    setShowPullModal,
    setPullStep,
    setShowModal,
  } = useDashboard();

  // Search and Filter state
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("ALL");

  const filteredPatients = React.useMemo(() => {
    return patients.filter((pat) => {
      const matchesQuery =
        !searchQuery ||
        pat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pat.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (pat.condition && pat.condition.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus =
        statusFilter === "ALL" ||
        pat.status === statusFilter;

      return matchesQuery && matchesStatus;
    });
  }, [patients, searchQuery, statusFilter]);

  const columns: TableColumn<any>[] = [
    {
      key: "patient",
      header: "Patient",
      render: (pat: any) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div className="pt-avatar" style={{ background: "var(--accent)" }}>
            {pat.name.split(" ").map((n: string) => n[0]).join("")}
          </div>
          <div>
            <div className="td-bold">{pat.name}</div>
            <div className="td-muted">{pat.id}</div>
          </div>
        </div>
      ),
    },
    {
      key: "ageSex",
      header: "Age / Sex",
      render: (pat: any) => `${pat.age}${pat.gender.charAt(0)}`,
    },
    {
      key: "condition",
      header: "Condition",
      render: (pat: any) => <span className="td-bold">{pat.condition}</span>,
    },
    {
      key: "lastVisit",
      header: "Last Visit",
      render: (pat: any) => <span className="td-muted">{pat.lastVisit}</span>,
    },
    {
      key: "nextAppt",
      header: "Next Appt",
      render: (pat: any) => <span className="td-muted">{pat.nextAppt}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (pat: any) => (
        <Pill variant={pat.status === "Active" ? "ok" : pat.status === "Monitoring" ? "warn" : "new"}>
          {pat.status}
        </Pill>
      ),
    },
    {
      key: "actions",
      header: "",
      render: (pat: any) => (
        <div className="td-actions">
          <div
            className="td-btn"
            title="View Chart"
            onClick={() => {
              setSelectedPatientId(pat.id);
              navigateTo("/records");
            }}
          >
            <svg viewBox="0 0 12 12">
              <rect x="1" y="1" width="10" height="10" rx="1.5" />
              <path d="M3.5 4.5h5M3.5 6.5h5M3.5 8.5h3" />
            </svg>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="panel active">
      <div className="panel-inner">
        <div className="ph">
          <div className="ph-left">
            <h2>Patient Demographics</h2>
            <p>Access patient profiles, consultation records, and histories</p>
          </div>
          <div className="ph-actions">
            <Button
              variant="outline"
              onClick={() => {
                setShowPullModal(true);
                setPullStep("search");
              }}
              style={{ marginRight: 8 }}
            >
              ↓ Pull Patient Record
            </Button>
            <Button variant="primary" onClick={() => setShowModal(true)}>
              + Register Patient
            </Button>
          </div>
        </div>

        <PaginatedTable
          data={filteredPatients}
          columns={columns}
          pageSize={10}
          title="Active Patients Directory"
          actions={
            <div className="tbl-filters" style={{ display: "flex", gap: 8 }}>
              <div className="tbl-search" style={{ width: "320px" }}>
                <svg viewBox="0 0 16 16">
                  <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M10.5 10.5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  placeholder="Search patients…"
                  style={{
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    fontSize: "12px",
                    color: "var(--ink)",
                    width: "100%",
                    padding: 0,
                    fontFamily: "inherit",
                  }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                options={[
                  { value: "ALL", label: "All status" },
                  { value: "Active", label: "Active" },
                  { value: "Monitoring", label: "Monitoring" },
                ]}
                style={{ width: "160px", height: "32px", fontSize: "12px" }}
              />
            </div>
          }
          emptyMessage="No patients found."
        />
      </div>
    </div>
  );
}
