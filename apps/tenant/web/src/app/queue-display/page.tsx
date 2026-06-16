"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { usePublicQueue } from "../../lib/hooks/api/useQueue";

function QueueDisplayContent() {
  const searchParams = useSearchParams();
  const facilityId = searchParams.get("facilityId") || "";
  const doctorId = searchParams.get("doctorId") || "";

  const { data: queue = [], isLoading } = usePublicQueue(facilityId, doctorId || undefined);
  const spokenTickets = React.useRef<Record<string, string>>({}); // ticketId -> updatedAt timestamp

  // Filter calling and waiting tickets
  const activeCalls = React.useMemo(() => {
    return queue
      .filter((q) => q.status === "CALLING")
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()); // Latest call first
  }, [queue]);

  const waitingTickets = React.useMemo(() => {
    return queue.filter((q) => q.status === "WAITING");
  }, [queue]);

  const mainCall = activeCalls[0] || null;
  const historyCalls = activeCalls.slice(1, 5); // next 4 active calls

  // Web Audio API chime generator
  const playChime = React.useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "sine";
      // Chime sequence: C5 -> E5 -> G5
      osc1.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc1.frequency.setValueAtTime(659.25, ctx.currentTime + 0.12); // E5
      osc1.frequency.setValueAtTime(783.99, ctx.currentTime + 0.24); // G5

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(659.25, ctx.currentTime);
      osc2.frequency.setValueAtTime(783.99, ctx.currentTime + 0.12); // G5
      osc2.frequency.setValueAtTime(987.77, ctx.currentTime + 0.24); // B5

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.85);
      osc2.stop(ctx.currentTime + 0.85);
    } catch (err) {
      console.warn("Failed to play audio chime", err);
    }
  }, []);

  // Text-To-Speech announcer
  const speakAnnouncement = React.useCallback((ticketNumber: string, roomName: string, doctorName?: string) => {
    try {
      if (!window.speechSynthesis) return;
      // Cancel current speaking
      window.speechSynthesis.cancel();

      // Clean ticket number for speech, e.g. "A 0 0 1" instead of "A-001"
      const letter = ticketNumber.charAt(0);
      const digits = ticketNumber.substring(2).split("").join(" ");
      const formattedTicket = `${letter} ${digits}`;

      let text = `Ticket number ${formattedTicket}, please proceed to ${roomName}`;
      if (doctorName) {
        text += ` for ${doctorName}`;
      }
      text += `.`;
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Select appropriate English voice
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(
        (v) => v.lang.startsWith("en-US") && v.name.includes("Google")
      ) || voices.find((v) => v.lang.startsWith("en"));
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      utterance.rate = 0.88;
      utterance.pitch = 1.0;

      // Play chime right before speaking
      playChime();
      
      // Delay speech slightly to let chime play
      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 350);
    } catch (err) {
      console.warn("Failed to synthesize speech", err);
    }
  }, [playChime]);

  // Watch for ticket changes to trigger announcement
  const latestCallId = mainCall?.id;
  const latestCallUpdatedAt = mainCall?.updatedAt;
  const latestCallTicketNumber = mainCall?.ticketNumber;
  const latestCallRoom = mainCall?.calledRoom;
  const latestCallDoctor = mainCall?.doctor;

  React.useEffect(() => {
    if (!latestCallId) return;
    const lastSpokenTime = spokenTickets.current[latestCallId];

    if (!lastSpokenTime || lastSpokenTime !== latestCallUpdatedAt) {
      spokenTickets.current[latestCallId] = latestCallUpdatedAt || "";
      const doctorName = latestCallDoctor ? `Doctor ${latestCallDoctor.firstName} ${latestCallDoctor.lastName}` : undefined;
      speakAnnouncement(latestCallTicketNumber || "", latestCallRoom || "Consultation Room", doctorName);
    }
  }, [latestCallId, latestCallUpdatedAt, latestCallTicketNumber, latestCallRoom, latestCallDoctor, speakAnnouncement]);

  // Enable speech synthesis voice loading on page mount
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  if (!facilityId) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#0b0f19", color: "white", fontFamily: "sans-serif" }}>
        <div style={{ textAlign: "center", padding: "24px", maxWidth: "450px" }}>
          <div style={{ fontSize: "56px", marginBottom: "20px" }}>⚠️</div>
          <h3 style={{ fontSize: "24px", fontWeight: 700, margin: "0 0 12px 0", fontFamily: "Outfit, sans-serif" }}>Facility Context Required</h3>
          <p style={{ color: "#9ca3af", fontSize: "15px", lineHeight: "1.6" }}>
            To view the public queue display, please open it from the Clinic Dashboard or include a valid <code>facilityId</code> in the URL query parameters.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#0b0f19", color: "white" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ border: "4px solid rgba(255,255,255,0.1)", borderTop: "4px solid #3b82f6", borderRadius: "50%", width: "40px", height: "40px", animation: "spin 1s linear infinite", margin: "0 auto 16px auto" }} />
          <span style={{ fontSize: "16px", fontWeight: 500, fontFamily: "sans-serif" }}>Loading queue dashboard...</span>
        </div>
        <style dangerouslySetInnerHTML={{ __html: `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }` }} />
      </div>
    );
  }

  return (
    <div className="queue-display-container">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;900&family=Sora:wght@400;600;700;800&display=swap');
        
        .queue-display-container {
          background: radial-gradient(circle at 50% 0%, #111827 0%, #070a13 100%);
          color: #f3f4f6;
          min-height: 100vh;
          font-family: 'Outfit', sans-serif;
          display: flex;
          flex-direction: column;
          padding: 24px;
          box-sizing: border-box;
          overflow: hidden;
        }

        .kiosk-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 20px;
          margin-bottom: 24px;
        }

        .kiosk-title-block {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .kiosk-logo {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
        }

        .kiosk-title {
          font-family: 'Sora', sans-serif;
          font-size: 26px;
          font-weight: 800;
          letter-spacing: -0.5px;
          background: linear-gradient(to right, #ffffff, #9ca3af);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
        }

        .kiosk-subtitle {
          font-size: 13px;
          color: #3b82f6;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-top: 2px;
        }

        .kiosk-time {
          font-size: 20px;
          font-weight: 600;
          color: #9ca3af;
          background: rgba(255, 255, 255, 0.04);
          padding: 8px 16px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .kiosk-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 24px;
          flex: 1;
          min-height: 0;
        }

        .kiosk-main-panel {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 28px;
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          box-shadow: inset 0 0 40px rgba(255,255,255,0.01);
          position: relative;
          backdrop-filter: blur(12px);
        }

        .pulse-glowing {
          position: absolute;
          inset: 0;
          border-radius: 28px;
          border: 2px solid #3b82f6;
          opacity: 0.15;
          pointer-events: none;
          animation: pulseGlow 2s infinite ease-in-out;
        }

        @keyframes pulseGlow {
          0% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.01); opacity: 0.3; }
          100% { transform: scale(1); opacity: 0.15; }
        }

        .now-calling-lbl {
          font-size: 18px;
          font-weight: 700;
          color: #3b82f6;
          text-transform: uppercase;
          letter-spacing: 4px;
          margin-bottom: 24px;
        }

        .main-ticket-num {
          font-family: 'Sora', sans-serif;
          font-size: 120px;
          font-weight: 800;
          color: #ffffff;
          line-height: 1;
          margin: 0;
          letter-spacing: -2px;
          text-shadow: 0 0 40px rgba(255, 255, 255, 0.2);
          animation: scaleUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes scaleUp {
          0% { transform: scale(0.85); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .proceed-to-lbl {
          font-size: 20px;
          color: #9ca3af;
          margin: 30px 0 10px 0;
          font-weight: 500;
        }

        .main-room-name {
          font-size: 48px;
          font-weight: 700;
          color: #10b981;
          background: rgba(16, 185, 129, 0.1);
          padding: 12px 36px;
          border-radius: 20px;
          border: 1px solid rgba(16, 185, 129, 0.2);
          box-shadow: 0 0 30px rgba(16, 185, 129, 0.1);
        }

        .kiosk-side-panel {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .kiosk-sub-section {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 24px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          min-height: 0;
          flex: 1;
        }

        .sub-section-header {
          font-family: 'Sora', sans-serif;
          font-size: 16px;
          font-weight: 700;
          text-transform: uppercase;
          color: #9ca3af;
          letter-spacing: 1.5px;
          margin-bottom: 16px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding-bottom: 10px;
        }

        .kiosk-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          overflow-y: auto;
          flex: 1;
        }

        .recent-call-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.04);
          padding: 12px 20px;
          border-radius: 16px;
        }

        .recent-ticket {
          font-size: 20px;
          font-weight: 700;
          font-family: 'Sora', sans-serif;
          color: #ffffff;
        }

        .recent-room {
          font-size: 16px;
          font-weight: 600;
          color: #10b981;
          background: rgba(16, 185, 129, 0.08);
          padding: 4px 12px;
          border-radius: 8px;
        }

        .waiting-badge-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
          gap: 10px;
          overflow-y: auto;
          flex: 1;
        }

        .waiting-badge {
          background: rgba(59, 130, 246, 0.08);
          border: 1px solid rgba(59, 130, 246, 0.15);
          color: #93c5fd;
          font-family: 'Sora', sans-serif;
          font-size: 16px;
          font-weight: 700;
          text-align: center;
          padding: 8px;
          border-radius: 10px;
        }

        .tts-banner {
          background: rgba(245, 158, 11, 0.08);
          border: 1px solid rgba(245, 158, 11, 0.15);
          border-radius: 12px;
          padding: 10px 16px;
          font-size: 12px;
          color: #f59e0b;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 16px;
          cursor: pointer;
        }
      ` }} />

      {/* HEADER */}
      <div className="kiosk-header">
        <div className="kiosk-title-block">
          <div className="kiosk-logo">
            <svg viewBox="0 0 20 20" width={24} height={24} fill="white">
              <path d="M10 2a1 1 0 0 1 1 1v1h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3V3a1 1 0 0 1 1-1zm0 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
            </svg>
          </div>
          <div>
            <h1 className="kiosk-title">HealthBridge Clinic</h1>
            <div className="kiosk-subtitle">Live Waiting Room Queue</div>
          </div>
        </div>
        
        {/* Real-time Clock display */}
        <Clock />
      </div>

      {/* GRID LAYOUT */}
      <div className="kiosk-grid">
        {/* NOW CALLING PANEL */}
        <div className="kiosk-main-panel">
          {mainCall ? (
            <React.Fragment key={mainCall.id}>
              <div className="pulse-glowing" />
              <div className="now-calling-lbl">Now Calling</div>
              <h2 className="main-ticket-num">{mainCall.ticketNumber}</h2>
              <div className="proceed-to-lbl">Please proceed to</div>
              <div className="main-room-name">{mainCall.calledRoom || "Consultation Room 1"}</div>
              {mainCall.doctor && (
                <div style={{ marginTop: "24px", fontSize: "28px", fontWeight: 600, color: "#93c5fd", background: "rgba(59, 130, 246, 0.1)", padding: "8px 24px", borderRadius: "14px", border: "1px solid rgba(59, 130, 246, 0.2)" }}>
                  Dr. {mainCall.doctor.firstName} {mainCall.doctor.lastName}
                </div>
              )}
            </React.Fragment>
          ) : (
            <div>
              <div style={{ fontSize: "56px", marginBottom: "16px" }}>👋</div>
              <h3 style={{ fontSize: "28px", fontWeight: 600, color: "#9ca3af", margin: 0 }}>All caught up!</h3>
              <p style={{ color: "#6b7280", marginTop: "8px", fontSize: "16px" }}>No active tickets are currently being called.</p>
            </div>
          )}
        </div>

        {/* SIDE PANELS (History & Waiting) */}
        <div className="kiosk-side-panel">
          {/* Recent History */}
          <div className="kiosk-sub-section">
            <div className="sub-section-header">Recent Calls</div>
            <div className="kiosk-list">
              {historyCalls.length > 0 ? (
                historyCalls.map((item) => (
                  <div key={item.id} className="recent-call-item" style={{ display: "flex", flexDirection: "column", alignItems: "stretch", gap: 6 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                      <span className="recent-ticket">{item.ticketNumber}</span>
                      <span className="recent-room">{item.calledRoom || "Room"}</span>
                    </div>
                    {item.doctor && (
                      <div style={{ fontSize: "14px", color: "#93c5fd", alignSelf: "flex-end", fontWeight: 600 }}>
                        Dr. {item.doctor.firstName} {item.doctor.lastName}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#4b5563", fontSize: "14px" }}>
                  No previous tickets.
                </div>
              )}
            </div>
          </div>

          {/* Waiting Queue */}
          <div className="kiosk-sub-section">
            <div className="sub-section-header">Waiting Lobby ({waitingTickets.length})</div>
            <div className="waiting-badge-grid">
              {waitingTickets.length > 0 ? (
                waitingTickets.map((item) => (
                  <div key={item.id} className="waiting-badge">
                    {item.ticketNumber}
                  </div>
                ))
              ) : (
                <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#4b5563", fontSize: "14px" }}>
                  Lobby is empty.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* TTS / AUDIO ENABLE NOTICE BANNER */}
      <div 
        className="tts-banner" 
        onClick={() => {
          // Play a test sound to authorize audio contexts
          playChime();
          if (window.speechSynthesis) {
            const u = new SpeechSynthesisUtterance("Audio system activated");
            window.speechSynthesis.speak(u);
          }
        }}
      >
        <span style={{ fontSize: "16px" }}>🔊</span>
        <span>
          <strong>Sound System Active.</strong> Click this banner to play a test chime if audio announcements are muted.
        </span>
      </div>
    </div>
  );
}

// Clock Component to keep screen alive and showing current local time
function Clock() {
  const [time, setTime] = React.useState("");

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return <div className="kiosk-time">{time || "12:00:00 PM"}</div>;
}

export default function QueueDisplayPage() {
  return (
    <React.Suspense fallback={
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#0b0f19", color: "white" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ border: "4px solid rgba(255,255,255,0.1)", borderTop: "4px solid #3b82f6", borderRadius: "50%", width: "40px", height: "40px", animation: "spin 1s linear infinite", margin: "0 auto 16px auto" }} />
          <span style={{ fontSize: "16px", fontWeight: 500, fontFamily: "sans-serif" }}>Loading queue dashboard...</span>
        </div>
        <style dangerouslySetInnerHTML={{ __html: `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }` }} />
      </div>
    }>
      <QueueDisplayContent />
    </React.Suspense>
  );
}
