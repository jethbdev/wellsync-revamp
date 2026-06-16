"use client";

import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  Button,
  Select,
  Field,
  Popover,
  MiniCalendar,
  TimePicker,
  FieldTrigger
} from "@healthbridge/ui";
import { useStaff } from "../../lib/hooks/api/useStaff";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function toLocalISODate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function fmt24To12(t: string) {
  if (!t) return "";
  const [hStr, mStr] = t.split(":");
  const h = parseInt(hStr);
  const m = mStr ?? "00";
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m} ${ampm}`;
}

// ─── Purpose Options ──────────────────────────────────────────────────────────

const PURPOSE_OPTIONS = [
  { value: "Routine Check-up", label: "Routine Check-up" },
  { value: "Follow-up Consultation", label: "Follow-up Consultation" },
  { value: "Initial Consultation", label: "Initial Consultation" },
  { value: "Urgent — Chest Pain", label: "Urgent — Chest Pain" },
  { value: "Urgent — Fever & Infection", label: "Urgent — Fever & Infection" },
  { value: "Urgent — Trauma / Injury", label: "Urgent — Trauma / Injury" },
  { value: "PhilHealth Annual PE", label: "PhilHealth Annual PE" },
  { value: "4Ps Health Compliance Visit", label: "4Ps Health Compliance Visit" },
  { value: "Maternal & Child Health", label: "Maternal & Child Health" },
  { value: "TB-DOTS Follow-up", label: "TB-DOTS Follow-up" },
  { value: "HMO Specialist Referral", label: "HMO Specialist Referral" },
  { value: "Pre-employment Medical", label: "Pre-employment Medical" },
  { value: "Teleconsultation", label: "Teleconsultation" },
  { value: "Executive Health Screening", label: "Executive Health Screening" },
];

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const CalIcon = () => (
  <svg viewBox="0 0 16 16" width={14} height={14} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <rect x="1.5" y="2.5" width="13" height="12" rx="2" />
    <path d="M5 1.5v2M11 1.5v2M1.5 6.5h13" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 16 16" width={14} height={14} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <circle cx="8" cy="8" r="6.5" />
    <path d="M8 5v3.5l2.5 1.5" />
  </svg>
);

// ─── Main Modal ───────────────────────────────────────────────────────────────

export interface BookAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  patients: { id: string; name: string }[];
  onSubmit: (data: {
    patientId: string;
    scheduledDate: string;
    scheduledTime: string | undefined;
    purpose: string;
    doctorId?: string;
  }) => Promise<void>;
  isPending: boolean;
  plugins?: any[];
}

export function BookAppointmentModal({
  isOpen, onClose, patients, onSubmit, isPending, plugins = [],
}: BookAppointmentModalProps) {
  const [patientId, setPatientId] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [timeValue, setTimeValue] = React.useState("09:00");
  const [includeTime, setIncludeTime] = React.useState(true);
  const [purpose, setPurpose] = React.useState("");
  const [selectedDoctorId, setSelectedDoctorId] = React.useState("");
  const [error, setError] = React.useState("");

  const { data: staff = [] } = useStaff();

  const doctors = React.useMemo(() => {
    return staff.filter((s: any) => s.role?.name === "Attending Doctor" && s.isActive && s.isAcceptingConsultations);
  }, [staff]);

  const isTeleconsultationActive = React.useMemo(() => {
    return plugins.some((p: any) => p.id === "teleconsultation" && p.isActive);
  }, [plugins]);

  const filteredPurposeOptions = React.useMemo(() => {
    return PURPOSE_OPTIONS.filter(opt => {
      if (opt.value === "Teleconsultation") {
        return isTeleconsultationActive;
      }
      return true;
    });
  }, [isTeleconsultationActive]);

  // Popover open state
  const [dateOpen, setDateOpen] = React.useState(false);
  const [timeOpen, setTimeOpen] = React.useState(false);
  const dateRef = React.useRef<HTMLButtonElement | null>(null);
  const timeRef = React.useRef<HTMLButtonElement | null>(null);

  // Reset on close / Initialize on open
  React.useEffect(() => {
    if (isOpen) {
      if (patients.length > 0) {
        setPatientId(patients[0].id);
      }
      if (filteredPurposeOptions.length > 0) {
        setPurpose(filteredPurposeOptions[0].value);
      }
      setSelectedDoctorId("");
    } else {
      setPatientId(""); setSelectedDate(null);
      setTimeValue("09:00"); setIncludeTime(true);
      setPurpose(""); setSelectedDoctorId(""); setError("");
      setDateOpen(false); setTimeOpen(false);
    }
  }, [isOpen, patients, filteredPurposeOptions]);

  // Adjust if selection becomes disabled
  React.useEffect(() => {
    if (!isTeleconsultationActive && purpose === "Teleconsultation") {
      if (filteredPurposeOptions.length > 0) {
        setPurpose(filteredPurposeOptions[0].value);
      }
    }
  }, [isTeleconsultationActive, purpose, filteredPurposeOptions]);

  // Escape key
  React.useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (dateOpen) { setDateOpen(false); return; }
        if (timeOpen) { setTimeOpen(false); return; }
        onClose();
      }
    };
    if (isOpen) window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [isOpen, dateOpen, timeOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!patientId) { setError("Please select a patient."); return; }
    if (!selectedDate) { setError("Please pick a date."); return; }
    if (!purpose) { setError("Please choose a purpose."); return; }
    await onSubmit({
      patientId,
      scheduledDate: toLocalISODate(selectedDate),
      scheduledTime: includeTime ? fmt24To12(timeValue) : undefined,
      purpose,
      doctorId: selectedDoctorId || undefined,
    });
  };

  if (!isOpen) return null;

  const dateLabel = selectedDate
    ? selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "";
  const timeLabel = includeTime ? fmt24To12(timeValue) : "Any time";

  return ReactDOM.createPortal(
    <>
      {/* Overlay */}
      <div
        style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "var(--modal-overlay-bg)",
          backdropFilter: "blur(4px)",
          animation: "fadeIn 0.15s ease",
        }}
        onClick={onClose}
      />

      {/* Modal card */}
      <div
        style={{
          position: "fixed", zIndex: 1001,
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          background: "var(--white)",
          borderRadius: "var(--rxl)",
          boxShadow: "0 24px 80px rgba(0, 0, 0, 0.35)",
          width: 540,
          maxWidth: "92vw",
          animation: "slideUp 0.2s ease",
        }}
      >
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "22px 26px",
          borderBottom: "1px solid var(--border-subtle)",
        }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "var(--ink)" }}>
              Book Appointment
            </h3>
            <p style={{ margin: "4px 0 0", fontSize: 11, color: "var(--muted)" }}>
              Schedule a new patient visit
            </p>
          </div>
          <button type="button" onClick={onClose} style={{
            background: "none", border: "none", cursor: "pointer",
            color: "var(--muted)", padding: 6, borderRadius: "var(--rsm)",
            display: "flex", alignItems: "center",
          }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--surface)")}
            onMouseLeave={e => (e.currentTarget.style.background = "none")}
          >
            <svg viewBox="0 0 16 16" width={16} height={16}>
              <path d="M4 4l8 8M12 4L4 12" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Form body */}
        <form onSubmit={handleSubmit}>
          <div style={{ padding: "22px 26px", display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Patient */}
            <Field label="Patient">
              <Select
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                options={patients.map(p => ({ value: p.id, label: p.name }))}
                placeholder="Search patient..."
                showSearch={true}
              />
            </Field>

            {/* Date + Time row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {/* Date */}
              <Field label="Date">
                <FieldTrigger
                  ref={dateRef}
                  value={dateLabel}
                  placeholder="Pick a date"
                  icon={<CalIcon />}
                  onClick={() => { setDateOpen(v => !v); setTimeOpen(false); }}
                />
                <Popover
                  anchor={dateRef.current}
                  isOpen={dateOpen}
                  onClose={() => setDateOpen(false)}
                  width={240}
                >
                  <MiniCalendar
                    selected={selectedDate}
                    onSelect={(d) => { setSelectedDate(d); setDateOpen(false); }}
                  />
                </Popover>
              </Field>

              {/* Time */}
              <div className="field">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)" }}>Time</label>
                  <button
                    type="button"
                    onClick={() => setIncludeTime(v => !v)}
                    style={{
                      border: "none", cursor: "pointer", fontSize: 10, fontWeight: 600,
                      padding: "1px 6px", borderRadius: 4,
                      background: includeTime ? "var(--accent-light)" : "var(--surface)",
                      color: includeTime ? "var(--accent)" : "var(--faint)",
                    }}
                  >
                    {includeTime ? "Set" : "Any time"}
                  </button>
                </div>
                <FieldTrigger
                  ref={timeRef}
                  value={includeTime ? timeLabel : ""}
                  placeholder="Any time"
                  icon={<ClockIcon />}
                  onClick={() => { if (!includeTime) { setIncludeTime(true); } setTimeOpen(v => !v); setDateOpen(false); }}
                />
                <Popover
                  anchor={timeRef.current}
                  isOpen={timeOpen}
                  onClose={() => setTimeOpen(false)}
                  width={180}
                >
                  <TimePicker value={timeValue} onChange={setTimeValue} />
                  <div style={{
                    marginTop: 10, paddingTop: 10,
                    borderTop: "1px solid var(--border-subtle)",
                    display: "flex", justifyContent: "center",
                  }}>
                    <button
                      type="button"
                      onClick={() => setTimeOpen(false)}
                      style={{
                        background: "var(--accent)", color: "#fff",
                        border: "none", borderRadius: "var(--rsm)",
                        padding: "5px 20px", fontSize: 12,
                        fontWeight: 600, cursor: "pointer", width: "100%",
                      }}
                    >
                      Confirm {fmt24To12(timeValue)}
                    </button>
                  </div>
                </Popover>
              </div>
            </div>

            {/* Purpose */}
            <Field label="Purpose / Chief Complaint">
              <Select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                options={filteredPurposeOptions}
                placeholder="Search purpose..."
                showSearch={true}
              />
            </Field>

            {/* Physician */}
            <Field label="Attending Physician (Optional)">
              <Select
                value={selectedDoctorId}
                onChange={(e) => setSelectedDoctorId(e.target.value)}
                options={[
                  { value: "", label: "Next Available Physician" },
                  ...doctors.map((d: any) => ({ value: d.id, label: `Dr. ${d.firstName} ${d.lastName}` }))
                ]}
                placeholder="Select physician..."
              />
            </Field>

            {/* Error */}
            {error && (
              <div style={{
                background: "var(--crit-bg)", color: "var(--crit-text)",
                borderRadius: "var(--rsm)", padding: "9px 13px",
                fontSize: 12, fontWeight: 500,
              }}>
                {error}
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{
            padding: "22px 26px",
            borderTop: "1px solid var(--border-subtle)",
            display: "flex", gap: 8, justifyContent: "flex-end",
          }}>
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary" disabled={isPending}>
              {isPending ? "Booking…" : "Book Appointment"}
            </Button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { opacity:0; transform:translate(-50%,-46%) } to { opacity:1; transform:translate(-50%,-50%) } }
      `}</style>
    </>
  , document.body);
}
