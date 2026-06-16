"use client";

import * as React from "react";
import Link from "next/link";
import { Button, ThemeToggle, Card, CardHeader, CardTitle, CardBody, Field, Input } from "@healthbridge/ui";

export default function OpsLogin() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [mfaCode, setMfaCode] = React.useState("");
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !mfaCode) return;

    setIsSuccess(true);
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      padding: "20px",
      overflow: "hidden",
      background: "var(--surface)"
    }}>
      {/* Background Orbs */}
      <div className="hero-bg" style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <div className="orb orb-1" style={{ top: "-10%", left: "-10%" }} />
        <div className="orb orb-2" style={{ bottom: "-10%", right: "-10%" }} />
      </div>
      <div className="hero-grid" style={{ position: "absolute", inset: 0, zIndex: 0 }} />

      <div style={{ position: "absolute", top: "20px", right: "20px", zIndex: 10 }}>
        <ThemeToggle />
      </div>

      <div style={{ width: "100%", maxWidth: "440px", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            fontFamily: "Sora, sans-serif",
            fontWeight: 700,
            fontSize: "24px",
            color: "var(--ink)",
            textDecoration: "none"
          }}>
            <div className="logo-icon">
              <svg viewBox="0 0 20 20" style={{ width: 22, height: 22, fill: "white" }}>
                <path d="M10 2a1 1 0 0 1 1 1v1h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3V3a1 1 0 0 1 1-1zm0 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"/>
              </svg>
            </div>
            <span>HealthBridge Ops</span>
          </div>
          <p style={{ fontSize: "14px", color: "var(--muted)", marginTop: "8px" }}>
            Control Plane System Management
          </p>
        </div>

        <Card style={{
          background: "var(--white)",
          backdropFilter: "blur(16px)",
          boxShadow: "var(--card-shadow)"
        }}>
          <CardBody style={{ padding: "32px" }}>
            
            {isSuccess ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "var(--accent-light)",
                  color: "var(--accent)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px"
                }}>
                  <svg viewBox="0 0 15 15" style={{ width: 24, height: 24 }}>
                    <path d="M2.5 7.5l3.5 3.5 6.5-6.5" stroke="currentColor" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 style={{ fontFamily: "Sora, sans-serif", fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>Verifying MFA Code...</h3>
                <p style={{ fontSize: "13px", color: "var(--muted)" }}>Authorizing root administrative access...</p>
              </div>
            ) : (
              <form onSubmit={handleLogin}>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
                  
                  <Field label="Admin Username / Email">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. system.root@healthbridge.ph"
                      required
                    />
                  </Field>

                  <Field label="Password">
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                  </Field>

                  <Field label="6-Digit Authenticator Code (MFA)">
                    <Input
                      type="text"
                      maxLength={6}
                      value={mfaCode}
                      onChange={(e) => setMfaCode(e.target.value)}
                      placeholder="e.g. 192837"
                      required
                    />
                  </Field>

                </div>

                <Button type="submit" variant="primary" style={{ width: "100%", padding: "12px" }}>
                  Elevate Permissions &amp; Login
                </Button>
              </form>
            )}

            <div style={{ textAlign: "center", marginTop: "24px", fontSize: "12px" }}>
              <a href="http://localhost:3003" style={{ color: "var(--muted)", textDecoration: "none" }}>
                ← Return to MediStock Landing
              </a>
            </div>

          </CardBody>
        </Card>
      </div>

    </div>
  );
}
