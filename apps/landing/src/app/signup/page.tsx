"use client";

import * as React from "react";
import Link from "next/link";
import { Button, ThemeToggle, Card, CardBody, Field, Input, Select } from "@healthbridge/ui";

export default function LandingSignup() {
  const [orgName, setOrgName] = React.useState("");
  const [orgType, setOrgType] = React.useState<"GOVERNMENT_LGU" | "PRIVATE_CLINIC">("PRIVATE_CLINIC");
  const [adminFirstName, setAdminFirstName] = React.useState("");
  const [adminLastName, setAdminLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [resultSlug, setResultSlug] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");

  // Live slug preview
  const slugPreview = orgName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName || !adminFirstName || !adminLastName || !email || !password) return;
    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("http://localhost:4001/api/provision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orgName,
          orgType,
          adminFirstName,
          adminLastName,
          adminEmail: email,
          adminPassword: password
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Provisioning failed");

      setResultSlug(data.slug);
      setIsSuccess(true);

      setTimeout(() => {
        window.location.href = data.loginUrl;
      }, 2500);
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
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
      <div className="hero-bg" style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <div className="orb orb-1" style={{ top: "-10%", left: "-10%" }} />
        <div className="orb orb-2" style={{ bottom: "-10%", right: "-10%" }} />
      </div>
      <div className="hero-grid" style={{ position: "absolute", inset: 0, zIndex: 0 }} />

      <div style={{ position: "absolute", top: "20px", right: "20px", zIndex: 10 }}>
        <ThemeToggle />
      </div>

      <div style={{ width: "100%", maxWidth: "480px", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <Link href="/" style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "24px",
            color: "var(--ink)", textDecoration: "none"
          }}>
            <div className="logo-icon">
              <svg viewBox="0 0 20 20" style={{ width: 22, height: 22, fill: "white" }}>
                <path d="M10 2a1 1 0 0 1 1 1v1h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3V3a1 1 0 0 1 1-1zm0 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"/>
              </svg>
            </div>
            <span>MediStock</span>
          </Link>
          <p style={{ fontSize: "14px", color: "var(--muted)", marginTop: "8px" }}>
            Register your healthcare facility — free to start
          </p>
        </div>

        <Card style={{
          background: "var(--white)",
          backdropFilter: "blur(16px)",
          border: "1.5px solid var(--border)",
          boxShadow: "var(--card-shadow)"
        }}>
          <CardBody style={{ padding: "32px" }}>
            {isSuccess ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{
                  width: "56px", height: "56px", borderRadius: "50%",
                  background: "var(--accent-light)", color: "var(--accent)",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "20px"
                }}>
                  <svg viewBox="0 0 15 15" style={{ width: 24, height: 24 }}>
                    <path d="M2.5 7.5l3.5 3.5 6.5-6.5" stroke="currentColor" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 style={{ fontFamily: "Sora, sans-serif", fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>
                  {orgName} is live!
                </h3>
                <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "12px" }}>
                  Your clinic EMR has been provisioned. Redirecting to your login...
                </p>
                <div style={{
                  display: "inline-block",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--rsm)",
                  padding: "6px 12px",
                  fontSize: "12px",
                  fontFamily: "monospace",
                  color: "var(--accent)"
                }}>
                  tenant: {resultSlug}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {errorMsg && (
                  <div style={{
                    background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgb(239,68,68)",
                    color: "rgb(220,38,38)",
                    padding: "10px 12px",
                    borderRadius: "6px",
                    fontSize: "13px",
                    marginBottom: "16px"
                  }}>
                    {errorMsg}
                  </div>
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
                  <Field label="Clinic / Facility Name">
                    <Input
                      type="text"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      placeholder="e.g. Quezon City Health Center"
                      required
                    />
                    {slugPreview && (
                      <p style={{ fontSize: "11px", color: "var(--muted)", marginTop: "4px" }}>
                        Your tenant ID: <span style={{ color: "var(--accent)", fontFamily: "monospace" }}>{slugPreview}</span>
                      </p>
                    )}
                  </Field>

                  <Field label="EMR Profile">
                    <Select
                      value={orgType}
                      onChange={(e) => setOrgType(e.target.value as any)}
                      options={[
                        { value: "PRIVATE_CLINIC", label: "Private / Commercial Clinic" },
                        { value: "GOVERNMENT_LGU", label: "Government / Public Health (PSGC compliant)" },
                      ]}
                    />
                  </Field>

                  <div style={{ display: "flex", gap: "12px" }}>
                    <div style={{ flex: 1 }}>
                      <Field label="First Name">
                        <Input
                          type="text"
                          value={adminFirstName}
                          onChange={(e) => setAdminFirstName(e.target.value)}
                          placeholder="e.g. Maria"
                          required
                        />
                      </Field>
                    </div>
                    <div style={{ flex: 1 }}>
                      <Field label="Last Name">
                        <Input
                          type="text"
                          value={adminLastName}
                          onChange={(e) => setAdminLastName(e.target.value)}
                          placeholder="e.g. Santos"
                          required
                        />
                      </Field>
                    </div>
                  </div>

                  <Field label="Admin Email Address">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. admin@facility.ph"
                      required
                    />
                  </Field>

                  <Field label="Password">
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 8 characters"
                      required
                    />
                  </Field>
                </div>

                <Button type="submit" variant="primary" style={{ width: "100%", padding: "12px" }} disabled={isLoading}>
                  {isLoading ? "Provisioning your clinic EMR..." : "Create My Clinic EMR"}
                </Button>

                <p style={{ fontSize: "11px", color: "var(--muted)", textAlign: "center", marginTop: "12px" }}>
                  Free 30-day trial · No credit card required
                </p>
              </form>
            )}

            <div style={{ textAlign: "center", marginTop: "20px", fontSize: "12px" }}>
              <span style={{ color: "var(--muted)" }}>Already registered? </span>
              <Link href="/login" style={{ color: "var(--accent)", fontWeight: 600, textDecoration: "none" }}>
                Log in
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
