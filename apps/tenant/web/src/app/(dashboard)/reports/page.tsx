"use client";

import * as React from "react";
import { useDashboard } from "../dashboard-context";
import {
  usePatientsReport,
  useAppointmentsReport,
  useConsultationsReport,
  usePrescriptionsReport
} from "../../../lib/hooks/api/useReports";
import { Button, Modal } from "@healthbridge/ui";

const reportMetadata = [
  {
    id: "patients",
    name: "Patient Registry Report",
    category: "Demographics",
    color: "green",
    description: "Exports patient profiles containing PIN, Name, Gender, Birthdate, Contact Numbers, and registration dates.",
    icon: (
      <svg viewBox="0 0 15 15">
        <circle cx="7.5" cy="5" r="3" />
        <path d="M1 14c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6" />
      </svg>
    ),
  },
  {
    id: "appointments",
    name: "Appointment Log Report",
    category: "Clinical Logs",
    color: "blue",
    description: "Listing of scheduled visits, including appointment date/times, patient names, purpose of visits, and booking status.",
    icon: (
      <svg viewBox="0 0 15 15">
        <rect x="1.5" y="2.5" width="12" height="11" rx="2" />
        <path d="M5 1.5v2M10 1.5v2M1.5 6.5h12" />
      </svg>
    ),
  },
  {
    id: "consultations",
    name: "Clinical Consultations Report",
    category: "Clinical Logs",
    color: "purple",
    description: "Consultation activity log detailing dates, consultation numbers, transaction modes, chief complaints, and status.",
    icon: (
      <svg viewBox="0 0 15 15">
        <rect x="1.5" y="1.5" width="12" height="12" rx="1.5" />
        <path d="M4.5 10.5v-3m3 3v-5m3 5v-2" />
      </svg>
    ),
  },
  {
    id: "prescriptions",
    name: "Prescription Log Report",
    category: "Pharmacy",
    color: "yellow",
    description: "Logs all prescriptions issued, displaying tokens, patient names, prescribing doctor, validity dates, and status.",
    icon: (
      <svg viewBox="0 0 15 15">
        <path d="M5 2h5l2 3H3L5 2z" />
        <rect x="2" y="5" width="11" height="8" rx="1.5" />
        <path d="M5 8.5h5M7.5 7v3" />
      </svg>
    ),
  },
] as const;

type ReportId = typeof reportMetadata[number]["id"];

