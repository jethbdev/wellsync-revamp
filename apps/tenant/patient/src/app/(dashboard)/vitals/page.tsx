"use client";

import * as React from "react";
import { usePatient } from "../patient-context";
import { TableWrap, Table, TableHeader, TableBody, TableRow, TableCell, TableHead, Card, CardHeader, CardTitle, CardBody, Pill } from "@healthbridge/ui";

const renderBPPill = (assessment?: string | null) => {
  if (!assessment) return null;
  const normalized = assessment.toUpperCase().replace(/_/g, " ");
  let variant: "ok" | "warn" | "crit" | "info" | "neutral" = "neutral";
  if (normalized.includes("NORMAL")) variant = "ok";
  else if (normalized.includes("ELEVATED") || normalized.includes("STAGE 1")) variant = "warn";
  else if (normalized.includes("STAGE 2") || normalized.includes("CRISIS") || normalized.includes("HIGH")) variant = "crit";
  
  return (
    <Pill variant={variant} style={{ marginLeft: 8, fontSize: "10px", padding: "2px 6px", textTransform: "capitalize" }}>
      {normalized.toLowerCase()}
    </Pill>
  );
};

const renderBMIPill = (category?: string | null) => {
  if (!category) return null;
  const normalized = category.toUpperCase().replace(/_/g, " ");
  let variant: "ok" | "warn" | "crit" | "info" | "neutral" = "neutral";
  if (normalized.includes("NORMAL")) variant = "ok";
  else if (normalized.includes("UNDERWEIGHT") || normalized.includes("OVERWEIGHT")) variant = "warn";
  else if (normalized.includes("OBESE")) variant = "crit";
  
  return (
    <Pill variant={variant} style={{ marginLeft: 8, fontSize: "10px", padding: "2px 6px", textTransform: "capitalize" }}>
      {normalized.toLowerCase()}
    </Pill>
  );
};


