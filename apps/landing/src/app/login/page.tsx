"use client";

import * as React from "react";
import Link from "next/link";
import { Button, ThemeToggle, Card, CardHeader, CardTitle, CardBody, Field, Input } from "@healthbridge/ui";

export default function LandingLogin() {
  const [selectedPortal, setSelectedPortal] = React.useState<"staff" | "patient" | "ops">("staff");

  const handleRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPortal === "staff") {
      window.location.href = "http://localhost:3000/login";
    } else if (selectedPortal === "patient") {
      window.location.href = "http://localhost:3002/login";
    } else if (selectedPortal === "ops") {
      window.location.href = "http://localhost:3001/login";
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
            <div className="logo-icon">
              <svg viewBox="0 0 20 20" style={{ width: 22, height: 22, fill: "white" }}>
                <path d="M10 2a1 1 0 0 1 1 1v1h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3V3a1 1 0 0 1 1-1zm0 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"/>
              </svg>
            </div>
            <span>MediStock</span>
          </Link>
          <p style={{ fontSize: "14px", color: "var(--muted)", marginTop: "8px" }}>
            Select your portal to sign in
          </p>
        </div>

        <Card style={{
          background: "var(--white)",
          backdropFilter: "blur(16px)",
          border: "1.5px solid var(--border)",
          boxShadow: "var(--card-shadow)"
        }}>
          <CardBody style={{ padding: "32px" }}>
            
            <form onSubmit={handleRedirect}>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
                
                {/* Staff option */}
                <div
                  onClick={() => setSelectedPortal("staff")}
                  style={{
                    padding: "16px",
                    borderRadius: "var(--rmd)",
                    border: `1.5px solid ${selectedPortal === "staff" ? "var(--accent)" : "var(--border)"}`,
                    background: selectedPortal === "staff" ? "var(--accent-light)" : "var(--white)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    transition: "all 0.2s"
                  }}
                >
                  <div style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    border: "2px solid var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    {selectedPortal === "staff" && <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "var(--accent)" }} />}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "14px", color: "var(--ink)" }}>Clinic / Pharmacy Staff</div>
                    <div style={{ fontSize: "11px", color: "var(--muted)" }}>Log in to dispense stock &amp; manage patients</div>
                  </div>
                </div>

                {/* Patient option */}
                <div
                  onClick={() => setSelectedPortal("patient")}
                  style={{
                    padding: "16px",
                    borderRadius: "var(--rmd)",
                    border: `1.5px solid ${selectedPortal === "patient" ? "var(--accent)" : "var(--border)"}`,
                    background: selectedPortal === "patient" ? "var(--accent-light)" : "var(--white)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    transition: "all 0.2s"
                  }}
                >
                  <div style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    border: "2px solid var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    {selectedPortal === "patient" && <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "var(--accent)" }} />}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "14px", color: "var(--ink)" }}>Patient Portal</div>
                    <div style={{ fontSize: "11px", color: "var(--muted)" }}>Claim prescriptions and schedule visits</div>
                  </div>
                </div>

                {/* Ops option */}
                <div
                  onClick={() => setSelectedPortal("ops")}
                  style={{
                    padding: "16px",
                    borderRadius: "var(--rmd)",
                    border: `1.5px solid ${selectedPortal === "ops" ? "var(--accent)" : "var(--border)"}`,
                    background: selectedPortal === "ops" ? "var(--accent-light)" : "var(--white)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    transition: "all 0.2s"
                  }}
                >
                  <div style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    border: "2px solid var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    {selectedPortal === "ops" && <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "var(--accent)" }} />}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "14px", color: "var(--ink)" }}>Platform Ops Admin</div>
                    <div style={{ fontSize: "11px", color: "var(--muted)" }}>Onboard clinics and review audit trails</div>
                  </div>
                </div>

              </div>

              <Button type="submit" variant="primary" style={{ width: "100%", padding: "12px" }}>
                Continue to Portal
              </Button>

            </form>

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
