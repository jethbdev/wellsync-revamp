"use client";

import * as React from "react";
import Link from "next/link";
import { Button, ThemeToggle, Card, CardBody, Field, Input } from "@healthbridge/ui";

export default function LandingLogin() {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [searched, setSearched] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [orgsList, setOrgsList] = React.useState<any[]>([]);

  const getBaseDomain = () => {
    if (typeof window === "undefined") return "localhost";
    return window.location.hostname.replace(/^(landing|www)\./, "");
  };

  const getRedirectUrl = (slug: string, role: string, userEmail: string) => {
    if (typeof window === "undefined") return "";
    const isDev = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    if (isDev) {
      const port = role === "staff" ? "3000" : "3002";
      return `http://localhost:${port}/login?tenant=${slug}&email=${encodeURIComponent(userEmail)}`;
    } else {
      const baseDomain = getBaseDomain();
      if (role === "staff") {
        return `https://${slug}.${baseDomain}/login?tenant=${slug}&email=${encodeURIComponent(userEmail)}`;
      } else {
        return `https://${slug}-patient.${baseDomain}/login?tenant=${slug}&email=${encodeURIComponent(userEmail)}`;
      }
    }
  };

  const getApiUrl = () => {
    if (typeof window === "undefined") return "";
    if (process.env.NEXT_PUBLIC_API_URL) {
      return process.env.NEXT_PUBLIC_API_URL;
    }
    const isDev = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    if (isDev) {
      return "http://localhost:4001";
    } else {
      return `https://api.${getBaseDomain()}`;
    }
  };

  const getOpsUrl = () => {
    if (typeof window === "undefined") return "";
    const isDev = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    if (isDev) {
      return "http://localhost:3001/login";
    } else {
      return `https://console.${getBaseDomain()}/login`;
    }
  };

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setErrorMsg("");

    try {
      const apiUrl = getApiUrl();
      const res = await fetch(`${apiUrl}/api/organizations/lookup?email=${encodeURIComponent(email)}`);
      if (!res.ok) throw new Error("Lookup failed");
      const data = await res.json();
      setOrgsList(data);
      setSearched(true);

      // If exactly 1 organization with 1 role, redirect instantly
      if (data.length === 1 && data[0].roles.length === 1) {
        const match = data[0];
        const role = match.roles[0];
        window.location.href = getRedirectUrl(match.slug, role, email);
      }
    } catch (err: any) {
      setErrorMsg("Failed to check email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOrgClick = (slug: string, role: string) => {
    window.location.href = getRedirectUrl(slug, role, email);
  };

  const handleReset = () => {
    setSearched(false);
    setOrgsList([]);
    setErrorMsg("");
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
      {/* Background elements */}
      <div className="hero-bg" style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <div className="orb orb-1" style={{ top: "-10%", left: "-10%" }} />
        <div className="orb orb-2" style={{ bottom: "-10%", right: "-10%" }} />
      </div>
      <div className="hero-grid" style={{ position: "absolute", inset: 0, zIndex: 0 }} />

      <div style={{ position: "absolute", top: "20px", right: "20px", zIndex: 10 }}>
        <ThemeToggle />
      </div>

      <div style={{ width: "100%", maxWidth: "440px", position: "relative", zIndex: 1 }}>
        
        {/* Brand */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
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
            <div className="logo-icon" style={{ background: "none" }}>
              <img src="/favicon.png" alt="Logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <span>Wellsync</span>
          </Link>
          <p style={{ fontSize: "14px", color: "var(--muted)", marginTop: "8px" }}>
            Sign in to your portal
          </p>
        </div>

        <Card style={{
          background: "var(--white)",
          backdropFilter: "blur(16px)",
          border: "1.5px solid var(--border)",
          boxShadow: "var(--card-shadow)"
        }}>
          <CardBody style={{ padding: "32px" }}>

            {errorMsg && (
              <div style={{
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgb(239, 68, 68)",
                color: "rgb(220, 38, 38)",
                padding: "10px",
                borderRadius: "6px",
                fontSize: "13px",
                marginBottom: "16px",
                textAlign: "center"
              }}>
                {errorMsg}
              </div>
            )}
            
            {!searched ? (
              <form onSubmit={handleLookup}>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "20px" }}>
                  <Field label="Enter your email address">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. staff@clinic.ph or patient@care.com"
                      required
                    />
                  </Field>
                </div>

                <Button type="submit" variant="primary" style={{ width: "100%", padding: "12px" }} disabled={loading}>
                  {loading ? "Checking accounts..." : "Continue"}
                </Button>

                <div style={{ textAlign: "center", marginTop: "24px", fontSize: "12px", borderTop: "1px solid var(--border-subtle)", paddingTop: "16px" }}>
                  <a href={getOpsUrl()} style={{ color: "var(--muted)", textDecoration: "none", fontWeight: 600 }}>
                    Are you a Platform Ops Admin? Sign in here
                  </a>
                </div>
              </form>
            ) : orgsList.length === 0 ? (
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "14px", color: "var(--muted)", marginBottom: "20px" }}>
                  No accounts found for <strong style={{ color: "var(--ink)" }}>{email}</strong>. Please check the email spelling or contact your administrator.
                </div>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <Button type="button" variant="primary" style={{ width: "100%", padding: "12px" }} onClick={handleReset}>
                    Try Another Email
                  </Button>
                  <Link href="/signup" className="btn btn-secondary" style={{ width: "100%", padding: "12px", textDecoration: "none", textAlign: "center", display: "block", boxSizing: "border-box" }}>
                    Register Clinic Free
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "16px" }}>
                  Choose an account to sign in as:
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                  {orgsList.map((org) =>
                    org.roles.map((role: string) => (
                      <div
                        key={`${org.slug}-${role}`}
                        onClick={() => handleOrgClick(org.slug, role)}
                        style={{
                          padding: "14px 16px",
                          borderRadius: "var(--rmd)",
                          border: "1.5px solid var(--border)",
                          background: "var(--surface)",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          transition: "all 0.15s"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "var(--accent)";
                          e.currentTarget.style.background = "var(--white)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "var(--border)";
                          e.currentTarget.style.background = "var(--surface)";
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 600, fontSize: "14px", color: "var(--ink)" }}>{org.name}</div>
                          <div style={{ fontSize: "11px", color: "var(--muted)" }}>
                            {role === "staff" ? "Clinic Staff Portal" : "Patient Portal"}
                          </div>
                        </div>
                        <div style={{ fontSize: "12px", color: "var(--accent)", fontWeight: 600 }}>
                          Sign in →
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <Button type="button" variant="ghost" style={{ width: "100%", padding: "12px" }} onClick={handleReset}>
                  ← Back to Email Entry
                </Button>
              </div>
            )}

            <div style={{ textAlign: "center", marginTop: "24px", fontSize: "12px" }}>
              <span style={{ color: "var(--muted)" }}>New clinic? </span>
              <Link href="/signup" style={{ color: "var(--accent)", fontWeight: 600, textDecoration: "none" }}>
                Register clinic free
              </Link>
            </div>

          </CardBody>
        </Card>
      </div>

    </div>
  );
}
