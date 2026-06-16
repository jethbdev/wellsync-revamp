"use client";

import * as React from "react";
import { useDashboard } from "../dashboard-context";
import { Button, Modal } from "@healthbridge/ui";
import { useCheckInAppointment } from "../../../lib/hooks/api/useAppointments";
import { useStaff } from "../../../lib/hooks/api/useStaff";
import {
  useQueue,
  useCallTicket,
  useCompleteTicket,
  useSkipTicket,
  useCreateWalkInTicket,
} from "../../../lib/hooks/api/useQueue";

// Convert time "9:30 AM" into hours offset from 8:00 AM
const parseTimeOffset = (timeStr: string) => {
  const match = timeStr.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
  if (!match) return null;
  let hour = parseInt(match[1]);
  const min = parseInt(match[2]);
  const ampm = match[3].toUpperCase();
  
  if (ampm === "PM" && hour !== 12) hour += 12;
  if (ampm === "AM" && hour === 12) hour = 0;
  
  const timeInHours = hour + min / 60;
  const startHour = 8; // start time is 8:00 AM
  
  return timeInHours - startHour;
};

const getScheduledDateTime = (dateStr: string, timeStr?: string) => {
  const date = new Date(dateStr);
  if (!timeStr) return date;
  const match = timeStr.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
  if (!match) return date;
  let hour = parseInt(match[1]);
  const min = parseInt(match[2]);
  const ampm = match[3].toUpperCase();
  
  if (ampm === "PM" && hour !== 12) hour += 12;
  if (ampm === "AM" && hour === 12) hour = 0;
  
  date.setHours(hour, min, 0, 0);
  return date;
};

