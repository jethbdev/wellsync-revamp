"use client";

import * as React from "react";
import {
  Button,
  Modal,
  Select,
  Field,
  Popover,
  MiniCalendar,
  TimePicker,
  FieldTrigger
} from "@healthbridge/ui";

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

export interface BookAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    scheduledDate: string;
    scheduledTime: string | undefined;
    purpose: string;
  }) => Promise<void>;
  isPending: boolean;
  isTeleconsultationActive?: boolean;
}

export function BookAppointmentModal({
  isOpen,
  onClose,
  onSubmit,
  isPending,
  isTeleconsultationActive = false,
}: BookAppointmentModalProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [timeValue, setTimeValue] = React.useState("09:00");
  const [includeTime, setIncludeTime] = React.useState(true);
  const [purpose, setPurpose] = React.useState("");
  const [error, setError] = React.useState("");

  const filteredPurposeOptions = React.useMemo(() => {
    return PURPOSE_OPTIONS.filter((opt) => {
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

  // Reset / Initialize
  React.useEffect(() => {
    if (isOpen) {
      if (filteredPurposeOptions.length > 0) {
        setPurpose(filteredPurposeOptions[0].value);
      }
    } else {
      setSelectedDate(null);
      setTimeValue("09:00");
      setIncludeTime(true);
      setPurpose("");
      setError("");
      setDateOpen(false);
      setTimeOpen(false);
    }
  }, [isOpen, filteredPurposeOptions]);

  // Adjust if selection becomes disabled
  React.useEffect(() => {
    if (!isTeleconsultationActive && purpose === "Teleconsultation") {
      if (filteredPurposeOptions.length > 0) {
        setPurpose(filteredPurposeOptions[0].value);
      }
    }
  }, [isTeleconsultationActive, purpose, filteredPurposeOptions]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!selectedDate) {
      setError("Please pick a date.");
      return;
    }
    if (!purpose) {
      setError("Please choose a purpose.");
      return;
    }
    try {
      await onSubmit({
        scheduledDate: toLocalISODate(selectedDate),
        scheduledTime: includeTime ? fmt24To12(timeValue) : undefined,
        purpose,
      });
    } catch (err: any) {
      setError(err.message || "Failed to book appointment.");
    }
  };

  const dateLabel = selectedDate
    ? selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "";
  const timeLabel = includeTime ? fmt24To12(timeValue) : "Any time";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Book Appointment">
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 20 }}>
          <p style={{ margin: 0, fontSize: 13, color: "var(--muted)" }}>
            Fill out the details below to schedule your clinic visit.
          </p>

          {/* Date + Time row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {/* Date */}
            <Field label="Date">
              <FieldTrigger
                ref={dateRef}
                value={dateLabel}
                placeholder="Pick a date"
                icon={<CalIcon />}
                onClick={() => {
                  setDateOpen((v) => !v);
                  setTimeOpen(false);
                }}
              />
              <Popover
                anchor={dateRef.current}
                isOpen={dateOpen}
                onClose={() => setDateOpen(false)}
                width={240}
              >
                <MiniCalendar
                  selected={selectedDate}
                  onSelect={(d) => {
                    setSelectedDate(d);
                    setDateOpen(false);
                  }}
                />
              </Popover>
            </Field>

            {/* Time */}
            <div className="field">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)" }}>Time</label>
                <button
                  type="button"
                  onClick={() => setIncludeTime((v) => !v)}
                  style={{
                    border: "none",
                    cursor: "pointer",
                    fontSize: 10,
                    fontWeight: 600,
                    padding: "1px 6px",
                    borderRadius: 4,
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
                onClick={() => {
                  if (!includeTime) {
                    setIncludeTime(true);
                  }
                  setTimeOpen((v) => !v);
                  setDateOpen(false);
                }}
              />
              <Popover
                anchor={timeRef.current}
                isOpen={timeOpen}
                onClose={() => setTimeOpen(false)}
                width={180}
              >
                <TimePicker value={timeValue} onChange={setTimeValue} />
                <div style={{
                  marginTop: 10,
                  paddingTop: 10,
                  borderTop: "1px solid var(--border-subtle)",
                  display: "flex",
                  justifyContent: "center",
                }}>
                  <button
                    type="button"
                    onClick={() => setTimeOpen(false)}
                    style={{
                      background: "var(--accent)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "var(--rsm)",
                      padding: "5px 20px",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    Confirm {fmt24To12(timeValue)}
                  </button>
                </div>
              </Popover>
            </div>
          </div>

          {/* Purpose */}
          <Field label="Purpose of Visit">
            <Select
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              options={filteredPurposeOptions}
              placeholder="Select purpose..."
            />
          </Field>
        </div>

        {/* Footer */}
        <div style={{
          display: "flex",
          gap: 8,
          justifyContent: "flex-end",
          paddingTop: 12,
          borderTop: "1px solid var(--border-subtle)"
        }}>
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isPending}>
            {isPending ? "Booking…" : "Book Appointment"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
