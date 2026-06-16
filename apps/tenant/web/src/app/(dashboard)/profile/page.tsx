"use client";

import * as React from "react";
import { apiFetch } from "../../../lib/api-client";

interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string | null;
  contactNumber: string | null;
  image: string | null;
  mfaEnabled: boolean;
  role: { id: string; name: string };
  facility: { id: string; name: string } | null;
}

export default function UserProfilePage() {
  const [profile, setProfile] = React.useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");
  const [activeTab, setActiveTab] = React.useState<"info" | "picture" | "credentials" | "danger">("info");

  // Info tab states
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");
  const [contactNumber, setContactNumber] = React.useState("");

  // Picture tab states
  const [imageUrl, setImageUrl] = React.useState("");

  // Credentials tab states
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  // Fetch profile on mount
  React.useEffect(() => {
    async function loadProfile() {
      try {
        const data = await apiFetch<UserProfile>("/api/profile");
        setProfile(data);
        
        // Initialize form states
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setDisplayName(data.displayName || "");
        setContactNumber(data.contactNumber || "");
        setImageUrl(data.image || "");
      } catch (e) {
        console.error("Failed to load profile", e);
        showToast("Error loading user profile");
      } finally {
        setIsLoading(false);
      }
    }
    loadProfile();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleSaveInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setIsSaving(true);
    try {
      const updatePayload = {
        firstName,
        lastName,
        displayName: displayName || `${firstName} ${lastName}`,
        contactNumber,
      };

      const updated = await apiFetch<UserProfile>("/api/profile", {
        method: "PUT",
        body: JSON.stringify(updatePayload),
      });

      setProfile(prev => prev ? { ...prev, ...updated } : null);
      showToast("Profile details updated successfully!");
    } catch (e) {
      console.error("Failed to save profile", e);
      showToast("Error saving profile details");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSavePicture = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setIsSaving(true);
    try {
      const updatePayload = {
        image: imageUrl,
      };

      const updated = await apiFetch<UserProfile>("/api/profile", {
        method: "PUT",
        body: JSON.stringify(updatePayload),
      });

      setProfile(prev => prev ? { ...prev, ...updated } : null);
      showToast("Profile picture updated successfully!");
    } catch (e) {
      console.error("Failed to update profile picture", e);
      showToast("Error updating profile picture");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast("Passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      showToast("Password must be at least 6 characters");
      return;
    }
    setIsSaving(true);
    try {
      await apiFetch("/api/profile/change-password", {
        method: "POST",
        body: JSON.stringify({ newPassword }),
      });
      showToast("Password updated successfully!");
      setNewPassword("");
      setConfirmPassword("");
    } catch (e) {
      console.error("Failed to update password", e);
      showToast("Error updating password");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !profile) {
    return (
      <div className="panel active">
        <div className="panel-inner" style={{ textAlign: "center", padding: "40px" }}>
          <p style={{ fontFamily: "Sora, sans-serif", fontWeight: 600 }}>Loading profile...</p>
        </div>
      </div>
    );
  }

  // Get initials for profile picture fallback
  const fallbackInitials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  return (
    <div className="panel active">
      <div className="panel-inner">
        
        {/* Page Header */}
        <div className="ph">
          <div className="ph-left">
            <h2>User Profile</h2>
            <p>Manage your personal details, credentials, and profile settings</p>
          </div>
        </div>

        {/* Multi-pane vertical layout matching org settings */}
        <div className="settings-layout">
          
          {/* Vertical Menu Sidebar */}
          <div className="settings-nav">
            <div
              className={`settings-nav-item ${activeTab === "info" ? "active" : ""}`}
              onClick={() => setActiveTab("info")}
            >
              <svg viewBox="0 0 15 15" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <circle cx="7.5" cy="5" r="3"/>
                <path d="M1 14c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6"/>
              </svg>
              Information
            </div>
            <div
              className={`settings-nav-item ${activeTab === "picture" ? "active" : ""}`}
              onClick={() => setActiveTab("picture")}
            >
              <svg viewBox="0 0 15 15" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <rect x="1.5" y="1.5" width="12" height="12" rx="1.5"/>
                <circle cx="5.5" cy="5.5" r="1.5"/>
                <path d="M1.5 11.5l3.5-3.5 4.5 4.5M8.5 8.5l3 3"/>
              </svg>
              Profile Picture
            </div>
            <div
              className={`settings-nav-item ${activeTab === "credentials" ? "active" : ""}`}
              onClick={() => setActiveTab("credentials")}
            >
              <svg viewBox="0 0 15 15" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <rect x="2.5" y="6.5" width="10" height="7" rx="1.5"/>
                <path d="M4.5 6.5V4a3 3 0 0 1 6 0v2.5"/>
              </svg>
              Credentials
            </div>
            <div
              className={`settings-nav-item ${activeTab === "danger" ? "active" : ""}`}
              onClick={() => setActiveTab("danger")}
            >
              <svg viewBox="0 0 15 15" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M7.5 1.5l6 11h-12z"/>
                <path d="M7.5 6v2.5M7.5 11h.01"/>
              </svg>
              Danger Zone
            </div>
          </div>

          {/* Content Pane */}
          <div className="settings-content" style={{ flex: 1 }}>
            
            {/* TAB 1: PROFILE INFORMATION */}
            {activeTab === "info" && (
              <form onSubmit={handleSaveInfo}>
                <div className="form-wrap">
                  <div className="form-section">
                    <div className="form-section-title">Personal Details</div>
                    
                    <div className="form-grid">
                      <div className="field">
                        <label>First Name</label>
                        <input
                          type="text"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div className="field">
                        <label>Last Name</label>
                        <input
                          type="text"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                      <div className="field">
                        <label>Display Name (shown on records)</label>
                        <input
                          type="text"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          placeholder={`${firstName} ${lastName}`}
                        />
                      </div>
                      <div className="field">
                        <label>Contact Phone</label>
                        <input
                          type="tel"
                          value={contactNumber}
                          onChange={(e) => setContactNumber(e.target.value)}
                          placeholder="e.g. +63 917 123 4567"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-section" style={{ marginBottom: 0 }}>
                    <div className="form-section-title">Account Scope (Read-only)</div>
                    <div className="form-grid">
                      <div className="field">
                        <label>Email Address</label>
                        <input
                          type="text"
                          disabled
                          value={profile.email}
                        />
                      </div>
                      <div className="field">
                        <label>Assigned Role</label>
                        <input
                          type="text"
                          disabled
                          value={profile.role.name}
                        />
                      </div>
                      <div className="field" style={{ gridColumn: "1/-1" }}>
                        <label>Primary Assigned Facility</label>
                        <input
                          type="text"
                          disabled
                          value={profile.facility ? profile.facility.name : "System-wide Admin Access"}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="settings-save-bar">
                  <button type="button" className="btn btn-outline" onClick={() => showToast("Changes discarded")}>Discard</button>
                  <button type="submit" className="btn btn-primary" disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: PROFILE PICTURE */}
            {activeTab === "picture" && (
              <form onSubmit={handleSavePicture}>
                <div className="form-wrap">
                  <div className="form-section" style={{ marginBottom: 0 }}>
                    <div className="form-section-title">Avatar Image</div>
                    
                    <div className="logo-uploader" style={{ marginBottom: 20 }}>
                      <div
                        className="logo-preview"
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: "50%",
                          fontSize: "24px",
                          fontWeight: 700,
                          color: "white",
                          background: "var(--accent)",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundImage: imageUrl ? `url(${imageUrl})` : "none"
                        }}
                      >
                        {!imageUrl && fallbackInitials}
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <div className="field" style={{ marginBottom: 12 }}>
                          <label>Profile Picture URL</label>
                          <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="e.g. https://images.unsplash.com/photo-..."
                          />
                        </div>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button
                            type="button"
                            className="btn btn-outline"
                            onClick={() => setImageUrl("https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200&h=200")}
                          >
                            Set Demo Avatar
                          </button>
                          {imageUrl && (
                            <button
                              type="button"
                              className="btn btn-outline"
                              style={{ color: "var(--crit-text)" }}
                              onClick={() => setImageUrl("")}
                            >
                              Remove Picture
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="settings-save-bar">
                  <button type="button" className="btn btn-outline" onClick={() => showToast("Changes discarded")}>Discard</button>
                  <button type="submit" className="btn btn-primary" disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            )}

            {/* TAB 3: CREDENTIALS */}
            {activeTab === "credentials" && (
              <form onSubmit={handleChangePassword}>
                <div className="form-wrap">
                  <div className="form-section" style={{ marginBottom: 0 }}>
                    <div className="form-section-title">Change Password</div>
                    
                    <div className="form-grid">
                      <div className="field">
                        <label>New Password</label>
                        <input
                          type="password"
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="••••••••"
                        />
                      </div>
                      <div className="field">
                        <label>Confirm New Password</label>
                        <input
                          type="password"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="settings-save-bar">
                  <button type="button" className="btn btn-outline" onClick={() => showToast("Changes discarded")}>Discard</button>
                  <button type="submit" className="btn btn-primary" disabled={isSaving}>
                    {isSaving ? "Update Password" : "Update Password"}
                  </button>
                </div>
              </form>
            )}

            {/* TAB 4: DANGER ZONE */}
            {activeTab === "danger" && (
              <div className="danger-zone">
                <div className="danger-row">
                  <div>
                    <div className="dr-title">Deactivate Account</div>
                    <div className="dr-desc">Temporarily disable your profile, clinical access, and logouts all active devices</div>
                  </div>
                  <button type="button" className="btn btn-outline" style={{ color: "var(--crit-text)" }} onClick={() => showToast("Deactivation requires supervisor verification")}>Deactivate Account</button>
                </div>
                <div className="danger-row">
                  <div>
                    <div className="dr-title">Delete Account</div>
                    <div className="dr-desc">Permanently request deletion of credentials. Your audit logs and clinical entries will remain archived for compliance.</div>
                  </div>
                  <button type="button" className="btn btn-danger" onClick={() => showToast("Account deletion is disabled for system safety")}>Request Account Deletion</button>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

      {toastMessage && (
        <div className="settings-toast">{toastMessage}</div>
      )}
    </div>
  );
}
