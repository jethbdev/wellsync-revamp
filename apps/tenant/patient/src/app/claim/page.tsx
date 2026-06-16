"use client";

import * as React from "react";
import Link from "next/link";
import { Button, ThemeToggle, Card, CardHeader, CardTitle, CardBody, Field, Input, Toast } from "@healthbridge/ui";
import { apiFetch, getTenantSlug } from "../../lib/api-client";

export default function PatientClaim() {
  const [claimToken, setClaimToken] = React.useState("");
  const [birthdate, setBirthdate] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const handleClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimToken || !birthdate || !email || !newPassword) return;
    setErrorMsg("");

    try {
      await apiFetch("/api/patient-portal/claim", {
        method: "POST",
        body: JSON.stringify({
          pin: claimToken,
          email,
          passwordHashOrPlain: newPassword,
          birthDate: birthdate
        })
      });

      setIsSuccess(true);
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err: any) {
      setErrorMsg(err.message);
    }
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

      <div style={{ width: "100%", maxWidth: "460px", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <Link href="/" style={{
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
            <span>MediStock EMR</span>
          </Link>
          <p style={{ fontSize: "14px", color: "var(--muted)", marginTop: "8px" }}>
            Claim Patient Invitation
          </p>
        </div>

        <Card style={{
          background: "var(--white)",
          backdropFilter: "blur(16px)",
          border: "1.5px solid var(--border)",
          boxShadow: "0 20px 50px rgba(108, 99, 255, 0.15)"
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
                <h3 style={{ fontFamily: "Sora, sans-serif", fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>Claim Verified!</h3>
                <p style={{ fontSize: "13px", color: "var(--muted)" }}>Your patient account has been verified. Redirecting to login...</p>
              </div>
            ) : (
              <form onSubmit={handleClaim}>
                {errorMsg && (
                  <div style={{
                    background: "rgba(239, 68, 68, 0.1)",
                    border: "1px solid rgb(239, 68, 68)",
                    color: "rgb(220, 38, 38)",
                    padding: "10px",
                    borderRadius: "6px",
                    fontSize: "13px",
                    marginBottom: "16px"
                  }}>
                    {errorMsg}
                  </div>
                )}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
                  
                  <Field label="EMR Claim Code (Invite Token)">
                    <Input
                      type="text"
                      value={claimToken}
                      onChange={(e) => setClaimToken(e.target.value)}
                      placeholder="e.g. P123456789"
                      required
                    />
                  </Field>

                  <Field label="Email Address">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. patient@healthbridge.dev"
                      required
                    />
                  </Field>

                  <Field label="Verify Your Birthdate (Security Challenge)">
                    <Input
                      type="date"
                      value={birthdate}
                      onChange={(e) => setBirthdate(e.target.value)}
                      required
                    />
                  </Field>

                  <Field label="Set Account Password">
                    <Input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                  </Field>

                </div>

                <Button type="submit" variant="primary" style={{ width: "100%", padding: "12px" }}>
                  Verify & Register Account
                </Button>
              </form>
            )}

            <div style={{ textAlign: "center", marginTop: "24px", fontSize: "12px" }}>
              <span style={{ color: "var(--muted)" }}>Already claimed? </span>
              <Link href="/login" style={{ color: "var(--accent)", fontWeight: 600, textDecoration: "none" }}>
                Sign in
              </Link>
            </div>

          </CardBody>
        </Card>
      </div>

    </div>
  );
}