export default function ReportsPage() {
  const { activeFacility } = useDashboard();

  // Date states for predefined reports
  const getThirtyDaysAgo = () => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d.toISOString().split("T")[0];
  };
  const getToday = () => new Date().toISOString().split("T")[0];

  const [dates, setDates] = React.useState<Record<ReportId, { start: string; end: string }>>({
    patients: { start: getThirtyDaysAgo(), end: getToday() },
    appointments: { start: getThirtyDaysAgo(), end: getToday() },
    consultations: { start: getThirtyDaysAgo(), end: getToday() },
    prescriptions: { start: getThirtyDaysAgo(), end: getToday() }
  });

  const handleDateChange = (reportId: ReportId, field: "start" | "end", val: string) => {
    setDates(prev => ({
      ...prev,
      [reportId]: {
        ...prev[reportId],
        [field]: val
      }
    }));
  };

  // Modal selector state
  const [selectedReportId, setSelectedReportId] = React.useState<ReportId | null>(null);

  // Export hooks
  const exportPatients = usePatientsReport();
  const exportAppointments = useAppointmentsReport();
  const exportConsultations = useConsultationsReport();
  const exportPrescriptions = usePrescriptionsReport();

  // Print state
  const [printState, setPrintState] = React.useState<{
    title: string;
    headers: string[];
    rows: any[][];
    startDate: string;
    endDate: string;
  } | null>(null);

  // Print PDF Trigger
  const triggerPrint = (title: string, headers: string[], rows: any[][], start: string, end: string) => {
    setPrintState({ title, headers, rows, startDate: start, endDate: end });
    setTimeout(() => {
      window.print();
    }, 200);
  };

  // Export handlers
  const handleExport = async (type: ReportId) => {
    const start = dates[type].start;
    const end = dates[type].end;

    try {
      if (type === "patients") {
        const data = await exportPatients.mutateAsync({ startDate: start, endDate: end });
        const mapped = data.map(p => ({
          'PIN': p.pin,
          'First Name': p.firstName,
          'Last Name': p.lastName,
          'Gender': p.sex,
          'Birth Date': p.birthDate ? new Date(p.birthDate).toLocaleDateString() : 'N/A',
          'Contact Number': p.contactNumber || 'N/A',
          'Registered Date': p.createdAt ? new Date(p.createdAt).toLocaleDateString() : 'N/A'
        }));

        const rows = mapped.map(item => [item.PIN, `${item['First Name']} ${item['Last Name']}`, item.Gender, item['Birth Date'], item['Contact Number'], item['Registered Date']]);
        triggerPrint("Patient Registry Report", ['PIN', 'Patient Name', 'Gender', 'Birth Date', 'Contact Number', 'Registration Date'], rows, start, end);
      } else if (type === "appointments") {
        const data = await exportAppointments.mutateAsync({ startDate: start, endDate: end });
        const mapped = data.map(a => ({
          'Date': a.scheduledDate ? new Date(a.scheduledDate).toLocaleDateString() : 'N/A',
          'Time': a.scheduledTime || 'N/A',
          'Patient PIN': a.patient?.pin || 'N/A',
          'Patient Name': `${a.patient?.firstName || ''} ${a.patient?.lastName || ''}`,
          'Purpose': a.purpose || 'N/A',
          'Status': a.status
        }));

        const rows = mapped.map(item => [item.Date, item.Time, item['Patient PIN'], item['Patient Name'], item.Purpose, item.Status]);
        triggerPrint("Appointment Log Report", ['Date', 'Time', 'Patient PIN', 'Patient Name', 'Purpose', 'Status'], rows, start, end);
      } else if (type === "consultations") {
        const data = await exportConsultations.mutateAsync({ startDate: start, endDate: end });
        const mapped = data.map(c => ({
          'Date': c.consultationDate ? new Date(c.consultationDate).toLocaleDateString() : 'N/A',
          'Time': c.consultationTime || 'N/A',
          'Consultation Number': c.consultationNumber || 'N/A',
          'Patient PIN': c.patient?.pin || 'N/A',
          'Patient Name': `${c.patient?.firstName || ''} ${c.patient?.lastName || ''}`,
          'Chief Complaint': c.chiefComplaint || 'N/A',
          'Mode': c.modeOfTransaction,
          'Attending Provider': c.attendingProvider ? `${c.attendingProvider.firstName} ${c.attendingProvider.lastName}` : 'N/A',
          'Status': c.status
        }));

        const rows = mapped.map(item => [item.Date, item.Time, item['Consultation Number'], item['Patient PIN'], item['Patient Name'], item['Chief Complaint'], item.Mode, item['Attending Provider'], item.Status]);
        triggerPrint("Clinical Consultations Report", ['Date', 'Time', 'Consultation #', 'Patient PIN', 'Patient Name', 'Chief Complaint', 'Mode', 'Doctor', 'Status'], rows, start, end);
      } else if (type === "prescriptions") {
        const data = await exportPrescriptions.mutateAsync({ startDate: start, endDate: end });
        const headers = ['Token', 'Patient PIN', 'Patient Name', 'Issued Date', 'Valid Until', 'Prescribed By', 'Status'];
        const mapped = data.map(p => ({
          'Token': p.prescriptionToken,
          'Patient PIN': p.patient?.pin || 'N/A',
          'Patient Name': `${p.patient?.firstName || ''} ${p.patient?.lastName || ''}`,
          'Issued Date': p.createdAt ? new Date(p.createdAt).toLocaleDateString() : 'N/A',
          'Valid Until': p.validUntil ? new Date(p.validUntil).toLocaleDateString() : 'N/A',
          'Prescribed By': p.prescribedBy ? `${p.prescribedBy.firstName} ${p.prescribedBy.lastName}` : 'N/A',
          'Status': p.status
        }));

        const rows = mapped.map(item => [item.Token, item['Patient PIN'], item['Patient Name'], item['Issued Date'], item['Valid Until'], item['Prescribed By'], item.Status]);
        triggerPrint("Prescription Log Report", ['Token', 'Patient PIN', 'Patient Name', 'Issued Date', 'Valid Until', 'Prescribed By', 'Status'], rows, start, end);
      }
    } catch (err: any) {
      alert(`Export failed: ${err.message || "Unknown error"}`);
    }
  };

  const activeModalReport = React.useMemo(() => {
    if (!selectedReportId) return null;
    return reportMetadata.find(r => r.id === selectedReportId) || null;
  }, [selectedReportId]);

  const isExportPending = React.useMemo(() => {
    return exportPatients.isPending || exportAppointments.isPending || exportConsultations.isPending || exportPrescriptions.isPending;
  }, [exportPatients.isPending, exportAppointments.isPending, exportConsultations.isPending, exportPrescriptions.isPending]);

  return (
    <div className="panel active">
      <div className="panel-inner">
        {/* EXPORT GRID SECTION (HIDDEN ON PRINT) */}
        <div className="no-print">
          <div className="ph">
            <div className="ph-left">
              <h2>Reports &amp; Exports</h2>
              <p>
                Select a dataset type below to configure ranges and export clinical or registration logs for <strong>{activeFacility?.name || "Selected Facility"}</strong>.
              </p>
            </div>
          </div>

          <div className="plugin-grid" style={{ marginTop: "24px" }}>
            {reportMetadata.map((report) => (
              <div key={report.id} className="plugin-card" style={{ cursor: "pointer" }} onClick={() => setSelectedReportId(report.id)}>
                <div className="plugin-card-top">
                  <div className={`plugin-icon ${report.color}`}>
                    {report.icon}
                  </div>
                  <div className="plugin-info">
                    <div className="plugin-name">{report.name}</div>
                    <div className="plugin-cat">{report.category}</div>
                  </div>
                </div>
                <div className="plugin-desc">{report.description}</div>
                <div className="plugin-foot">
                  <div className="plugin-status">
                    <span className="dot" style={{ background: "var(--accent)" }}></span>
                    <span style={{ color: "var(--muted)" }}>Predefined</span>
                  </div>
                  <div className="plugin-actions">
                    <Button variant="ghost" style={{ padding: "5px 12px", fontSize: "11px", fontWeight: 600 }}>
                      Configure Export
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DATE CONFIGURATION MODAL */}
        <Modal
          isOpen={!!selectedReportId}
          onClose={() => !isExportPending && setSelectedReportId(null)}
          title="Configure Export Filters"
        >
          {activeModalReport && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div className="plugin-detail-header" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div className={`plugin-icon ${activeModalReport.color}`} style={{ width: "40px", height: "40px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {activeModalReport.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--ink)", margin: 0 }}>
                    {activeModalReport.name}
                  </h3>
                  <p style={{ fontSize: "12px", color: "var(--muted)", margin: "2px 0 0 0" }}>
                    {activeModalReport.category} · Core EMR Dataset
                  </p>
                </div>
              </div>

              <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: "1.5", margin: 0 }}>
                {activeModalReport.description}
              </p>

              <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "14px", marginTop: "4px" }}>
                <h4 style={{ fontSize: "11px", fontWeight: "700", color: "var(--faint)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "12px" }}>
                  Date Range Selection
                </h4>
                <div style={{ display: "flex", gap: "12px" }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "600", color: "var(--muted)", marginBottom: "6px" }}>Start Date</label>
                    <input
                      type="date"
                      value={dates[activeModalReport.id].start}
                      onChange={e => handleDateChange(activeModalReport.id, "start", e.target.value)}
                      style={{ width: "100%", padding: "8px 12px", border: "1px solid var(--border)", borderRadius: "var(--rsm)", fontSize: "13px", background: "var(--white)", color: "var(--ink)", outline: "none" }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "600", color: "var(--muted)", marginBottom: "6px" }}>End Date</label>
                    <input
                      type="date"
                      value={dates[activeModalReport.id].end}
                      onChange={e => handleDateChange(activeModalReport.id, "end", e.target.value)}
                      style={{ width: "100%", padding: "8px 12px", border: "1px solid var(--border)", borderRadius: "var(--rsm)", fontSize: "13px", background: "var(--white)", color: "var(--ink)", outline: "none" }}
                    />
                  </div>
                </div>
              </div>

              <div
                className="form-actions"
                style={{
                  marginTop: "16px",
                  justifyContent: "flex-end",
                  display: "flex",
                  gap: "10px",
                  borderTop: "1px solid var(--border-subtle)",
                  paddingTop: "16px"
                }}
              >
                <Button
                  variant="ghost"
                  onClick={() => setSelectedReportId(null)}
                  disabled={isExportPending}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={async () => {
                    await handleExport(activeModalReport.id);
                    setSelectedReportId(null);
                  }}
                  disabled={isExportPending}
                >
                  Print PDF
                </Button>
              </div>
            </div>
          )}
        </Modal>

        {/* PRINT-ONLY FORMATTED HTML VIEW FOR NATIVE PDF OUTPUT */}
        {printState && (
          <div className="print-only" style={{ padding: "40px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "2px solid #000", paddingBottom: "16px", marginBottom: "24px" }}>
              <div>
                <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#000", margin: 0 }}>{printState.title}</h1>
                <p style={{ fontSize: "14px", color: "#666", margin: "4px 0 0 0" }}>
                  Facility: <strong>{activeFacility?.name || "All Facilities"}</strong>
                </p>
                <p style={{ fontSize: "12px", color: "#666", margin: "2px 0 0 0" }}>
                  Reporting Period: {new Date(printState.startDate).toLocaleDateString()} to {new Date(printState.endDate).toLocaleDateString()}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "16px", fontWeight: "700", margin: 0 }}>Wellsync Staff</p>
                <p style={{ fontSize: "12px", color: "#666", margin: "4px 0 0 0" }}>Generated: {new Date().toLocaleString()}</p>
              </div>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
              <thead>
                <tr style={{ borderBottom: "1.5px solid #000" }}>
                  {printState.headers.map((h, i) => (
                    <th key={i} style={{ textAlign: "left", padding: "8px 6px", fontWeight: "700" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {printState.rows.length === 0 ? (
                  <tr>
                    <td colSpan={printState.headers.length} style={{ textAlign: "center", padding: "30px 10px", color: "#666" }}>
                      No records found in this reporting period.
                    </td>
                  </tr>
                ) : (
                  printState.rows.map((row, rowIndex) => (
                    <tr key={rowIndex} style={{ borderBottom: "1px solid #ddd" }}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} style={{ padding: "8px 6px", color: "#000" }}>{cell}</td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        <style dangerouslySetInnerHTML={{ __html: `
          .print-only {
            display: none;
          }

          @media print {
            .no-print {
              display: none !important;
            }
            .sidebar, .topbar {
              display: none !important;
            }
            .app-body {
              display: block !important;
            }
            .content, .panel, .panel-inner {
              display: block !important;
              background: transparent !important;
              border: none !important;
              box-shadow: none !important;
              padding: 0 !important;
              margin: 0 !important;
              width: 100% !important;
              max-width: 100% !important;
              min-width: 100% !important;
            }
            body, html {
              background: #fff !important;
              color: #000 !important;
              width: 100% !important;
              height: auto !important;
              overflow: visible !important;
            }
            .print-only {
              display: block !important;
            }
          }
        ` }} />
      </div>
    </div>
  );
}
