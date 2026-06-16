"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { useDashboard } from "../dashboard-context";
import { Button, Field, Input, Select, Textarea } from "@healthbridge/ui";
import { useMedicinesSearch } from "../../../lib/hooks/api/useMedicines";

const ICD10_CODES = [
  { value: "I10",   label: "I10 — Essential Hypertension" },
  { value: "E78.5", label: "E78.5 — Dyslipidemia" },
  { value: "N18.2", label: "N18.2 — CKD Stage 2" },
  { value: "J06.9", label: "J06.9 — Upper Respiratory Infection" },
  { value: "K21.0", label: "K21.0 — GERD" },
  { value: "M54.5", label: "M54.5 — Low Back Pain" },
  { value: "E11",   label: "E11 — Type 2 Diabetes Mellitus" },
  { value: "J45",   label: "J45 — Asthma" },
];

function NewVisitFormContent() {
  const searchParams = useSearchParams();
  const {
    selectedPatient,
    setSelectedPatientId,
    patientHeight,
    setPatientHeight,
    patientWeight,
    setPatientWeight,
    calculatedBmi,
    selectedIcd,
    setSelectedIcd,
    modeOfTransaction,
    setModeOfTransaction,
    soapNotes,
    setSoapNotes,
    prescriptions,
    setPrescriptions,
    handleSaveSoap,
    navigateTo,
    triggerToast,
    plugins = [],
  } = useDashboard();

  // ── Pre-fill from URL params (set when opened from the video room) ──────
  const urlPatientId = searchParams.get("patientId");
  const urlMode = searchParams.get("mode");

  React.useEffect(() => {
    if (urlPatientId) setSelectedPatientId(urlPatientId);
    if (urlMode) setModeOfTransaction(urlMode);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlPatientId, urlMode]);

  const isTeleconsultationActive = React.useMemo(
    () => plugins.some((p: any) => p.id === "teleconsultation" && p.isActive),
    [plugins]
  );

  // If teleconsult plugin is off and mode is set to it, fall back to walk-in
  React.useEffect(() => {
    if (!isTeleconsultationActive && modeOfTransaction === "TELECONSULTATION") {
      setModeOfTransaction("WALK_IN");
    }
  }, [isTeleconsultationActive, modeOfTransaction, setModeOfTransaction]);

  // ── BMI label ────────────────────────────────────────────────────────────
  const bmiLabel = React.useMemo(() => {
    if (!calculatedBmi) return "";
    if (calculatedBmi < 18.5) return "Underweight";
    if (calculatedBmi < 25)   return "Normal";
    if (calculatedBmi < 30)   return "Overweight";
    return "Obese";
  }, [calculatedBmi]);

  const bmiColor = React.useMemo(() => {
    if (!calculatedBmi) return "var(--muted)";
    if (calculatedBmi < 18.5) return "var(--info-text)";
    if (calculatedBmi < 25)   return "var(--accent)";
    if (calculatedBmi < 30)   return "var(--warn-text)";
    return "var(--crit-text)";
  }, [calculatedBmi]);

  // ── Rx Form Local States ──────────────────────────────────────────────────
  const [tempMed,          setTempMed]        = React.useState("");
  const [tempBrand,        setTempBrand]      = React.useState("");
  const [tempDose,         setTempDose]       = React.useState("1 tablet");
  const [tempFrequency,    setTempFrequency]  = React.useState("Once daily");
  const [tempDuration,     setTempDuration]   = React.useState("30 days");
  const [tempQty,          setTempQty]        = React.useState(30);
  const [medSearch,        setMedSearch]      = React.useState("");
  const [showSuggestions,  setShowSuggestions] = React.useState(false);
  const [selectedMed,      setSelectedMed]    = React.useState<any>(null);
  const suggestionRef = React.useRef<HTMLDivElement | null>(null);

  const { data: suggestions = [], isLoading } = useMedicinesSearch(medSearch);

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleAddMed = () => {
    if (!tempMed.trim()) {
      triggerToast("Please enter a medication name", "alert");
      return;
    }
    let finalMedName = tempMed.trim();
    if (tempBrand.trim()) {
      finalMedName = selectedMed
        ? `${selectedMed.molecule} (${tempBrand.trim()}) ${selectedMed.spec} (${selectedMed.route})`.replace(/\s+/g, " ")
        : `${tempMed} (${tempBrand.trim()})`;
    }
    if (prescriptions.some((p) => p.medicineName === finalMedName)) {
      triggerToast(`${finalMedName} is already in the prescription`, "alert");
      return;
    }
    setPrescriptions([
      ...prescriptions,
      { medicineName: finalMedName, dose: tempDose, frequency: tempFrequency, duration: tempDuration, quantity: tempQty },
    ]);
    setTempMed(""); setMedSearch(""); setTempBrand(""); setSelectedMed(null);
    setTempDose("1 tablet"); setTempFrequency("Once daily"); setTempDuration("30 days"); setTempQty(30);
    triggerToast(`${finalMedName} added to prescription`);
  };

  const handleRemoveMed = (idx: number) => {
    setPrescriptions(prescriptions.filter((_, i) => i !== idx));
  };

  const modeOptions = React.useMemo(() => {
    const opts = [{ value: "WALK_IN", label: "Walk-in" }];
    if (isTeleconsultationActive) {
      opts.push({ value: "TELECONSULTATION", label: "Teleconsultation" });
    }
    opts.push({ value: "HOME_VISIT", label: "Home Visit" });
    opts.push({ value: "EMERGENCY", label: "Emergency" });
    return opts;
  }, [isTeleconsultationActive]);

  const [isSaving, setIsSaving] = React.useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) {
      triggerToast("Please select a patient first", "alert");
      return;
    }
    if (!soapNotes.trim()) {
      triggerToast("Please complete the SOAP notes", "alert");
      return;
    }
    setIsSaving(true);
    try {
      await handleSaveSoap(e);
    } catch (err: any) {
      triggerToast(err.message || "Failed to save consultation", "alert");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="panel active">
      <div className="panel-inner">
        {/* Page Header */}
        <div className="ph">
          <div className="ph-left">
            <h2>Record New Visit</h2>
            <p>
              Creating consult sheet for{" "}
              <strong>{selectedPatient?.name ?? "No Patient Selected"}</strong>{" "}
              {selectedPatient ? `(${selectedPatient.id})` : ""}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave}>
          <div className="form-wrap">
            {/* Live Teleconsultation Banner */}
            {modeOfTransaction === "TELECONSULTATION" && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: "var(--accent-light)",
                  border: "1.5px solid var(--accent)",
                  borderRadius: "var(--rlg)",
                  padding: "12px 18px",
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "var(--accent)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg viewBox="0 0 16 16" fill="currentColor" width={16} height={16}>
                    <path d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.33 3 1.333V4.337l-3 1.334v4.66z" />
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "var(--accent)",
                      fontFamily: "'Sora', sans-serif",
                    }}
                  >
                    Live Teleconsultation in Progress
                  </div>
                  <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>
                    Your video call is running in another tab. Fill out the SOAP notes here while speaking with the patient.
                  </div>
                </div>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#ef4444",
                    flexShrink: 0,
                    animation: "soappulse 1.5s ease-in-out infinite",
                  }}
                />
              </div>
            )}

            {/* 1. Vital Signs */}
            <div className="form-section">
              <div className="form-section-title">1. Vital signs</div>
              <div className="form-grid cols3">
                <Field label="Height (cm)">
                  <Input
                    type="number"
                    value={patientHeight}
                    onChange={(e) => setPatientHeight(e.target.value)}
                    placeholder="170"
                    required
                  />
                </Field>
                <Field label="Weight (kg)">
                  <Input
                    type="number"
                    value={patientWeight}
                    onChange={(e) => setPatientWeight(e.target.value)}
                    placeholder="70"
                    required
                  />
                </Field>
                <Field label="Calculated BMI">
                  <div
                    style={{
                      padding: "9px 12px",
                      borderRadius: "var(--rsm)",
                      background: "var(--accent-light)",
                      color: "var(--accent)",
                      fontSize: "13px",
                      fontWeight: 700,
                      lineHeight: 1.5,
                      textAlign: "center",
                    }}
                  >
                    {calculatedBmi?.toFixed(1) ?? "—"}{" "}
                    {calculatedBmi ? (
                      <span style={{ fontSize: "11px", fontWeight: 500, color: bmiColor }}>
                        ({bmiLabel})
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </Field>
              </div>
            </div>

            {/* 2. Clinical Notes & Diagnosis */}
            <div className="form-section">
              <div className="form-section-title">2. Clinical notes &amp; Diagnosis</div>
              <div className="form-grid cols2">
                <Field label="Mode of Transaction">
                  <Select
                    value={modeOfTransaction}
                    onChange={(e) => setModeOfTransaction(e.target.value)}
                    options={modeOptions}
                    required
                  />
                </Field>
                <Field label="Primary ICD-10 Code">
                  <Select
                    value={selectedIcd}
                    onChange={(e) => setSelectedIcd(e.target.value)}
                    placeholder="Select code..."
                    options={ICD10_CODES}
                  />
                </Field>
              </div>
              <div style={{ marginTop: 16 }}>
                <Field label="SOAP Notes (Subjective, Objective, Assessment &amp; Plan)">
                  <Textarea
                    value={soapNotes}
                    onChange={(e) => setSoapNotes(e.target.value)}
                    placeholder="S: Patient reports...&#10;O: Vital signs normal...&#10;A: Primary diagnosis...&#10;P: Prescribed medications..."
                    rows={8}
                    required
                  />
                </Field>
              </div>
            </div>

            {/* 3. E-Prescribe Order */}
            <div className="form-section">
              <div className="form-section-title">3. E-Prescribe Order</div>

              {/* Added prescriptions list */}
              {prescriptions.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                  {prescriptions.map((rx, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 14px",
                        background: "var(--surface)",
                        borderRadius: "var(--rsm)",
                        border: "1px solid var(--border-subtle)",
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>
                          {rx.medicineName}
                        </div>
                        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>
                          {rx.dose} · {rx.frequency} · {rx.duration} · Qty: {rx.quantity}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        type="button"
                        onClick={() => handleRemoveMed(idx)}
                        style={{ color: "var(--crit-text)", padding: "4px 8px", fontSize: 11 }}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: 12, fontStyle: "italic", color: "var(--muted)", marginBottom: 16 }}>
                  No medications added to this prescription list.
                </p>
              )}

              {/* Autocomplete Generic Drug Lookup and inputs */}
              <div className="form-grid" style={{ alignItems: "flex-end", gap: 12 }}>
                <Field label="Medication (Philippine National Formulary)">
                  <div ref={suggestionRef} style={{ position: "relative" }}>
                    <Input
                      type="text"
                      value={medSearch}
                      onChange={(e) => {
                        setMedSearch(e.target.value);
                        setTempMed(e.target.value);
                        setShowSuggestions(true);
                      }}
                      onFocus={() => setShowSuggestions(true)}
                      placeholder="Search generic/spec (e.g. Paracetamol, Amlodipine)..."
                    />

                    {showSuggestions && medSearch.trim().length > 0 && (
                      <div
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          right: 0,
                          zIndex: 1000,
                          background: "var(--white)",
                          border: "1px solid var(--border-subtle)",
                          borderRadius: "var(--rmd)",
                          boxShadow: "var(--card-shadow)",
                          maxHeight: 240,
                          overflowY: "auto",
                          marginTop: 4,
                        }}
                      >
                        {isLoading ? (
                          <div style={{ padding: "10px 12px", fontSize: 12, color: "var(--muted)", fontStyle: "italic" }}>
                            Searching PNF database...
                          </div>
                        ) : suggestions.length === 0 ? (
                          <div style={{ padding: "10px 12px", fontSize: 12, color: "var(--muted)", fontStyle: "italic" }}>
                            No matches found in PNF
                          </div>
                        ) : (
                          suggestions.map((med: any, idx: number) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setTempMed(med.molecule);
                                setMedSearch(med.molecule);
                                setSelectedMed(med);
                                setShowSuggestions(false);
                              }}
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                                width: "100%",
                                textAlign: "left",
                                border: "none",
                                background: "none",
                                padding: "7px 10px",
                                borderBottom: "1px solid var(--border-subtle)",
                                cursor: "pointer",
                                fontFamily: "'DM Sans', sans-serif",
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-light)")}
                              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                            >
                              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>
                                {med.molecule}
                              </div>
                              <div
                                style={{
                                  fontSize: 11,
                                  color: "var(--muted)",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <span>{med.spec}</span>
                                <span
                                  style={{
                                    background: "var(--surface)",
                                    padding: "2px 6px",
                                    borderRadius: 4,
                                    fontSize: 9,
                                    fontWeight: 700,
                                    color: "var(--ink)",
                                    border: "1px solid var(--border-subtle)",
                                  }}
                                >
                                  {med.route}
                                </span>
                              </div>
                            </button>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                </Field>
                <Field label="Brand Name (Optional)">
                  <Input
                    type="text"
                    value={tempBrand}
                    onChange={(e) => setTempBrand(e.target.value)}
                    placeholder="e.g. Biogesic, Norvasc..."
                  />
                </Field>
                <Field label="Dose">
                  <Input
                    type="text"
                    value={tempDose}
                    onChange={(e) => setTempDose(e.target.value)}
                    placeholder="1 tablet"
                  />
                </Field>
                <Field label="Frequency">
                  <Select
                    value={tempFrequency}
                    onChange={(e) => setTempFrequency(e.target.value)}
                    options={[
                      { value: "Once daily", label: "Once daily" },
                      { value: "Twice daily", label: "Twice daily" },
                      { value: "Three times daily", label: "Three times daily" },
                      { value: "Every 8 hours", label: "Every 8 hours" },
                      { value: "Every 6 hours", label: "Every 6 hours" },
                      { value: "As needed", label: "As needed" },
                    ]}
                  />
                </Field>
                <Field label="Duration">
                  <Input
                    type="text"
                    value={tempDuration}
                    onChange={(e) => setTempDuration(e.target.value)}
                    placeholder="30 days"
                  />
                </Field>
                <Field label="Quantity">
                  <Input
                    type="number"
                    value={tempQty || ""}
                    onChange={(e) => setTempQty(parseInt(e.target.value) || 0)}
                    placeholder="30"
                  />
                </Field>
              </div>

              {/* Add Button */}
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleAddMed}
                  style={{ height: 32, fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}
                >
                  <svg
                    viewBox="0 0 16 16"
                    width={12}
                    height={12}
                    style={{ fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" }}
                  >
                    <path d="M8 3v10M3 8h10" />
                  </svg>
                  Add to Prescription
                </Button>
              </div>
            </div>

            {/* Form Actions */}
            <div className="form-actions">
              <Button type="button" variant="ghost" onClick={() => navigateTo("/")}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={isSaving || !selectedPatient}>
                {isSaving ? "Saving..." : "Save Consultation & Issue Prescription"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function NewVisitPage() {
  return (
    <React.Suspense
      fallback={
        <div className="panel active">
          <div className="panel-inner" style={{ textAlign: "center", padding: "40px" }}>
            <p style={{ fontFamily: "Sora, sans-serif", fontWeight: 600 }}>Loading form...</p>
          </div>
        </div>
      }
    >
      <NewVisitFormContent />
    </React.Suspense>
  );
}
