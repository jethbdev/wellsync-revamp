"use client";

import * as React from "react";
import { usePatient } from "../patient-context";

const STATUS_COLOR: Record<string, { bg: string; text: string; label: string }> = {
  ACTIVE:    { bg: "var(--accent-light)", text: "var(--accent)",   label: "Active" },
  PENDING:   { bg: "var(--warn-bg)",      text: "var(--warn-text)", label: "Pending" },
  COMPLETED: { bg: "rgba(34,197,94,.12)", text: "#16a34a",          label: "Completed" },
  CANCELLED: { bg: "var(--crit-bg)",      text: "var(--crit-text)", label: "Cancelled" },
};

function StatusPill({ status }: { status: string }) {
  const s = STATUS_COLOR[status] ?? { bg: "var(--surface)", text: "var(--muted)", label: status };
  return (
    <span style={{
      display: "inline-block",
      padding: "2px 10px",
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 700,
      background: s.bg,
      color: s.text,
      letterSpacing: ".03em",
      textTransform: "uppercase" as const
    }}>
      {s.label}
    </span>
  );
}

export default function PatientRx() {
  const { activeRx, profile } = usePatient();

  // Show ALL prescriptions (not just active) so user can see history
  const allRx = (profile as any)?.consultations?.flatMap((c: any) =>
    (c.prescriptions || []).map((rx: any) => ({ ...rx, consultationDate: c.consultationDate }))
  ) ?? activeRx;

  const [selectedId, setSelectedId] = React.useState<string | null>(
    allRx.length > 0 ? allRx[0].id : null
  );

  const selected = allRx.find((rx: any) => rx.id === selectedId) ?? allRx[0] ?? null;
  const orders = selected?.medicationOrders ?? [];

  // QR rotates per medication order for multi-drug prescriptions
  const [activeOrderIdx, setActiveOrderIdx] = React.useState(0);
  React.useEffect(() => { setActiveOrderIdx(0); }, [selectedId]);
  const activeOrder = orders[activeOrderIdx] ?? null;
  const qrToken = selected?.prescriptionToken;

  const qrUrl = qrToken
    ? `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrToken)}&margin=10&color=000000&bgcolor=ffffff`
    : null;

  return (
    <div className="panel active">
      <div className="panel-inner">
        {/* Page Header */}
        <div className="ph">
          <div className="ph-left">
            <h2>My Prescriptions</h2>
            <p>Select a prescription to view details and generate your dispensing QR code.</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{
              background: "var(--accent-light)", color: "var(--accent)",
              borderRadius: 20, padding: "4px 14px", fontSize: 12, fontWeight: 700
            }}>
              {activeRx.length} Active
            </span>
          </div>
        </div>

        {allRx.length === 0 ? (
          <div style={{
            textAlign: "center", padding: "60px 20px",
            background: "var(--white)", borderRadius: "var(--rlg)", boxShadow: "var(--card-shadow)"
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%",
              background: "var(--accent-light)", color: "var(--accent)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 16px"
            }}>
              <svg viewBox="0 0 15 15" style={{ width: 24, height: 24, fill: "none", stroke: "currentColor", strokeWidth: 1.5 }}>
                <path d="M5 2h5l2 3H3L5 2z" /><rect x="2" y="5" width="11" height="8" rx="1.5" />
                <path d="M5 8.5h5M7.5 7v3" />
              </svg>
            </div>
            <p style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 16, marginBottom: 8 }}>No Prescriptions Found</p>
            <p style={{ color: "var(--muted)", fontSize: 14 }}>Your doctor hasn't issued any prescriptions yet.</p>
          </div>
        ) : (
          <div className="rx-main-grid" style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 18, alignItems: "start" }}>

            {/* LEFT — Prescription List */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 2 }}>
                All Prescriptions
              </p>
              {allRx.map((rx: any) => {
                const isActive = rx.id === selectedId;
                const firstOrder = rx.medicationOrders?.[0];
                const rxStatus = firstOrder?.status ?? "ACTIVE";
                const s = STATUS_COLOR[rxStatus] ?? STATUS_COLOR.ACTIVE;
                return (
                  <button
                    key={rx.id}
                    onClick={() => setSelectedId(rx.id)}
                    style={{
                      background: isActive ? "var(--accent)" : "var(--white)",
                      border: isActive ? "2px solid var(--accent)" : "1.5px solid var(--border)",
                      borderRadius: "var(--rmd)",
                      padding: "14px 16px",
                      cursor: "pointer",
                      textAlign: "left",
                      boxShadow: isActive ? "0 4px 16px rgba(108,99,255,0.25)" : "var(--card-shadow)",
                      transition: "all .18s",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{
                        fontSize: 10, fontWeight: 700, color: isActive ? "rgba(255,255,255,.7)" : "var(--muted)",
                        textTransform: "uppercase", letterSpacing: ".05em"
                      }}>
                        {new Date(rx.consultationDate ?? rx.createdAt).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                      <span style={{
                        fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20,
                        background: isActive ? "rgba(255,255,255,.2)" : s.bg,
                        color: isActive ? "white" : s.text,
                      }}>
                        {s.label}
                      </span>
                    </div>
                    <div style={{
                      fontSize: 13, fontWeight: 600,
                      color: isActive ? "white" : "var(--ink)",
                      marginBottom: 4
                    }}>
                      {firstOrder?.medicineName ?? "Prescription"}
                    </div>
                    {rx.medicationOrders?.length > 1 && (
                      <div style={{ fontSize: 11, color: isActive ? "rgba(255,255,255,.65)" : "var(--muted)" }}>
                        +{rx.medicationOrders.length - 1} more medication{rx.medicationOrders.length > 2 ? "s" : ""}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* RIGHT — Detail + QR */}
            {selected && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                {/* Medication Orders */}
                <div style={{ background: "var(--white)", borderRadius: "var(--rlg)", boxShadow: "var(--card-shadow)", overflow: "hidden" }}>
                  <div style={{
                    padding: "16px 20px", borderBottom: "1px solid var(--border-subtle)",
                    display: "flex", alignItems: "center", justifyContent: "space-between"
                  }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", fontFamily: "Sora, sans-serif" }}>
                      Medication Orders
                    </span>
                    <span style={{ fontSize: 11, color: "var(--muted)" }}>
                      {orders.length} item{orders.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {orders.length === 0 ? (
                    <div style={{ padding: "20px", color: "var(--muted)", fontSize: 14 }}>No medication orders on record.</div>
                  ) : (
                    orders.map((order: any, idx: number) => (
                      <div
                        key={order.id}
                        onClick={() => setActiveOrderIdx(idx)}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr auto",
                          gap: 12,
                          padding: "16px 20px",
                          borderBottom: idx < orders.length - 1 ? "1px solid var(--border-subtle)" : "none",
                          cursor: "pointer",
                          background: activeOrderIdx === idx ? "var(--accent-light)" : "transparent",
                          transition: "background .15s"
                        }}
                      >
                        <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                          <div style={{
                            width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                            background: activeOrderIdx === idx ? "var(--accent)" : "var(--surface)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            transition: "background .15s"
                          }}>
                            <svg viewBox="0 0 14 14" style={{ width: 18, height: 18, fill: "none", stroke: activeOrderIdx === idx ? "white" : "var(--accent)", strokeWidth: 1.4 }}>
                              <path d="M4 1.5h6l2 3H2L4 1.5z" /><rect x="1" y="4.5" width="12" height="8" rx="1.5" />
                              <path d="M5 8h4M7 6.5v3" />
                            </svg>
                          </div>
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", marginBottom: 3 }}>
                              {order.medicineName}
                            </div>
                            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
                              <strong>{order.dose}</strong> · {order.frequency} · {order.duration}
                              {order.route && <> · <em>{order.route}</em></>}
                            </div>
                            {order.instructions && (
                              <div style={{
                                fontSize: 11, color: "var(--ink)", background: "var(--warn-bg)",
                                borderRadius: 6, padding: "4px 8px", marginTop: 6,
                                fontStyle: "italic", display: "inline-block"
                              }}>
                                💊 {order.instructions}
                              </div>
                            )}
                          </div>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <div style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)" }}>
                            Qty: {order.quantity}
                          </div>
                          <StatusPill status={order.status} />
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Bottom row: QR + Details side by side */}
                <div className="rx-details-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

                  {/* QR Code Card */}
                  <div style={{
                    background: "var(--white)", borderRadius: "var(--rlg)",
                    boxShadow: "var(--card-shadow)", padding: 24,
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 12
                  }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", fontFamily: "Sora, sans-serif", alignSelf: "flex-start" }}>
                      Dispensing QR Code
                    </div>
                    {qrUrl ? (
                      <>
                        <div style={{
                          border: "3px solid var(--border)",
                          borderRadius: "var(--rmd)",
                          padding: 8,
                          background: "white",
                          boxShadow: "0 4px 20px rgba(108,99,255,.12)"
                        }}>
                          <img
                            src={qrUrl}
                            alt="Prescription QR Code"
                            style={{ width: 160, height: 160, display: "block", borderRadius: 4 }}
                          />
                        </div>
                        <p style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)", textAlign: "center" }}>
                          Show at pharmacy counter
                        </p>
                        <p style={{ fontSize: 10, color: "var(--faint)", wordBreak: "break-all", textAlign: "center", lineHeight: 1.5 }}>
                          {qrToken?.slice(0, 40)}…
                        </p>
                        {activeOrder && (
                          <p style={{ fontSize: 11, color: "var(--muted)", textAlign: "center" }}>
                            Showing QR for: <strong>{activeOrder.medicineName}</strong>
                          </p>
                        )}
                        <div style={{ display: "flex", gap: 10, width: "100%", justifyContent: "center", marginTop: 8 }}>
                          <a
                            href={qrUrl}
                            download="prescription-qr.png"
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              display: "inline-flex", alignItems: "center", gap: 6,
                              padding: "8px 14px", borderRadius: "var(--rmd)",
                              background: "var(--accent-light)", color: "var(--accent)",
                              fontSize: 12, fontWeight: 600, textDecoration: "none",
                              transition: "background .15s", flex: 1, justifyContent: "center"
                            }}
                          >
                            <svg viewBox="0 0 15 15" style={{ width: 13, height: 13, fill: "none", stroke: "currentColor", strokeWidth: 1.8 }}>
                              <path d="M7.5 2v8M4 7.5l3.5 3.5 3.5-3.5M2 12.5h11" />
                            </svg>
                            Save QR
                          </a>
                          <button
                            onClick={() => window.print()}
                            style={{
                              display: "inline-flex", alignItems: "center", gap: 6,
                              padding: "8px 14px", borderRadius: "var(--rmd)",
                              background: "var(--accent)", color: "white",
                              fontSize: 12, fontWeight: 600, border: "none", cursor: "pointer",
                              transition: "background .15s", flex: 1, justifyContent: "center"
                            }}
                          >
                            <svg viewBox="0 0 15 15" style={{ width: 13, height: 13, fill: "none", stroke: "currentColor", strokeWidth: 1.8 }}>
                              <path d="M2.5 5.5v-3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3M1.5 5.5h12v5a1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1v-5zM3.5 8.5h8" />
                            </svg>
                            Save PDF
                          </button>
                        </div>
                      </>
                    ) : (
                      <p style={{ color: "var(--muted)", fontSize: 13, textAlign: "center" }}>
                        No dispensing token available for this prescription.
                      </p>
                    )}
                  </div>

                  {/* Prescription Meta */}
                  <div style={{
                    background: "var(--white)", borderRadius: "var(--rlg)",
                    boxShadow: "var(--card-shadow)", padding: 24,
                    display: "flex", flexDirection: "column", gap: 14
                  }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", fontFamily: "Sora, sans-serif" }}>
                      Prescription Details
                    </div>

                    {[
                      { label: "Date Issued", value: new Date(selected.consultationDate ?? selected.createdAt).toLocaleDateString("en-PH", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) },
                      { label: "Clinic / Facility", value: (profile as any)?.facility?.name ?? "—" },
                      { label: "Prescription Ref.", value: selected.id?.slice(0, 8).toUpperCase() ?? "—" },
                      { label: "Total Medications", value: `${orders.length} item${orders.length !== 1 ? "s" : ""}` },
                      { label: "Status", value: activeOrder?.status ?? "ACTIVE" },
                    ].map(({ label, value }) => (
                      <div key={label} style={{ display: "flex", flexDirection: "column", gap: 2, paddingBottom: 12, borderBottom: "1px solid var(--border-subtle)" }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".06em" }}>
                          {label}
                        </span>
                        {label === "Status" ? (
                          <StatusPill status={value} />
                        ) : (
                          <span style={{ fontSize: 13, color: "var(--ink)", fontWeight: 500 }}>{value}</span>
                        )}
                      </div>
                    ))}

                    <div style={{
                      background: "var(--info-bg)", borderRadius: "var(--rsm)",
                      padding: "10px 12px", fontSize: 12, color: "var(--info-text)", lineHeight: 1.6
                    }}>
                      <strong>📌 Reminder:</strong> Always bring a valid ID when claiming medication at the pharmacy.
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Responsive & Print Style Overrides */}
      <style>{`
        @media (max-width: 768px) {
          .rx-main-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .rx-details-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
        #print-prescription-area {
          display: none;
        }
        @media print {
          body * {
            visibility: hidden !important;
          }
          #print-prescription-area, #print-prescription-area * {
            visibility: visible !important;
          }
          #print-prescription-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            display: block !important;
            background: white !important;
            color: black !important;
            padding: 30px !important;
            font-family: 'DM Sans', sans-serif;
          }
          #print-prescription-area text,
          #print-prescription-area span,
          #print-prescription-area div,
          #print-prescription-area h1,
          #print-prescription-area h2,
          #print-prescription-area h3,
          #print-prescription-area p,
          #print-prescription-area strong,
          #print-prescription-area th,
          #print-prescription-area td {
            color: #000000 !important;
            background: transparent !important;
          }
        }
      `}</style>

      {/* Print-Only Prescription Voucher Layout */}
      {selected && (
        <div id="print-prescription-area">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
            <div>
              <h1 style={{ fontSize: "20px", fontWeight: 700, margin: 0, color: "black", fontFamily: "Sora, sans-serif" }}>
                {(profile as any)?.facility?.name || "HealthBridge Partner Clinic"}
              </h1>
              <p style={{ fontSize: "11px", margin: "4px 0", color: "#444" }}>
                {(profile as any)?.facility?.address || "Electronic Medical Record Network"}
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "12px", fontWeight: 700 }}>OFFICIAL DIGITAL PRESCRIPTION</div>
              <div style={{ fontSize: "10px", color: "#444" }}>Ref: {selected.id?.slice(0, 8).toUpperCase() || "—"}</div>
            </div>
          </div>

          <div style={{ borderBottom: "2px solid #000", marginBottom: 20 }} />

          {/* Patient Details */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 12, fontSize: "12px", marginBottom: 24 }}>
            <div>
              <strong>Patient Name:</strong> {profile.firstName} {profile.lastName}
            </div>
            <div>
              <strong>Age / Sex:</strong> {(() => {
                if (!profile.birthDate) return "—";
                const bd = new Date(profile.birthDate);
                const td = new Date();
                let a = td.getFullYear() - bd.getFullYear();
                const m = td.getMonth() - bd.getMonth();
                if (m < 0 || (m === 0 && td.getDate() < bd.getDate())) a--;
                return `${a} yrs`;
              })()} / {profile.sex === "MALE" ? "Male" : "Female"}
            </div>
            <div>
              <strong>Date:</strong> {new Date(selected.consultationDate ?? selected.createdAt).toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" })}
            </div>
          </div>

          {/* Rx Symbol */}
          <div style={{ fontSize: "36px", fontFamily: "Sora, sans-serif", fontWeight: 700, marginBottom: 15, fontStyle: "italic", color: "#000" }}>
            Rx
          </div>

          {/* Medication List */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40, paddingLeft: 10 }}>
            {orders.map((order: any, idx: number) => (
              <div key={order.id || idx} style={{ borderBottom: "1px solid #ddd", paddingBottom: 10 }}>
                <div style={{ fontSize: "14px", fontWeight: 700, display: "flex", justifyContent: "space-between", color: "#000" }}>
                  <span>{idx + 1}. {order.medicineName}</span>
                  <span>Qty: {order.quantity}</span>
                </div>
                <div style={{ fontSize: "12px", marginTop: 4, color: "#222" }}>
                  <strong>Sig:</strong> {order.dose} · {order.frequency} · {order.duration} {order.route && `(${order.route})`}
                </div>
                {order.instructions && (
                  <div style={{ fontSize: "11px", marginTop: 4, color: "#555", fontStyle: "italic" }}>
                    Note: {order.instructions}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Doctor Signature Block & Verification QR */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "flex-end", marginTop: 40, paddingTop: 20 }}>
            <div style={{ fontSize: "11px", color: "#444", display: "flex", flexDirection: "column", gap: 4 }}>
              <div><strong>Prescription Token:</strong> {selected.prescriptionToken}</div>
              <div>Generated electronically via HealthBridge Patient Portal. Valid verification signature is embedded.</div>
              <div style={{ marginTop: 30, width: 220, borderTop: "1.5px solid #000", paddingTop: 6, fontSize: "12px", color: "#000", fontWeight: 600 }}>
                Attending Physician
              </div>
            </div>
            {qrUrl && (
              <div style={{ textAlign: "center" }}>
                <img src={qrUrl} alt="Verification QR" style={{ width: 96, height: 96, display: "block", marginBottom: 6 }} />
                <div style={{ fontSize: "8px", color: "#666" }}>Pharmacy Dispense Scan</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