export default function SchedulePage() {
  const { appointments = [], patients = [], plugins = [], triggerToast, setShowBookModal, setSelectedPatientId, setModeOfTransaction, navigateTo, activeFacility } = useDashboard();
  const [viewMode, setViewMode] = React.useState<"month" | "week" | "three-day" | "day">("week");
  const [selectedAppt, setSelectedAppt] = React.useState<any>(null);
  
  // Initialize to "2026-06-14" to align with seeded appointments
  const [currentDate, setCurrentDate] = React.useState<Date>(() => new Date("2026-06-14"));

  const checkInMutation = useCheckInAppointment();
  const [showQueueDrawer, setShowQueueDrawer] = React.useState(false);
  const [selectedRoomToCall, setSelectedRoomToCall] = React.useState<Record<string, string>>({});
  const [walkInPatientSearch, setWalkInPatientSearch] = React.useState("");
  const [showAddWalkInDropdown, setShowAddWalkInDropdown] = React.useState(false);
  const [filterDoctorId, setFilterDoctorId] = React.useState<string>("");
  const [walkInDoctorId, setWalkInDoctorId] = React.useState<string>("");

  const { data: staffList = [] } = useStaff();
  const allAttendingDoctors = React.useMemo(() => {
    return staffList.filter((s: any) => s.role?.name === "Attending Doctor" && s.isActive);
  }, [staffList]);

  const activeAttendingDoctors = React.useMemo(() => {
    return staffList.filter((s: any) => s.role?.name === "Attending Doctor" && s.isActive && s.isAcceptingConsultations);
  }, [staffList]);

  const { data: queue = [] } = useQueue(filterDoctorId || undefined);
  const callMutation = useCallTicket();
  const completeMutation = useCompleteTicket();
  const skipMutation = useSkipTicket();
  const createWalkInMutation = useCreateWalkInTicket();

  const isQueuePluginActive = React.useMemo(() => {
    return plugins.some((p: any) => p.id === "queue-management" && p.isActive);
  }, [plugins]);

  const filteredPatientsForWalkIn = React.useMemo(() => {
    if (!walkInPatientSearch) return [];
    const lower = walkInPatientSearch.toLowerCase();
    return patients.filter(
      (p: any) =>
        p.name.toLowerCase().includes(lower) || p.pin.toLowerCase().includes(lower)
    );
  }, [walkInPatientSearch, patients]);

  const isTeleconsultationActive = React.useMemo(() => {
    return plugins.some((p: any) => p.id === "teleconsultation" && p.isActive);
  }, [plugins]);

  const isDevelopment = process.env.NODE_ENV === "development";

  const canStartTeleconsultation = React.useMemo(() => {
    if (!selectedAppt) return false;
    if (isDevelopment) return true; // always allow early start in development

    const scheduledTime = getScheduledDateTime(selectedAppt.scheduledDate, selectedAppt.scheduledTime);
    const now = new Date();
    const fifteenMinutes = 15 * 60 * 1000;
    
    return now.getTime() >= (scheduledTime.getTime() - fifteenMinutes);
  }, [selectedAppt, isDevelopment]);

  const handlePrev = () => {
    const nextDate = new Date(currentDate);
    if (viewMode === "month") {
      nextDate.setMonth(currentDate.getMonth() - 1);
    } else if (viewMode === "week") {
      nextDate.setDate(currentDate.getDate() - 7);
    } else if (viewMode === "three-day") {
      nextDate.setDate(currentDate.getDate() - 3);
    } else {
      nextDate.setDate(currentDate.getDate() - 1);
    }
    setCurrentDate(nextDate);
  };

  const handleNext = () => {
    const nextDate = new Date(currentDate);
    if (viewMode === "month") {
      nextDate.setMonth(currentDate.getMonth() + 1);
    } else if (viewMode === "week") {
      nextDate.setDate(currentDate.getDate() + 7);
    } else if (viewMode === "three-day") {
      nextDate.setDate(currentDate.getDate() + 3);
    } else {
      nextDate.setDate(currentDate.getDate() + 1);
    }
    setCurrentDate(nextDate);
  };

  const getHeaderLabel = () => {
    if (viewMode === "month") {
      return currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    }
    if (viewMode === "week") {
      const start = new Date(currentDate);
      start.setDate(currentDate.getDate() - currentDate.getDay());
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      if (start.getMonth() === end.getMonth()) {
        return `Week of ${start.toLocaleDateString("en-US", { month: "long" })} ${start.getDate()}–${end.getDate()}, ${start.getFullYear()}`;
      }
      return `Week of ${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${end.toLocaleDateString("en-US", { month: "short", day: "numeric" })}, ${start.getFullYear()}`;
    }
    if (viewMode === "three-day") {
      const end = new Date(currentDate);
      end.setDate(currentDate.getDate() + 2);
      if (currentDate.getMonth() === end.getMonth()) {
        return `${currentDate.toLocaleDateString("en-US", { month: "long" })} ${currentDate.getDate()}–${end.getDate()}, ${currentDate.getFullYear()}`;
      }
      return `${currentDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${end.toLocaleDateString("en-US", { month: "short", day: "numeric" })}, ${currentDate.getFullYear()}`;
    }
    // Day (Today)
    return currentDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  };

  const getDays = () => {
    const days: Date[] = [];
    const date = new Date(currentDate);
    if (viewMode === "month") {
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1);
      const startDay = new Date(firstDay);
      startDay.setDate(firstDay.getDate() - firstDay.getDay()); // Go back to preceding Sunday
      
      // Render 35 days (5 weeks)
      for (let i = 0; i < 35; i++) {
        days.push(new Date(startDay));
        startDay.setDate(startDay.getDate() + 1);
      }
    } else if (viewMode === "week") {
      const startDay = new Date(date);
      startDay.setDate(date.getDate() - date.getDay()); // Start of week (Sunday)
      for (let i = 0; i < 7; i++) {
        days.push(new Date(startDay));
        startDay.setDate(startDay.getDate() + 1);
      }
    } else if (viewMode === "three-day") {
      // 3 Days
      for (let i = 0; i < 3; i++) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
      }
    } else {
      // Day
      days.push(new Date(date));
    }
    return days;
  };

  const getApptsForDay = (day: Date) => {
    const y = day.getFullYear();
    const m = String(day.getMonth() + 1).padStart(2, "0");
    const d = String(day.getDate()).padStart(2, "0");
    const formattedDayStr = `${y}-${m}-${d}`;

    const filtered = appointments.filter((appt) => {
      if (!appt.date) return false;
      const apptDateStr = new Date(appt.date).toISOString().split("T")[0];
      return apptDateStr === formattedDayStr;
    });

    return filtered.sort((a, b) => {
      const offsetA = parseTimeOffset(a.time) ?? 0;
      const offsetB = parseTimeOffset(b.time) ?? 0;
      return offsetA - offsetB;
    });
  };

  const getApptColorClass = (appt: any) => {
    if (appt.type === "Urgent") return "yellow";
    if (appt.type === "New Patient") return "blue";
    if (appt.type?.toLowerCase().includes("tele")) return "purple";
    return "green";
  };

  const isToday = (day: Date) => {
    const today = new Date();
    return (
      day.getDate() === today.getDate() &&
      day.getMonth() === today.getMonth() &&
      day.getFullYear() === today.getFullYear()
    );
  };

  const days = getDays();
  const numDays = days.length;
  
  // 8:00 AM to 6:00 PM (10 hours, 11 ticks)
  const workingHours = [
    "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"
  ];
  const hourHeight = 60; // height of each hour slot in px

  return (
    <div className="panel active" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div className="panel-inner" style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0, paddingBottom: 16 }}>
        <div className="ph" style={{ marginBottom: 16 }}>
          <div className="ph-left">
            <h2>Visits Calendar</h2>
            <p>{getHeaderLabel()}</p>
          </div>
          <div className="ph-actions" style={{ display: "flex", gap: 12, alignItems: "center" }}>
            {/* Book Appointment */}
            <Button
              variant="primary"
              style={{ height: 32, fontSize: 12, padding: "0 14px", display: "flex", alignItems: "center", gap: 6 }}
              onClick={() => setShowBookModal(true)}
            >
              <svg viewBox="0 0 16 16" width={13} height={13} style={{ fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" }}>
                <path d="M8 3v10M3 8h10" />
              </svg>
              Book Appointment
            </Button>

            {isQueuePluginActive && (
              <>
                <Button
                  variant="outline"
                  style={{ height: 32, fontSize: 12, padding: "0 14px", display: "flex", alignItems: "center", gap: 6 }}
                  onClick={() => setShowQueueDrawer(true)}
                >
                  <svg viewBox="0 0 16 16" width={13} height={13} style={{ fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" }}>
                    <path d="M12 12a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3H4a3 3 0 0 0-3 3v4a3 3 0 0 0 3 3h8z" />
                    <path d="M7 6.5h3M7 9h3M3.5 6.5h1M3.5 9h1" />
                  </svg>
                  Waiting Room ({queue.length})
                </Button>
                <Button
                  variant="ghost"
                  style={{ height: 32, fontSize: 12, padding: "0 10px", display: "flex", alignItems: "center", gap: 4 }}
                  onClick={() => window.open(activeFacility ? `/queue-display?facilityId=${activeFacility.id}` : "/queue-display", "_blank")}
                >
                  <svg viewBox="0 0 15 15" width={13} height={13} fill="none" stroke="currentColor">
                    <rect x="1.5" y="1.5" width="12" height="9" rx="1.5" />
                    <path d="M4.5 13.5h6M7.5 10.5v3" />
                  </svg>
                  Public TV Board
                </Button>
              </>
            )}

            <div style={{ width: 1, height: 20, background: "var(--border-subtle)" }} />

            {/* View selectors + Today (left of divider) */}
            <div style={{ display: "flex", gap: 6 }}>
              <Button
                variant={viewMode === "month" ? "primary" : "outline"}
                style={{ height: 32, fontSize: 12, padding: "0 12px" }}
                onClick={() => setViewMode("month")}
              >
                Month
              </Button>
              <Button
                variant={viewMode === "week" ? "primary" : "outline"}
                style={{ height: 32, fontSize: 12, padding: "0 12px" }}
                onClick={() => setViewMode("week")}
              >
                Week
              </Button>
              <Button
                variant={viewMode === "three-day" ? "primary" : "outline"}
                style={{ height: 32, fontSize: 12, padding: "0 12px" }}
                onClick={() => setViewMode("three-day")}
              >
                3 Days
              </Button>
              <Button
                variant={viewMode === "day" ? "primary" : "outline"}
                style={{ height: 32, fontSize: 12, padding: "0 12px", marginLeft: 6 }}
                onClick={() => {
                  setViewMode("day");
                  setCurrentDate(new Date());
                }}
              >
                Today
              </Button>
            </div>

            <div style={{ width: 1, height: 20, background: "var(--border-subtle)" }} />

            {/* Navigation arrows (right of divider) */}
            <div style={{ display: "flex", gap: 6 }}>
              <Button
                variant="outline"
                style={{ height: 32, fontSize: 12, padding: "0 12px" }}
                onClick={handlePrev}
              >
                ←
              </Button>
              <Button
                variant="outline"
                style={{ height: 32, fontSize: 12, padding: "0 12px" }}
                onClick={handleNext}
              >
                →
              </Button>
            </div>
          </div>
        </div>

        {/* CALENDAR BODY */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "var(--white)", borderRadius: "var(--rlg)", boxShadow: "var(--card-shadow)", overflow: "hidden", minHeight: 0 }}>

          
          {/* MONTH VIEW */}
          {viewMode === "month" ? (
            <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
              {/* Weekday headers */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", borderBottom: "1px solid var(--border-subtle)", background: "var(--surface)", textAlign: "center", fontSize: 11, fontWeight: 700, color: "var(--muted)", padding: "10px 0" }}>
                <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
              </div>
              {/* Days Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gridAutoRows: "1fr", flex: 1 }}>
                {days.map((day, idx) => {
                  const appts = getApptsForDay(day);
                  const isDayToday = isToday(day);
                  const isCurrentMonth = day.getMonth() === currentDate.getMonth();

                  return (
                    <div
                      key={idx}
                      style={{
                        borderRight: "1px solid var(--border-subtle)",
                        borderBottom: "1px solid var(--border-subtle)",
                        padding: 6,
                        display: "flex",
                        flexDirection: "column",
                        background: isDayToday ? "var(--tr-hover)" : "transparent",
                        opacity: isCurrentMonth ? 1 : 0.45,
                        minHeight: 80,
                      }}
                    >
                      {/* Day number with circle if today */}
                      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 4 }}>
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: isDayToday ? "white" : "var(--ink)",
                            background: isDayToday ? "var(--accent)" : "transparent",
                            width: 22,
                            height: 22,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {day.getDate()}
                        </span>
                      </div>
                      {/* Static Badge stack */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1, overflowY: "auto" }}>
                        {appts.map((appt) => {
                          const pat = patients.find((p) => p.id === appt.patientId) || { name: "Unknown Patient" };
                          return (
                            <div
                              key={appt.id}
                              className={`appt ${getApptColorClass(appt)}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedAppt({ ...appt, patient: pat });
                              }}
                              style={{ margin: 0, padding: "2px 6px", borderRadius: 4, fontSize: 10, display: "flex", justifyContent: "space-between", gap: 4 }}
                              title={`${appt.time} - ${pat.name}`}
                            >
                              <span style={{ fontWeight: 700, whiteSpace: "nowrap" }}>{appt.time}</span>
                              <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", flex: 1 }}>{pat.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            
            /* WEEK & 3-DAY HOURLY TIMELINE VIEWS */
            <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
              {/* Header Row */}
              <div style={{ display: "flex", borderBottom: "1px solid var(--border-subtle)", background: "var(--surface)" }}>
                {/* Hour spacer */}
                <div style={{ width: 60, flexShrink: 0, borderRight: "1px solid var(--border-subtle)" }} />
                {/* Day Headers columns */}
                <div style={{ display: "grid", gridTemplateColumns: `repeat(${numDays}, 1fr)`, flex: 1 }}>
                  {days.map((day, idx) => {
                    const isDayToday = isToday(day);
                    const weekday = day.toLocaleDateString("en-US", { weekday: "short" });
                    const dateNum = day.getDate();

                    return (
                      <div
                        key={idx}
                        style={{
                          textAlign: "center",
                          padding: "10px 0",
                          borderRight: "1px solid var(--border-subtle)",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 2,
                        }}
                      >
                        <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "var(--muted)" }}>{weekday}</span>
                        <span
                          style={{
                            fontSize: 14,
                            fontWeight: 700,
                            color: isDayToday ? "white" : "var(--ink)",
                            background: isDayToday ? "var(--accent)" : "transparent",
                            width: 26,
                            height: 26,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {dateNum}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Scrollable grid slots body */}
              <div style={{ flex: 1, display: "flex", position: "relative", minHeight: "550px" }}>
                {/* Hours column labels */}
                <div style={{ width: 60, flexShrink: 0, borderRight: "1px solid var(--border-subtle)", background: "var(--surface)", userSelect: "none", display: "flex", flexDirection: "column", height: "100%" }}>
                  {workingHours.map((h, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        fontSize: 10,
                        fontWeight: 600,
                        color: "var(--muted)",
                        textAlign: "right",
                        paddingRight: 8,
                        paddingTop: 4,
                        boxSizing: "border-box",
                        borderBottom: i === workingHours.length - 1 ? "none" : "1px dashed var(--border-subtle)",
                      }}
                    >
                      {h}
                    </div>
                  ))}
                </div>

                {/* Columns representing days with absolute positioned appointments */}
                <div style={{ display: "grid", gridTemplateColumns: `repeat(${numDays}, 1fr)`, flex: 1, position: "relative", height: "100%" }}>
                  
                  {/* Backdrop horizontal lines grid */}
                  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", display: "flex", flexDirection: "column", height: "100%" }}>
                    {workingHours.map((_, i) => (
                      <div key={i} style={{ flex: 1, borderBottom: i === workingHours.length - 1 ? "none" : "1px solid var(--border-subtle)" }} />
                    ))}
                  </div>

                  {/* Day Columns containing absolute cards */}
                  {days.map((day, dIdx) => {
                    const appts = getApptsForDay(day);

                    return (
                      <div
                        key={dIdx}
                        style={{
                          position: "relative",
                          borderRight: "1px solid var(--border-subtle)",
                          height: "100%",
                        }}
                      >
                        {appts.map((appt) => {
                          const pat = patients.find((p) => p.id === appt.patientId) || { name: "Unknown Patient" };
                          const offset = parseTimeOffset(appt.time);
                          if (offset === null || offset < 0 || offset > 10) return null;

                          // Position by percentage of 11 working hours slots (8:00 AM - 7:00 PM)
                          const topPercent = (offset / 11) * 100;
                          
                          // Default 30 minutes duration height in percentage (0.5h / 11h = 4.54%)
                          // Capped slightly below to leave a tiny spacing gap between slots
                          const heightPercent = 4.2;

                          return (
                            <div
                              key={appt.id}
                              className={`appt ${getApptColorClass(appt)}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedAppt({ ...appt, patient: pat });
                              }}
                              style={{
                                position: "absolute",
                                top: `${topPercent}%`,
                                height: `${heightPercent}%`,
                                left: 4,
                                right: 4,
                                margin: 0,
                                zIndex: 10,
                                padding: "4px 8px",
                                overflow: "hidden",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                gap: 1,
                                borderLeftWidth: 3,
                              }}
                            >
                              <div className="appt-time" style={{ fontSize: 9, fontWeight: 700, lineHeight: 1.1 }}>{appt.time}</div>
                              <div className="appt-name" style={{ fontSize: 10, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", lineHeight: 1.1 }}>
                                {pat.name}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedAppt && (
        <Modal
          isOpen={!!selectedAppt}
          onClose={() => setSelectedAppt(null)}
          title="Appointment Details"
        >
          <div className="form-wrap" style={{ boxShadow: "none", padding: 0, margin: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Header Info */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid var(--border-subtle)", paddingBottom: 16 }}>
                <div className="pt-avatar" style={{ width: 44, height: 44, fontSize: 16, background: "var(--accent)" }}>
                  {selectedAppt.patient.name.split(" ").map((n: string) => n[0]).join("")}
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", margin: "0 0 2px 0" }}>
                    {selectedAppt.patient.name}
                  </h3>
                  <span style={{ fontSize: 12, color: "var(--muted)" }}>
                    Patient ID: <span style={{ fontFamily: "monospace" }}>{selectedAppt.patient.id}</span>
                  </span>
                </div>
              </div>

              {/* Grid of details */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 4, letterSpacing: "0.05em" }}>
                    Date
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 500, color: "var(--ink)" }}>
                    {selectedAppt.date ? new Date(selectedAppt.date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : "—"}
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 4, letterSpacing: "0.05em" }}>
                    Time Slot
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 500, color: "var(--ink)" }}>
                    {selectedAppt.time}
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 4, letterSpacing: "0.05em" }}>
                    Appointment Type
                  </span>
                  <span className={`pill ${selectedAppt.type === "Urgent" ? "crit" : selectedAppt.type === "New Patient" ? "info" : selectedAppt.type?.toLowerCase().includes("tele") ? "new" : "ok"}`}>
                    {selectedAppt.type}
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 4, letterSpacing: "0.05em" }}>
                    Status
                  </span>
                  <span className="pill neutral">
                    {selectedAppt.status}
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 4, letterSpacing: "0.05em" }}>
                    Demographics
                  </span>
                  <span style={{ fontSize: 14, color: "var(--ink)" }}>
                    {selectedAppt.patient.age} yrs · {selectedAppt.patient.gender}
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 4, letterSpacing: "0.05em" }}>
                    Contact Phone
                  </span>
                  <span style={{ fontSize: 14, color: "var(--ink)" }}>
                    {selectedAppt.patient.phone}
                  </span>
                </div>
              </div>

              <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: 16 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 4, letterSpacing: "0.05em" }}>
                  Purpose of Visit
                </span>
                <p style={{ fontSize: 14, color: "var(--ink)", margin: 0, lineHeight: 1.5 }}>
                  {selectedAppt.reason}
                </p>
              </div>

              {isTeleconsultationActive && selectedAppt.meetingLink && (
                <div style={{
                  border: "1.5px solid var(--accent)",
                  borderRadius: "var(--rlg)",
                  padding: "16px",
                  background: "var(--surface)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  marginTop: 4
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <h4 style={{ margin: "0 0 2px 0", fontSize: "13px", fontWeight: 700, color: "var(--ink)" }}>Teleconsultation Room</h4>
                      <p style={{ margin: 0, fontSize: "11px", color: "var(--muted)" }}>Launch the virtual room for this patient</p>
                    </div>
                    {selectedAppt.passcode && (
                      <div style={{ textAlign: "right" }}>
                        <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", display: "block" }}>Passcode</span>
                        <span style={{ fontSize: "14px", fontWeight: 700, fontFamily: "monospace", color: "var(--accent)" }}>{selectedAppt.passcode}</span>
                      </div>
                    )}
                  </div>
                  <button
                    disabled={!canStartTeleconsultation}
                    onClick={() => {
                      if (!canStartTeleconsultation) return;
                      const urlPath = (selectedAppt.meetingLink || "").includes("/room/")
                        ? selectedAppt.meetingLink.substring(selectedAppt.meetingLink.indexOf("/room/"))
                        : `/room/${selectedAppt.id}`;
                      const docLink = `${window.location.origin}${urlPath}`;
                      window.open(docLink, "_blank", "noopener,noreferrer");
                      setSelectedPatientId(selectedAppt.patientId);
                      setModeOfTransaction("TELECONSULTATION");
                      setSelectedAppt(null);
                      navigateTo("/newvisit");
                    }}
                    className="btn btn-primary"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      fontWeight: 600,
                      fontSize: "12px",
                      height: "36px",
                      width: "100%",
                      cursor: canStartTeleconsultation ? "pointer" : "not-allowed",
                      opacity: canStartTeleconsultation ? 1 : 0.6,
                      background: canStartTeleconsultation ? "var(--accent)" : "var(--muted)",
                      border: "none"
                    }}
                  >
                    <svg viewBox="0 0 15 15" width={14} height={14} fill="currentColor">
                      <rect x="1.5" y="3" width="9" height="9" rx="2" fill="none" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M10.5 6.5l3-2v6l-3-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Start Video & Record Consult
                  </button>
                  {!canStartTeleconsultation && (
                    <p style={{ margin: "8px 0 0 0", fontSize: "11px", color: "var(--crit-text)", textAlign: "center", fontWeight: 500 }}>
                      ⚠️ In production, consultations can only be started up to 15 minutes before the scheduled time.
                    </p>
                  )}
                </div>
              )}

              {/* Modal footer actions */}
              <div className="form-actions" style={{ marginTop: 8, gap: 8 }}>
                <Button variant="ghost" type="button" onClick={() => setSelectedAppt(null)}>
                  Close
                </Button>
                
                {(selectedAppt.status === "Scheduled" || selectedAppt.status === "CONFIRMED" || selectedAppt.status === "PENDING") && (
                  <Button
                    variant="primary"
                    type="button"
                    disabled={checkInMutation.isPending}
                    style={{ background: "var(--accent)", color: "white" }}
                    onClick={async () => {
                      try {
                        await checkInMutation.mutateAsync(selectedAppt.id);
                        triggerToast(`Patient checked in successfully!`);
                        setSelectedAppt(null);
                      } catch (err: any) {
                        triggerToast(err.message || "Failed to check in patient", "alert");
                      }
                    }}
                  >
                    {checkInMutation.isPending ? "Checking In..." : "Check In Patient"}
                  </Button>
                )}

                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    setSelectedPatientId(selectedAppt.patientId);
                    setSelectedAppt(null);
                    navigateTo("/records");
                  }}
                >
                  View Patient Chart
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* QUEUE DRAWER */}
      {showQueueDrawer && (
        <>
          <div className="queue-drawer-overlay" onClick={() => setShowQueueDrawer(false)} />
          <div className="queue-drawer-panel">
            <style dangerouslySetInnerHTML={{ __html: `
              .queue-drawer-overlay {
                position: fixed;
                inset: 0;
                background: rgba(15, 23, 42, 0.4);
                backdrop-filter: blur(4px);
                z-index: 999;
                animation: fadeIn 0.2s ease-out;
              }
              .queue-drawer-panel {
                position: fixed;
                top: 0;
                right: 0;
                height: 100vh;
                width: 100%;
                max-width: 440px;
                background: var(--white);
                border-left: 1px solid var(--border-subtle);
                box-shadow: -4px 0 24px rgba(0, 0, 0, 0.1);
                z-index: 1000;
                display: flex;
                flex-direction: column;
                animation: slideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
              }
              .queue-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px;
                border-bottom: 1px solid var(--border-subtle);
              }
              .queue-header h3 {
                margin: 0;
                font-family: 'Sora', sans-serif;
                font-size: 16px;
                font-weight: 700;
                color: var(--ink);
              }
              .queue-close-btn {
                background: transparent;
                border: none;
                cursor: pointer;
                color: var(--muted);
                padding: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background 0.15s, color 0.15s;
              }
              .queue-close-btn:hover {
                background: var(--surface);
                color: var(--ink);
              }
              .queue-section-title {
                font-size: 11px;
                font-weight: 700;
                text-transform: uppercase;
                color: var(--muted);
                letter-spacing: 0.05em;
                margin: 20px 20px 10px 20px;
              }
              .queue-card-list {
                display: flex;
                flex-direction: column;
                gap: 10px;
                padding: 0 20px;
                overflow-y: auto;
              }
              .queue-card {
                background: var(--surface);
                border: 1px solid var(--border-subtle);
                border-radius: var(--rmd);
                padding: 14px;
                display: flex;
                flex-direction: column;
                gap: 8px;
                transition: border-color 0.15s, box-shadow 0.15s;
              }
              .queue-card:hover {
                border-color: var(--accent);
                box-shadow: var(--card-shadow);
              }
              .queue-card-top {
                display: flex;
                justify-content: space-between;
                align-items: center;
              }
              .queue-ticket-num {
                font-family: 'Sora', sans-serif;
                font-size: 14px;
                font-weight: 700;
                color: var(--accent);
                background: var(--accent-light);
                padding: 4px 8px;
                border-radius: 6px;
              }
              .queue-wait-time {
                font-size: 11px;
                color: var(--muted);
                font-weight: 500;
              }
              .queue-patient-name {
                font-size: 13px;
                font-weight: 700;
                color: var(--ink);
              }
              .queue-patient-pin {
                font-family: monospace;
                font-size: 11px;
                color: var(--muted);
              }
              .queue-card-actions {
                display: flex;
                gap: 6px;
                margin-top: 4px;
              }
              .walk-in-box {
                background: var(--surface);
                border-bottom: 1px solid var(--border-subtle);
                padding: 16px 20px;
                display: flex;
                flex-direction: column;
                gap: 8px;
                position: relative;
              }
              .walk-in-search-results {
                position: absolute;
                top: calc(100% - 4px);
                left: 20px;
                right: 20px;
                background: var(--white);
                border: 1px solid var(--border);
                border-radius: var(--rsm);
                box-shadow: var(--card-shadow);
                max-height: 160px;
                overflow-y: auto;
                z-index: 1010;
              }
              .walk-in-result-item {
                padding: 8px 12px;
                cursor: pointer;
                font-size: 12px;
                border-bottom: 1px solid var(--border-subtle);
                display: flex;
                justify-content: space-between;
                align-items: center;
              }
              .walk-in-result-item:hover {
                background: var(--surface);
                color: var(--accent);
              }
              .room-select {
                font-size: 12px;
                padding: 4px 8px;
                border-radius: var(--rsm);
                border: 1px solid var(--border);
                background: var(--white);
                color: var(--ink);
                height: 28px;
                flex: 1;
              }
            ` }} />

            <div className="queue-header">
              <h3>Waiting Room Queue</h3>
              <button className="queue-close-btn" onClick={() => setShowQueueDrawer(false)}>
                <svg viewBox="0 0 15 15" width={16} height={16}>
                  <path d="M3.25 3.25l8.5 8.5M11.75 3.25l-8.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Physician Filter Section */}
            <div style={{ padding: "12px 20px", borderBottom: "1px solid var(--border-subtle)", background: "var(--surface)", display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "var(--muted)", display: "block" }}>Filter Queue by Physician</span>
              <select
                className="room-select"
                value={filterDoctorId}
                onChange={(e) => setFilterDoctorId(e.target.value)}
                style={{ width: "100%", height: "32px" }}
              >
                <option value="">All Physicians</option>
                {allAttendingDoctors.map((doc: any) => (
                  <option key={doc.id} value={doc.id}>
                    Dr. {doc.firstName} {doc.lastName}
                  </option>
                ))}
              </select>
            </div>

            {/* Register Walk-In Panel */}
            <div className="walk-in-box">
              <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "var(--muted)", display: "block" }}>Add Walk-in to Queue</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ fontSize: "11px", color: "var(--muted)", fontWeight: 600, textTransform: "uppercase", width: "110px", flexShrink: 0 }}>Assign Doctor:</span>
                  <select
                    className="room-select"
                    value={walkInDoctorId}
                    onChange={(e) => setWalkInDoctorId(e.target.value)}
                    style={{ height: "32px", fontSize: "12px" }}
                  >
                    <option value="">No Specific Physician</option>
                    {activeAttendingDoctors.map((doc: any) => (
                      <option key={doc.id} value={doc.id}>
                        Dr. {doc.firstName} {doc.lastName}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ display: "flex", gap: 8, position: "relative" }}>
                  <input
                    type="text"
                    placeholder="Search registered patient by name or PIN..."
                    value={walkInPatientSearch}
                    onChange={(e) => {
                      setWalkInPatientSearch(e.target.value);
                      setShowAddWalkInDropdown(true);
                    }}
                    onFocus={() => setShowAddWalkInDropdown(true)}
                    style={{
                      flex: 1,
                      fontSize: "12px",
                      height: "32px",
                      padding: "0 10px",
                      borderRadius: "var(--rsm)",
                      border: "1px solid var(--border)"
                    }}
                  />
                  {walkInPatientSearch && (
                    <Button
                      variant="ghost"
                      style={{ height: 32, padding: "0 8px", fontSize: 11 }}
                      onClick={() => {
                        setWalkInPatientSearch("");
                        setShowAddWalkInDropdown(false);
                      }}
                    >
                      Clear
                    </Button>
                  )}

                  {/* Dropdown Results */}
                  {showAddWalkInDropdown && walkInPatientSearch && (
                    <div className="walk-in-search-results">
                      {filteredPatientsForWalkIn.length > 0 ? (
                        filteredPatientsForWalkIn.map((p: any) => (
                          <div
                            key={p.id}
                            className="walk-in-result-item"
                            onClick={async () => {
                              try {
                                await createWalkInMutation.mutateAsync({
                                  patientId: p.id,
                                  doctorId: walkInDoctorId || undefined
                                });
                                triggerToast(`Walk-in ticket generated for ${p.name}!`);
                                setWalkInPatientSearch("");
                                setShowAddWalkInDropdown(false);
                              } catch (err: any) {
                                triggerToast(err.message || "Failed to create ticket", "alert");
                              }
                            }}
                          >
                            <div>
                              <strong>{p.name}</strong>
                              <div style={{ fontSize: "10px", color: "var(--muted)" }}>PIN: {p.pin}</div>
                            </div>
                            <span style={{ fontSize: "10px", color: "var(--accent)", fontWeight: 600 }}>Queue +</span>
                          </div>
                        ))
                      ) : (
                        <div style={{ padding: "12px", alignSelf: "center", fontSize: "11px", color: "var(--muted)", textAlign: "center" }}>
                          No matching patients found.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Scrollable list */}
            <div style={{ flex: 1, overflowY: "auto", paddingBottom: "30px" }}>
              {/* Calling / Active List */}
              <div className="queue-section-title">Calling / In Consultation ({queue.filter(q => q.status === "CALLING").length})</div>
              <div className="queue-card-list">
                {queue.filter(q => q.status === "CALLING").length > 0 ? (
                  queue.filter(q => q.status === "CALLING").map((item) => (
                    <div key={item.id} className="queue-card" style={{ borderColor: "var(--accent)" }}>
                      <div className="queue-card-top">
                        <span className="queue-ticket-num" style={{ background: "var(--accent)", color: "white" }}>
                          {item.ticketNumber}
                        </span>
                        <span className="queue-wait-time" style={{ color: "var(--accent)", fontWeight: 700 }}>
                          Calling → {item.calledRoom || "Room"}
                        </span>
                      </div>
                      <div>
                        <div className="queue-patient-name">{item.patient?.firstName} {item.patient?.lastName}</div>
                        <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 2, flexWrap: "wrap" }}>
                          <span className="queue-patient-pin">PIN: {item.patient?.pin}</span>
                          {item.doctor && (
                            <span style={{ fontSize: "10px", background: "var(--accent-light)", color: "var(--accent)", padding: "1px 6px", borderRadius: 4, fontWeight: 600 }}>
                              Dr. {item.doctor.firstName} {item.doctor.lastName}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="queue-card-actions">
                        <Button
                          variant="primary"
                          style={{ height: 28, fontSize: 11, padding: "0 10px", flex: 1 }}
                          disabled={completeMutation.isPending}
                          onClick={async () => {
                            try {
                              await completeMutation.mutateAsync(item.id);
                              triggerToast(`Ticket ${item.ticketNumber} completed.`);
                            } catch (err: any) {
                              triggerToast(err.message || "Error completing ticket", "alert");
                            }
                          }}
                        >
                          Complete
                        </Button>
                        <Button
                          variant="outline"
                          style={{ height: 28, fontSize: 11, padding: "0 10px" }}
                          disabled={skipMutation.isPending}
                          onClick={async () => {
                            try {
                              await skipMutation.mutateAsync(item.id);
                              triggerToast(`Ticket ${item.ticketNumber} skipped.`);
                            } catch (err: any) {
                              triggerToast(err.message || "Error skipping ticket", "alert");
                            }
                          }}
                        >
                          Skip
                        </Button>
                        <Button
                          variant="ghost"
                          style={{ height: 28, fontSize: 11, padding: "0 8px" }}
                          disabled={callMutation.isPending}
                          onClick={async () => {
                            try {
                              await callMutation.mutateAsync({ id: item.id, calledRoom: item.calledRoom || "Room 1" });
                              triggerToast(`Re-calling Ticket ${item.ticketNumber}.`);
                            } catch (err: any) {
                              triggerToast(err.message || "Error calling ticket", "alert");
                            }
                          }}
                          title="Call Ticket again on Kiosk Display"
                        >
                          🔊 Recall
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: "16px", alignSelf: "center", fontSize: "12px", color: "var(--muted)", textAlign: "center", border: "1px dashed var(--border)", borderRadius: "var(--rsm)" }}>
                    No active consultations at the moment.
                  </div>
                )}
              </div>

              {/* Waiting List */}
              <div className="queue-section-title">Waiting in Lobby ({queue.filter(q => q.status === "WAITING").length})</div>
              <div className="queue-card-list">
                {queue.filter(q => q.status === "WAITING").length > 0 ? (
                  queue.filter(q => q.status === "WAITING").map((item) => {
                    const elapsed = getWaitTime(item.createdAt);
                    const currentRoom = selectedRoomToCall[item.id] || "Room 1";
                    return (
                      <div key={item.id} className="queue-card">
                        <div className="queue-card-top">
                          <span className="queue-ticket-num">{item.ticketNumber}</span>
                          <span className="queue-wait-time">{elapsed}</span>
                        </div>
                        <div>
                          <div className="queue-patient-name">{item.patient?.firstName} {item.patient?.lastName}</div>
                          <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 2, flexWrap: "wrap" }}>
                            <span className="queue-patient-pin">PIN: {item.patient?.pin}</span>
                            {item.doctor && (
                              <span style={{ fontSize: "10px", background: "var(--accent-light)", color: "var(--accent)", padding: "1px 6px", borderRadius: 4, fontWeight: 600 }}>
                                Dr. {item.doctor.firstName} {item.doctor.lastName}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="queue-card-actions" style={{ alignItems: "center" }}>
                          <select
                            className="room-select"
                            value={currentRoom}
                            onChange={(e) => {
                              setSelectedRoomToCall(prev => ({
                                ...prev,
                                [item.id]: e.target.value
                              }));
                            }}
                          >
                            <option value="Room 1">Room 1</option>
                            <option value="Room 2">Room 2</option>
                            <option value="Room 3">Room 3</option>
                            <option value="Triage Room">Triage Room</option>
                            <option value="OB-GYN Room">OB-GYN Room</option>
                            <option value="Dental Room">Dental Room</option>
                            <option value="Laboratory">Laboratory</option>
                          </select>
                          <Button
                            variant="primary"
                            style={{ height: 28, fontSize: 11, padding: "0 12px" }}
                            disabled={callMutation.isPending}
                            onClick={async () => {
                              try {
                                await callMutation.mutateAsync({ id: item.id, calledRoom: currentRoom });
                                triggerToast(`Calling ${item.ticketNumber} to ${currentRoom}...`);
                              } catch (err: any) {
                                triggerToast(err.message || "Error calling ticket", "alert");
                              }
                            }}
                          >
                            Call Ticket
                          </Button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div style={{ padding: "16px", alignSelf: "center", fontSize: "12px", color: "var(--muted)", textAlign: "center", border: "1px dashed var(--border)", borderRadius: "var(--rsm)" }}>
                    No patients waiting.
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Elapsed wait time calculator helper
const getWaitTime = (createdAtStr: string) => {
  const diff = Date.now() - new Date(createdAtStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  return `${mins}m ago`;
};
