"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Button, ThemeToggle, Card, CardBody, Field, Input, Toast } from "@healthbridge/ui";
import { signInStaff, getStaffSession } from "../../lib/api/auth";
import { changePasswordFirst } from "../../lib/api/staff";
import { getTenantSlug, apiFetch } from "../../lib/api-client";


function LoginContent() {
  const searchParams = useSearchParams();
  const showRegisterBanner = searchParams.get("registered") === "true";
  const slug = getTenantSlug();
  const [isClient, setIsClient] = React.useState(false);
  const [orgDetails, setOrgDetails] = React.useState<any>(null);


  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  // First Login Gate states
  const [isFirstLoginGate, setIsFirstLoginGate] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [isChangingPassword, setIsChangingPassword] = React.useState(false);
  const [passwordSuccess, setPasswordSuccess] = React.useState(false);

  const [showToast, setShowToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");

  React.useEffect(() => {
    setIsClient(true);
    if (slug) {
      apiFetch<any>("/api/patient-portal/organization")
        .then((data) => setOrgDetails(data))
        .catch((err) => console.error("Failed to load organization details", err));
    }
  }, [slug]);


  React.useEffect(() => {
    if (showRegisterBanner) {
      setToastMessage("Registration successful! Log in to access your clinic EMR.");
      setShowToast(true);
    }
  }, [showRegisterBanner]);

  // Check if user is already logged in but requires first login password change
  React.useEffect(() => {
    let active = true;
    getStaffSession()
      .then((s) => {
        if (!active) return;
        if (s && (s.user as any).isFirstLogin) {
          setIsFirstLoginGate(true);
        }
      })
      .catch(() => {
        // Ignore session check errors on login screen
      });
    return () => {
      active = false;
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoading(true);
    setErrorMsg("");

    try {
      await signInStaff(email, password);
      
      // Immediately verify session to see if we need password configuration
      const s = await getStaffSession();
      if (s && (s.user as any).isFirstLogin) {
        setIsFirstLoginGate(true);
      } else {
        setIsSuccess(true);
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (newPassword.length < 6) {
      setErrorMsg("Password must be at least 6 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    setIsChangingPassword(true);

    try {
      await changePasswordFirst(newPassword);
      setPasswordSuccess(true);
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to update password. Please try again.");
    } finally {
      setIsChangingPassword(false);
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
          }}>
            <div className="logo-icon" style={{ background: "none" }}>
              <img src="/favicon.png" alt="Logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <span>Wellsync Staff</span>
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
            Staff portal access and clinic inventory synchronization
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
                  Please access this EMR portal via your organization's custom subdomain:
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
                  http://&lt;your-clinic-slug&gt;.localhost:3000/login
                </div>
                <p style={{ fontSize: "12px", color: "var(--muted)", marginTop: "16px" }}>
                  Example: <a href="http://cebu-clinic.localhost:3000/login" style={{ color: "var(--accent)", fontWeight: 600, textDecoration: "none" }}>http://cebu-clinic.localhost:3000/login</a>
                </p>
              </div>
            ) : isSuccess ? (
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
                <h3 style={{ fontFamily: "Sora, sans-serif", fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>Signing in...</h3>
                <p style={{ fontSize: "13px", color: "var(--muted)" }}>Verifying clinical credentials...</p>
              </div>
            ) : isFirstLoginGate ? (
              passwordSuccess ? (
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
                  <h3 style={{ fontFamily: "Sora, sans-serif", fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>Password Configured!</h3>
                  <p style={{ fontSize: "13px", color: "var(--muted)" }}>Logging you into HealthBridge EMR...</p>
                </div>
              ) : (
                <form onSubmit={handleChangePassword}>
                  <h3 style={{ fontFamily: "Sora, sans-serif", fontSize: "18px", fontWeight: 700, marginBottom: "8px", color: "var(--ink)" }}>
                    Configure Your Password
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "20px", lineHeight: "1.5" }}>
                    Welcome to HealthBridge! Since this is your first time logging in, you must update your password to secure your account.
                  </p>

                  {errorMsg && (
                    <div style={{
                      background: "rgba(239, 68, 68, 0.1)",
                      border: "1px solid rgb(239, 68, 68)",
                      color: "rgb(220, 38, 38)",
                      padding: "10px 12px",
                      borderRadius: "6px",
                      fontSize: "13px",
                      marginBottom: "16px"
                    }}>
                      {errorMsg}
                    </div>
                  )}

                  <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
                    <Field label="New Password">
                      <Input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter at least 6 characters"
                        required
                      />
                    </Field>

                    <Field label="Confirm Password">
                      <Input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your new password"
                        required
                      />
                    </Field>
                  </div>

                  <Button type="submit" variant="primary" style={{ width: "100%", padding: "12px" }} disabled={isChangingPassword}>
                    {isChangingPassword ? "Saving..." : "Save & Continue"}
                  </Button>
                </form>
              )
            ) : (
              <form onSubmit={handleLogin}>
                {errorMsg && (
                  <div style={{
                    background: "rgba(239, 68, 68, 0.1)",
                    border: "1px solid rgb(239, 68, 68)",
                    color: "rgb(220, 38, 38)",
                    padding: "10px 12px",
                    borderRadius: "6px",
                    fontSize: "13px",
                    marginBottom: "16px"
                  }}>
                    {errorMsg}
                  </div>
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
                  <Field label="Staff Email Address">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. dr.santos@clinic.ph"
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

                <Button type="submit" variant="primary" style={{ width: "100%", padding: "12px" }} disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In to EMR"}
                </Button>
              </form>
            )}

            <div style={{ textAlign: "center", marginTop: "24px", fontSize: "12px" }}>
              <a href="http://localhost:3003" style={{ color: "var(--muted)", textDecoration: "none" }}>
                ← Return to HealthBridge Landing
              </a>
            </div>
          </CardBody>
        </Card>
      </div>

      <Toast message={toastMessage} isOpen={showToast} />
    </div>
  );
}

export default function TenantWebLogin() {
  return (
    <React.Suspense fallback={<div style={{ padding: 40 }}>Loading authentication...</div>}>
      <LoginContent />
    </React.Suspense>
  );
}

