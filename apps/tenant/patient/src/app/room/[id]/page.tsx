"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useProfile } from "../../../lib/hooks/api/usePortal";

interface RoomPageProps {
  params: { id: string };
}

export default function PatientRoomPage({ params }: RoomPageProps) {
  const router = useRouter();
  const visitId = params.id;

  // ── Data ──────────────────────────────────────────────────────────────
  const { data: profile, isLoading } = useProfile();

  const appointment = React.useMemo(() => {
    return profile?.scheduledVisits?.find((v) => v.id === visitId);
  }, [profile, visitId]);

  // ── Video state ────────────────────────────────────────────────────────
  const [isMuted,       setIsMuted]       = React.useState(false);
  const [isCameraOff,   setIsCameraOff]   = React.useState(false);
  const [panelOpen,     setPanelOpen]     = React.useState(true);
  const [isDark,        setIsDark]        = React.useState(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("medistock-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return saved === "dark" || (!saved && prefersDark);
  });

  // ── Chat state ─────────────────────────────────────────────────────────
  const [chatMessages, setChatMessages] = React.useState<
    Array<{ sender: string; text: string; time: string }>
  >([
    { sender: "System", text: "You joined the call. Waiting for Doctor...", time: "10:00 AM" },
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

  // ── Leave call modal ───────────────────────────────────────────────────
  const [endModalOpen, setEndModalOpen] = React.useState(false);

  const handleEndCall = () => {
    mediaStream?.getTracks().forEach((t) => t.stop());
    showToast("Session ended");
    setTimeout(() => window.close(), 1500);
    setEndModalOpen(false);
  };

  const handleSendChat = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    setChatMessages((prev) => [
      ...prev,
      { sender: "You", text: chatInput.trim(), time: timeStr },
    ]);
    setChatInput("");
  };

  // ── Derived display ────────────────────────────────────────────────────
  const patientInitials = profile
    ? `${profile.firstName?.[0] ?? ""}${profile.lastName?.[0] ?? ""}`.toUpperCase()
    : "PT";
  const patientName = profile ? `${profile.firstName} ${profile.lastName}` : "Patient";
  const doctorInitials = "DR";

  if (isLoading) {
    return (
      <div className="vr-loading">
        <div className="vr-spinner" />
        <p>Connecting to your consultation room…</p>
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

        /* Panel body */
        .panel-body{flex:1;overflow-y:auto;padding:0 16px 12px}

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
        .btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:10px;
          font-size:12.5px;font-weight:600;cursor:pointer;border:none;transition:all .18s;
          font-family:'Sora',sans-serif;flex-shrink:0}
        .btn svg{width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
        .btn-outline{background:var(--white);color:var(--muted);box-shadow:var(--card-shadow)}
        .btn-outline:hover{background:var(--accent-light);color:var(--accent)}
        .btn-danger{background:var(--crit-bg);color:var(--crit-text)}
        .btn-danger:hover{background:var(--crit-text);color:white}

        /* Toast */
        .tc-toast{position:fixed;bottom:20px;right:20px;border-radius:var(--rmd);
          overflow:hidden;transform:translateY(20px);opacity:0;
          transition:transform .35s cubic-bezier(.22,1,.36,1),opacity .35s;
          pointer-events:none;z-index:200;box-shadow:0 8px 32px rgba(0,0,0,.25);background:#1A1A2E}
        .tc-toast.show{transform:translateY(0);opacity:1}
        .tc-toast-inner{display:flex;align-items:center;gap:10px;padding:12px 18px;
          font-size:13px;font-weight:500;color:white;font-family:'DM Sans',sans-serif}
        .tc-toast-inner svg{width:14px;height:14px;fill:none;stroke:white;stroke-width:2.5;stroke-linecap:round;flex-shrink:0}
      `}} />

      {/* ════ TOPBAR ═════════════════════════════════════════════════════ */}
      <div className="tc-topbar">
        <div className="tc-logo" onClick={() => window.close()}>
          <div className="tc-logo-icon">
            <svg viewBox="0 0 20 20">
              <path d="M10 2a1 1 0 0 1 1 1v1h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3V3a1 1 0 0 1 1-1zm0 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"/>
            </svg>
          </div>
          HealthBridge Portal
        </div>
        <div className="tc-tb-divider" />
        <button className="tc-back" onClick={() => setEndModalOpen(true)}>
          <svg viewBox="0 0 13 13"><path d="M8 2.5L3.5 6.5 8 10.5"/></svg>
          Leave Room
        </button>
        <div className="tc-tb-divider" />
        <div className="tc-session">
          <div className="tc-session-dot" />
          <span className="tc-session-label">Live Session</span>
          <span className="tc-session-time">{timerStr}</span>
        </div>
        <div className="tc-tb-right">
          <button className="tc-icon-btn" onClick={() => showToast("Screen sharing is only available for providers")} title="Share screen" id="topbar-screen-share-btn">
            <svg viewBox="0 0 16 16"><rect x="1" y="2.5" width="14" height="9" rx="2"/><path d="M5.5 13.5h5M8 11.5v2"/></svg>
          </button>
          <div className="tc-tb-divider" />
          <div className="tc-tb-avatar">{patientInitials}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px", alignItems: "flex-start" }}>
            <div className="tc-tb-name" style={{ lineHeight: 1.1 }}>{patientName}</div>
            <span className="pill-ok" style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "1px 6px" }}>
              <svg viewBox="0 0 16 16" style={{ width: "9px", height: "9px", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", flexShrink: 0 }}>
                <path d="M14 14a6 6 0 0 0-12 0" />
                <circle cx="8" cy="5" r="3" />
              </svg>
              Patient
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
                  HD · 38ms
                </div>
              </div>

              {/* Top-right: recording */}
              <div className="video-overlay-tr">
                <div className="video-badge">
                  <div className="rec-dot" />
                  REC
                </div>
              </div>

              {/* Doctor connection avatar */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                <div className="video-patient-avatar" style={{ background: "linear-gradient(135deg, #0e5ab9, #0ea5e9)" }}>{doctorInitials}</div>
                <div className="video-connecting">Attending Physician's camera connecting…</div>
              </div>

              {/* Attending physician name label */}
              <div className="video-name-label">Dr. Santos — Attending Physician</div>

              {/* Patient PiP */}
              <div className="video-pip">
                <div className="video-pip-inner">
                  {!isCameraOff && mediaStream ? (
                    <video ref={localVideoRef} autoPlay playsInline muted className="video-pip-video" />
                  ) : (
                    <div className="video-pip-avatar">{patientInitials}</div>
                  )}
                </div>
                <div className="video-pip-name">{patientName} (You)</div>
              </div>

            </div>
          </div>

          {/* Controls */}
          <div className="video-controls">
            <button
              className={`vc-btn${isMuted ? " muted" : ""}`}
              id="patient-toggle-mic"
              onClick={() => { setIsMuted((m) => !m); showToast(isMuted ? "Microphone on" : "Microphone muted"); }}
              title="Toggle mic"
            >
              <svg viewBox="0 0 20 20"><rect x="7" y="2" width="6" height="10" rx="3"/><path d="M4 10a6 6 0 0 0 12 0M10 16v3M7.5 19h5"/></svg>
            </button>
            <button
              className={`vc-btn${isCameraOff ? " muted" : ""}`}
              id="patient-toggle-camera"
              onClick={() => { setIsCameraOff((c) => !c); showToast(isCameraOff ? "Camera on" : "Camera off"); }}
              title="Toggle camera"
            >
              <svg viewBox="0 0 20 20"><rect x="1" y="4.5" width="13" height="11" rx="2.5"/><path d="M14 8.5l5-3v9l-5-3"/></svg>
            </button>
            <div className="vc-sep" />
            <button className="vc-btn" onClick={() => showToast("Screen sharing is handled by the doctor")} title="Share screen" id="screen-share-btn">
              <svg viewBox="0 0 20 20"><rect x="2" y="3" width="16" height="11" rx="2"/><path d="M7 17h6M10 14v3"/></svg>
            </button>
            <button className="vc-btn" onClick={() => setPanelOpen((o) => !o)} title="Toggle Chat" id="chat-btn">
              <svg viewBox="0 0 20 20"><path d="M2 4.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H7l-4 3V4.5z"/></svg>
            </button>
            <div className="vc-sep" />
            <button className="vc-btn end" onClick={() => setEndModalOpen(true)} title="Leave Call" id="patient-end-call-btn">
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
              title="Toggle chat panel"
            >
              <svg viewBox="0 0 12 12">
                <path d={panelOpen ? "M7.5 2L4 6l3.5 4" : "M4.5 2L8 6l-3.5 4"} />
              </svg>
            </button>
          </div>
        </div>

        {/* ── RIGHT: CHAT PANEL ───────────────────────────────────────── */}
        <div className="tc-right" id="tc-right" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <div className="panel-head">
            <div className="panel-head-title">Consultation Chat</div>
            <div className="panel-head-sub">Live chat with Dr. Santos</div>
          </div>

          <div style={{ flex: 1, padding: "0 16px 16px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div className="chat-area" id="chat-area" style={{ flex: 1, overflowY: "auto", marginBottom: 12 }}>
              {chatMessages.map((msg, i) => {
                if (msg.sender === "System") {
                  return (
                    <div key={i} style={{ textAlign: "center", fontSize: 11, color: "var(--muted)", margin: "4px 0" }}>
                      {msg.text}
                    </div>
                  );
                }
                const isSelf = msg.sender === "You";
                return (
                  <div key={i} className={`chat-msg${isSelf ? " patient" : ""}`}>
                    <div className="chat-avatar" style={{ background: isSelf ? "var(--accent)" : "var(--accent-mid)" }}>
                      {isSelf ? patientInitials : doctorInitials}
                    </div>
                    <div>
                      <div className={`chat-bubble ${isSelf ? "dr" : "pt"}`}>
                        {msg.text}
                      </div>
                      <div className={`chat-time${isSelf ? "" : " pt"}`}>{msg.time}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <form onSubmit={handleSendChat} className="chat-input-row" style={{ flexShrink: 0 }}>
              <input
                className="chat-input"
                id="patient-chat-input"
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type a message…"
              />
              <button type="submit" className="chat-send" id="patient-send-chat">
                <svg viewBox="0 0 14 14"><path d="M1.5 7l11-5.5-5.5 11L6 7.5 1.5 7zM6 7.5L12.5 1.5"/></svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ════ LEAVE MODAL ═════════════════════════════════════════════ */}
      <div className={`modal-overlay${endModalOpen ? " open" : ""}`} id="modal-end" onClick={(e) => { if (e.target === e.currentTarget) setEndModalOpen(false); }}>
        <div className="modal">
          <div className="modal-top">
            <span className="modal-title">Leave Consultation?</span>
            <button className="modal-close" onClick={() => setEndModalOpen(false)}>
              <svg viewBox="0 0 14 14"><path d="M2 2l10 10M12 2L2 12"/></svg>
            </button>
          </div>
          <div className="modal-body">
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.65 }}>
              This will disconnect you from the live call. You can close this window or return later.
            </p>
          </div>
          <div className="modal-foot">
            <button className="btn btn-outline" onClick={() => setEndModalOpen(false)}>Cancel</button>
            <button className="btn btn-danger" onClick={handleEndCall} id="confirm-end-btn">Leave Call</button>
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
