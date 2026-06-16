"use client";

import * as React from "react";
import Link from "next/link";
import { Button, ThemeToggle, Card, CardBody, Field, Input, Toast } from "@healthbridge/ui";
import { authClient } from "../../lib/auth-client";
import { getTenantSlug, apiFetch } from "../../lib/api-client";

export default function PatientLogin() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const slug = getTenantSlug();
  const [isClient, setIsClient] = React.useState(false);
  const [orgDetails, setOrgDetails] = React.useState<any>(null);

  React.useEffect(() => {
    setIsClient(true);
    if (slug) {
      apiFetch<any>("/api/patient-portal/organization")
        .then((data) => setOrgDetails(data))
        .catch((err) => console.error("Failed to load organization details", err));
    }
  }, [slug]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setErrorMsg("");

    try {
      const result = await authClient.signIn.email({ email, password });
      if (result.error) throw new Error(result.error.message || "Invalid credentials");

      setIsSuccess(true);
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (err: any) {
      setErrorMsg(err.message || "Invalid credentials. Please try again.");
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

      <div style={{ width: "100%", maxWidth: "420px", position: "relative", zIndex: 1 }}>
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
            <span>HealthBridge Patient</span>
          </div>
          {orgDetails && (
            <div style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "15px",
              fontWeight: 600,
              color: "var(--accent)",
              marginTop: "8px"
            }}>
              {orgDetails.name}
            </div>
          )}
          <p style={{ fontSize: "13px", color: "var(--muted)", marginTop: orgDetails ? "4px" : "8px" }}>
            Secure Patient Portal
          </p>
        </div>

        <Card style={{
          background: "var(--white)",
          backdropFilter: "blur(16px)",
          boxShadow: "var(--card-shadow)"
        }}>
          <CardBody style={{ padding: "32px" }}>
            
            {(!isClient || !slug) ? (
              <div style={{ textAlign: "center", padding: "10px 0" }}>
                <div style={{
                  width: "56px", height: "56px", borderRadius: "50%",
                  background: "var(--warn-bg)", color: "var(--warn-text)",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "20px"
                }}>
                  <svg viewBox="0 0 15 15" style={{ width: 24, height: 24, fill: "none", stroke: "currentColor" }}>
                    <path d="M7.5 2.5v7M7.5 11.5h.01" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 style={{ fontFamily: "Sora, sans-serif", fontSize: "16px", fontWeight: 700, marginBottom: "12px", color: "var(--warn-text)" }}>
                  Tenant Context Required
                </h3>
                <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.6, marginBottom: "20px" }}>
                  Please access this Patient portal via your organization's custom subdomain:
                </p>
                <div style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--rsm)",
                  padding: "10px 14px",
                  fontSize: "12px",
                  fontFamily: "monospace",
                  color: "var(--ink)",
                  display: "inline-block",
                  width: "100%",
                  textAlign: "center"
                }}>
                  http://&lt;your-clinic-slug&gt;.localhost:3002/login
                </div>
                <p style={{ fontSize: "12px", color: "var(--muted)", marginTop: "16px" }}>
                  Example: <a href="http://cebu-clinic.localhost:3002/login" style={{ color: "var(--accent)", fontWeight: 600, textDecoration: "none" }}>http://cebu-clinic.localhost:3002/login</a>
                </p>
              </div>
            ) : isSuccess ? (
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
                <h3 style={{ fontFamily: "Sora, sans-serif", fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>Loading Dashboard...</h3>
                <p style={{ fontSize: "13px", color: "var(--muted)" }}>Connecting to secure health registry...</p>
              </div>
            ) : (
              <form onSubmit={handleLogin}>
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
                  <Field label="Email Address">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. juan.delacruz@gmail.com"
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
                </div>

                <Button type="submit" variant="primary" style={{ width: "100%", padding: "12px" }}>
                  Sign In to Patient Portal
                </Button>
              </form>
            )}

            <div style={{ textAlign: "center", marginTop: "24px", fontSize: "12px" }}>
              <span style={{ color: "var(--muted)" }}>Received an invitation code? </span>
              <Link href="/claim" style={{ color: "var(--accent)", fontWeight: 600, textDecoration: "none" }}>
                Claim your account
              </Link>
            </div>

            <div style={{ textAlign: "center", marginTop: "16px", fontSize: "12px" }}>
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
