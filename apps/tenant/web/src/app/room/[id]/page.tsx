"use client";

import * as React from "react";
import { useAppointments } from "../../../lib/hooks/api/useAppointments";
import { usePatients } from "../../../lib/hooks/api/usePatients";
import { useSubmitNewVisit } from "../../../lib/hooks/api/useConsultations";
import { useMedicinesSearch } from "../../../lib/hooks/api/useMedicines";
import { getStaffSession } from "../../../lib/api/auth";

interface RoomPageProps {
  params: { id: string };
}

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

function getRoleIcon(roleName: string) {
  const name = roleName || "Attending Doctor";
  if (name.includes("Admin") || name.includes("Manager")) {
    return (
      <svg viewBox="0 0 15 15" style={{ width: "10px", height: "10px", fill: "currentColor", flexShrink: 0 }}>
        <path d="M7.5 1.5L2 4v4c0 3 2.5 5.5 5.5 6.5C10.5 13.5 13 11 13 8V4z" />
      </svg>
    );
  }
  if (name.includes("Nurse")) {
    return (
      <svg viewBox="0 0 15 15" style={{ width: "10px", height: "10px", fill: "currentColor", flexShrink: 0 }}>
        <rect x="2" y="1.5" width="11" height="12" rx="2" />
        <path d="M7.5 5v4M5.5 7h4" />
      </svg>
    );
  }
  if (name.includes("Pharmacist")) {
    return (
      <svg viewBox="0 0 15 15" style={{ width: "10px", height: "10px", fill: "currentColor", flexShrink: 0 }}>
        <path d="M5 2h5l2 3H3L5 2z" />
        <rect x="2" y="5" width="11" height="8" rx="1.5" />
        <path d="M5 8.5h5M7.5 7v3" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 15 15" style={{ width: "10px", height: "10px", fill: "currentColor", flexShrink: 0 }}>
      <circle cx="7.5" cy="4.5" r="2.5" />
      <path d="M2.5 13c0-2.8 2.2-5 5-5s5 2.2 5 5" />
      <path d="M7.5 8v3M6 9.5h3" />
    </svg>
  );
}

export default function DoctorRoomPage({ params }: RoomPageProps) {
  const visitId = params.id;

  const [session, setSession] = React.useState<any>(null);
  React.useEffect(() => {
    getStaffSession()
      .then((s) => setSession(s))
      .catch((err) => console.warn("Failed to retrieve staff session:", err));
  }, []);

  const doctorName = session?.user?.name ?? "Dr. Santos";
  const doctorRole = session?.session?.roleName ?? "Attending Doctor";
  const doctorInitials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "DR";

  // ── Data ──────────────────────────────────────────────────────────────
  const { data: appointments, isLoading: apptsLoading } = useAppointments();
  const { data: patients, isLoading: patientsLoading } = usePatients("");
  const submitVisit = useSubmitNewVisit();

  const appointment = React.useMemo(
    () => appointments?.find((a) => a.id === visitId),
    [appointments, visitId]
  );
  const patient = React.useMemo(
    () => (appointment && patients ? patients.find((p) => p.id === appointment.patientId) : null),
    [appointment, patients]
  );

  // ── Video state ────────────────────────────────────────────────────────
  const [isMuted,       setIsMuted]       = React.useState(true);
  const [isCameraOff,   setIsCameraOff]   = React.useState(false);
  const [isScreenShare, setIsScreenShare] = React.useState(false);
  const [panelOpen,     setPanelOpen]     = React.useState(true);
  const [isDark,        setIsDark]        = React.useState(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("medistock-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return saved === "dark" || (!saved && prefersDark);
  });
  const [activeTab,     setActiveTab]     = React.useState<"soap" | "patient" | "chat">("soap");

  // ── Chat state ─────────────────────────────────────────────────────────
  const [chatMessages, setChatMessages] = React.useState<
    Array<{ sender: "doctor" | "patient" | "system"; text: string; time: string }>
  >([
    { sender: "patient", text: "Good morning, doc. I took my meds today.", time: "9:02 AM" },
    { sender: "doctor", text: "Good morning, Juan! Great to hear. Can you describe the headaches for me?", time: "9:03 AM" },
    { sender: "patient", text: "They're usually dull, around 6/10. Mostly in the morning when I wake up.", time: "9:04 AM" },
    { sender: "doctor", text: "Thank you. Are you still following the DASH diet we discussed?", time: "9:05 AM" },
    { sender: "patient", text: "Honestly not consistently, doc. Work has been very stressful lately.", time: "9:06 AM" },
  ]);
  const [chatInput, setChatInput] = React.useState("");

  // ── Webcam ─────────────────────────────────────────────────────────────
  const localVideoRef = React.useRef<HTMLVideoElement | null>(null);
  const [mediaStream, setMediaStream] = React.useState<MediaStream | null>(null);

  React.useEffect(() => {
    navigator.mediaDevices?.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setMediaStream(stream);
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      })
      .catch((err) => console.warn("Webcam unavailable:", err));
    return () => { mediaStream?.getTracks().forEach((t) => t.stop()); };
  }, []);

  React.useEffect(() => {
    mediaStream?.getVideoTracks().forEach((t) => { t.enabled = !isCameraOff; });
  }, [isCameraOff, mediaStream]);

  React.useEffect(() => {
    mediaStream?.getAudioTracks().forEach((t) => { t.enabled = !isMuted; });
  }, [isMuted, mediaStream]);

  // Dark mode toggle
  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const handleToggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("medistock-theme", next ? "dark" : "light");
      return next;
    });
  };

  // ── Session timer ──────────────────────────────────────────────────────
  const [secs, setSecs] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);
  const timerStr = `${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(secs % 60).padStart(2, "0")}`;

  // ── Toast ──────────────────────────────────────────────────────────────
  const [toast, setToast] = React.useState<string | null>(null);
  const toastTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 2800);
  };

  // ── End call modal ─────────────────────────────────────────────────────
  const [endModalOpen,  setEndModalOpen]  = React.useState(false);
  const [saveDraft,     setSaveDraft]     = React.useState(true);
  const [sendSms,       setSendSms]       = React.useState(false);
  const [scheduleFollowup, setScheduleFollowup] = React.useState(false);

  const handleEndCall = () => {
    mediaStream?.getTracks().forEach((t) => t.stop());
    showToast("Session ended · Draft saved");
    setTimeout(() => window.close(), 2000);
    setEndModalOpen(false);
  };

  // ── SOAP / Vitals form ─────────────────────────────────────────────────
  const [height,        setHeight]        = React.useState("");
  const [weight,        setWeight]        = React.useState("");
  const [bp,            setBp]            = React.useState("");
  const [hr,            setHr]            = React.useState("");
  const [temp,          setTemp]          = React.useState("");
  const [spo2,          setSpo2]          = React.useState("");
  const [rr,            setRr]            = React.useState("");
  const [pain,          setPain]          = React.useState("");
  const [modeOfTx,      setModeOfTx]      = React.useState("TELECONSULTATION");
  const [icdCode,       setIcdCode]       = React.useState("");
  const [chiefComplaint, setChiefComplaint] = React.useState("");
  const [soapNotes,     setSoapNotes]     = React.useState("");
  const [saveStatus,    setSaveStatus]    = React.useState<"idle" | "saving" | "saved" | "error">("idle");

  // BMI derived
  const bmi = React.useMemo(() => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!h || !w) return null;
    return (w / ((h / 100) ** 2)).toFixed(1);
  }, [height, weight]);

  const bmiLabel = React.useMemo(() => {
    if (!bmi) return "";
    const b = parseFloat(bmi);
    if (b < 18.5) return "Underweight";
    if (b < 25)   return "Normal";
    if (b < 30)   return "Overweight";
    return "Obese";
  }, [bmi]);

  const bmiColor = React.useMemo(() => {
    if (!bmi) return "var(--faint)";
    const b = parseFloat(bmi);
    if (b < 18.5) return "var(--info-text)";
    if (b < 25)   return "var(--accent)";
    if (b < 30)   return "var(--warn-text)";
    return "var(--crit-text)";
  }, [bmi]);

  // ── Rx list ────────────────────────────────────────────────────────────
  const [rxList, setRxList] = React.useState<
    Array<{ medicineName: string; brand: string; dose: string; frequency: string; duration: string; quantity: number }>
  >([]);
  const [rxFormOpen, setRxFormOpen] = React.useState(false);
  const [tempMed,    setTempMed]    = React.useState("");
  const [tempBrand,  setTempBrand]  = React.useState("");
  const [tempDose,   setTempDose]   = React.useState("1 tablet");
  const [tempFreq,   setTempFreq]   = React.useState("Once daily");
  const [tempDur,    setTempDur]    = React.useState("30 days");
  const [tempQty,    setTempQty]    = React.useState(30);

  // Medicine search
  const [medSearch,        setMedSearch]        = React.useState("");
  const [showSuggestions,  setShowSuggestions]  = React.useState(false);
  const medContainerRef = React.useRef<HTMLDivElement>(null);
  const { data: medSuggestions = [], isLoading: medLoading } = useMedicinesSearch(medSearch);

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (medContainerRef.current && !medContainerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const addRx = () => {
    if (!tempMed.trim()) { showToast("Enter a medication name"); return; }
    setRxList((p) => [...p, { medicineName: tempMed, brand: tempBrand, dose: tempDose, frequency: tempFreq, duration: tempDur, quantity: tempQty }]);
    setTempMed(""); setTempBrand(""); setMedSearch(""); setTempDose("1 tablet"); setTempFreq("Once daily"); setTempDur("30 days"); setTempQty(30);
    setRxFormOpen(false);
    showToast(`${tempMed} added to prescription`);
  };

  // ── Save consultation ──────────────────────────────────────────────────
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!soapNotes.trim()) { showToast("Please complete the SOAP notes"); return; }
    if (!patient) return;
    setSaveStatus("saving");
    try {
      const selectedIcd = ICD10_CODES.find((c) => c.value === icdCode);
      await submitVisit.mutateAsync({
        patientId: patient.id,
        chiefComplaint: chiefComplaint || "Teleconsultation",
        soapNotes,
        modeOfTransaction: modeOfTx as any,
        vitals: {
          heightCm:         height ? parseFloat(height) : undefined,
          weightKg:         weight ? parseFloat(weight) : undefined,
          bmi:              bmi    ? parseFloat(bmi)    : undefined,
          bloodPressure:    bp     || undefined,
          heartRate:        hr     ? parseInt(hr)       : undefined,
          temperature:      temp   ? parseFloat(temp)   : undefined,
          oxygenSaturation: spo2   ? parseFloat(spo2)   : undefined,
        } as any,
        icd10Code:        selectedIcd?.value,
        icd10Description: selectedIcd?.label.split(" — ")[1],
        prescriptions: rxList.map((r) => ({ ...r, quantity: r.quantity })),
      });
      setSaveStatus("saved");
      showToast("Consultation saved · Prescription issued");
    } catch {
      setSaveStatus("error");
      showToast("Save failed. Please try again.");
    }
  };

  const handleSendChat = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    setChatMessages((prev) => [
      ...prev,
      { sender: "doctor", text: chatInput.trim(), time: timeStr },
    ]);
    setChatInput("");
  };

  // ── Derived display ────────────────────────────────────────────────────
  const patientName = patient ? `${patient.firstName} ${patient.lastName}` : "Patient";
  const patientInitials = patient
    ? `${patient.firstName?.[0] ?? ""}${patient.lastName?.[0] ?? ""}`.toUpperCase()
    : "PT";



  const todayStr = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  if (apptsLoading || patientsLoading) {
    return (
      <div className="vr-loading">
        <div className="vr-spinner" />
        <p>Establishing secure call room…</p>
        <style dangerouslySetInnerHTML={{ __html: `
          .vr-loading{display:flex;flex-direction:column;align-items:center;justify-content:center;
            height:100vh;gap:14px;background:var(--surface);color:var(--muted);font-size:13px;font-family:'DM Sans',sans-serif}
          .vr-spinner{width:36px;height:36px;border:3px solid var(--border-subtle);
            border-top-color:var(--accent);border-radius:50%;animation:spin .85s linear infinite}
          @keyframes spin{to{transform:rotate(360deg)}}
        ` }} />
      </div>
    );
  }

  return (
    <>
      {/* ════ STYLES ════════════════════════════════════════════════════════ */}
      <style dangerouslySetInnerHTML={{ __html: `
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{
          --video-bg:#0d0d1a;--video-ctrl:#1e1e36;--video-ctrl-hover:#2a2a48;
        }
        html.dark{
          --video-bg:#090910;--video-ctrl:#131320;--video-ctrl-hover:#1e1e32;
        }
        html,body{height:100%;overflow:hidden}
        body{font-family:'DM Sans',sans-serif;background:var(--surface);color:var(--ink);
          line-height:1.5;display:flex;flex-direction:column}
        h1,h2,h3,h4{font-family:'Sora',sans-serif}

        /* ── TOPBAR ──────────────────────────────────────────────────────── */
        .tc-topbar{height:56px;flex-shrink:0;background:var(--white);display:flex;
          align-items:center;padding:0 20px;z-index:50;
          box-shadow:0 1px 0 var(--border-subtle);gap:0}
        .tc-logo{display:flex;align-items:center;gap:9px;font-family:'Sora',sans-serif;
          font-weight:700;font-size:16px;color:var(--ink);text-decoration:none;
          margin-right:16px;flex-shrink:0;cursor:pointer}
        .tc-logo-icon{width:30px;height:30px;border-radius:9px;background:var(--accent);
          display:flex;align-items:center;justify-content:center}
        .tc-logo-icon svg{width:16px;height:16px;fill:white}
        .tc-tb-divider{width:1px;height:22px;background:var(--border-subtle);margin:0 12px}
        .tc-back{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:500;
          color:var(--muted);text-decoration:none;padding:5px 10px;border-radius:var(--rsm);
          transition:background .15s,color .15s;cursor:pointer;background:none;border:none;font-family:'DM Sans',sans-serif}
        .tc-back:hover{background:var(--accent-light);color:var(--accent)}
        .tc-back svg{width:12px;height:12px;stroke:currentColor;fill:none;stroke-width:2;
          stroke-linecap:round;stroke-linejoin:round}
        .tc-session{display:flex;align-items:center;gap:8px}
        .tc-session-dot{width:7px;height:7px;border-radius:50%;background:#22c55e;flex-shrink:0;
          animation:tc-pulse-dot 2s infinite}
        @keyframes tc-pulse-dot{0%,100%{box-shadow:0 0 0 2px rgba(34,197,94,.25)}50%{box-shadow:0 0 0 5px rgba(34,197,94,.08)}}
        .tc-session-label{font-size:12px;font-weight:600;color:var(--ink)}
        .tc-session-time{font-size:12px;color:var(--faint);font-family:'Sora',sans-serif;font-weight:700;min-width:38px}
        .tc-tb-right{margin-left:auto;display:flex;align-items:center;gap:8px}
        .tc-icon-btn{width:32px;height:32px;border-radius:var(--rmd);border:none;
          background:var(--surface);display:flex;align-items:center;justify-content:center;
          cursor:pointer;transition:background .15s}
        .tc-icon-btn:hover{background:var(--accent-light)}
        .tc-icon-btn svg{width:15px;height:15px;stroke:var(--muted);fill:none;stroke-width:1.7;
          stroke-linecap:round;stroke-linejoin:round}
        .tc-tb-avatar{width:30px;height:30px;border-radius:50%;background:var(--accent);
          display:flex;align-items:center;justify-content:center;font-family:'Sora',sans-serif;
          font-size:10px;font-weight:700;color:white;flex-shrink:0}
        .tc-tb-name{font-size:12px;font-weight:600;color:var(--ink)}
        .pill-ok{display:inline-block;padding:1px 7px;border-radius:20px;font-size:9px;
          font-weight:700;letter-spacing:.03em;text-transform:uppercase;
          background:var(--accent-light);color:var(--accent)}

        /* ── LAYOUT ──────────────────────────────────────────────────────── */
        .tc-layout{flex:1;display:flex;overflow:hidden;
          transition:all .3s cubic-bezier(.22,1,.36,1)}

        /* ── LEFT: VIDEO ─────────────────────────────────────────────────── */
        .tc-left{flex:1;display:flex;flex-direction:column;overflow:hidden;
          background:var(--video-bg);position:relative}
        .video-stage{flex:1;position:relative;overflow:hidden}
        .video-main{width:100%;height:100%;
          background:linear-gradient(135deg,#0f0f2a 0%,#1a1035 50%,#0d0d1f 100%);
          display:flex;align-items:center;justify-content:center;position:relative}
        .video-patient-avatar{width:96px;height:96px;border-radius:50%;
          background:linear-gradient(135deg,#3730a3,#6c63ff);
          display:flex;align-items:center;justify-content:center;
          font-family:'Sora',sans-serif;font-size:30px;font-weight:700;color:white;
          box-shadow:0 0 0 4px rgba(108,99,255,.25),0 0 60px rgba(108,99,255,.15)}
        .video-connecting{font-size:13px;font-weight:600;color:rgba(255,255,255,.6)}
        .video-overlay-tl{position:absolute;top:14px;left:14px;display:flex;align-items:center;gap:8px}
        .video-overlay-tr{position:absolute;top:14px;right:14px;display:flex;align-items:center;gap:8px}
        .video-badge{background:rgba(0,0,0,.52);backdrop-filter:blur(8px);border-radius:20px;
          padding:4px 10px;display:flex;align-items:center;gap:6px;
          font-size:11px;color:rgba(255,255,255,.8)}
        .conn-bars{display:flex;align-items:flex-end;gap:2px;height:13px}
        .conn-bar{width:3px;border-radius:2px;background:rgba(255,255,255,.2)}
        .conn-bar.on{background:#22c55e}
        .b1{height:5px}.b2{height:7px}.b3{height:10px}.b4{height:13px}
        .rec-dot{width:6px;height:6px;border-radius:50%;background:#e03030;animation:tc-rec-blink 1.4s infinite}
        @keyframes tc-rec-blink{0%,100%{opacity:1}50%{opacity:.25}}
        .video-name-label{position:absolute;bottom:14px;left:14px;
          background:rgba(0,0,0,.52);backdrop-filter:blur(8px);border-radius:var(--rsm);
          padding:5px 12px;font-size:12px;font-weight:600;color:white}
        .video-pip{position:absolute;bottom:14px;right:14px;width:150px;border-radius:var(--rmd);
          overflow:hidden;background:linear-gradient(135deg,#1a1035,#111130);
          box-shadow:0 4px 20px rgba(0,0,0,.5);cursor:pointer;transition:transform .2s}
        .video-pip:hover{transform:scale(1.04)}
        .video-pip-inner{aspect-ratio:16/9;display:flex;flex-direction:column;
          align-items:center;justify-content:center;position:relative;gap:6px;padding:8px}
        .video-pip-avatar{width:36px;height:36px;border-radius:50%;background:var(--accent);
          display:flex;align-items:center;justify-content:center;font-family:'Sora',sans-serif;
          font-size:12px;font-weight:700;color:white}
        .video-pip-name{font-size:9.5px;font-weight:600;color:rgba(255,255,255,.75);text-align:center}
        .video-pip-video{width:100%;height:100%;object-fit:cover;position:absolute;inset:0}

        /* ── CONTROLS ────────────────────────────────────────────────────── */
        .video-controls{height:68px;flex-shrink:0;background:var(--video-ctrl);
          display:flex;align-items:center;justify-content:center;gap:8px;padding:0 20px;position:relative}
        .vc-btn{width:44px;height:44px;border-radius:50%;border:none;background:var(--video-ctrl-hover);
          cursor:pointer;display:flex;align-items:center;justify-content:center;
          transition:background .15s,transform .15s;flex-shrink:0}
        .vc-btn:hover{transform:scale(1.07)}
        .vc-btn svg{width:17px;height:17px;stroke:rgba(255,255,255,.82);fill:none;
          stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
        .vc-btn.muted{background:rgba(224,48,48,.18)}
        .vc-btn.muted svg{stroke:#f87171}
        .vc-btn.end{width:50px;height:50px;background:#e03030;margin:0 6px}
        .vc-btn.end:hover{background:#c02020;transform:scale(1.07)}
        .vc-btn.end svg{stroke:white;width:19px;height:19px}
        .vc-sep{width:1px;height:22px;background:rgba(255,255,255,.07);margin:0 4px}

        /* ── PANEL COLLAPSE TOGGLE ───────────────────────────────────────── */
        .panel-toggle{position:absolute;left:-14px;top:50%;transform:translateY(-50%);
          width:28px;height:28px;border-radius:50%;background:var(--white);
          border:1.5px solid var(--border-subtle);box-shadow:var(--card-shadow);
          cursor:pointer;display:flex;align-items:center;justify-content:center;
          z-index:10;transition:background .15s}
        .panel-toggle:hover{background:var(--accent-light)}
        .panel-toggle svg{width:12px;height:12px;stroke:var(--muted);fill:none;
          stroke-width:2;stroke-linecap:round;stroke-linejoin:round;transition:transform .3s}
        .tc-layout.collapsed .panel-toggle svg{transform:rotate(180deg)}

        /* ── RIGHT PANEL ─────────────────────────────────────────────────── */
        .tc-right{width:400px;flex-shrink:0;display:flex;flex-direction:column;
          background:var(--white);border-left:1px solid var(--border-subtle);
          overflow:hidden;position:relative;transition:width .3s cubic-bezier(.22,1,.36,1),opacity .25s}
        .tc-layout.collapsed .tc-right{width:0;opacity:0;pointer-events:none;border-left:none}

        /* Panel header */
        .panel-head{padding:14px 16px 0;flex-shrink:0}
        .panel-head-title{font-size:14px;font-weight:700;color:var(--ink);font-family:'Sora',sans-serif}
        .panel-head-sub{font-size:11px;color:var(--faint);margin-top:2px;margin-bottom:12px}
        .panel-head-patient{display:flex;align-items:center;gap:10px;padding:10px 12px;
          background:var(--surface);border-radius:var(--rmd);margin-bottom:12px}
        .panel-pt-avatar{width:36px;height:36px;border-radius:10px;background:var(--accent);
          display:flex;align-items:center;justify-content:center;font-family:'Sora',sans-serif;
          font-size:12px;font-weight:700;color:white;flex-shrink:0}
        .panel-pt-name{font-size:13px;font-weight:700;color:var(--ink)}
        .panel-pt-sub{font-size:11px;color:var(--faint);margin-top:1px}

        /* Panel body */
        .panel-body{flex:1;overflow-y:auto;padding:0 16px 12px}
        .form-section{margin-bottom:16px}
        .form-section-label{font-size:9.5px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;
          color:var(--faint);margin-bottom:10px;padding-bottom:7px;
          border-bottom:1px solid var(--border-subtle);display:flex;align-items:center;gap:8px}
        .step-badge{width:17px;height:17px;border-radius:5px;background:var(--accent-light);
          color:var(--accent);font-size:9px;font-weight:800;display:inline-flex;
          align-items:center;justify-content:center;flex-shrink:0}
        .field{display:flex;flex-direction:column;gap:4px;margin-bottom:10px}
        .field:last-child{margin-bottom:0}
        .field label{font-size:11px;font-weight:600;color:var(--muted)}
        .field input,.field select,.field textarea{border:none;border-radius:var(--rsm);
          padding:8px 10px;font-size:12.5px;font-family:'DM Sans',sans-serif;color:var(--ink);
          background:var(--input-bg);outline:none;transition:box-shadow .2s,background .2s;width:100%}
        .field input:focus,.field select:focus,.field textarea:focus{
          box-shadow:0 0 0 2px var(--accent);background:var(--input-focus-bg)}
        .field textarea{resize:vertical;min-height:90px;line-height:1.6}
        .field textarea::placeholder,.field input::placeholder{color:var(--faint);font-size:12px}
        .field select{appearance:none;cursor:pointer}
        .field-row{display:grid;gap:8px}
        .field-row.cols2{grid-template-columns:1fr 1fr}
        .field-row.cols3{grid-template-columns:1fr 1fr 1fr}

        /* Vitals grid */
        .vitals-inline{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:10px}
        .vital-inline-item{display:flex;flex-direction:column;gap:3px}
        .vital-inline-label{font-size:10px;font-weight:600;color:var(--faint)}
        .vital-inline-input{border:none;border-radius:var(--rsm);padding:7px 9px;font-size:13px;
          font-family:'Sora',sans-serif;font-weight:600;color:var(--ink);
          background:var(--input-bg);outline:none;transition:box-shadow .2s;
          width:100%;text-align:center}
        .vital-inline-input:focus{box-shadow:0 0 0 2px var(--accent);background:var(--input-focus-bg)}
        .vital-inline-unit{font-size:9px;color:var(--faint);text-align:center}
        .bmi-display{border:none;border-radius:var(--rsm);padding:8px 10px;font-size:12.5px;
          font-weight:700;color:var(--accent);background:var(--accent-light);
          font-family:'Sora',sans-serif;text-align:center;line-height:2}

        /* Rx */
        .rx-list{display:flex;flex-direction:column;gap:6px;margin-bottom:10px}
        .rx-item{display:flex;align-items:center;gap:8px;background:var(--surface);
          border-radius:var(--rsm);padding:8px 10px;position:relative}
        .rx-item-icon{width:28px;height:28px;border-radius:8px;background:var(--accent-light);
          display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .rx-item-icon svg{width:13px;height:13px;stroke:var(--accent);fill:none;
          stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
        .rx-item-name{font-size:12px;font-weight:600;color:var(--ink);flex:1}
        .rx-item-dose{font-size:11px;color:var(--muted)}
        .rx-item-remove{width:20px;height:20px;border-radius:5px;border:none;background:none;
          cursor:pointer;display:flex;align-items:center;justify-content:center;
          opacity:0;transition:opacity .15s,background .15s;flex-shrink:0}
        .rx-item:hover .rx-item-remove{opacity:1}
        .rx-item-remove:hover{background:var(--crit-bg)}
        .rx-item-remove svg{width:10px;height:10px;stroke:var(--crit-text);fill:none;stroke-width:2.5;stroke-linecap:round}
        .rx-add-form{background:var(--surface);border-radius:var(--rmd);padding:10px;
          display:flex;flex-direction:column;gap:8px;margin-bottom:8px}
        .rx-add-btn{display:inline-flex;align-items:center;gap:5px;font-size:12px;font-weight:600;
          color:var(--accent);background:none;border:none;cursor:pointer;
          font-family:'DM Sans',sans-serif;padding:2px 0;transition:opacity .15s}
        .rx-add-btn:hover{opacity:.7}
        .rx-add-btn svg{width:12px;height:12px;stroke:var(--accent);fill:none;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
        .med-suggestions{position:absolute;top:100%;left:0;right:0;z-index:100;
          background:var(--white);border:1px solid var(--border-subtle);
          border-radius:var(--rmd);box-shadow:var(--card-shadow-hover);
          max-height:180px;overflow-y:auto;margin-top:3px}
        .med-suggestion-item{display:flex;flex-direction:column;gap:2px;width:100%;
          text-align:left;border:none;background:none;padding:7px 10px;
          border-bottom:1px solid var(--border-subtle);cursor:pointer;transition:background .15s;
          font-family:'DM Sans',sans-serif}
        .med-suggestion-item:last-child{border-bottom:none}
        .med-suggestion-item:hover{background:var(--surface)}
        .med-suggestion-name{font-size:12px;font-weight:600;color:var(--ink)}
        .med-suggestion-detail{font-size:10px;color:var(--muted)}
        .med-suggestion-empty{padding:9px 11px;font-size:12px;color:var(--muted);font-style:italic}

        /* Footer */
        .panel-foot{flex-shrink:0;padding:12px 16px;border-top:1px solid var(--border-subtle);
          display:flex;gap:8px;align-items:center}
        .btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:10px;
          font-size:12.5px;font-weight:600;cursor:pointer;border:none;transition:all .18s;
          font-family:'Sora',sans-serif;flex-shrink:0}
        .btn svg{width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
        .btn-primary{background:var(--accent);color:white}
        .btn-primary:hover:not(:disabled){background:var(--accent-mid);transform:translateY(-1px);box-shadow:0 4px 14px rgba(108,99,255,.32)}
        .btn-primary:disabled{opacity:.6;cursor:not-allowed}
        .btn-outline{background:var(--white);color:var(--muted);box-shadow:var(--card-shadow)}
        .btn-outline:hover{background:var(--accent-light);color:var(--accent)}
        .btn-danger{background:var(--crit-bg);color:var(--crit-text)}
        .btn-danger:hover{background:var(--crit-text);color:white}

        /* Modal */
        .modal-overlay{position:fixed;inset:0;background:var(--modal-overlay-bg);
          backdrop-filter:blur(4px);z-index:100;display:flex;align-items:center;
          justify-content:center;opacity:0;pointer-events:none;transition:opacity .3s}
        .modal-overlay.open{opacity:1;pointer-events:auto}
        .modal{background:var(--white);border-radius:var(--rxl);width:460px;max-width:92vw;
          box-shadow:0 24px 80px rgba(0,0,0,.3);transform:scale(.97) translateY(8px);
          transition:transform .3s cubic-bezier(.22,1,.36,1)}
        .modal-overlay.open .modal{transform:scale(1) translateY(0)}
        .modal-top{padding:20px 24px;border-bottom:1px solid var(--border-subtle);
          display:flex;align-items:center;justify-content:space-between}
        .modal-title{font-size:16px;font-weight:700;color:var(--ink);font-family:'Sora',sans-serif}
        .modal-close{width:30px;height:30px;border-radius:7px;border:none;background:transparent;
          cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .15s}
        .modal-close:hover{background:var(--surface)}
        .modal-close svg{width:13px;height:13px;stroke:var(--muted);fill:none;stroke-width:2;stroke-linecap:round}
        .modal-body{padding:20px 24px;display:flex;flex-direction:column;gap:14px}
        .modal-foot{padding:0 24px 20px;display:flex;gap:8px;justify-content:flex-end}

        /* Toast */
        .tc-toast{position:fixed;bottom:20px;right:20px;border-radius:var(--rmd);
          overflow:hidden;transform:translateY(20px);opacity:0;
          transition:transform .35s cubic-bezier(.22,1,.36,1),opacity .35s;
          pointer-events:none;z-index:200;box-shadow:0 8px 32px rgba(0,0,0,.25);background:#1A1A2E}
        .tc-toast.show{transform:translateY(0);opacity:1}
        .tc-toast-inner{display:flex;align-items:center;gap:10px;padding:12px 18px;
          font-size:13px;font-weight:500;color:white;font-family:'DM Sans',sans-serif}
        .tc-toast-inner svg{width:14px;height:14px;fill:none;stroke:white;stroke-width:2.5;stroke-linecap:round;flex-shrink:0}

        /* right panel tabs */
        .tc-right-tabs{
          display:flex;border-bottom:1px solid var(--border-subtle);
          flex-shrink:0;background:var(--white);
        }
        .tc-tab{
          flex:1;padding:12px 8px;font-size:12px;font-weight:500;color:var(--muted);
          cursor:pointer;text-align:center;border-bottom:2px solid transparent;
          transition:color .15s,border-color .15s;margin-bottom:-1px;
          background:none;border:none;outline:none;font-family:'Sora',sans-serif;
        }
        .tc-tab.active{color:var(--accent);border-bottom-color:var(--accent);font-weight:600}
        .tc-tab:hover:not(.active){color:var(--ink)}
        .tc-pane{display:none;flex:1;overflow-y:auto;padding:16px}
        .tc-pane.active{display:flex;flex-direction:column;gap:12px}

        /* patient context card */
        .pt-context-card{background:var(--surface);border-radius:var(--rmd);padding:14px}
        .pt-context-head{display:flex;align-items:center;gap:10px;margin-bottom:12px}
        .pt-context-avatar{width:40px;height:40px;border-radius:11px;background:var(--accent);display:flex;align-items:center;justify-content:center;font-family:'Sora',sans-serif;font-size:13px;font-weight:700;color:white;flex-shrink:0}
        .pt-context-name{font-size:14px;font-weight:700;color:var(--ink);font-family:'Sora',sans-serif}
        .pt-context-sub{font-size:11px;color:var(--faint);margin-top:2px}
        .pt-context-meta{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--border-subtle);border-radius:var(--rsm);overflow:hidden}
        .pt-meta-cell{background:var(--white);padding:8px 10px}
        .pt-meta-key{font-size:10px;color:var(--faint);font-weight:600;text-transform:uppercase;letter-spacing:.04em;margin-bottom:2px}
        .pt-meta-val{font-size:12.5px;font-weight:600;color:var(--ink)}

        /* vitals row */
        .vital-row-mini{display:flex;flex-direction:column;gap:5px}
        .vital-mini{display:flex;align-items:center;justify-content:space-between;padding:7px 10px;background:var(--surface);border-radius:var(--rsm)}
        .vital-mini-label{font-size:11px;font-weight:500;color:var(--muted)}
        .vital-mini-val{font-size:13px;font-weight:700;color:var(--ink);font-family:'Sora',sans-serif}
        .vital-mini-val.warn{color:var(--warn-text)}
        .vital-mini-val.crit{color:var(--crit-text)}

        /* rx mini list */
        .rx-mini{display:flex;align-items:center;gap:8px;padding:7px 10px;background:var(--surface);border-radius:var(--rsm)}
        .rx-mini-dot{width:6px;height:6px;border-radius:50%;background:var(--accent);flex-shrink:0}
        .rx-mini-name{font-size:12px;font-weight:600;color:var(--ink);flex:1}
        .rx-mini-dose{font-size:11px;color:var(--muted)}

        /* notes / chat */
        .chat-area{display:flex;flex-direction:column;gap:10px;flex:1;overflow-y:auto}
        .chat-msg{display:flex;gap:8px;align-items:flex-start}
        .chat-msg.patient{flex-direction:row-reverse}
        .chat-avatar{width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Sora',sans-serif;font-size:9px;font-weight:700;color:white;flex-shrink:0;margin-top:2px}
        .chat-bubble{max-width:78%;padding:8px 12px;border-radius:12px;font-size:12.5px;line-height:1.55}
        .chat-bubble.dr{background:var(--accent);color:white;border-radius:12px 12px 4px 12px}
        .chat-bubble.pt{background:var(--surface);color:var(--ink);border-radius:12px 12px 12px 4px}
        .chat-time{font-size:10px;color:var(--faint);margin-top:4px;text-align:right}
        .chat-time.pt{text-align:left}
        .chat-input-row{display:flex;gap:8px;padding-top:8px;border-top:1px solid var(--border-subtle);margin-top:4px;flex-shrink:0}
        .chat-input{flex:1;border:none;background:var(--input-bg);border-radius:var(--rsm);padding:8px 12px;font-size:12.5px;font-family:'DM Sans',sans-serif;color:var(--ink);outline:none;transition:box-shadow .2s}
        .chat-input:focus{box-shadow:0 0 0 2px var(--accent);background:var(--input-focus-bg)}
        .chat-input::placeholder{color:var(--faint)}
        .chat-send{width:34px;height:34px;border-radius:var(--rsm);background:var(--accent);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .15s}
        .chat-send:hover{background:var(--accent-mid)}
        .chat-send svg{width:14px;height:14px;stroke:white;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}

        /* Adjustments for custom form layout inside pane-soap */
        #pane-soap .panel-head{padding:0 0 12px 0}
        #pane-soap .panel-body{padding:0;overflow:visible}
        .section-label{font-size:10px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--faint);margin-bottom:7px;display:flex;align-items:center;justify-content:space-between;margin-top:14px}
      ` }} />

      {/* ════ TOPBAR ═════════════════════════════════════════════════════ */}
      <div className="tc-topbar">
        <div className="tc-logo" onClick={() => window.close()}>
          <div className="tc-logo-icon">
            <svg viewBox="0 0 20 20">
              <path d="M10 2a1 1 0 0 1 1 1v1h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3V3a1 1 0 0 1 1-1zm0 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"/>
            </svg>
          </div>
          HealthBridge EMR
        </div>
        <div className="tc-tb-divider" />
        <button className="tc-back" onClick={() => window.close()}>
          <svg viewBox="0 0 13 13"><path d="M8 2.5L3.5 6.5 8 10.5"/></svg>
          Back to EMR
        </button>
        <div className="tc-tb-divider" />
        <div className="tc-session">
          <div className="tc-session-dot" />
          <span className="tc-session-label">Live Session</span>
          <span className="tc-session-time">{timerStr}</span>
        </div>
        <div className="tc-tb-right">
          <button className="tc-icon-btn" onClick={() => showToast("Screen sharing started")} title="Share screen" id="topbar-screen-share-btn">
            <svg viewBox="0 0 16 16"><rect x="1" y="2.5" width="14" height="9" rx="2"/><path d="M5.5 13.5h5M8 11.5v2"/></svg>
          </button>
          <div className="tc-tb-divider" />
          <div className="tc-tb-avatar">{doctorInitials}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px", alignItems: "flex-start" }}>
            <div className="tc-tb-name" style={{ lineHeight: 1.1 }}>{doctorName}</div>
            <span className="pill-ok" style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "1px 6px" }}>
              {getRoleIcon(doctorRole)}
              {doctorRole}
            </span>
          </div>
          <button className="tc-icon-btn" onClick={handleToggleTheme} title="Toggle theme" id="theme-toggle-btn">
            <svg viewBox="0 0 16 16"><path d="M13.5 10A6 6 0 0 1 6 2.5a6 6 0 1 0 7.5 7.5z"/></svg>
          </button>
        </div>
      </div>

      {/* ════ MAIN LAYOUT ════════════════════════════════════════════════ */}
      <div className={`tc-layout${panelOpen ? "" : " collapsed"}`}>

        {/* ── LEFT: VIDEO ────────────────────────────────────────────── */}
        <div className="tc-left">
          <div className="video-stage">
            <div className="video-main">

              {/* Top-left: connection quality */}
              <div className="video-overlay-tl">
                <div className="video-badge">
                  <div className="conn-bars">
                    <div className="conn-bar b1 on" />
                    <div className="conn-bar b2 on" />
                    <div className="conn-bar b3 on" />
                    <div className="conn-bar b4 on" />
                  </div>
                  HD · 36ms
                </div>
              </div>

              {/* Top-right: recording */}
              <div className="video-overlay-tr">
                <div className="video-badge" style={{ cursor: "pointer" }} onClick={() => showToast("Recording paused")}>
                  <div className="rec-dot" />
                  REC
                </div>
              </div>

              {/* Patient avatar */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                <div className="video-patient-avatar">{patientInitials}</div>
                <div className="video-connecting">Camera connecting…</div>
              </div>

              {/* Patient name label */}
              <div className="video-name-label">{patientName} — Patient</div>

              {/* Doctor PiP */}
              <div className="video-pip">
                <div className="video-pip-inner">
                  {!isCameraOff && mediaStream ? (
                    <video ref={localVideoRef} autoPlay playsInline muted className="video-pip-video" />
                  ) : (
                    <div className="video-pip-avatar">{doctorInitials}</div>
                  )}
                </div>
                <div className="video-pip-name">Dr. Santos (You)</div>
              </div>

            </div>
          </div>

          {/* Controls */}
          <div className="video-controls">
            <button
              className={`vc-btn${isMuted ? " muted" : ""}`}
              id="btn-mic"
              onClick={() => { setIsMuted((m) => !m); showToast(isMuted ? "Microphone on" : "Microphone muted"); }}
              title="Toggle mic"
            >
              <svg viewBox="0 0 20 20"><rect x="7" y="2" width="6" height="10" rx="3"/><path d="M4 10a6 6 0 0 0 12 0M10 16v3M7.5 19h5"/></svg>
            </button>
            <button
              className={`vc-btn${isCameraOff ? " muted" : ""}`}
              id="btn-cam"
              onClick={() => { setIsCameraOff((c) => !c); showToast(isCameraOff ? "Camera on" : "Camera off"); }}
              title="Toggle camera"
            >
              <svg viewBox="0 0 20 20"><rect x="1" y="4.5" width="13" height="11" rx="2.5"/><path d="M14 8.5l5-3v9l-5-3"/></svg>
            </button>
            <div className="vc-sep" />
            <button className="vc-btn" onClick={() => { setIsScreenShare((s) => !s); showToast("Screen sharing started"); }} title="Share screen" id="screen-share-btn">
              <svg viewBox="0 0 20 20"><rect x="2" y="3" width="16" height="11" rx="2"/><path d="M7 17h6M10 14v3"/></svg>
            </button>
            <button className="vc-btn" onClick={() => showToast("Chat opened")} title="Chat" id="chat-btn">
              <svg viewBox="0 0 20 20"><path d="M2 4.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H7l-4 3V4.5z"/></svg>
            </button>
            <div className="vc-sep" />
            <button className="vc-btn end" onClick={() => setEndModalOpen(true)} title="End call" id="end-call-btn">
              <svg viewBox="0 0 20 20"><path d="M3 10.5c0-4 3.1-7.5 7-7.5s7 3.5 7 7.5M1 13.5l2.5-3.5 3 1-1 2.5c3 1.5 6 1.5 9 0l-1-2.5 3-1 2.5 3.5c-4 4-14 4-18 0z"/></svg>
            </button>
            <div className="vc-sep" />
            <button className="vc-btn" onClick={() => showToast("More options")} title="More" id="more-btn">
              <svg viewBox="0 0 20 20"><circle cx="5" cy="10" r="1.5" fill="rgba(255,255,255,.82)"/><circle cx="10" cy="10" r="1.5" fill="rgba(255,255,255,.82)"/><circle cx="15" cy="10" r="1.5" fill="rgba(255,255,255,.82)"/></svg>
            </button>
          </div>

          {/* Panel collapse toggle — floats on right edge */}
          <div style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", zIndex: 20 }}>
            <button
              className="panel-toggle"
              id="panel-toggle-btn"
              onClick={() => setPanelOpen((o) => !o)}
              title="Toggle consultation form"
            >
              <svg viewBox="0 0 12 12">
                <path d={panelOpen ? "M7.5 2L4 6l3.5 4" : "M4.5 2L8 6l-3.5 4"} />
              </svg>
            </button>
          </div>
        </div>

        {/* ── RIGHT: CONSULTATION FORM ────────────────────────────────── */}
        <div className="tc-right" id="tc-right">
          <div className="tc-right-tabs">
            <button
              type="button"
              className={`tc-tab${activeTab === "soap" ? " active" : ""}`}
              onClick={() => setActiveTab("soap")}
            >
              SOAP Note
            </button>
            <button
              type="button"
              className={`tc-tab${activeTab === "patient" ? " active" : ""}`}
              onClick={() => setActiveTab("patient")}
            >
              Patient
            </button>
            <button
              type="button"
              className={`tc-tab${activeTab === "chat" ? " active" : ""}`}
              onClick={() => setActiveTab("chat")}
            >
              Chat
            </button>
          </div>

          {/* ─ SOAP PANE ─ */}
          <div className={`tc-pane${activeTab === "soap" ? " active" : ""}`} id="pane-soap">
            <div className="panel-head">
              <div className="panel-head-title">Record New Visit</div>
              <div className="panel-head-sub">Teleconsultation · {todayStr}</div>
              <div className="panel-head-patient">
                <div className="panel-pt-avatar">{patientInitials}</div>
                <div>
                  <div className="panel-pt-name">{patientName}</div>
                  <div className="panel-pt-sub">
                    {appointment?.id ? `MRN-${appointment.id.slice(-7).toUpperCase()}` : "MRN-0000000"}
                    {patient?.sex && ` · ${patient.sex === "MALE" ? "M" : "F"}`}
                    {patient?.birthDate && ` · ${new Date().getFullYear() - new Date(patient.birthDate).getFullYear()}y`}
                    {(patient as any)?.allergies && (
                      <> · <span style={{ color: "var(--crit-text)", fontWeight: 600 }}>⚠ {(patient as any).allergies}</span></>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <form className="panel-body" onSubmit={handleSave} id="soap-form">

            {/* ── 1. VITAL SIGNS ──────────────────────────────────────── */}
            <div className="form-section">
              <div className="form-section-label">
                <span className="step-badge">1</span>
                Vital Signs
              </div>

              {/* Row 1: Height, Weight, BMI */}
              <div className="vitals-inline">
                <div className="vital-inline-item">
                  <div className="vital-inline-label">Height (cm)</div>
                  <input className="vital-inline-input" type="number" id="v-height" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="168" />
                  <div className="vital-inline-unit">cm</div>
                </div>
                <div className="vital-inline-item">
                  <div className="vital-inline-label">Weight (kg)</div>
                  <input className="vital-inline-input" type="number" id="v-weight" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="70" />
                  <div className="vital-inline-unit">kg</div>
                </div>
                <div className="vital-inline-item">
                  <div className="vital-inline-label">BMI</div>
                  <div className="bmi-display" id="v-bmi">{bmi ?? "—"}</div>
                  <div className="vital-inline-unit" id="v-bmi-label" style={{ color: bmiColor }}>{bmiLabel}</div>
                </div>
              </div>

              {/* Row 2: BP, HR, Temp */}
              <div className="vitals-inline">
                <div className="vital-inline-item">
                  <div className="vital-inline-label">BP (mmHg)</div>
                  <input className="vital-inline-input" type="text" value={bp} onChange={(e) => setBp(e.target.value)} placeholder="120/80" />
                  <div className="vital-inline-unit">&nbsp;</div>
                </div>
                <div className="vital-inline-item">
                  <div className="vital-inline-label">HR (bpm)</div>
                  <input className="vital-inline-input" type="number" value={hr} onChange={(e) => setHr(e.target.value)} placeholder="72" />
                  <div className="vital-inline-unit">Normal</div>
                </div>
                <div className="vital-inline-item">
                  <div className="vital-inline-label">Temp (°C)</div>
                  <input className="vital-inline-input" type="number" step="0.1" value={temp} onChange={(e) => setTemp(e.target.value)} placeholder="37.0" />
                  <div className="vital-inline-unit">Normal</div>
                </div>
              </div>

              {/* Row 3: SpO₂, RR, Pain */}
              <div className="vitals-inline">
                <div className="vital-inline-item">
                  <div className="vital-inline-label">SpO₂ (%)</div>
                  <input className="vital-inline-input" type="number" value={spo2} onChange={(e) => setSpo2(e.target.value)} placeholder="99" />
                  <div className="vital-inline-unit">Normal</div>
                </div>
                <div className="vital-inline-item">
                  <div className="vital-inline-label">RR (/min)</div>
                  <input className="vital-inline-input" type="number" value={rr} onChange={(e) => setRr(e.target.value)} placeholder="16" />
                  <div className="vital-inline-unit">Normal</div>
                </div>
                <div className="vital-inline-item">
                  <div className="vital-inline-label">Pain (0–10)</div>
                  <input className="vital-inline-input" type="number" min="0" max="10" value={pain} onChange={(e) => setPain(e.target.value)} placeholder="0" />
                  <div className="vital-inline-unit">Mild</div>
                </div>
              </div>
            </div>

            {/* ── 2. CLINICAL NOTES & DIAGNOSIS ───────────────────────── */}
            <div className="form-section">
              <div className="form-section-label">
                <span className="step-badge">2</span>
                Clinical Notes &amp; Diagnosis
              </div>
              <div className="field-row cols2" style={{ marginBottom: 10 }}>
                <div className="field">
                  <label>Mode of Transaction</label>
                  <select value={modeOfTx} onChange={(e) => setModeOfTx(e.target.value)}>
                    <option value="TELECONSULTATION">Teleconsultation</option>
                    <option value="WALK_IN">Walk-in</option>
                    <option value="HOME_VISIT">Home Visit</option>
                    <option value="EMERGENCY">Emergency</option>
                  </select>
                </div>
                <div className="field">
                  <label>Primary ICD-10 Code</label>
                  <select id="icd-select" value={icdCode} onChange={(e) => setIcdCode(e.target.value)}>
                    <option value="">Select code…</option>
                    {ICD10_CODES.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="field">
                <label>Chief Complaint</label>
                <input
                  type="text"
                  value={chiefComplaint}
                  onChange={(e) => setChiefComplaint(e.target.value)}
                  placeholder="Patient's main concern…"
                  id="chief-complaint-input"
                />
              </div>
              <div className="field">
                <label>SOAP Notes (Subjective, Objective, Assessment &amp; Plan)</label>
                <textarea
                  id="soap-notes"
                  value={soapNotes}
                  onChange={(e) => setSoapNotes(e.target.value)}
                  placeholder={"S: Patient reports…\nO: BP 120/80, HR 72, SpO₂ 99%…\nA: Diagnosis, impression…\nP: Treatment, follow-up…"}
                  required
                />
              </div>
            </div>

            {/* ── 3. E-PRESCRIBE ORDER ────────────────────────────────── */}
            <div className="form-section">
              <div className="form-section-label">
                <span className="step-badge">3</span>
                E-Prescribe Order
              </div>

              {/* Rx list */}
              {rxList.length > 0 && (
                <div className="rx-list" id="rx-list">
                  {rxList.map((rx, i) => (
                    <div key={i} className="rx-item">
                      <div className="rx-item-icon">
                        <svg viewBox="0 0 14 14"><path d="M4 1.5h6l2 3H2L4 1.5z"/><rect x="1" y="4.5" width="12" height="8" rx="1.5"/><path d="M5 8h4M7 6.5v3"/></svg>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="rx-item-name">{rx.medicineName}{rx.brand ? ` (${rx.brand})` : ""}</div>
                        <div className="rx-item-dose">{rx.dose} · {rx.frequency} · {rx.duration} · Qty: {rx.quantity}</div>
                      </div>
                      <button type="button" className="rx-item-remove" onClick={() => setRxList((p) => p.filter((_, j) => j !== i))} title="Remove">
                        <svg viewBox="0 0 10 10"><path d="M1.5 1.5l7 7M8.5 1.5l-7 7"/></svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Rx form — collapsible */}
              {rxFormOpen && (
                <div className="rx-add-form" id="rx-add-form">
                  <div className="field-row cols2">
                    <div className="field" style={{ margin: 0, position: "relative" }} ref={medContainerRef}>
                      <label>Medication (PNF Generic)</label>
                      <input
                        type="text"
                        id="rx-name"
                        value={medSearch}
                        onChange={(e) => { setMedSearch(e.target.value); setTempMed(e.target.value); setShowSuggestions(true); }}
                        onFocus={() => setShowSuggestions(true)}
                        placeholder="e.g. Paracetamol, Amlodipine…"
                      />
                      {showSuggestions && medSearch.length > 1 && (
                        <div className="med-suggestions">
                          {medLoading ? (
                            <div className="med-suggestion-empty">Searching PNF…</div>
                          ) : (medSuggestions as any[]).length === 0 ? (
                            <div className="med-suggestion-empty">No PNF matches</div>
                          ) : (
                            (medSuggestions as any[]).map((med, i) => (
                              <button key={i} type="button" className="med-suggestion-item"
                                onClick={() => { setTempMed(med.label); setMedSearch(med.label); setShowSuggestions(false); }}>
                                <span className="med-suggestion-name">{med.molecule}</span>
                                <span className="med-suggestion-detail">{med.spec} · {med.route}</span>
                              </button>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                    <div className="field" style={{ margin: 0 }}>
                      <label>Brand Name (Optional)</label>
                      <input type="text" id="rx-brand" value={tempBrand} onChange={(e) => setTempBrand(e.target.value)} placeholder="e.g. Biogesic, Norvasc…" />
                    </div>
                  </div>
                  <div className="field" style={{ margin: 0 }}>
                    <label>Dose &amp; Instructions</label>
                    <input type="text" id="rx-dose" value={tempDose} onChange={(e) => setTempDose(e.target.value)} placeholder="e.g. 1 tablet, 500mg…" />
                  </div>
                  <div className="field-row cols3">
                    <div className="field" style={{ margin: 0 }}>
                      <label>Frequency</label>
                      <select id="rx-freq" value={tempFreq} onChange={(e) => setTempFreq(e.target.value)}>
                        <option>Once daily</option>
                        <option>Twice daily</option>
                        <option>Three times daily</option>
                        <option>Every 8 hours</option>
                        <option>Every 6 hours</option>
                        <option>As needed</option>
                      </select>
                    </div>
                    <div className="field" style={{ margin: 0 }}>
                      <label>Duration</label>
                      <input type="text" id="rx-duration" value={tempDur} onChange={(e) => setTempDur(e.target.value)} />
                    </div>
                    <div className="field" style={{ margin: 0 }}>
                      <label>Quantity</label>
                      <input type="number" id="rx-qty" value={tempQty} min={1} onChange={(e) => setTempQty(parseInt(e.target.value) || 1)} />
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                    <button type="button" className="btn btn-outline" style={{ padding: "6px 14px", fontSize: 12 }} onClick={() => setRxFormOpen(false)}>Cancel</button>
                    <button type="button" className="btn btn-primary" style={{ padding: "6px 14px", fontSize: 12 }} id="add-rx-btn" onClick={addRx}>Add to Prescription</button>
                  </div>
                </div>
              )}

              {!rxFormOpen && (
                <button type="button" className="rx-add-btn" id="rx-add-toggle" onClick={() => setRxFormOpen(true)}>
                  <svg viewBox="0 0 12 12"><path d="M6 1.5v9M1.5 6h9"/></svg>
                  Add to Prescription
                </button>
              )}
            </div>

          </form>
          </div>

          {/* ─ PATIENT PANE ─ */}
          <div className={`tc-pane${activeTab === "patient" ? " active" : ""}`} id="pane-patient">
            {patient && (
              <div className="pt-context-card">
                <div className="pt-context-head">
                  <div className="pt-context-avatar">{patientInitials}</div>
                  <div>
                    <div className="pt-context-name">{patientName}</div>
                    <div className="pt-context-sub">
                      {appointment?.id ? `MRN-${appointment.id.slice(-7).toUpperCase()}` : "MRN-0000000"}
                      {patient.sex && ` · ${patient.sex === "MALE" ? "M" : "F"}`}
                      {patient.birthDate && ` · ${new Date().getFullYear() - new Date(patient.birthDate).getFullYear()}y`}
                    </div>
                    <div style={{ display: "flex", gap: 5, marginTop: 5, flexWrap: "wrap" }}>
                      <span className="pill-ok">Active</span>
                      <span className="pill-ok" style={{ background: "var(--warn-bg)", color: "var(--warn-text)" }}>Hypertension</span>
                      {(patient as any).allergies && (
                        <span className="pill-ok" style={{ background: "var(--crit-bg)", color: "var(--crit-text)" }}>Allergy</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="pt-context-meta">
                  <div className="pt-meta-cell">
                    <div className="pt-meta-key">Attending</div>
                    <div className="pt-meta-val">Dr. Santos</div>
                  </div>
                  <div className="pt-meta-cell">
                    <div className="pt-meta-key">Last Visit</div>
                    <div className="pt-meta-val">{todayStr}</div>
                  </div>
                  <div className="pt-meta-cell">
                    <div className="pt-meta-key">Phone</div>
                    <div className="pt-meta-val">{patient.contactNumber || "+63 917 555 0191"}</div>
                  </div>
                  <div className="pt-meta-cell">
                    <div className="pt-meta-key">Civil Status</div>
                    <div className="pt-meta-val">{patient.civilStatus || "Married"}</div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <div className="section-label">
                Latest Vitals <span style={{ fontSize: 10, color: "var(--faint)", fontWeight: 400 }}>{todayStr}</span>
              </div>
              <div className="vital-row-mini">
                <div className="vital-mini">
                  <span className="vital-mini-label">Blood Pressure</span>
                  <span className="vital-mini-val warn">{bp || "120/80"} mmHg</span>
                </div>
                <div className="vital-mini">
                  <span className="vital-mini-label">Heart Rate</span>
                  <span className="vital-mini-val">{hr || "72"} bpm</span>
                </div>
                <div className="vital-mini">
                  <span className="vital-mini-label">Temperature</span>
                  <span className="vital-mini-val">{temp || "37.0"}°C</span>
                </div>
                <div className="vital-mini">
                  <span className="vital-mini-label">SpO₂</span>
                  <span className="vital-mini-val">{spo2 || "99"}%</span>
                </div>
                <div className="vital-mini">
                  <span className="vital-mini-label">Weight</span>
                  <span className="vital-mini-val">{weight || "70"} kg</span>
                </div>
              </div>
            </div>

            <div>
              <div className="section-label">Active Prescriptions</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {rxList.length > 0 ? (
                  rxList.map((rx, idx) => (
                    <div className="rx-mini" key={idx}>
                      <div className="rx-mini-dot" />
                      <div className="rx-mini-name">{rx.medicineName}{rx.brand ? ` (${rx.brand})` : ""}</div>
                      <div className="rx-mini-dose">{rx.dose} · {rx.frequency}</div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="rx-mini">
                      <div className="rx-mini-dot" />
                      <div className="rx-mini-name">Amlodipine 10mg</div>
                      <div className="rx-mini-dose">1× daily</div>
                    </div>
                    <div className="rx-mini">
                      <div className="rx-mini-dot" />
                      <div className="rx-mini-name">Hydrochlorothiazide 25mg</div>
                      <div className="rx-mini-dose">1× daily</div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {patient && (patient as any).allergies && (
              <div>
                <div className="section-label">Allergies &amp; Alerts</div>
                <div style={{ background: "var(--crit-bg)", borderRadius: "var(--rsm)", padding: "10px 12px", display: "flex", alignItems: "center", gap: 8 }}>
                  <svg style={{ width: 14, height: 14, stroke: "var(--crit-text)", fill: "none", strokeWidth: 2, strokeLinecap: "round", flexShrink: 0 }} viewBox="0 0 14 14">
                    <path d="M7 1.5l5.5 10h-11z" />
                    <path d="M7 4.5v3" />
                    <circle cx="7" cy="9.5" r="0.5" fill="var(--crit-text)" />
                  </svg>
                  <span style={{ fontSize: 12, color: "var(--crit-text)", fontWeight: 500 }}>
                    ⚠ {(patient as any).allergies}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* ─ CHAT PANE ─ */}
          <div className={`tc-pane${activeTab === "chat" ? " active" : ""}`} id="pane-chat">
            <div className="chat-area" id="chat-area">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`chat-msg${msg.sender === "doctor" ? " patient" : ""}`}>
                  <div className="chat-avatar" style={{ background: msg.sender === "doctor" ? "var(--accent)" : "var(--accent-mid)" }}>
                    {msg.sender === "doctor" ? doctorInitials : patientInitials}
                  </div>
                  <div>
                    <div className={`chat-bubble ${msg.sender === "doctor" ? "dr" : "pt"}`}>
                      {msg.text}
                    </div>
                    <div className={`chat-time${msg.sender === "patient" ? " pt" : ""}`}>{msg.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ flex: 1 }} />
            <form onSubmit={handleSendChat} className="chat-input-row">
              <input
                className="chat-input"
                id="chat-input"
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type a message…"
              />
              <button type="submit" className="chat-send">
                <svg viewBox="0 0 14 14"><path d="M1.5 7l11-5.5-5.5 11L6 7.5 1.5 7zM6 7.5L12.5 1.5"/></svg>
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="panel-foot">
            <button type="button" className="btn btn-outline" onClick={() => showToast("Draft saved")} id="save-draft-btn">
              Save Draft
            </button>
            <button
              type="submit"
              form="soap-form"
              className="btn btn-primary"
              style={{ flex: 1, justifyContent: "center" }}
              disabled={submitVisit.isPending || saveStatus === "saved"}
              id="save-consultation-btn"
            >
              <svg viewBox="0 0 13 13"><path d="M2 6.5l3 3 6-6"/></svg>
              {submitVisit.isPending ? "Saving…" : saveStatus === "saved" ? "Saved ✓" : "Save Consultation & Issue Prescription"}
            </button>
          </div>
        </div>
      </div>

      {/* ════ END CALL MODAL ═════════════════════════════════════════════ */}
      <div className={`modal-overlay${endModalOpen ? " open" : ""}`} id="modal-end" onClick={(e) => { if (e.target === e.currentTarget) setEndModalOpen(false); }}>
        <div className="modal">
          <div className="modal-top">
            <span className="modal-title">End Consultation?</span>
            <button className="modal-close" onClick={() => setEndModalOpen(false)}>
              <svg viewBox="0 0 14 14"><path d="M2 2l10 10M12 2L2 12"/></svg>
            </button>
          </div>
          <div className="modal-body">
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.65 }}>
              This will end the video session for both you and the patient. Make sure to save the consultation before ending.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13, color: "var(--ink)", cursor: "pointer" }}>
                <input type="checkbox" checked={saveDraft} onChange={(e) => setSaveDraft(e.target.checked)} style={{ accentColor: "var(--accent)", width: 15, height: 15 }} />
                Save consultation as draft if not yet finalized
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13, color: "var(--ink)", cursor: "pointer" }}>
                <input type="checkbox" checked={sendSms} onChange={(e) => setSendSms(e.target.checked)} style={{ accentColor: "var(--accent)", width: 15, height: 15 }} />
                Send visit summary to patient via SMS
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13, color: "var(--ink)", cursor: "pointer" }}>
                <input type="checkbox" checked={scheduleFollowup} onChange={(e) => setScheduleFollowup(e.target.checked)} style={{ accentColor: "var(--accent)", width: 15, height: 15 }} />
                Schedule follow-up appointment
              </label>
            </div>
          </div>
          <div className="modal-foot">
            <button className="btn btn-outline" onClick={() => setEndModalOpen(false)}>Cancel</button>
            <button className="btn btn-danger" onClick={handleEndCall} id="confirm-end-btn">End Call</button>
          </div>
        </div>
      </div>

      {/* ════ TOAST ══════════════════════════════════════════════════════ */}
      <div className={`tc-toast${toast ? " show" : ""}`} id="toast">
        <div className="tc-toast-inner">
          <svg viewBox="0 0 15 15"><path d="M7.5 1.5a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM5 7.5l2 2 3.5-4"/></svg>
          <span id="toast-msg">{toast}</span>
        </div>
      </div>
    </>
  );
}
