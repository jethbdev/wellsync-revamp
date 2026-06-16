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

  // Fetch patient profile which contains their appointments
  const { data: profile, isLoading } = useProfile();

  // Find the specific appointment
  const appointment = React.useMemo(() => {
    return profile?.scheduledVisits?.find((v) => v.id === visitId);
  }, [profile, visitId]);

  // Video call UI states
  const [isMuted, setIsMuted] = React.useState(false);
  const [isCameraOff, setIsCameraOff] = React.useState(false);
  const [chatMessages, setChatMessages] = React.useState<Array<{ sender: string; text: string; time: string }>>([
    { sender: "System", text: "You joined the call. Waiting for Doctor...", time: "10:00 AM" },
  ]);
  const [chatInput, setChatInput] = React.useState("");

  // Real webcam setup
  const localVideoRef = React.useRef<HTMLVideoElement | null>(null);
  const [mediaStream, setMediaStream] = React.useState<MediaStream | null>(null);

  // Request webcam on mount
  React.useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setMediaStream(stream);
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.warn("Webcam access denied or unavailable:", err);
        });
    }

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Update camera track state
  React.useEffect(() => {
    if (mediaStream) {
      mediaStream.getVideoTracks().forEach((track) => {
        track.enabled = !isCameraOff;
      });
    }
  }, [isCameraOff, mediaStream]);

  // Update audio track state
  React.useEffect(() => {
    if (mediaStream) {
      mediaStream.getAudioTracks().forEach((track) => {
        track.enabled = !isMuted;
      });
    }
  }, [isMuted, mediaStream]);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const now = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    setChatMessages((prev) => [...prev, { sender: "You", text: chatInput, time: now }]);
    setChatInput("");
  };

  const handleEndCall = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
    }
    window.close();
  };

  const patientInitials = profile
    ? `${profile.firstName?.[0] ?? ""}${profile.lastName?.[0] ?? ""}`.toUpperCase()
    : "P";

  if (isLoading) {
    return (
      <div className="proom-loading">
        <div className="proom-loading-inner">
          <div className="proom-spinner" />
          <p className="proom-loading-text">Connecting to your consultation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="proom-root">
      {/* LEFT: Video area */}
      <div className="proom-left">
        {/* Topbar */}
        <div className="proom-topbar">
          <div className="proom-topbar-left">
            <div className="proom-secure-badge">
              <svg viewBox="0 0 16 16" fill="currentColor" width={10} height={10}>
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
              </svg>
              SECURE
            </div>
            <div>
              <h1 className="proom-title">Teleconsultation</h1>
              <p className="proom-subtitle">
                {profile?.facility?.name || "Partner Clinic"}&nbsp;·&nbsp;
                <code className="proom-code">{visitId.slice(0, 8)}...</code>
              </p>
            </div>
          </div>
          <button className="proom-end-btn" onClick={handleEndCall} id="patient-end-call-btn">
            <svg viewBox="0 0 16 16" fill="currentColor" width={13} height={13}>
              <path d="M6.5 1C3.467 1 1 3.467 1 6.5 1 9.533 3.467 12 6.5 12h.5v3.5a.5.5 0 0 0 1 0V12h.5C11.533 12 14 9.533 14 6.5 14 3.467 11.533 1 8.5 1h-2zm0 1h2C11.533 2 13 3.467 13 6.5S11.533 11 8.5 11h-2C3.467 11 2 9.533 2 6.5S3.467 2 6.5 2z"/>
            </svg>
            Leave Call
          </button>
        </div>

        {/* Video grid */}
        <div className="proom-video-grid">
          {/* Remote doctor feed */}
          <div className="proom-remote-feed">
            <div className="proom-avatar-ring">
              <div className="proom-avatar-pulse ring1" />
              <div className="proom-avatar-pulse ring2" />
              <div className="proom-avatar">DR</div>
            </div>
            <h3 className="proom-remote-name">Attending Physician</h3>
            <p className="proom-remote-status">
              <span className="proom-status-dot online" />
              Online — Connected
            </p>
          </div>

          {/* Patient PIP */}
          <div className="proom-pip">
            {!isCameraOff ? (
              <video ref={localVideoRef} autoPlay playsInline muted className="proom-pip-video" />
            ) : (
              <div className="proom-pip-off">Camera Off</div>
            )}
            <span className="proom-pip-label">You</span>
          </div>
        </div>

        {/* Controls */}
        <div className="proom-controls">
          <div className="proom-device-status">
            <span className={`proom-device-chip ${isMuted ? "danger" : "ok"}`}>
              {isMuted ? (
                <svg viewBox="0 0 16 16" fill="currentColor" width={11} height={11}><path d="M13 8h-1.5a3.5 3.5 0 0 1-7 0H3a5 5 0 0 0 4.5 4.975V15H9v-2.025A5 5 0 0 0 13 8zM5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z"/><line x1="1" y1="1" x2="15" y2="15" stroke="currentColor" strokeWidth="1.5"/></svg>
              ) : (
                <svg viewBox="0 0 16 16" fill="currentColor" width={11} height={11}><path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3zm3 10a5 5 0 0 0 5-5H12a4 4 0 0 1-8 0H3a5 5 0 0 0 5 5zm0 1v2h1v-2h-1z"/></svg>
              )}
              {isMuted ? "Mic Off" : "Mic On"}
            </span>
            <span className={`proom-device-chip ${isCameraOff ? "danger" : "ok"}`}>
              <svg viewBox="0 0 16 16" fill="currentColor" width={11} height={11}><path d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.33 3 1.333V4.337l-3 1.334v4.66z"/></svg>
              {isCameraOff ? "Cam Off" : "Cam On"}
            </span>
          </div>

          <div className="proom-ctrl-group">
            <button
              className={`proom-ctrl-btn ${isMuted ? "active-danger" : ""}`}
              onClick={() => setIsMuted(!isMuted)}
              title={isMuted ? "Unmute" : "Mute"}
              id="patient-toggle-mic"
            >
              {isMuted ? (
                <svg viewBox="0 0 16 16" fill="currentColor" width={15} height={15}><path d="M13 8h-1.5a3.5 3.5 0 0 1-7 0H3a5 5 0 0 0 4.5 4.975V15H9v-2.025A5 5 0 0 0 13 8zM5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z"/><line x1="1" y1="1" x2="15" y2="15" stroke="currentColor" strokeWidth="1.5"/></svg>
              ) : (
                <svg viewBox="0 0 16 16" fill="currentColor" width={15} height={15}><path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3zm3 10a5 5 0 0 0 5-5H12a4 4 0 0 1-8 0H3a5 5 0 0 0 5 5zm0 1v2h1v-2h-1z"/></svg>
              )}
            </button>

            <button
              className={`proom-ctrl-btn ${isCameraOff ? "active-danger" : ""}`}
              onClick={() => setIsCameraOff(!isCameraOff)}
              title={isCameraOff ? "Turn Camera On" : "Turn Camera Off"}
              id="patient-toggle-camera"
            >
              <svg viewBox="0 0 16 16" fill="currentColor" width={15} height={15}>
                <path d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.33 3 1.333V4.337l-3 1.334v4.66z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="proom-panel">
        {/* Clinic header */}
        <div className="proom-panel-header">
          <div className="proom-clinic-icon">
            <svg viewBox="0 0 15 15" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M2 13.5V4.5L7.5 1.5 13 4.5v9"/>
              <path d="M5.5 13.5V10h4v3.5"/>
              <path d="M4.5 6.5H6M9 6.5h1.5"/>
            </svg>
          </div>
          <div>
            <div className="proom-clinic-name">
              {profile?.facility?.name || "Partner Clinic Room"}
            </div>
            <div className="proom-clinic-org">
              {profile?.facility?.organization?.name || "HealthBridge Network"}
            </div>
          </div>
        </div>

        {/* Patient info strip */}
        <div className="proom-patient-strip">
          <div className="proom-patient-avatar">{patientInitials}</div>
          <div>
            <div className="proom-patient-name">
              {profile ? `${profile.firstName} ${profile.lastName}` : "You"}
            </div>
            <div className="proom-patient-tag">
              <span className="proom-secure-tag">
                <svg viewBox="0 0 16 16" fill="currentColor" width={9} height={9}><path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/></svg>
                Encrypted · HIPAA Compliant
              </span>
            </div>
          </div>
        </div>

        {/* Consultation checklist card */}
        <div className="proom-checklist">
          <div className="proom-checklist-title">
            <svg viewBox="0 0 16 16" fill="currentColor" width={13} height={13}><path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/></svg>
            Before Your Consultation
          </div>
          <ul className="proom-checklist-items">
            <li>
              <span className="proom-check-icon ok">
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" width={10} height={10}><path d="M2 6l3 3 5-5"/></svg>
              </span>
              Webcam and microphone permissions enabled
            </li>
            <li>
              <span className="proom-check-icon ok">
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" width={10} height={10}><path d="M2 6l3 3 5-5"/></svg>
              </span>
              Keep recent prescriptions and lab results ready
            </li>
            <li>
              <span className="proom-check-icon ok">
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" width={10} height={10}><path d="M2 6l3 3 5-5"/></svg>
              </span>
              Remain in a quiet, well-lit private environment
            </li>
            <li>
              <span className="proom-check-icon ok">
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" width={10} height={10}><path d="M2 6l3 3 5-5"/></svg>
              </span>
              Connection is end-to-end encrypted
            </li>
          </ul>
        </div>

        {/* Chat */}
        <div className="proom-chat-wrapper">
          <div className="proom-chat-title">
            <svg viewBox="0 0 16 16" fill="currentColor" width={12} height={12}><path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/></svg>
            Consultation Chat
          </div>

          <div className="proom-chat-messages">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`proom-chat-msg ${msg.sender === "You" ? "self" : "other"}`}>
                <div className="proom-chat-msg-header">
                  <span className="proom-chat-sender">{msg.sender}</span>
                  <span className="proom-chat-time">{msg.time}</span>
                </div>
                <p className="proom-chat-text">{msg.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendChat} className="proom-chat-form">
            <input
              type="text"
              className="proom-chat-input"
              placeholder="Message doctor..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              id="patient-chat-input"
            />
            <button type="submit" className="proom-chat-send" id="patient-send-chat">
              <svg viewBox="0 0 16 16" fill="currentColor" width={13} height={13}>
                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11z"/>
              </svg>
            </button>
          </form>
        </div>
      </div>

      <style>{`
        /* ── Patient room layout ─────────────────────────────────────────── */
        .proom-root {
          display: grid;
          grid-template-columns: 1fr 340px;
          height: 100vh;
          overflow: hidden;
          background: var(--surface, #F5F7FB);
          color: var(--ink, #1A1A2E);
          font-family: 'DM Sans', system-ui, sans-serif;
        }

        /* Loading */
        .proom-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: var(--surface);
          color: var(--muted);
        }
        .proom-loading-inner { text-align: center; }
        .proom-spinner {
          width: 36px;
          height: 36px;
          border: 3px solid var(--border);
          border-top-color: var(--accent);
          border-radius: 50%;
          animation: proomSpin 0.9s linear infinite;
          margin: 0 auto 14px;
        }
        .proom-loading-text { font-size: 13px; font-weight: 500; color: var(--muted); }

        /* Left */
        .proom-left {
          display: flex;
          flex-direction: column;
          padding: 20px;
          gap: 16px;
          overflow: hidden;
          border-right: 1px solid var(--border-subtle);
        }

        /* Topbar */
        .proom-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }
        .proom-topbar-left { display: flex; align-items: center; gap: 12px; }
        .proom-secure-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(34, 197, 94, 0.12);
          color: #16a34a;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.1em;
          padding: 4px 9px;
          border-radius: 6px;
          flex-shrink: 0;
        }
        .proom-title {
          font-family: 'Sora', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: var(--ink);
          margin: 0;
        }
        .proom-subtitle { font-size: 11px; color: var(--muted); margin: 2px 0 0; }
        .proom-code {
          font-family: monospace;
          background: var(--border-subtle, rgba(108,99,255,0.08));
          padding: 1px 5px;
          border-radius: 4px;
          color: var(--ink);
          font-size: 11px;
        }
        .proom-end-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #ef4444;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 0 18px;
          height: 38px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Sora', sans-serif;
          transition: background 0.2s, transform 0.15s;
        }
        .proom-end-btn:hover { background: #dc2626; transform: translateY(-1px); }

        /* Video grid */
        .proom-video-grid {
          flex: 1;
          position: relative;
          background: var(--white);
          border-radius: var(--rlg, 18px);
          box-shadow: var(--card-shadow);
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          min-height: 0;
        }

        .proom-remote-feed {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          width: 100%;
          height: 100%;
          background: radial-gradient(ellipse at center, rgba(124,58,237,0.06) 0%, var(--surface) 70%);
        }

        .proom-avatar-ring {
          position: relative;
          width: 110px;
          height: 110px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .proom-avatar-pulse {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: rgba(124,58,237,0.10);
        }
        .proom-avatar-pulse.ring1 { animation: proomPing 3s ease-out infinite; }
        .proom-avatar-pulse.ring2 { inset: 16px; animation: proomPing 2s ease-out infinite; opacity: 0.7; }
        .proom-avatar {
          position: relative;
          z-index: 1;
          width: 68px;
          height: 68px;
          border-radius: 50%;
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          color: #fff;
          font-family: 'Sora', sans-serif;
          font-size: 20px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 28px rgba(124,58,237,0.3);
        }
        .proom-remote-name {
          font-family: 'Sora', sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: var(--ink);
          margin: 0;
        }
        .proom-remote-status {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--muted);
          margin: 0;
        }
        .proom-status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }
        .proom-status-dot.online { background: #22c55e; }

        /* PIP */
        .proom-pip {
          position: absolute;
          bottom: 18px;
          right: 18px;
          width: 170px;
          height: 114px;
          background: var(--surface);
          border-radius: var(--rmd, 12px);
          border: 2px solid #7c3aed;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .proom-pip-video { width: 100%; height: 100%; object-fit: cover; }
        .proom-pip-off { font-size: 11px; color: var(--muted); font-weight: 600; }
        .proom-pip-label {
          position: absolute;
          bottom: 6px;
          left: 8px;
          font-size: 9px;
          font-weight: 700;
          color: #fff;
          background: rgba(0,0,0,0.55);
          padding: 2px 6px;
          border-radius: 4px;
        }

        /* Controls */
        .proom-controls {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--white);
          border: 1px solid var(--border-subtle);
          border-radius: var(--rlg, 18px);
          padding: 12px 20px;
          box-shadow: var(--card-shadow);
          gap: 12px;
        }
        .proom-device-status { display: flex; gap: 8px; }
        .proom-device-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 20px;
        }
        .proom-device-chip.ok { background: rgba(34,197,94,0.1); color: #16a34a; }
        .proom-device-chip.danger { background: rgba(239,68,68,0.1); color: #dc2626; }
        .proom-ctrl-group { display: flex; gap: 8px; }
        .proom-ctrl-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: none;
          background: var(--surface);
          color: var(--ink);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
          transition: background 0.2s, transform 0.15s;
        }
        .proom-ctrl-btn:hover { background: rgba(124,58,237,0.08); color: #7c3aed; transform: translateY(-1px); }
        .proom-ctrl-btn.active-danger { background: rgba(239,68,68,0.1); color: #dc2626; }
        .proom-ctrl-btn.active-danger:hover { background: rgba(239,68,68,0.18); }

        /* ── Right panel ─────────────────────────────────────────────────── */
        .proom-panel {
          display: flex;
          flex-direction: column;
          background: var(--white);
          overflow: hidden;
        }

        /* Clinic header */
        .proom-panel-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 18px 20px;
          border-bottom: 1px solid var(--border-subtle);
          flex-shrink: 0;
        }
        .proom-clinic-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(124,58,237,0.08);
          color: #7c3aed;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .proom-clinic-name {
          font-family: 'Sora', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: var(--ink);
        }
        .proom-clinic-org { font-size: 11px; color: var(--muted); margin-top: 1px; }

        /* Patient strip */
        .proom-patient-strip {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 20px;
          background: var(--surface);
          border-bottom: 1px solid var(--border-subtle);
          flex-shrink: 0;
        }
        .proom-patient-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          color: #fff;
          font-family: 'Sora', sans-serif;
          font-size: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .proom-patient-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink);
        }
        .proom-patient-tag { margin-top: 2px; }
        .proom-secure-tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
          color: #16a34a;
          font-weight: 600;
          background: rgba(34,197,94,0.08);
          padding: 2px 7px;
          border-radius: 20px;
        }

        /* Checklist */
        .proom-checklist {
          padding: 16px 20px;
          border-bottom: 1px solid var(--border-subtle);
          flex-shrink: 0;
        }
        .proom-checklist-title {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--muted);
          margin-bottom: 10px;
        }
        .proom-checklist-items {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .proom-checklist-items li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 12px;
          color: var(--ink);
          line-height: 1.4;
        }
        .proom-check-icon {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 0;
        }
        .proom-check-icon.ok { background: rgba(34,197,94,0.1); color: #16a34a; }

        /* Chat */
        .proom-chat-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .proom-chat-title {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 12px 20px 10px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--muted);
          border-bottom: 1px solid var(--border-subtle);
          flex-shrink: 0;
        }
        .proom-chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 14px 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .proom-chat-msg { max-width: 90%; }
        .proom-chat-msg.self { align-self: flex-end; }
        .proom-chat-msg.other { align-self: flex-start; }
        .proom-chat-msg-header {
          display: flex;
          gap: 6px;
          align-items: center;
          margin-bottom: 3px;
        }
        .proom-chat-sender { font-size: 10px; font-weight: 700; color: var(--muted); }
        .proom-chat-time { font-size: 9px; color: var(--faint); }
        .proom-chat-text {
          margin: 0;
          font-size: 12px;
          padding: 8px 12px;
          border-radius: 10px;
          line-height: 1.4;
        }
        .proom-chat-msg.self .proom-chat-text {
          background: #7c3aed;
          color: #fff;
          border-radius: 10px 10px 2px 10px;
        }
        .proom-chat-msg.other .proom-chat-text {
          background: var(--surface);
          color: var(--ink);
          border: 1px solid var(--border-subtle);
          border-radius: 10px 10px 10px 2px;
        }
        .proom-chat-form {
          display: flex;
          gap: 8px;
          padding: 14px 20px;
          border-top: 1px solid var(--border-subtle);
          flex-shrink: 0;
        }
        .proom-chat-input {
          flex: 1;
          background: var(--surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--rsm, 8px);
          padding: 8px 12px;
          font-size: 12px;
          color: var(--ink);
          outline: none;
          font-family: 'DM Sans', sans-serif;
          transition: border-color 0.2s;
        }
        .proom-chat-input:focus { border-color: #7c3aed; background: var(--white); }
        .proom-chat-input::placeholder { color: var(--faint); }
        .proom-chat-send {
          width: 36px;
          height: 36px;
          background: #7c3aed;
          color: #fff;
          border: none;
          border-radius: var(--rsm, 8px);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: background 0.2s, transform 0.15s;
        }
        .proom-chat-send:hover { background: #6d28d9; transform: translateY(-1px); }

        /* Keyframes */
        @keyframes proomSpin { to { transform: rotate(360deg); } }
        @keyframes proomPing {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.7); opacity: 0; }
        }

        /* Dark mode */
        html.dark .proom-root { background: var(--surface); }
        html.dark .proom-panel { background: var(--white); }
        html.dark .proom-video-grid { background: var(--white); }
        html.dark .proom-controls { background: var(--white); }
        html.dark .proom-patient-strip { background: var(--surface); }
        html.dark .proom-chat-msg.other .proom-chat-text { background: var(--surface); }
        html.dark .proom-device-chip.ok { background: rgba(63,185,80,0.12); color: #3fb950; }
        html.dark .proom-device-chip.danger { background: rgba(248,81,73,0.12); color: #ff7b72; }
        html.dark .proom-secure-badge { background: rgba(63,185,80,0.12); color: #3fb950; }
        html.dark .proom-secure-tag { background: rgba(63,185,80,0.1); color: #3fb950; }
        html.dark .proom-check-icon.ok { background: rgba(63,185,80,0.1); color: #3fb950; }
      `}</style>
    </div>
  );
}