export default function PatientVitals() {
  const { vitalsLog } = usePatient();
  const [activeTab, setActiveTab] = React.useState<"bp" | "hr" | "weight">("bp");

  // Reverse data to map left-to-right (chronological) for the chart
  const trendData = React.useMemo(() => {
    return [...vitalsLog].reverse().slice(-8); // Display up to 8 entries
  }, [vitalsLog]);

  // Chart configuration
  const width = 640;
  const height = 220;
  const paddingLeft = 50;
  const paddingRight = 30;
  const paddingTop = 30;
  const paddingBottom = 40;

  // Render helper for Blood Pressure Chart
  const renderBPChart = () => {
    if (trendData.length < 2) return null;

    const systolics = trendData.map((v) => v.bpSystolic || 120);
    const diastolics = trendData.map((v) => v.bpDiastolic || 80);
    const allVals = [...systolics, ...diastolics];
    const maxVal = Math.max(...allVals, 140) + 10;
    const minVal = Math.max(0, Math.min(...allVals, 60) - 10);
    const yRange = maxVal - minVal;

    const points = trendData.map((v, i) => {
      const x = paddingLeft + (i * (width - paddingLeft - paddingRight)) / (trendData.length - 1);
      const ySys = height - paddingBottom - (((v.bpSystolic || 120) - minVal) / yRange) * (height - paddingTop - paddingBottom);
      const yDia = height - paddingBottom - (((v.bpDiastolic || 80) - minVal) / yRange) * (height - paddingTop - paddingBottom);
      return {
        x,
        ySys,
        yDia,
        date: new Date(v.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        sys: v.bpSystolic,
        dia: v.bpDiastolic,
      };
    });

    const sysPath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.ySys}`).join(" ");
    const diaPath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.yDia}`).join(" ");

    const sysAreaPath = `${sysPath} L ${points[points.length - 1].x} ${height - paddingBottom} L ${points[0].x} ${height - paddingBottom} Z`;
    const diaAreaPath = `${diaPath} L ${points[points.length - 1].x} ${height - paddingBottom} L ${points[0].x} ${height - paddingBottom} Z`;

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="vitals-svg-chart">
        <defs>
          <linearGradient id="sysGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="diaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Grid Lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
          const y = paddingTop + ratio * (height - paddingTop - paddingBottom);
          const val = Math.round(maxVal - ratio * yRange);
          return (
            <g key={index}>
              <line x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="var(--border-subtle)" strokeDasharray="4,4" />
              <text x={paddingLeft - 10} y={y + 4} textAnchor="end" className="chart-axis-text">
                {val}
              </text>
            </g>
          );
        })}

        {/* Areas */}
        <path d={sysAreaPath} fill="url(#sysGrad)" />
        <path d={diaAreaPath} fill="url(#diaGrad)" />

        {/* Lines */}
        <path d={sysPath} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
        <path d={diaPath} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />

        {/* X Axis Labels */}
        {points.map((p, i) => (
          <text key={i} x={p.x} y={height - 12} textAnchor="middle" className="chart-axis-text">
            {p.date}
          </text>
        ))}

        {/* Interactive Dots for Systolic */}
        {points.map((p, i) => (
          <g key={`sys-${i}`} className="chart-dot-group">
            <circle cx={p.x} cy={p.ySys} r="4" fill="var(--white)" stroke="var(--accent)" strokeWidth="2" />
            <rect x={p.x - 20} y={p.ySys - 24} width="40" height="16" rx="4" fill="var(--ink)" className="chart-dot-tooltip-bg" />
            <text x={p.x} y={p.ySys - 12} textAnchor="middle" fill="var(--white)" className="chart-dot-label">
              {p.sys}
            </text>
          </g>
        ))}

        {/* Interactive Dots for Diastolic */}
        {points.map((p, i) => (
          <g key={`dia-${i}`} className="chart-dot-group">
            <circle cx={p.x} cy={p.yDia} r="4" fill="var(--white)" stroke="#3b82f6" strokeWidth="2" />
            <rect x={p.x - 20} y={p.yDia - 24} width="40" height="16" rx="4" fill="var(--ink)" className="chart-dot-tooltip-bg" />
            <text x={p.x} y={p.yDia - 12} textAnchor="middle" fill="var(--white)" className="chart-dot-label">
              {p.dia}
            </text>
          </g>
        ))}
      </svg>
    );
  };

  // Render helper for Single Line Charts (HR & Weight)
  const renderSingleChart = (type: "hr" | "weight") => {
    if (trendData.length < 2) return null;

    const values = trendData.map((v) => (type === "hr" ? v.heartRate : v.weightKg) || 70);
    const maxVal = Math.max(...values, type === "hr" ? 90 : 80) + 5;
    const minVal = Math.max(0, Math.min(...values, type === "hr" ? 50 : 50) - 5);
    const yRange = maxVal - minVal;

    const points = trendData.map((v, i) => {
      const x = paddingLeft + (i * (width - paddingLeft - paddingRight)) / (trendData.length - 1);
      const val = (type === "hr" ? v.heartRate : v.weightKg) || 70;
      const y = height - paddingBottom - ((val - minVal) / yRange) * (height - paddingTop - paddingBottom);
      return {
        x,
        y,
        val,
        date: new Date(v.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      };
    });

    const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
    const areaPath = `${path} L ${points[points.length - 1].x} ${height - paddingBottom} L ${points[0].x} ${height - paddingBottom} Z`;
    const color = type === "hr" ? "#ef4444" : "#10b981";
    const gradientId = `${type}Grad`;

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="vitals-svg-chart">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Grid Lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
          const y = paddingTop + ratio * (height - paddingTop - paddingBottom);
          const val = Math.round(maxVal - ratio * yRange);
          return (
            <g key={index}>
              <line x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="var(--border-subtle)" strokeDasharray="4,4" />
              <text x={paddingLeft - 10} y={y + 4} textAnchor="end" className="chart-axis-text">
                {val}
              </text>
            </g>
          );
        })}

        {/* Area */}
        <path d={areaPath} fill={`url(#${gradientId})`} />

        {/* Line */}
        <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />

        {/* X Axis Labels */}
        {points.map((p, i) => (
          <text key={i} x={p.x} y={height - 12} textAnchor="middle" className="chart-axis-text">
            {p.date}
          </text>
        ))}

        {/* Dots */}
        {points.map((p, i) => (
          <g key={i} className="chart-dot-group">
            <circle cx={p.x} cy={p.y} r="4" fill="var(--white)" stroke={color} strokeWidth="2" />
            <rect x={p.x - 20} y={p.y - 24} width="40" height="16" rx="4" fill="var(--ink)" className="chart-dot-tooltip-bg" />
            <text x={p.x} y={p.y - 12} textAnchor="middle" fill="var(--white)" className="chart-dot-label">
              {p.val}
            </text>
          </g>
        ))}
      </svg>
    );
  };

  return (
    <div className="panel active">
      <style>{`
        .vitals-tab-row {
          display: flex;
          gap: 8px;
          border-bottom: 1px solid var(--border);
          padding-bottom: 12px;
          margin-bottom: 20px;
        }
        .vitals-tab {
          padding: 8px 16px;
          font-family: 'Sora', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: var(--muted);
          background: transparent;
          border: none;
          border-radius: var(--rsm);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .vitals-tab:hover {
          color: var(--ink);
          background: var(--surface);
        }
        .vitals-tab.active {
          color: var(--white);
          background: var(--accent);
        }
        .vitals-svg-chart {
          width: 100%;
          height: auto;
          max-height: 260px;
          overflow: visible;
        }
        .chart-axis-text {
          font-size: 10px;
          fill: var(--muted);
          font-family: 'DM Sans', sans-serif;
        }
        .chart-dot-group {
          cursor: pointer;
        }
        .chart-dot-tooltip-bg {
          opacity: 0;
          transform: translateY(4px);
          transition: all 0.15s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .chart-dot-label {
          opacity: 0;
          transform: translateY(4px);
          transition: all 0.15s cubic-bezier(0.2, 0.8, 0.2, 1);
          font-family: 'Sora', sans-serif;
          font-size: 9px;
          font-weight: 700;
          pointer-events: none;
        }
        .chart-dot-group:hover .chart-dot-tooltip-bg,
        .chart-dot-group:hover .chart-dot-label {
          opacity: 0.95;
          transform: translateY(0);
        }
        .chart-container-card {
          margin-bottom: 24px;
        }
        @media (max-width: 768px) {
          .ph-left h2 {
            font-size: 18px !important;
          }
          .ph-left p {
            font-size: 12px !important;
          }
          .vitals-tab {
            padding: 6px 10px !important;
            font-size: 11.5px !important;
          }
        }
      `}</style>

      <div className="panel-inner" style={{ paddingBottom: 40 }}>
        <div className="ph">
          <div className="ph-left">
            <h2>Vital Signs &amp; Health Trends</h2>
            <p>Monitor historical blood pressure values, heart rate levels, and body weight logs.</p>
          </div>
        </div>

        {/* TREND CHARTS */}
        {vitalsLog.length >= 2 && (
          <Card className="chart-container-card">
            <CardHeader style={{ borderBottom: "none", paddingBottom: 0 }}>
              <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                <CardTitle style={{ margin: 0 }}>Historical Trends</CardTitle>
                <div className="vitals-tab-row" style={{ borderBottom: "none", paddingBottom: 0, marginBottom: 0 }}>
                  <button className={`vitals-tab ${activeTab === "bp" ? "active" : ""}`} onClick={() => setActiveTab("bp")}>
                    Blood Pressure
                  </button>
                  <button className={`vitals-tab ${activeTab === "hr" ? "active" : ""}`} onClick={() => setActiveTab("hr")}>
                    Heart Rate
                  </button>
                  <button className={`vitals-tab ${activeTab === "weight" ? "active" : ""}`} onClick={() => setActiveTab("weight")}>
                    Body Weight
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardBody style={{ paddingTop: 12 }}>
              {activeTab === "bp" && renderBPChart()}
              {activeTab === "hr" && renderSingleChart("hr")}
              {activeTab === "weight" && renderSingleChart("weight")}
            </CardBody>
          </Card>
        )}

        {/* LOG LIST TABLE */}
        <TableWrap>
          <div className="tbl-head">
            <span className="tbl-title">Historical Log Sheets</span>
          </div>
          {vitalsLog.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Record Date</TableHead>
                  <TableHead>Blood Pressure</TableHead>
                  <TableHead>Heart Rate</TableHead>
                  <TableHead>Temp (°C)</TableHead>
                  <TableHead>Weight (Kg)</TableHead>
                  <TableHead>BMI Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vitalsLog.map((v: any, index: number) => {
                  const sys = v.bpSystolic;
                  const dia = v.bpDiastolic;
                  const hr = v.heartRate;
                  const temp = v.temperatureCelsius;
                  const weight = v.weightKg;
                  const bmi = v.bmi;

                  return (
                    <TableRow key={index}>
                      <TableCell className="td-bold">
                        {new Date(v.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
                      </TableCell>
                      <TableCell style={{ fontWeight: 600 }}>
                        {sys && dia ? (
                          <div style={{ display: "flex", alignItems: "center", gap: "4px", flexWrap: "wrap" }}>
                            <span>{sys}/{dia}</span>
                            <span style={{ fontSize: "11px", fontWeight: 400, color: "var(--muted)" }}>mmHg</span>
                            {renderBPPill(v.bpAssessment)}
                          </div>
                        ) : "—"}
                      </TableCell>
                      <TableCell>
                        {hr ? (
                          <>
                            {hr} <span style={{ fontSize: "11px", color: "var(--muted)" }}>bpm</span>
                          </>
                        ) : "—"}
                      </TableCell>
                      <TableCell>
                        {temp ? `${Number(temp).toFixed(1)} °C` : "—"}
                      </TableCell>
                      <TableCell>
                        {weight ? `${Number(weight).toFixed(1)} kg` : "—"}
                      </TableCell>
                      <TableCell style={{ fontWeight: 500 }}>
                        {bmi ? (
                          <div style={{ display: "flex", alignItems: "center", gap: "4px", flexWrap: "wrap" }}>
                            <span>{Number(bmi).toFixed(1)}</span>
                            {renderBMIPill(v.bmiCategory)}
                          </div>
                        ) : "—"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div style={{ padding: "20px 24px", color: "var(--muted)", fontSize: "13px" }}>
              No historical vital signs recorded.
            </div>
          )}
        </TableWrap>
      </div>
    </div>
  );
}
