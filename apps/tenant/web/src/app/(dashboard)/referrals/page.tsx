"use client";

import * as React from "react";
import { Button, Pill } from "@healthbridge/ui";
import { apiFetch } from "../../../lib/api-client";

interface Referral {
  id: string;
  consultationId: string;
  patientId: string;
  referringFacilityId: string;
  referralType: string;
  urgency: string;
  referralReason: string;
  clinicalSummary: string | null;
  consentLevel: string | null;
  receivingFacilityId: string | null;
  receivingOrgSlug: string | null;
  receivingFacilityName: string | null;
  referralPacket: any | null;
  status: string;
  acceptedAt: string | null;
  declinedAt: string | null;
  declineReason: string | null;
  outcomeNotes: string | null;
  outcomeSentAt: string | null;
  createdById: string | null;
  createdAt: string;
  patient: {
    firstName: string;
    lastName: string;
    birthDate: string;
    sex: string;
    pin: string;
  };
  referringFacility: {
    name: string;
    organization?: {
      name: string;
    };
  };
  receivingFacility: {
    name: string;
  } | null;
}

export default function ReferralsDashboardPage() {
  const [referrals, setReferrals] = React.useState<Referral[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState<"incoming" | "outgoing">("incoming");
  const [selectedReferral, setSelectedReferral] = React.useState<Referral | null>(null);
  
  // Modals state
  const [declineId, setDeclineId] = React.useState<string | null>(null);
  const [declineReason, setDeclineReason] = React.useState("");
  
  const [outcomeId, setOutcomeId] = React.useState<string | null>(null);
  const [outcomeNotes, setOutcomeNotes] = React.useState("");
  
  const [toastMessage, setToastMessage] = React.useState("");

  const loadReferrals = React.useCallback(async () => {
    try {
      const data = await apiFetch<Referral[]>("/api/referrals");
      setReferrals(data);
    } catch (e) {
      console.error("Failed to load referrals", e);
      showToast("Error loading referrals list");
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadReferrals();
  }, [loadReferrals]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Filter lists based on facility role
  // We assume the user is receiving if the referral has their receivingFacilityId or receivingOrgSlug matching
  // Let's filter:
  // Incoming: status: PENDING / ACCEPTED / DECLINED received at this facility
  // Outgoing: status: PENDING / ACCEPTED / DECLINED sent from this facility
  // Wait, let's identify outgoing by checking if the referringFacilityId matches the current user's facility,
  // and incoming if the receivingFacilityId is set.
  // Wait, since we are showing referrals associated with this facility:
  // Outgoing: referrals where referringFacilityId matches local.
  // Incoming: referrals where receivingFacilityId matches local.
  // Let's do that!
  // To verify which is which, we can look at the referral's local facility match.
  // Since the api returns both (referring or receiving matching local), we can split:
  // Outgoing: referringFacilityId is the active facility.
  // Incoming: receivingFacilityId matches or is NOT local but receiving.
  // Let's check `api` return: `OR: [ { referringFacilityId: facilityId }, { receivingFacilityId: facilityId } ]`
  // So we can check:
  // If we don't have local facility ID in state, we can retrieve it or simply check the direction:
  // We can determine incoming/outgoing by comparing the referral's facility ID.
  // Wait! In the page, since we display the lists, let's check:
  // If `receivingOrgSlug` is set and not null, is it incoming cross-org?
  // Let's look at `findAll(facilityId)`: it returns referrals associated with this facility.
  // We can determine if outgoing by checking if the referring facility name matches or is local.
  // Actually, we can check if `referral.referringFacilityId` is the user's facility.
  // Wait! Let's get the user's facility from the session!
  // How do we get the facility? In the layout context or session, the user is associated with a facility.
  // Let's query `GET /api/auth/staff/session` or we can find it by checking if `referringFacility` is local.
  // Since `referringFacility` is included in the referrals return, let's look at the referrer.
  // If the referrer has the organization's name, or we can just determine by comparing properties!
  // To keep it simple and robust, let's find the user's facility ID. The API returns the list, and we can fetch the user's session to identify the local facility ID.
  const [localFacilityId, setLocalFacilityId] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function loadSession() {
      try {
        const session = await apiFetch<any>("/api/auth/staff/session");
        if (session?.session?.facilityId) {
          setLocalFacilityId(session.session.facilityId);
        }
      } catch (e) {
        console.error("Failed to load session", e);
      }
    }
    loadSession();
  }, []);

  const incomingReferrals = referrals.filter(r => r.receivingFacilityId === localFacilityId);
  const outgoingReferrals = referrals.filter(r => r.referringFacilityId === localFacilityId);

  const handleAccept = async (id: string) => {
    try {
      await apiFetch(`/api/referrals/${id}/accept`, { method: "POST" });
      showToast("Referral accepted successfully!");
      loadReferrals();
    } catch (e) {
      console.error("Failed to accept referral", e);
      showToast("Error accepting referral");
    }
  };

  const handleDeclineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!declineId) return;
    try {
      await apiFetch(`/api/referrals/${declineId}/decline`, {
        method: "POST",
        body: JSON.stringify({ reason: declineReason }),
      });
      showToast("Referral declined.");
      setDeclineId(null);
      setDeclineReason("");
      loadReferrals();
    } catch (e) {
      console.error("Failed to decline referral", e);
      showToast("Error declining referral");
    }
  };

  const handleOutcomeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!outcomeId) return;
    try {
      await apiFetch(`/api/referrals/${outcomeId}/outcome`, {
        method: "POST",
        body: JSON.stringify({ notes: outcomeNotes }),
      });
      showToast("Outcome notes logged successfully!");
      setOutcomeId(null);
      setOutcomeNotes("");
      loadReferrals();
    } catch (e) {
      console.error("Failed to log outcome", e);
      showToast("Error logging outcome");
    }
  };

  const getUrgencyPill = (urgency: string) => {
    const norm = urgency.toUpperCase();
    if (norm === "EMERGENCY") return <Pill variant="crit">Emergency</Pill>;
    if (norm === "URGENT") return <Pill variant="warn">Urgent</Pill>;
    return <Pill variant="info">Routine</Pill>;
  };

  const getStatusPill = (status: string) => {
    const norm = status.toUpperCase();
    if (norm === "ACCEPTED") return <Pill variant="ok">Accepted</Pill>;
    if (norm === "DECLINED") return <Pill variant="crit">Declined</Pill>;
    return <Pill variant="neutral">Pending</Pill>;
  };

  if (isLoading) {
    return (
      <div className="panel active">
        <div className="panel-inner" style={{ textAlign: "center", padding: "40px" }}>
          <p style={{ fontFamily: "Sora, sans-serif", fontWeight: 600 }}>Loading referrals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="panel active">
      <div className="panel-inner">
        <style>{`
          .ref-tabs {
            display: flex;
            gap: 16px;
            border-bottom: 1px solid var(--border-subtle);
            margin-bottom: 20px;
          }
          .ref-tab {
            padding: 10px 16px;
            font-family: 'Sora', sans-serif;
            font-size: 13px;
            font-weight: 600;
            color: var(--muted);
            cursor: pointer;
            border-bottom: 2px solid transparent;
            transition: all 0.2s ease;
          }
          .ref-tab.active {
            color: var(--accent);
            border-bottom-color: var(--accent);
          }
          .ref-grid {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          .ref-card {
            background: var(--white);
            border: 1px solid var(--border-subtle);
            border-radius: var(--rmd);
            padding: 16px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.2s ease;
            cursor: pointer;
          }
          .ref-card:hover {
            border-color: var(--border);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
            transform: translateY(-1px);
          }
          .ref-details {
            display: flex;
            flex-direction: column;
            gap: 4px;
            min-width: 0;
            flex: 1;
          }
          .ref-patient {
            font-family: 'Sora', sans-serif;
            font-size: 14.5px;
            font-weight: 700;
            color: var(--ink);
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .ref-sub {
            font-size: 12px;
            color: var(--muted);
            line-height: 1.4;
          }
          .ref-pills {
            display: flex;
            gap: 6px;
            margin-top: 4px;
            flex-wrap: wrap;
          }
          .ref-actions {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-shrink: 0;
          }
          .ref-empty {
            text-align: center;
            padding: 48px;
            color: var(--muted);
            background: var(--white);
            border: 1px solid var(--border-subtle);
            border-radius: var(--rmd);
            font-size: 13.5px;
          }
          
          /* Modal Styles */
          .ref-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(15, 23, 42, 0.4);
            backdrop-filter: blur(4px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1500;
            animation: fadeIn 0.2s ease;
          }
          .ref-modal {
            background: var(--white);
            border: 1px solid var(--border-subtle);
            border-radius: var(--rlg);
            width: 100%;
            max-width: 600px;
            box-shadow: var(--card-shadow);
            overflow: hidden;
            animation: scaleIn 0.2s ease;
          }
          .ref-modal-header {
            padding: 16px 20px;
            border-bottom: 1px solid var(--border-subtle);
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .ref-modal-header h3 {
            font-family: 'Sora', sans-serif;
            font-size: 16px;
            font-weight: 700;
            color: var(--ink);
          }
          .ref-modal-close {
            background: transparent;
            border: none;
            cursor: pointer;
            color: var(--muted);
            padding: 4px;
            border-radius: 50%;
            display: flex;
          }
          .ref-modal-close:hover {
            background: var(--surface);
            color: var(--ink);
          }
          .ref-modal-body {
            padding: 20px;
            max-height: 480px;
            overflow-y: auto;
          }
          .ref-modal-footer {
            padding: 12px 20px;
            border-top: 1px solid var(--border-subtle);
            background: var(--surface);
            display: flex;
            justify-content: flex-end;
            gap: 8px;
          }
          
          .packet-section {
            border: 1px solid var(--border-subtle);
            border-radius: var(--rsm);
            padding: 12px;
            background: var(--surface);
            margin-bottom: 12px;
          }
          .packet-section h4 {
            font-family: 'Sora', sans-serif;
            font-size: 11px;
            font-weight: 700;
            color: var(--muted);
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 6px;
          }
          .packet-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
            color: var(--ink);
          }
          .packet-table td {
            padding: 4px 0;
          }
          .packet-table td.lbl {
            font-weight: 600;
            color: var(--muted);
            width: 120px;
          }
          
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        `}</style>

        <div className="ph">
          <div className="ph-left">
            <h2>Referral Network Manager</h2>
            <p>Manage patients referred to your facility or track clinical transfers sent to external network sites.</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="ref-tabs">
          <div
            className={`ref-tab ${activeTab === "incoming" ? "active" : ""}`}
            onClick={() => setActiveTab("incoming")}
          >
            Incoming Referrals ({incomingReferrals.length})
          </div>
          <div
            className={`ref-tab ${activeTab === "outgoing" ? "active" : ""}`}
            onClick={() => setActiveTab("outgoing")}
          >
            Outgoing Referrals ({outgoingReferrals.length})
          </div>
        </div>

        {/* List Grid */}
        <div className="ref-grid">
          {activeTab === "incoming" ? (
            incomingReferrals.length === 0 ? (
              <div className="ref-empty">No incoming referrals received yet.</div>
            ) : (
              incomingReferrals.map((ref) => (
                <div key={ref.id} className="ref-card" onClick={() => setSelectedReferral(ref)}>
                  <div className="ref-details">
                    <div className="ref-patient">
                      {ref.patient.firstName} {ref.patient.lastName}
                      {ref.receivingOrgSlug && <Pill variant="neutral" style={{ fontSize: "10px", padding: "1px 6px" }}>Cross-Org</Pill>}
                    </div>
                    <div className="ref-sub">
                      <strong>Referring facility:</strong> {ref.referringFacility.name} {ref.referringFacility.organization ? `(${ref.referringFacility.organization.name})` : ""}
                    </div>
                    <div className="ref-sub" style={{ marginTop: 2 }}>
                      <strong>Reason:</strong> {ref.referralReason}
                    </div>
                    <div className="ref-pills">
                      {getUrgencyPill(ref.urgency)}
                      {getStatusPill(ref.status)}
                    </div>
                  </div>

                  <div className="ref-actions" onClick={(e) => e.stopPropagation()}>
                    {ref.status === "PENDING" && (
                      <>
                        <Button variant="outline" onClick={() => handleAccept(ref.id)} style={{ padding: "6px 12px", height: "30px", fontSize: "11px" }}>
                          Accept
                        </Button>
                        <Button variant="ghost" onClick={() => setDeclineId(ref.id)} style={{ padding: "6px 12px", height: "30px", fontSize: "11px", color: "var(--crit-text)" }}>
                          Decline
                        </Button>
                      </>
                    )}
                    {ref.status === "ACCEPTED" && !ref.outcomeNotes && (
                      <Button variant="outline" onClick={() => { setOutcomeId(ref.id); setOutcomeNotes(""); }} style={{ padding: "6px 12px", height: "30px", fontSize: "11px" }}>
                        Log Outcome
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )
          ) : (
            outgoingReferrals.length === 0 ? (
              <div className="ref-empty">No outgoing referrals dispatched yet.</div>
            ) : (
              outgoingReferrals.map((ref) => (
                <div key={ref.id} className="ref-card" onClick={() => setSelectedReferral(ref)}>
                  <div className="ref-details">
                    <div className="ref-patient">
                      {ref.patient.firstName} {ref.patient.lastName}
                      {ref.receivingOrgSlug && <Pill variant="neutral" style={{ fontSize: "10px", padding: "1px 6px" }}>Cross-Org</Pill>}
                    </div>
                    <div className="ref-sub">
                      <strong>Receiving clinic:</strong> {ref.receivingFacilityName || ref.receivingFacility?.name || "Facility"} {ref.receivingOrgSlug ? `(${ref.receivingOrgSlug})` : ""}
                    </div>
                    <div className="ref-sub" style={{ marginTop: 2 }}>
                      <strong>Reason:</strong> {ref.referralReason}
                    </div>
                    <div className="ref-pills">
                      {getUrgencyPill(ref.urgency)}
                      {getStatusPill(ref.status)}
                    </div>
                  </div>
                  
                  <div className="ref-actions" onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        // Create temporary printed layout view or alert
                        const printWindow = window.open("", "_blank");
                        if (printWindow) {
                          printWindow.document.write(`
                            <html>
                            <head>
                              <title>Referral Slip - ${ref.patient.firstName} ${ref.patient.lastName}</title>
                              <style>
                                body { font-family: 'DM Sans', sans-serif; padding: 40px; color: #1e293b; line-height: 1.5; }
                                .header { border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 24px; text-align: center; }
                                h1 { font-family: 'Sora', sans-serif; font-size: 20px; margin: 0; }
                                .section { margin-bottom: 20px; }
                                .section-title { font-weight: 700; text-transform: uppercase; font-size: 11px; color: #64748b; letter-spacing: 0.5px; margin-bottom: 6px; }
                                .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
                                .field { margin-bottom: 8px; }
                                .label { font-weight: 600; color: #475569; font-size: 13px; }
                                .val { font-size: 14px; margin-top: 2px; }
                                .sig-box { margin-top: 40px; border-top: 1px solid #cbd5e1; display: inline-block; width: 200px; text-align: center; padding-top: 8px; font-size: 13px; }
                              </style>
                            </head>
                            <body>
                              <div class="header">
                                <h1>CLINICAL REFERRAL SLIP</h1>
                                <p style="font-size: 13px; color: #64748b; margin: 4px 0 0 0;">Wellsync Unified Referral Network</p>
                              </div>
                              <div class="grid section">
                                <div class="field">
                                  <div class="label">Patient Name</div>
                                  <div class="val">${ref.patient.firstName} ${ref.patient.lastName}</div>
                                </div>
                                <div class="field">
                                  <div class="label">PIN</div>
                                  <div class="val">${ref.patient.pin}</div>
                                </div>
                                <div class="field">
                                  <div class="label">Birthdate</div>
                                  <div class="val">${new Date(ref.patient.birthDate).toLocaleDateString()}</div>
                                </div>
                                <div class="field">
                                  <div class="label">Urgency Level</div>
                                  <div class="val" style="text-transform: capitalize; font-weight: 600;">${ref.urgency.toLowerCase()}</div>
                                </div>
                              </div>
                              <div class="section" style="border-top: 1px solid #e2e8f0; padding-top: 16px;">
                                <div class="field">
                                  <div class="label">Referring Facility</div>
                                  <div class="val">${ref.referringFacility.name}</div>
                                </div>
                                <div class="field" style="margin-top: 8px;">
                                  <div class="label">Receiving Facility</div>
                                  <div class="val">${ref.receivingFacilityName || ref.receivingFacility?.name || "Facility"}</div>
                                </div>
                              </div>
                              <div class="section" style="border-top: 1px solid #e2e8f0; padding-top: 16px;">
                                <div class="field">
                                  <div class="label">Referral Reason</div>
                                  <div class="val">${ref.referralReason}</div>
                                </div>
                                <div class="field" style="margin-top: 12px;">
                                  <div class="label">Clinical Summary</div>
                                  <div class="val">${ref.clinicalSummary || "No clinical summary provided."}</div>
                                </div>
                              </div>
                              <div class="section" style="margin-top: 40px; display: flex; justify-content: space-between;">
                                <div>
                                  <div class="sig-box">Referring Clinician Signature</div>
                                </div>
                                <div>
                                  <div class="sig-box" style="width: 240px;">Receiving Representative Signature</div>
                                </div>
                              </div>
                              <script>window.print();</script>
                            </body>
                            </html>
                          `);
                          printWindow.document.close();
                        }
                      }}
                      style={{ padding: "6px 12px", height: "30px", fontSize: "11px" }}
                    >
                      Print Slip
                    </Button>
                  </div>
                </div>
              ))
            )
          )}
        </div>
      </div>

      {/* Decline Reason Modal */}
      {declineId && (
        <div className="ref-modal-overlay">
          <div className="ref-modal">
            <div className="ref-modal-header">
              <h3>Decline Referral</h3>
              <button className="ref-modal-close" onClick={() => setDeclineId(null)}>×</button>
            </div>
            <form onSubmit={handleDeclineSubmit}>
              <div className="ref-modal-body">
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--ink)" }}>Reason for Decline</label>
                  <textarea
                    required
                    value={declineReason}
                    onChange={(e) => setDeclineReason(e.target.value)}
                    placeholder="Enter details on why this clinic cannot receive this patient referral..."
                    style={{
                      height: "100px",
                      padding: "10px",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--rsm)",
                      fontFamily: "inherit",
                      fontSize: "13px",
                      resize: "vertical",
                    }}
                  />
                </div>
              </div>
              <div className="ref-modal-footer">
                <Button type="button" variant="ghost" onClick={() => setDeclineId(null)}>Cancel</Button>
                <Button type="submit" variant="primary" style={{ background: "var(--crit-text)" }}>Decline Referral</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Log Outcome Modal */}
      {outcomeId && (
        <div className="ref-modal-overlay">
          <div className="ref-modal">
            <div className="ref-modal-header">
              <h3>Log Referral Outcome</h3>
              <button className="ref-modal-close" onClick={() => setOutcomeId(null)}>×</button>
            </div>
            <form onSubmit={handleOutcomeSubmit}>
              <div className="ref-modal-body">
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--ink)" }}>Outcome &amp; Resolution Notes</label>
                  <textarea
                    required
                    value={outcomeNotes}
                    onChange={(e) => setOutcomeNotes(e.target.value)}
                    placeholder="Enter summary of consult or diagnostic resolution logged for this referral..."
                    style={{
                      height: "120px",
                      padding: "10px",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--rsm)",
                      fontFamily: "inherit",
                      fontSize: "13px",
                      resize: "vertical",
                    }}
                  />
                </div>
              </div>
              <div className="ref-modal-footer">
                <Button type="button" variant="ghost" onClick={() => setOutcomeId(null)}>Cancel</Button>
                <Button type="submit" variant="primary">Submit Outcome</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detailed Referral Packet Modal */}
      {selectedReferral && (
        <div className="ref-modal-overlay" onClick={() => setSelectedReferral(null)}>
          <div className="ref-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "680px" }}>
            <div className="ref-modal-header">
              <h3>Referral Clinical Data Packet</h3>
              <button className="ref-modal-close" onClick={() => setSelectedReferral(null)}>×</button>
            </div>
            <div className="ref-modal-body" style={{ maxHeight: "540px" }}>
              <div className="packet-section">
                <h4>Referral Metadata</h4>
                <table className="packet-table">
                  <tbody>
                    <tr><td className="lbl">Referral ID</td><td>{selectedReferral.id}</td></tr>
                    <tr><td className="lbl">Status</td><td><strong>{selectedReferral.status}</strong></td></tr>
                    <tr><td className="lbl">Urgency</td><td>{selectedReferral.urgency}</td></tr>
                    <tr><td className="lbl">Reason</td><td>{selectedReferral.referralReason}</td></tr>
                    {selectedReferral.declineReason && <tr><td className="lbl" style={{ color: "var(--crit-text)" }}>Decline Reason</td><td style={{ color: "var(--crit-text)" }}>{selectedReferral.declineReason}</td></tr>}
                    {selectedReferral.outcomeNotes && <tr><td className="lbl" style={{ color: "var(--accent)" }}>Outcome Notes</td><td>{selectedReferral.outcomeNotes}</td></tr>}
                  </tbody>
                </table>
              </div>

              {/* Referral Clinical Data Packet (JSON Decrypted packet) */}
              {selectedReferral.referralPacket ? (
                <>
                  <div className="packet-section">
                    <h4>Demographics Packet</h4>
                    <table className="packet-table">
                      <tbody>
                        <tr><td className="lbl">Name</td><td>{selectedReferral.referralPacket.patient?.firstName} {selectedReferral.referralPacket.patient?.lastName}</td></tr>
                        <tr><td className="lbl">Sex</td><td>{selectedReferral.referralPacket.patient?.sex}</td></tr>
                        <tr><td className="lbl">Birth Date</td><td>{selectedReferral.referralPacket.patient?.birthDate ? new Date(selectedReferral.referralPacket.patient.birthDate).toLocaleDateString() : "—"}</td></tr>
                        <tr><td className="lbl">Blood Type</td><td>{selectedReferral.referralPacket.patient?.bloodType || "—"}</td></tr>
                      </tbody>
                    </table>
                  </div>

                  {selectedReferral.consentLevel === "FULL" ? (
                    <>
                      {/* Vitals Signs Packet */}
                      {selectedReferral.referralPacket.vitals && selectedReferral.referralPacket.vitals.length > 0 && (
                        <div className="packet-section">
                          <h4>Vitals Signs Packet</h4>
                          {selectedReferral.referralPacket.vitals.map((v: any, idx: number) => (
                            <table key={idx} className="packet-table" style={{ marginBottom: idx > 0 ? 8 : 0 }}>
                              <tbody>
                                <tr><td className="lbl">Blood Pressure</td><td>{v.bpSystolic}/{v.bpDiastolic} mmHg</td></tr>
                                <tr><td className="lbl">Heart Rate</td><td>{v.heartRate} bpm</td></tr>
                                <tr><td className="lbl">Temperature</td><td>{v.temperature} °C</td></tr>
                                <tr><td className="lbl">Weight</td><td>{v.weightKg} kg / Height: {v.heightCm} cm</td></tr>
                              </tbody>
                            </table>
                          ))}
                        </div>
                      )}

                      {/* Prescriptions Packet */}
                      {selectedReferral.referralPacket.prescriptions && selectedReferral.referralPacket.prescriptions.length > 0 && (
                        <div className="packet-section">
                          <h4>Prescriptions Packet</h4>
                          <table className="packet-table">
                            <thead>
                              <tr style={{ borderBottom: "1px solid var(--border-subtle)", textAlign: "left" }}>
                                <th style={{ padding: "4px 0" }}>Medication</th>
                                <th style={{ padding: "4px 0" }}>Dosage</th>
                                <th style={{ padding: "4px 0" }}>Frequency</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedReferral.referralPacket.prescriptions.map((p: any, idx: number) => (
                                <tr key={idx}>
                                  <td style={{ padding: "4px 0" }}><strong>{p.brandName}</strong> ({p.genericName})</td>
                                  <td style={{ padding: "4px 0" }}>{p.dosage}</td>
                                  <td style={{ padding: "4px 0" }}>{p.frequency} • {p.durationDays}d</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Diagnoses ICD-10 List */}
                      {selectedReferral.referralPacket.diagnoses && selectedReferral.referralPacket.diagnoses.length > 0 && (
                        <div className="packet-section">
                          <h4>Sealed ICD-10 Diagnoses</h4>
                          <ul style={{ margin: 0, paddingLeft: 16, fontSize: "12px" }}>
                            {selectedReferral.referralPacket.diagnoses.map((d: any, idx: number) => (
                              <li key={idx} style={{ padding: "2px 0" }}>
                                <strong>{d.icd10Code}</strong> — {d.description}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="packet-section" style={{ background: "rgba(245, 158, 11, 0.04)" }}>
                      <p style={{ fontSize: "11.5px", color: "var(--warn-text)", margin: 0, fontWeight: 600 }}>
                        🔒 Clinical packet details (vitals, prescriptions, diagnoses) are hidden because the patient gave SUMMARY-only consent.
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="packet-section">
                  <p style={{ fontSize: "12px", color: "var(--muted)", margin: 0 }}>
                    This is an intra-organization referral. Full clinical history is accessed via the patient's local clinical timeline.
                  </p>
                </div>
              )}
            </div>
            <div className="ref-modal-footer">
              <Button type="button" variant="primary" onClick={() => setSelectedReferral(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}

      {toastMessage && (
        <div className="settings-toast">{toastMessage}</div>
      )}
    </div>
  );
}
