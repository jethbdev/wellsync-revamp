"use client";

import * as React from "react";
import { usePatient } from "../patient-context";
import { Button, Pill, Card, CardHeader, CardTitle, CardBody, Modal } from "@healthbridge/ui";
import { useBookAppointment } from "../../../lib/hooks/api/usePortal";
import { BookAppointmentModal } from "./book-modal";

// Convert time "9:30 AM" into hours offset from 8:00 AM
const parseTimeOffset = (timeStr: string) => {
  if (!timeStr) return null;
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

export default function PatientAppointments() {
  const { profile, handleConfirmAppointment, handleCancelAppointment, triggerToast } = usePatient();
  const [isBookingOpen, setIsBookingOpen] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<"month" | "week" | "three-day" | "day">("month");
  const [selectedAppt, setSelectedAppt] = React.useState<any>(null);

  const bookMutation = useBookAppointment();
  const scheduledVisits = profile.scheduledVisits || [];

  // Categorize appointments
  const upcoming = React.useMemo(() => {
    return scheduledVisits.filter((v: any) => v.status === "PENDING" || v.status === "CONFIRMED");
  }, [scheduledVisits]);

  // Calendar Date State (default to first upcoming visit date, or today)
  const [currentDate, setCurrentDate] = React.useState<Date>(() => {
    if (upcoming.length > 0) {
      return new Date(upcoming[0].scheduledDate);
    }
    return new Date();
  });

  const handleBookAppointment = async (data: {
    scheduledDate: string;
    scheduledTime: string | undefined;
    purpose: string;
  }) => {
    try {
      await bookMutation.mutateAsync(data);
      triggerToast("Appointment booked successfully!");
      setIsBookingOpen(false);
      const d = new Date(data.scheduledDate);
      setCurrentDate(d);
    } catch (err: any) {
      triggerToast(err.message || "Failed to book appointment.");
      throw err;
    }
  };

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
      startDay.setDate(firstDay.getDate() - firstDay.getDay()); // Preceding Sunday

      for (let i = 0; i < 42; i++) {
        days.push(new Date(startDay));
        startDay.setDate(startDay.getDate() + 1);
      }
    } else if (viewMode === "week") {
      const startDay = new Date(date);
      startDay.setDate(date.getDate() - date.getDay());
      for (let i = 0; i < 7; i++) {
        days.push(new Date(startDay));
        startDay.setDate(startDay.getDate() + 1);
      }
    } else if (viewMode === "three-day") {
      for (let i = 0; i < 3; i++) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
      }
    } else {
      days.push(new Date(date));
    }
    return days;
  };

  const getApptsForDay = (day: Date) => {
    const y = day.getFullYear();
    const m = String(day.getMonth() + 1).padStart(2, "0");
    const d = String(day.getDate()).padStart(2, "0");
    const formattedDayStr = `${y}-${m}-${d}`;

    const filtered = scheduledVisits.filter((v: any) => {
      const vDateStr = new Date(v.scheduledDate).toISOString().split("T")[0];
      return vDateStr === formattedDayStr;
    });

    return filtered.sort((a: any, b: any) => {
      const offsetA = parseTimeOffset(a.scheduledTime) ?? 0;
      const offsetB = parseTimeOffset(b.scheduledTime) ?? 0;
      return offsetA - offsetB;
    });
  };

  const getApptColorClass = (appt: any) => {
    if (appt.status === "CANCELLED") return "red";
    if (appt.purpose?.toLowerCase().includes("urgent")) return "yellow";
    if (appt.purpose?.toLowerCase().includes("tele")) return "purple";
    if (appt.status === "CONFIRMED") return "green";
    return "blue";
  };

  const getDotColor = (appt: any) => {
    if (appt.status === "CANCELLED") return "var(--crit-text)";
    if (appt.purpose?.toLowerCase().includes("urgent")) return "#f59e0b";
    if (appt.purpose?.toLowerCase().includes("tele")) return "#a78bfa";
    if (appt.status === "CONFIRMED") return "var(--accent)";
    return "#60a5fa";
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

  const workingHours = [
    "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"
  ];

  return (
    <div className="panel active" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <style>{`
        .appt.red {
          background: var(--crit-bg);
          border-left-color: var(--crit-text);
        }

        @media (max-width: 768px) {
          .ph {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
            margin-bottom: 12px !important;
          }
          .ph-actions {
            width: 100% !important;
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 10px !important;
          }
          .cal-book-btn {
            width: 100% !important;
            height: 36px !important;
            font-size: 13px !important;
          }
          .cal-divider {
            display: none !important;
          }
          .cal-views-group {
            width: 100% !important;
            gap: 4px !important;
          }
          .cal-views-group button {
            flex: 1 !important;
            height: 34px !important;
            font-size: 11px !important;
            padding: 0 !important;
          }
          .cal-arrows-group {
            width: 100% !important;
            justify-content: flex-end !important;
            gap: 8px !important;
          }
          .cal-arrows-group button {
            height: 34px !important;
            width: 48px !important;
          }
          
          /* Month Grid overrides */
          .cal-month-cell-item {
            padding: 4px 3px !important;
            min-height: 48px !important;
          }
          .cal-appt-list {
            display: none !important;
          }
          .cal-mobile-dots {
            display: flex !important;
          }
          .cal-day-num-item {
            width: 15px !important;
            height: 15px !important;
            font-size: 8.5px !important;
            margin-bottom: 2px !important;
          }

          /* Page Title adjustments */
          .ph-left h2 {
            font-size: 18px !important;
          }
          .ph-left p {
            font-size: 12px !important;
          }

          /* Timeline overrides */
          .timeline-header-spacer-item,
          .timeline-hours-col-container {
            width: 42px !important;
          }
          .timeline-weekday-label {
            font-size: 8px !important;
          }
          .timeline-daynum-label {
            font-size: 11px !important;
            width: 20px !important;
            height: 20px !important;
          }
          .timeline-hour-tick-label {
            font-size: 8px !important;
            padding-right: 4px !important;
          }
        }
      `}</style>

      <div className="panel-inner" style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0, paddingBottom: 16 }}>
        {/* CALENDAR HEADER BAR */}
        <div className="ph" style={{ marginBottom: 16 }}>
          <div className="ph-left">
            <h2>Visits Calendar</h2>
            <p>{getHeaderLabel()}</p>
          </div>

          <div className="ph-actions" style={{ display: "flex", gap: 12, alignItems: "center" }}>
            {/* Book Appointment */}
            <Button
              className="cal-book-btn"
              variant="primary"
              style={{ height: 32, fontSize: 12, padding: "0 14px", display: "flex", alignItems: "center", gap: 6 }}
              onClick={() => setIsBookingOpen(true)}
            >
              <svg viewBox="0 0 16 16" width={13} height={13} style={{ fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" }}>
                <path d="M8 3v10M3 8h10" />
              </svg>
              Book Appointment
            </Button>

            <div className="cal-divider" style={{ width: 1, height: 20, background: "var(--border-subtle)" }} />

            {/* View selectors + Today (left of divider) */}
            <div className="cal-views-group" style={{ display: "flex", gap: 6 }}>
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

            <div className="cal-divider" style={{ width: 1, height: 20, background: "var(--border-subtle)" }} />

            {/* Navigation arrows (right of divider) */}
            <div className="cal-arrows-group" style={{ display: "flex", gap: 6 }}>
              <Button
                variant="outline"
                style={{ height: 32, fontSize: 12, padding: "0 12px", width: 32 }}
                onClick={handlePrev}
              >
                ←
              </Button>
              <Button
                variant="outline"
                style={{ height: 32, fontSize: 12, padding: "0 12px", width: 32 }}
                onClick={handleNext}
              >
                →
              </Button>
            </div>
          </div>
        </div>

        {/* CALENDAR BODY */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "var(--white)", borderRadius: "var(--rlg)", boxShadow: "var(--card-shadow)", overflow: "hidden", minHeight: 0 }}>
          {viewMode === "month" ? (
            /* MONTH VIEW */
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
                      className="cal-month-cell-item"
                      onClick={() => {
                        if (appts.length > 0) {
                          setSelectedAppt(appts[0]);
                        }
                      }}
                      style={{
                        borderRight: "1px solid var(--border-subtle)",
                        borderBottom: "1px solid var(--border-subtle)",
                        padding: 6,
                        display: "flex",
                        flexDirection: "column",
                        background: isDayToday ? "var(--tr-hover)" : "transparent",
                        opacity: isCurrentMonth ? 1 : 0.45,
                        minHeight: 80,
                        cursor: appts.length > 0 ? "pointer" : "default",
                      }}
                    >
                      {/* Day number with circle if today */}
                      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 4 }}>
                        <span
                          className="cal-day-num-item"
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
                      <div className="cal-appt-list" style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1, overflowY: "auto" }}>
                        {appts.map((visit: any) => (
                          <div
                            key={visit.id}
                            className={`appt ${getApptColorClass(visit)}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedAppt(visit);
                            }}
                            style={{ margin: 0, padding: "2px 6px", borderRadius: 4, fontSize: 10, display: "flex", justifyContent: "space-between", gap: 4, cursor: "pointer" }}
                            title={`${visit.scheduledTime || "Any Time"} - ${visit.purpose}`}
                          >
                            <span style={{ fontWeight: 700, whiteSpace: "nowrap" }}>{visit.scheduledTime || "Any Time"}</span>
                            <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", flex: 1 }}>{visit.purpose}</span>
                          </div>
                        ))}
                      </div>
                      {/* Mobile Dots */}
                      <div className="cal-mobile-dots" style={{ display: "none", justifyContent: "center", gap: 3, marginTop: "auto", paddingBottom: 2 }}>
                        {appts.slice(0, 3).map((visit: any) => (
                          <span
                            key={visit.id}
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: getDotColor(visit),
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* TIMELINE VIEW (Week, 3-Day, Day) */
            <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
              {/* Timeline Header Row */}
              <div style={{ display: "flex", borderBottom: "1px solid var(--border-subtle)", background: "var(--surface)" }}>
                <div className="timeline-header-spacer-item" style={{ width: 60, flexShrink: 0, borderRight: "1px solid var(--border-subtle)" }} />
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
                        <span className="timeline-weekday-label" style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "var(--muted)" }}>
                          {weekday}
                        </span>
                        <span
                          className="timeline-daynum-label"
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

              {/* Timeline Scrollable Grid */}
              <div style={{ flex: 1, display: "flex", position: "relative", minHeight: 0, height: "100%" }}>
                {/* Left Hour labels */}
                <div className="timeline-hours-col-container" style={{ width: 60, flexShrink: 0, borderRight: "1px solid var(--border-subtle)", background: "var(--surface)", userSelect: "none", display: "flex", flexDirection: "column", height: "100%" }}>
                  {workingHours.map((h, i) => (
                    <div
                      key={i}
                      className="timeline-hour-tick-label"
                      style={{
                        flex: 1,
                        fontSize: 9.5,
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

                {/* Day Columns */}
                <div style={{ display: "grid", gridTemplateColumns: `repeat(${numDays}, 1fr)`, flex: 1, position: "relative", height: "100%" }}>
                  {/* Horizontal Backdrop Grid Lines */}
                  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", display: "flex", flexDirection: "column", height: "100%" }}>
                    {workingHours.map((_, i) => (
                      <div key={i} style={{ flex: 1, borderBottom: i === workingHours.length - 1 ? "none" : "1px solid var(--border-subtle)" }} />
                    ))}
                  </div>

                  {/* Day Columns with absolute appointment blocks */}
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
                        {appts.map((visit: any) => {
                          const offset = parseTimeOffset(visit.scheduledTime);
                          if (offset === null || offset < 0 || offset > 10) return null;

                          // 11 working hour slots (8 AM to 6 PM)
                          const topPercent = (offset / 11) * 100;
                          const heightPercent = 4.2;

                          return (
                            <div
                              key={visit.id}
                              className={`appt ${getApptColorClass(visit)}`}
                              onClick={() => setSelectedAppt(visit)}
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
                                cursor: "pointer",
                              }}
                            >
                              <div className="appt-time" style={{ fontSize: 9, fontWeight: 700, lineHeight: 1.1 }}>
                                {visit.scheduledTime}
                              </div>
                              <div className="appt-name" style={{ fontSize: 10, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", lineHeight: 1.1 }}>
                                {visit.purpose}
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

      {/* Appointment Detail Modal */}
      {selectedAppt && (
        <Modal
          isOpen={!!selectedAppt}
          onClose={() => setSelectedAppt(null)}
          title="Appointment Details"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid var(--border-subtle)", paddingBottom: 16 }}>
              <div style={{
                width: 42, height: 42, borderRadius: "50%", background: "var(--accent)", color: "white",
                display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 15
              }}>
                {profile.firstName[0]}{profile.lastName[0]}
              </div>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", margin: "0 0 2px 0" }}>
                  {profile.firstName} {profile.lastName}
                </h3>
                <span style={{ fontSize: 11.5, color: "var(--muted)" }}>
                  Patient PIN: <span style={{ fontFamily: "monospace", fontWeight: 600 }}>{profile.pin}</span>
                </span>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <span style={{ fontSize: 10, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 3, letterSpacing: "0.05em" }}>
                  Scheduled Date
                </span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>
                  {new Date(selectedAppt.scheduledDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                </span>
              </div>
              <div>
                <span style={{ fontSize: 10, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 3, letterSpacing: "0.05em" }}>
                  Time Slot
                </span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>
                  {selectedAppt.scheduledTime || "Any Time"}
                </span>
              </div>
              <div>
                <span style={{ fontSize: 10, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 3, letterSpacing: "0.05em" }}>
                  Booking Status
                </span>
                <Pill variant={selectedAppt.status === "CONFIRMED" ? "ok" : selectedAppt.status === "CANCELLED" ? "crit" : selectedAppt.status === "COMPLETED" ? "ok" : "neutral"}>
                  {selectedAppt.status}
                </Pill>
              </div>
              <div>
                <span style={{ fontSize: 10, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 3, letterSpacing: "0.05em" }}>
                  Clinic Location
                </span>
                <span style={{ fontSize: 13, color: "var(--ink)", fontWeight: 600 }}>
                  {(profile as any)?.facility?.name || "Partner Clinic"}
                </span>
              </div>
            </div>

            <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: 16 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 4, letterSpacing: "0.05em" }}>
                Purpose of Visit
              </span>
              <p style={{ fontSize: 13.5, color: "var(--ink)", margin: 0, lineHeight: 1.5, fontWeight: 500 }}>
                {selectedAppt.purpose}
              </p>
            </div>

            {selectedAppt.status === "PENDING" && (
              <div style={{ display: "flex", gap: 10, borderTop: "1px solid var(--border-subtle)", paddingTop: 16, marginTop: 4 }}>
                <Button
                  style={{ flex: 1 }}
                  variant="primary"
                  onClick={async () => {
                    await handleConfirmAppointment(selectedAppt.id);
                    setSelectedAppt(null);
                  }}
                >
                  Confirm Visit
                </Button>
                <Button
                  style={{ flex: 1 }}
                  variant="ghost"
                  onClick={async () => {
                    await handleCancelAppointment(selectedAppt.id);
                    setSelectedAppt(null);
                  }}
                >
                  Cancel Booking
                </Button>
              </div>
            )}

            {selectedAppt.status === "CONFIRMED" && (
              <div style={{
                background: "var(--info-bg)", color: "var(--info-text)", borderRadius: "var(--rsm)",
                padding: "10px 12px", fontSize: 12, lineHeight: 1.5, marginTop: 8
              }}>
                <strong>📌 Reminder:</strong> This appointment is confirmed. Please show up 15 minutes before the time slot.
              </div>
            )}

            {selectedAppt.meetingLink && (
              <div style={{
                border: "1.5px solid var(--accent)",
                borderRadius: "var(--rlg)",
                padding: "16px",
                marginTop: 12,
                background: "var(--surface)",
                display: "flex",
                flexDirection: "column",
                gap: 12
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <h4 style={{ margin: "0 0 2px 0", fontSize: "13px", fontWeight: 700, color: "var(--ink)" }}>Virtual Teleconsultation</h4>
                    <p style={{ margin: 0, fontSize: "11px", color: "var(--muted)" }}>Click below to join the secure call room</p>
                  </div>
                  {selectedAppt.passcode && (
                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", display: "block" }}>Passcode</span>
                      <span style={{ fontSize: "14px", fontWeight: 700, fontFamily: "monospace", color: "var(--accent)" }}>{selectedAppt.passcode}</span>
                    </div>
                  )}
                </div>
                <a
                  href={
                    (selectedAppt.meetingLink || "").includes("/room/")
                      ? `${window.location.origin}${selectedAppt.meetingLink.substring(selectedAppt.meetingLink.indexOf("/room/"))}`
                      : `/room/${selectedAppt.id}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    textDecoration: "none",
                    fontWeight: 600,
                    fontSize: "12px",
                    height: "36px",
                    width: "100%"
                  }}
                >
                  <svg viewBox="0 0 15 15" width={14} height={14} fill="currentColor">
                    <rect x="1.5" y="3" width="9" height="9" rx="2" fill="none" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M10.5 6.5l3-2v6l-3-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Join Video Session
                </a>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: (selectedAppt.status === "PENDING" || selectedAppt.meetingLink) ? 12 : 12 }}>
              <Button variant="ghost" onClick={() => setSelectedAppt(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

      <BookAppointmentModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onSubmit={handleBookAppointment}
        isPending={bookMutation.isPending}
        isTeleconsultationActive={profile.isTeleconsultationActive}
      />
    </div>
  );
}
