"use client";

import * as React from "react";
import { usePatient } from "./patient-context";
import { Card, CardHeader, CardTitle, CardBody } from "@healthbridge/ui";

export default function PatientDashboard() {
  const {
    profile,
    activeRx,
    allConsultations,
    upcomingAppointments,
    vitalsLog,
    navigateTo,
  } = usePatient();

  const latestConsultation = allConsultations[0] || null;
  const latestVitals = vitalsLog[0] || null;

  // helper to format snake_case enums to Title Case
  const formatNatureOfVisit = (nature: string) => {
    if (!nature) return "Consultation Note";
    return nature
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // 1. Time-aware greeting
  const getGreeting = () => {
    const hr = new Date().getHours();
    if (hr >= 5 && hr < 12) return "Good morning";
    if (hr >= 12 && hr < 18) return "Good afternoon";
    return "Good evening";
  };

  // 2. Age calculation
  const getAge = (birthDateStr: string) => {
    const birthDate = new Date(birthDateStr);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const age = profile.birthDate ? getAge(profile.birthDate) : null;
  const activeAlerts = profile.alerts?.filter((a: any) => a.isActive) || [];
  const nextAppointment = upcomingAppointments[0] || null;
  const hasAdvisories = allConsultations.some((c: any) => c.treatmentPlan || c.followUpInstructions);

  return (
    <div className="panel active">
      <style>{`
        .hero-banner {
          background: linear-gradient(135deg, var(--accent) 0%, #3a32cc 100%);
          color: #ffffff;
          border-radius: var(--rlg);
          padding: 24px 28px;
          margin-bottom: 24px;
          position: relative;
          overflow: hidden;
          box-shadow: var(--card-shadow);
        }
        html.dark .hero-banner {
          background: linear-gradient(135deg, rgba(136, 128, 255, 0.12) 0%, rgba(43, 37, 96, 0.3) 100%);
        }
        .hero-content {
          position: relative;
          z-index: 2;
        }
        .hero-banner h1 {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 6px;
          letter-spacing: -0.5px;
          color: #ffffff;
        }
        html.dark .hero-banner h1 {
          color: var(--ink);
        }
        .hero-banner p {
          font-size: 13.5px;
          opacity: 0.9;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.9);
        }
        html.dark .hero-banner p {
          color: var(--muted);
        }
        .hero-banner-appointment {
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          font-weight: 500;
        }
        html.dark .hero-banner-appointment {
          border-top: 1px solid var(--border);
        }
        .hero-banner-appointment svg {
          width: 15px;
          height: 15px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.5;
        }

        .unified-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }
        .unified-card {
          background: var(--white);
          border-radius: var(--rmd);
          padding: 18px;
          cursor: pointer;
          transition: all 0.22s cubic-bezier(0.2, 0.8, 0.2, 1);
          display: flex;
          flex-direction: column;
          box-shadow: var(--card-shadow);
          position: relative;
          overflow: hidden;
        }
        .unified-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--card-shadow-hover);
        }
        .unified-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .unified-icon {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }
        .unified-card:hover .unified-icon {
          transform: scale(1.08);
        }
        .unified-icon svg {
          width: 16px;
          height: 16px;
          stroke: currentColor;
          fill: none;
          stroke-width: 1.6;
        }
        .unified-icon.purple { background: var(--accent-light); color: var(--accent); }
        .unified-icon.green { background: rgba(34,197,94,.12); color: #16a34a; }
        .unified-icon.blue { background: rgba(59,130,246,.12); color: #3b82f6; }
        .unified-icon.orange { background: var(--warn-bg); color: var(--warn-text); }

        .unified-badge {
          font-family: 'Sora', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: var(--ink);
        }
        .unified-title {
          font-family: 'Sora', sans-serif;
          font-weight: 600;
          font-size: 13.5px;
          color: var(--ink);
          margin-bottom: 2px;
        }
        .unified-desc {
          font-size: 11px;
          color: var(--muted);
          line-height: 1.4;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: 24px;
        }
        @media (max-width: 992px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 768px) {
          .hero-banner {
            padding: 18px 20px !important;
            margin-bottom: 16px !important;
          }
          .hero-banner h1 {
            font-size: 20px !important;
          }
          .hero-banner p {
            font-size: 12.5px !important;
          }
          .unified-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
            margin-bottom: 16px !important;
          }
          .unified-card {
            padding: 12px !important;
          }
          .unified-badge {
            font-size: 16px !important;
          }
          .unified-title {
            font-size: 12.5px !important;
          }
          .unified-desc {
            display: none !important;
          }
          .dashboard-grid {
            gap: 16px !important;
          }
        }

        .health-summary-list {
          display: flex;
          flex-direction: column;
          margin-bottom: 16px;
        }
        .health-summary-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid var(--border-subtle);
          font-size: 13px;
        }
        .health-summary-item:last-child {
          border-bottom: none;
        }
        .health-summary-label {
          font-weight: 500;
          color: var(--muted);
        }
        .health-summary-value {
          font-weight: 600;
          color: var(--ink);
        }

        .clinical-alert-banner {
          background: var(--crit-bg);
          border: 1px solid var(--border);
          border-left: 4px solid var(--crit-text);
          border-radius: var(--rsm);
          padding: 10px 12px;
          display: flex;
          gap: 8px;
          align-items: flex-start;
          margin-bottom: 14px;
          font-size: 12px;
          color: var(--crit-text);
        }
        .clinical-alert-banner .alert-icon {
          width: 14px;
          height: 14px;
          stroke: var(--crit-text);
          fill: none;
          stroke-width: 1.8;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .clinical-alert-banner .alert-type {
          font-weight: 700;
          margin-bottom: 1px;
          text-transform: uppercase;
          font-size: 9px;
          letter-spacing: 0.5px;
        }

        .allergy-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 3px 9px;
          border-radius: 9999px;
          font-size: 10.5px;
          font-weight: 600;
          background: var(--warn-bg);
          color: var(--warn-text);
          border: 1px solid var(--border-subtle);
        }
        .allergy-pill.severity-high {
          background: var(--crit-bg);
          color: var(--crit-text);
        }
        .allergy-pill.severity-low {
          background: var(--info-bg);
          color: var(--info-text);
        }
        .no-allergies {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--muted);
          font-size: 12px;
          padding: 8px 10px;
          background: var(--surface);
          border-radius: var(--rsm);
          border: 1px dashed var(--border);
        }

        .advisory-item {
          background: var(--surface);
          border-left: 3px solid var(--accent);
          border-radius: 0 var(--rsm) var(--rsm) 0;
          padding: 12px 14px;
          font-size: 13px;
          line-height: 1.5;
        }
        .no-advisories {
          color: var(--muted);
          font-size: 13px;
          text-align: center;
          padding: 24px;
          background: var(--surface);
          border-radius: var(--rmd);
          border: 1px dashed var(--border);
        }
      `}</style>

      <div className="panel-inner" style={{ paddingBottom: 40 }}>
        {/* HERO BANNER */}
        <div className="hero-banner">
          <div className="hero-content">
            <h1>
              {getGreeting()}, {profile.firstName} 👋
            </h1>
            <p>
              Welcome to the {profile.facility ? `${profile.facility.name} Patient Portal` : "HealthBridge Patient Portal"}. Track your clinical notes, vitals, prescriptions, and files in a secure health hub.
            </p>

            {nextAppointment && (
              <div className="hero-banner-appointment">
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18M10 14h4" />
                </svg>
                <span>
                  <strong>Next Scheduled Visit:</strong> {new Date(nextAppointment.scheduledDate).toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' })} at {nextAppointment.scheduledTime || "Scheduled Time"} ({nextAppointment.purpose})
                </span>
              </div>
            )}
          </div>
        </div>

        {/* UNIFIED ACTIONS & STATS GRID */}
        <div className="unified-grid">
          {/* Prescriptions */}
          <div className="unified-card" onClick={() => navigateTo("/rx")}>
            <div className="unified-card-top">
              <div className="unified-icon purple">
                <svg viewBox="0 0 15 15"><path d="M5 2h5l2 3H3L5 2z" /><rect x="2" y="5" width="11" height="8" rx="1.5" /></svg>
              </div>
              <span className="unified-badge">{activeRx.length}</span>
            </div>
            <div className="unified-title">Prescriptions</div>
            <div className="unified-desc">Medication list &amp; QR pharmacy vouchers.</div>
          </div>

          {/* Appointments */}
          <div className="unified-card" onClick={() => navigateTo("/appointments")}>
            <div className="unified-card-top">
              <div className="unified-icon orange">
                <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18M12 14h.01M8 14h.01M16 14h.01" /></svg>
              </div>
              <span className="unified-badge">{upcomingAppointments.length}</span>
            </div>
            <div className="unified-title">Scheduled Visits</div>
            <div className="unified-desc">
              {nextAppointment ? `Next: ${new Date(nextAppointment.scheduledDate).toLocaleDateString()}` : "Book a new clinical slot"}
            </div>
          </div>

          {/* Vitals */}
          <div className="unified-card" onClick={() => navigateTo("/vitals")}>
            <div className="unified-card-top">
              <div className="unified-icon blue">
                <svg viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
              </div>
              <span className="unified-badge" style={{ fontSize: latestVitals ? 14 : 18 }}>
                {latestVitals ? `${latestVitals.bpSystolic}/${latestVitals.bpDiastolic}` : "—"}
              </span>
            </div>
            <div className="unified-title">Vital Signs Log</div>
            <div className="unified-desc">
              {latestVitals ? `BP: ${latestVitals.bpSystolic}/${latestVitals.bpDiastolic} mmHg (${latestVitals.heartRate} bpm)` : "View historical charts & log"}
            </div>
          </div>

          {/* Documents */}
          <div className="unified-card" onClick={() => navigateTo("/documents")}>
            <div className="unified-card-top">
              <div className="unified-icon green">
                <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
              </div>
              <span className="unified-badge">{profile.documents?.length || 0}</span>
            </div>
            <div className="unified-title">Shared Files</div>
            <div className="unified-desc">Download lab sheets &amp; doctor papers.</div>
          </div>
        </div>

        {/* DASHBOARD DETAILS GRID */}
        <div className="dashboard-grid">
          {/* LEFT COLUMN: Clinical Notes & Advisories */}
          <div>
            <Card style={{ height: "100%" }}>
              <CardHeader>
                <CardTitle>Clinical Advisories &amp; Care Advice</CardTitle>
              </CardHeader>
              <CardBody>
                {hasAdvisories ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {allConsultations.slice(0, 3).map((c: any, idx: number) => {
                      if (!c.treatmentPlan && !c.followUpInstructions) return null;
                      return (
                        <div key={c.id || idx} className="advisory-item">
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                            <span style={{ fontWeight: 600, color: "var(--accent)", fontSize: "13px" }}>
                              {formatNatureOfVisit(c.natureOfVisit)}
                            </span>
                            <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                              {new Date(c.consultationDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </span>
                          </div>
                          {c.chiefComplaint && (
                            <div style={{ fontSize: "12px", color: "var(--muted)", marginBottom: 4 }}>
                              <strong>Complaint:</strong> {c.chiefComplaint}
                            </div>
                          )}
                          {c.treatmentPlan && (
                            <div style={{ fontSize: "13px", color: "var(--ink)", marginBottom: 4 }}>
                              <strong>Treatment Plan:</strong> {c.treatmentPlan}
                            </div>
                          )}
                          {c.followUpInstructions && (
                            <div style={{ fontSize: "13px", color: "var(--ink)", fontStyle: "italic" }}>
                              <strong>Instructions:</strong> "{c.followUpInstructions}"
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="no-advisories">No treatment notes or follow-up instructions recorded.</div>
                )}
              </CardBody>
            </Card>
          </div>

          {/* RIGHT COLUMN: Personal Health Summary (Metadata, Alerts, Allergies) */}
          <div>
            <Card style={{ height: "100%" }}>
              <CardHeader>
                <CardTitle>My Health Profile</CardTitle>
              </CardHeader>
              <CardBody>
                {/* Personal Info list */}
                <div className="health-summary-list">
                  <div className="health-summary-item">
                    <span className="health-summary-label">Age / Sex</span>
                    <span className="health-summary-value">
                      {age ? `${age} yrs` : "—"} / {profile.sex === "MALE" ? "Male" : "Female"}
                    </span>
                  </div>
                  <div className="health-summary-item">
                    <span className="health-summary-label">Blood Type</span>
                    <span className="health-summary-value">{profile.bloodType || "Not Specified"}</span>
                  </div>
                  <div className="health-summary-item">
                    <span className="health-summary-label">Contact No.</span>
                    <span className="health-summary-value">{profile.contactNumber || "Not Specified"}</span>
                  </div>
                  <div className="health-summary-item">
                    <span className="health-summary-label">Patient Record PIN</span>
                    <span className="health-summary-value" style={{ fontFamily: "monospace" }}>
                      {profile.pin}
                    </span>
                  </div>
                  <div className="health-summary-item">
                    <span className="health-summary-label">Home Facility</span>
                    <span className="health-summary-value">{profile.facility?.name || "Not Specified"}</span>
                  </div>
                  {profile.facility?.organization && (
                    <div className="health-summary-item">
                      <span className="health-summary-label">Organization</span>
                      <span className="health-summary-value">{profile.facility.organization.name}</span>
                    </div>
                  )}
                </div>

                {/* Active Alerts */}
                {activeAlerts.length > 0 && (
                  <div style={{ marginBottom: 16 }}>
                    {activeAlerts.map((alert: any) => (
                      <div key={alert.id} className="clinical-alert-banner">
                        <svg viewBox="0 0 24 24" className="alert-icon">
                          <path d="M12 9v4M12 17h.01M12 2a10 10 0 1 1-10 10A10 10 0 0 1 12 2z" />
                        </svg>
                        <div>
                          <div className="alert-type">{alert.alertType}</div>
                          <div style={{ fontSize: "11px", opacity: 0.95, lineHeight: 1.4 }}>{alert.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Allergies list */}
                <div className="allergies-container">
                  <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 700, color: "var(--muted)", marginBottom: 6 }}>
                    Active Allergies
                  </div>
                  {profile.allergies && profile.allergies.length > 0 ? (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {profile.allergies.map((allergy: any) => (
                        <span
                          key={allergy.id}
                          className={`allergy-pill ${
                            allergy.severity === "HIGH" ? "severity-high" : allergy.severity === "LOW" ? "severity-low" : ""
                          }`}
                          title={`Reaction: ${allergy.reaction || "Not specified"}`}
                        >
                          {allergy.allergenName} ({allergy.allergenType})
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="no-allergies">
                      <svg viewBox="0 0 15 15" style={{ width: 14, height: 14, stroke: "var(--muted)", fill: "none" }}>
                        <circle cx="7.5" cy="7.5" r="6" />
                        <path d="M7.5 4.5v3M7.5 10h.01" />
                      </svg>
                      <span>No known allergies recorded.</span>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
