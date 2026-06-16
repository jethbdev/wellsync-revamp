"use client";

import * as React from "react";
import { useDashboard } from "../dashboard-context";
import {
  usePendingPrescriptions,
  usePrescriptionDetails,
  useDispensePrescription,
} from "../../../lib/hooks/api/useDispensing";
import {
  Button,
  Field,
  Input,
  Select,
  Pill,
  Card,
  CardBody,
} from "@healthbridge/ui";

export default function DispensingPage() {
  const { triggerToast, session } = useDashboard();
  const { data: pendingList = [], isLoading: isLoadingList } = usePendingPrescriptions();
  const [selectedRxId, setSelectedRxId] = React.useState<string | null>(null);

  // Fetch selected prescription details
  const { data: rxDetails, isLoading: isLoadingDetails } = usePrescriptionDetails(selectedRxId);
  const dispenseMutation = useDispensePrescription();

  // Search filter for patient name/pin
  const [searchQuery, setSearchQuery] = React.useState("");

  // Dispensing Form state
  const [dispenseType, setDispenseType] = React.useState<"OUTPATIENT" | "WARD" | "LGU_PROGRAM">("OUTPATIENT");
  const [destination, setDestination] = React.useState("");
  const [programName, setProgramName] = React.useState("");
  const [dispenseNotes, setDispenseNotes] = React.useState("");
  const [selectedBatches, setSelectedBatches] = React.useState<Record<string, string>>({}); // orderId -> batchId
  const [dispenseQuantities, setDispenseQuantities] = React.useState<Record<string, string>>({}); // orderId -> qtyString

  // Check write permission
  const hasWritePermission = React.useMemo(() => {
    return session?.session?.permissions?.includes("dispense:create") ?? false;
  }, [session]);

  // Filter pending prescriptions
  const filteredList = React.useMemo(() => {
    if (!searchQuery.trim()) return pendingList;
    const lower = searchQuery.toLowerCase();
    return pendingList.filter(
      (rx) =>
        rx.patient.firstName.toLowerCase().includes(lower) ||
        rx.patient.lastName.toLowerCase().includes(lower) ||
        rx.patient.pin.toLowerCase().includes(lower) ||
        rx.prescriptionToken.toLowerCase().includes(lower)
    );
  }, [pendingList, searchQuery]);

  // Pre-fill form state when prescription details load
  React.useEffect(() => {
    if (rxDetails) {
      const initialBatches: Record<string, string> = {};
      const initialQuantities: Record<string, string> = {};

      rxDetails.medicationOrders.forEach((order) => {
        if (order.status === "PENDING" && order.productId && order.availableBatches.length > 0) {
          // Pre-select the earliest expiry batch (first in FEFO list)
          initialBatches[order.id] = order.availableBatches[0].id;
          initialQuantities[order.id] = String(order.quantity);
        }
      });

      setSelectedBatches(initialBatches);
      setDispenseQuantities(initialQuantities);
      setDestination("");
      setProgramName("");
      setDispenseNotes("");
    }
  }, [rxDetails]);

  // Handle Dispense Submit
  const handleDispense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rxDetails) return;

    if (!hasWritePermission) {
      triggerToast("You do not have dispensing permissions", "alert");
      return;
    }

    // Compile lines
    const linesToSubmit = [];
    const pendingOrders = rxDetails.medicationOrders.filter((o) => o.status === "PENDING" && o.productId);

    for (const order of pendingOrders) {
      const batchId = selectedBatches[order.id];
      const qtyStr = dispenseQuantities[order.id];
      const qty = Number(qtyStr);

      if (!batchId) {
        triggerToast(`Please select an inventory batch for ${order.medicineName}`, "alert");
        return;
      }

      if (isNaN(qty) || qty <= 0) {
        triggerToast(`Please enter a valid quantity for ${order.medicineName}`, "alert");
        return;
      }

      const selectedBatch = order.availableBatches.find((b) => b.id === batchId);
      if (!selectedBatch) continue;

      const available = Number(selectedBatch.quantityOnHand);
      if (qty > available) {
        triggerToast(`Dispense quantity for ${order.medicineName} exceeds available batch stock (${available} units)`, "alert");
        return;
      }

      linesToSubmit.push({
        medicationOrderId: order.id,
        productId: order.productId!,
        batchId,
        quantity: qty,
      });
    }

    if (linesToSubmit.length === 0) {
      triggerToast("No stocked medication orders are selected for dispensing.", "alert");
      return;
    }

    try {
      const res = await dispenseMutation.mutateAsync({
        prescriptionId: rxDetails.id,
        dispenseType,
        destination: dispenseType === "WARD" ? destination : undefined,
        programName: dispenseType === "LGU_PROGRAM" ? programName : undefined,
        notes: dispenseNotes || undefined,
        lines: linesToSubmit,
      });

      triggerToast(`Prescription dispensed! Record: ${res.dispenseNumber}`);
      setSelectedRxId(null);
    } catch (err: any) {
      triggerToast(err.message || "Dispensation failed", "alert");
    }
  };

  const getPatientAge = (birthDateString: string) => {
    const birth = new Date(birthDateString);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="panel active" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div className="panel-inner" style={{ flex: 1, display: "flex", flexDirection: "column", height: "100%", padding: "28px 32px", boxSizing: "border-box" }}>
        
        {/* Page Header */}
        <div className="ph" style={{ flexShrink: 0, marginBottom: "20px" }}>
          <div className="ph-left">
            <h2>Pharmacy Dispensing Desk</h2>
            <p>Fulfill doctor prescriptions, track stock batch levels, and log outpatient or ward distributions.</p>
          </div>
        </div>

        {/* Split Desk Layout */}
        <div style={{ flex: 1, display: "flex", gap: "28px", minHeight: 0, overflow: "hidden" }}>
          
          {/* LEFT PANEL: Pending Prescriptions List */}
          <div style={{ width: "320px", display: "flex", flexDirection: "column", gap: "16px", flexShrink: 0 }}>
            <div className="tbl-search" style={{ width: "100%", boxSizing: "border-box" }}>
              <svg viewBox="0 0 16 16">
                <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                <path d="M10.5 10.5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Search patient, PIN or Rx token..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ background: "transparent", border: "none", outline: "none", fontSize: "13px", color: "var(--ink)", width: "100%", padding: 0 }}
              />
            </div>

            <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px" }}>
              {isLoadingList ? (
                <div style={{ padding: "20px", textAlign: "center", color: "var(--muted)", fontSize: "13px" }}>Loading pending list...</div>
              ) : filteredList.length === 0 ? (
                <div style={{ padding: "30px 20px", textAlign: "center", color: "var(--muted)", border: "1px dashed var(--border)", borderRadius: "var(--rsm)", fontSize: "13px" }}>
                  No pending prescriptions found.
                </div>
              ) : (
                filteredList.map((rx) => {
                  const active = selectedRxId === rx.id;
                  const patientName = `${rx.patient.firstName} ${rx.patient.lastName}`;
                  return (
                    <div
                      key={rx.id}
                      onClick={() => setSelectedRxId(rx.id)}
                      className={`role-item ${active ? "selected" : ""}`}
                      style={{ padding: "14px", cursor: "pointer", border: active ? "1.5px solid var(--accent)" : "1px solid var(--border)", background: active ? "rgba(var(--accent-rgb, 124, 58, 237), 0.03)" : "var(--white)" }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                        <span style={{ fontWeight: "bold", fontSize: "14px", color: "var(--ink)" }}>{patientName}</span>
                        <span style={{ fontSize: "11px", fontFamily: "monospace", color: "var(--muted)" }}>{rx.patient.pin}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--muted)" }}>
                        <span>Rx: {rx.prescriptionToken.substring(9)}</span>
                        <span>{rx._count.medicationOrders} item(s) pending</span>
                      </div>
                      <div style={{ fontSize: "10.5px", color: "var(--faint)", marginTop: "4px", textAlign: "right" }}>
                        {new Date(rx.createdAt).toLocaleDateString()} {new Date(rx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* RIGHT PANEL: Details & Form */}
          <div style={{ flex: 1, background: "var(--white)", border: "1px solid var(--border)", borderRadius: "var(--rlg)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {isLoadingDetails ? (
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", color: "var(--muted)" }}>
                Loading prescription details...
              </div>
            ) : rxDetails ? (
              <form onSubmit={handleDispense} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                {/* Read-Only Warning Banner */}
                {!hasWritePermission && (
                  <div style={{ padding: "12px 24px", background: "rgba(245, 158, 11, 0.08)", borderBottom: "1px solid rgba(245, 158, 11, 0.2)", color: "var(--warn-text)", fontSize: "13px", display: "flex", gap: "8px", alignItems: "center" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                    <span><strong>Read-Only View:</strong> You do not have dispensing permissions (`dispense:create`) to fulfill orders.</span>
                  </div>
                )}

                {/* Rx Header */}
                <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-subtle)", background: "var(--surface)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                    <div>
                      <h3 style={{ margin: "0 0 4px 0", fontSize: "18px", fontWeight: "bold", color: "var(--ink)" }}>
                        {rxDetails.patient.firstName} {rxDetails.patient.lastName}
                      </h3>
                      <span style={{ fontSize: "13px", color: "var(--muted)" }}>
                        Age: {getPatientAge(rxDetails.patient.birthDate)} yrs · Gender: {rxDetails.patient.sex.toLowerCase()} · PIN: <span style={{ fontFamily: "monospace" }}>{rxDetails.patient.pin}</span>
                      </span>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <Pill variant="ok">Rx Token: {rxDetails.prescriptionToken}</Pill>
                      <span style={{ display: "block", fontSize: "11px", color: "var(--muted)", marginTop: "6px" }}>
                        Ordered by: Dr. {rxDetails.prescribedBy?.lastName || "Santos"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Rx Medication Items */}
                <div style={{ flex: 1, padding: "24px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "20px" }}>
                  <h4 style={{ margin: "0 0 -5px 0", fontSize: "14px", fontWeight: "700", textTransform: "uppercase", color: "var(--muted)", letterSpacing: "0.5px" }}>Prescribed Medications</h4>
                  
                  {rxDetails.medicationOrders.map((order) => {
                    const isPending = order.status === "PENDING";
                    const hasProductLink = !!order.productId;
                    const batches = order.availableBatches || [];
                    const selectedBatchId = selectedBatches[order.id];
                    const selectedBatch = batches.find((b) => b.id === selectedBatchId);
                    const qtyVal = dispenseQuantities[order.id] || "";

                    return (
                      <Card key={order.id} style={{ border: isPending ? "1px solid var(--border)" : "1px solid var(--border-subtle)", opacity: isPending ? 1 : 0.75 }}>
                        <CardBody style={{ padding: "16px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                            <div>
                              <span style={{ fontWeight: "bold", fontSize: "15px", color: "var(--ink)" }}>
                                {order.medicineName}
                              </span>
                              <span style={{ fontSize: "12px", color: "var(--muted)", display: "block", marginTop: "2px" }}>
                                {order.dose} · {order.frequency} · {order.duration}
                              </span>
                              {order.instructions && (
                                <span style={{ fontSize: "11.5px", color: "var(--faint)", fontStyle: "italic", display: "block", marginTop: "4px" }}>
                                  Instructions: "{order.instructions}"
                                </span>
                              )}
                            </div>
                            <div style={{ textAlign: "right" }}>
                              <span style={{ display: "block", fontWeight: "bold", fontSize: "14px", color: "var(--accent)" }}>
                                Prescribed: {Number(order.quantity)} {order.unit || "units"}
                              </span>
                              {!isPending ? (
                                <Pill variant="neutral" style={{ marginTop: "6px" }}>Dispensed</Pill>
                              ) : !hasProductLink ? (
                                <Pill variant="warn" style={{ marginTop: "6px" }}>External Rx / Not Linked</Pill>
                              ) : batches.length === 0 ? (
                                <Pill variant="crit" style={{ marginTop: "6px" }}>Out of Stock</Pill>
                              ) : (
                                <Pill variant="ok" style={{ marginTop: "6px" }}>In Stock</Pill>
                              )}
                            </div>
                          </div>

                          {/* Dispense selectors if pending & stocked */}
                          {isPending && hasProductLink && batches.length > 0 && (
                            <div style={{ borderTop: "1px dashed var(--border)", paddingTop: "14px", marginTop: "12px", display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px" }}>
                              <Field label="Select Batch (FEFO recommended)">
                                <Select
                                  disabled={!hasWritePermission}
                                  value={selectedBatchId || ""}
                                  onChange={(e) =>
                                    setSelectedBatches((prev) => ({
                                      ...prev,
                                      [order.id]: e.target.value,
                                    }))
                                  }
                                  options={batches.map((b) => {
                                    const expStr = b.expiryDate ? ` (Exp: ${new Date(b.expiryDate).toLocaleDateString()})` : " (No Expiry)";
                                    return {
                                      value: b.id,
                                      label: `Batch ${b.batchNumber}${expStr} - Available: ${Number(b.quantityOnHand)} units (${b.warehouse.name}${b.bin ? `, ${b.bin.binCode}` : ""})`,
                                    };
                                  })}
                                />
                              </Field>
                              <Field label="Dispense Qty">
                                <Input
                                  disabled={!hasWritePermission}
                                  type="number"
                                  min="1"
                                  max={selectedBatch ? Number(selectedBatch.quantityOnHand) : undefined}
                                  value={qtyVal}
                                  onChange={(e) =>
                                    setDispenseQuantities((prev) => ({
                                      ...prev,
                                      [order.id]: e.target.value,
                                    }))
                                  }
                                />
                              </Field>
                            </div>
                          )}

                          {/* Warnings */}
                          {isPending && hasProductLink && batches.length === 0 && (
                            <div style={{ background: "rgba(239, 68, 68, 0.05)", border: "1px dashed rgba(239, 68, 68, 0.2)", borderRadius: "4px", padding: "10px", marginTop: "10px", color: "var(--crit-text)", fontSize: "12px" }}>
                              ⚠️ <strong>Out of stock:</strong> This medicine cannot be dispensed in the clinic. Advise the patient to purchase externally.
                            </div>
                          )}
                          {isPending && !hasProductLink && (
                            <div style={{ background: "rgba(245, 158, 11, 0.05)", border: "1px dashed rgba(245, 158, 11, 0.2)", borderRadius: "4px", padding: "10px", marginTop: "10px", color: "var(--warn-text)", fontSize: "12px" }}>
                              ℹ️ <strong>External prescription:</strong> This medication ordering record is not linked to any clinic stock item.
                            </div>
                          )}
                        </CardBody>
                      </Card>
                    );
                  })}
                </div>

                {/* Dispensing Header Details (Outpatient/Ward) */}
                <div style={{ padding: "20px 24px", borderTop: "1px solid var(--border-subtle)", background: "var(--surface)", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <Field label="Distribution Type">
                      <Select
                        disabled={!hasWritePermission}
                        value={dispenseType}
                        onChange={(e) => setDispenseType(e.target.value as any)}
                        options={[
                          { value: "OUTPATIENT", label: "Outpatient (Take home)" },
                          { value: "WARD", label: "Ward / Inpatient use" },
                          { value: "LGU_PROGRAM", label: "Government LGU Program" },
                        ]}
                      />
                    </Field>

                    {dispenseType === "WARD" && (
                      <Field label="Ward Destination / Room">
                        <Input
                          disabled={!hasWritePermission}
                          type="text"
                          placeholder="e.g. ICU Bed 4, Ward B"
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                        />
                      </Field>
                    )}

                    {dispenseType === "LGU_PROGRAM" && (
                      <Field label="LGU Health Program Name">
                        <Input
                          disabled={!hasWritePermission}
                          type="text"
                          placeholder="e.g. DOH Senior Citizen, Dengue Relief"
                          value={programName}
                          onChange={(e) => setProgramName(e.target.value)}
                        />
                      </Field>
                    )}
                  </div>

                  <Field label="Dispensing Notes (Optional)">
                    <Input
                      disabled={!hasWritePermission}
                      type="text"
                      placeholder="e.g. Dispensed 1-week starter pack, remainder filled externally..."
                      value={dispenseNotes}
                      onChange={(e) => setDispenseNotes(e.target.value)}
                    />
                  </Field>
                </div>

                {/* Actions Footer */}
                <div style={{ padding: "16px 24px", borderTop: "1px solid var(--border-subtle)", background: "var(--white)", display: "flex", justifyContent: "flex-end", gap: "10px", flexShrink: 0 }}>
                  <Button type="button" variant="ghost" onClick={() => setSelectedRxId(null)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" disabled={dispenseMutation.isPending || !hasWritePermission}>
                    {dispenseMutation.isPending ? "Dispensing..." : "Fulfill & Dispense Prescription"}
                  </Button>
                </div>
              </form>
            ) : (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px", color: "var(--muted)" }}>
                <svg viewBox="0 0 15 15" style={{ width: "48px", height: "48px", stroke: "var(--border)", strokeWidth: "1", fill: "none", marginBottom: "16px" }}>
                  <path d="M5 2h5l2 3H3L5 2z" />
                  <rect x="2" y="5" width="11" height="8" rx="1.5" />
                  <path d="M5 8.5h5M7.5 7v3" />
                </svg>
                <h4 style={{ margin: "0 0 4px 0", color: "var(--ink)", fontWeight: "bold" }}>No Prescription Selected</h4>
                <p style={{ margin: 0, fontSize: "13px", textAlign: "center", maxWidth: "280px" }}>
                  Select an active patient prescription from the left directory to dispense clinic stocks.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
