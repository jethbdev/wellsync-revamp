"use client";

import * as React from "react";
import { apiFetch } from "../../../lib/api-client";

interface OrgSettings {
  id: string;
  name: string;
  slug: string;
  type: string;
  billingEmail: string;
  allowCrossOrgReferrals: boolean;
  referralCapacityStatus: string;
  referralGeographicScope: string;
  acceptedReferralTypes: string;
  subscription: {
    billingPlan: string;
    maxStaffSeats: number;
    maxPatientRecords: number;
    maxStorageMb: number;
    customDomain: string | null;
    status: string;
    trialEndsAt: string | null;
  } | null;
  usage: {
    staffCount: number;
    patientCount: number;
    storageMb: number;
  };
}

export default function OrganizationSettingsPage() {
  const [settings, setSettings] = React.useState<OrgSettings | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");
  const [activeTab, setActiveTab] = React.useState<"general" | "referrals" | "subscription" | "branding" | "security" | "notifications" | "danger">("general");

  // General tab states (synced with DB)
  const [orgName, setOrgName] = React.useState("");
  const [billingEmail, setBillingEmail] = React.useState("");
  const [orgType, setOrgType] = React.useState("PRIVATE_CLINIC");
  
  // General tab local states (mocked/reference UI)
  const [orgLicense, setOrgLicense] = React.useState("DOH-VIS-2019-04471");
  const [orgTin, setOrgTin] = React.useState("006-742-118-000");
  const [orgPhone, setOrgPhone] = React.useState("+63 32 234 5678");
  const [orgAddress, setOrgAddress] = React.useState("Salinas Drive, Lahug");
  const [orgCity, setOrgCity] = React.useState("Cebu City");
  const [orgProvince, setOrgProvince] = React.useState("Central Visayas (Region VII)");
  const [orgZip, setOrgZip] = React.useState("6000");
  const [orgCountry, setOrgCountry] = React.useState("Philippines");
  const [orgTimezone, setOrgTimezone] = React.useState("(GMT+8) Asia/Manila");
  const [orgDateFormat, setOrgDateFormat] = React.useState("MM/DD/YYYY");
  const [orgLanguage, setOrgLanguage] = React.useState("English");

  // Subscription tab plan state (synced with DB)
  const [selectedPlan, setSelectedPlan] = React.useState("FREE_TRIAL");
  
  // Branding tab states (mocked/reference UI)
  const [accentColor, setAccentColor] = React.useState("#6c63ff");
  const [displayName, setDisplayName] = React.useState("HealthBridge Unit");
  const [tagline, setTagline] = React.useState("Caring for you, one record at a time");

  // Security tab states (mocked/reference UI)
  const [require2fa, setRequire2fa] = React.useState(true);
  const [allowGoogleSso, setAllowGoogleSso] = React.useState(true);
  const [autoLockIdle, setAutoLockIdle] = React.useState(true);
  const [sessionTimeout, setSessionTimeout] = React.useState("30 minutes");
  const [minPasswordLength, setMinPasswordLength] = React.useState("10 characters");
  const [passwordExpiry, setPasswordExpiry] = React.useState("Every 180 days");
  const [enableAuditLogging, setEnableAuditLogging] = React.useState(true);
  const [notifyBulkExports, setNotifyBulkExports] = React.useState(true);

  // Notifications tab states (mocked/reference UI)
  const [criticalLabAlerts, setCriticalLabAlerts] = React.useState(true);
  const [maintenanceAnnouncements, setMaintenanceAnnouncements] = React.useState(true);
  const [weeklySummaryReport, setWeeklySummaryReport] = React.useState(false);
  const [patientAppointmentReminders, setPatientAppointmentReminders] = React.useState(true);

  // Fetch settings on mount
  React.useEffect(() => {
    async function loadSettings() {
      try {
        const data = await apiFetch<OrgSettings>("/api/organization/settings");
        setSettings(data);
        
        // Initialize form states
        setOrgName(data.name);
        setBillingEmail(data.billingEmail || "");
        setOrgType(data.type);
        if (data.subscription) {
          setSelectedPlan(data.subscription.billingPlan);
        }
      } catch (e) {
        console.error("Failed to load settings", e);
        showToast("Error loading organization settings");
      } finally {
        setIsLoading(false);
      }
    }
    loadSettings();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setIsSaving(true);
    try {
      const updatePayload = {
        name: orgName,
        billingEmail,
        type: orgType,
        allowCrossOrgReferrals: settings.allowCrossOrgReferrals,
        referralCapacityStatus: settings.referralCapacityStatus,
        referralGeographicScope: settings.referralGeographicScope,
        acceptedReferralTypes: settings.acceptedReferralTypes,
        billingPlan: selectedPlan,
      };

      await apiFetch<OrgSettings>("/api/organization/settings", {
        method: "PUT",
        body: JSON.stringify(updatePayload),
      });

      // Refetch full payload to update limits/stats in UI
      const refetched = await apiFetch<OrgSettings>("/api/organization/settings");
      setSettings(refetched);

      showToast("Organization settings saved successfully!");
    } catch (e) {
      console.error("Failed to save settings", e);
      showToast("Error saving organization settings");
    } finally {
      setIsSaving(false);
    }
  };

  const toggleCrossOrg = () => {
    setSettings((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        allowCrossOrgReferrals: !prev.allowCrossOrgReferrals,
      };
    });
  };

  const handleTypeToggle = (type: string) => {
    setSettings((prev) => {
      if (!prev) return null;
      let current = prev.acceptedReferralTypes;
      if (current === "ALL") {
        current = "CLINICAL,EMERGENCY,LABORATORY,DIAGNOSTIC,PHARMACY";
      }
      const parts = current.split(",").filter((t) => t.trim() !== "");
      let updated: string[];
      if (parts.includes(type)) {
        updated = parts.filter((t) => t !== type);
      } else {
        updated = [...parts, type];
      }
      const finalStr = updated.length === 5 ? "ALL" : updated.length === 0 ? "NONE" : updated.join(",");
      return { ...prev, acceptedReferralTypes: finalStr };
    });
  };

  const isTypeChecked = (type: string) => {
    if (!settings) return false;
    if (settings.acceptedReferralTypes === "ALL") return true;
    return settings.acceptedReferralTypes.split(",").includes(type);
  };

  const getPercentage = (used: number, max: number) => {
    if (max <= 0) return 0;
    const pct = (used / max) * 100;
    return Math.min(Math.round(pct * 10) / 10, 100);
  };

  if (isLoading || !settings) {
    return (
      <div className="panel active">
        <div className="panel-inner" style={{ textAlign: "center", padding: "40px" }}>
          <p style={{ fontFamily: "Sora, sans-serif", fontWeight: 600 }}>Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="panel active">
      <div className="panel-inner">
        
        {/* Page Header */}
        <div className="ph">
          <div className="ph-left">
            <h2>Organization Settings</h2>
            <p>Manage your organization's profile, branding, security, and notification preferences</p>
          </div>
        </div>

        {/* Multi-pane vertical layout matching emr3.html */}
        <div className="settings-layout">
          
          {/* Vertical Menu Sidebar */}
          <div className="settings-nav">
            <div
              className={`settings-nav-item ${activeTab === "general" ? "active" : ""}`}
              onClick={() => setActiveTab("general")}
            >
              <svg viewBox="0 0 15 15" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M2 13.5V4.5L7.5 1.5 13 4.5v9"/>
                <path d="M5.5 13.5V10h4v3.5"/>
                <path d="M4.5 6.5H6M9 6.5h1.5"/>
              </svg>
              General
            </div>
            <div
              className={`settings-nav-item ${activeTab === "referrals" ? "active" : ""}`}
              onClick={() => setActiveTab("referrals")}
            >
              <svg viewBox="0 0 15 15" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M7.5 13.5A6 6 0 1 0 7.5 1.5a6 6 0 0 0 0 12zM7.5 5v5M5 7.5h5"/>
              </svg>
              Referral Network
            </div>
            <div
              className={`settings-nav-item ${activeTab === "subscription" ? "active" : ""}`}
              onClick={() => setActiveTab("subscription")}
            >
              <svg viewBox="0 0 15 15" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M3.5 10.5h8m-8-3h8m-8-3h8M1.5 1.5h12v12h-12z"/>
              </svg>
              Subscription
            </div>
            <div
              className={`settings-nav-item ${activeTab === "branding" ? "active" : ""}`}
              onClick={() => setActiveTab("branding")}
            >
              <svg viewBox="0 0 15 15" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <circle cx="7.5" cy="7.5" r="6"/>
                <path d="M7.5 1.5a4.5 4.5 0 0 0 0 12 2 2 0 0 0 0-4 1.5 1.5 0 0 1 0-3 2 2 0 0 0 0-5z"/>
              </svg>
              Branding
            </div>
            <div
              className={`settings-nav-item ${activeTab === "security" ? "active" : ""}`}
              onClick={() => setActiveTab("security")}
            >
              <svg viewBox="0 0 15 15" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M7.5 1.5L2 4v4c0 3 2.5 5.5 5.5 6.5C10.5 13.5 13 11 13 8V4z"/>
              </svg>
              Security
            </div>
            <div
              className={`settings-nav-item ${activeTab === "notifications" ? "active" : ""}`}
              onClick={() => setActiveTab("notifications")}
            >
              <svg viewBox="0 0 15 15" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M7.5 1.5v.8a5 5 0 0 1 4 4.9v2.3l1 2H3l1-2V7.2a5 5 0 0 1 4-4.9V1.5z"/>
                <path d="M6 12.5a1.5 1.5 0 0 0 3 0"/>
              </svg>
              Notifications
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

          {/* Form and settings content view */}
          <div className="settings-content" style={{ flex: 1 }}>
            <form onSubmit={handleSave}>
              
              {/* TAB 1: GENERAL PROFILE */}
              <div className={`settings-pane ${activeTab === "general" ? "active" : ""}`}>
                <div className="form-wrap">
                  <div className="form-section">
                    <div className="form-section-title">Organization Profile</div>
                    
                    <div className="form-grid">
                      <div className="field">
                        <label>Organization Name</label>
                        <input
                          type="text"
                          required
                          value={orgName}
                          onChange={(e) => setOrgName(e.target.value)}
                          placeholder="e.g. WellSync Health Group"
                        />
                      </div>
                      <div className="field">
                        <label>Organization Type</label>
                        <select
                          value={orgType}
                          onChange={(e) => setOrgType(e.target.value)}
                        >
                          <option value="PRIVATE_CLINIC">Private Clinic / Group Practice</option>
                          <option value="GOVERNMENT_LGU">Government Hospital / Local Health Unit</option>
                          <option value="MULTI_SPECIALTY">Multi-Specialty Clinic Group</option>
                          <option value="HOSPITAL_NETWORK">Hospital Network</option>
                          <option value="SINGLE_CLINIC">Single Clinic</option>
                          <option value="DIAGNOSTIC_CENTER">Diagnostic Center Network</option>
                        </select>
                      </div>
                      <div className="field">
                        <label>Registration / License No.</label>
                        <input
                          type="text"
                          value={orgLicense}
                          onChange={(e) => setOrgLicense(e.target.value)}
                        />
                      </div>
                      <div className="field">
                        <label>Tax ID (TIN)</label>
                        <input
                          type="text"
                          value={orgTin}
                          onChange={(e) => setOrgTin(e.target.value)}
                        />
                      </div>
                      <div className="field">
                        <label>Primary Contact Email</label>
                        <input
                          type="email"
                          required
                          value={billingEmail}
                          onChange={(e) => setBillingEmail(e.target.value)}
                          placeholder="e.g. admin@wellsync.ph"
                        />
                      </div>
                      <div className="field">
                        <label>Contact Phone</label>
                        <input
                          type="tel"
                          value={orgPhone}
                          onChange={(e) => setOrgPhone(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <div className="form-section-title">Headquarters Address</div>
                    <div className="form-grid">
                      <div className="field" style={{ gridColumn: "1/-1" }}>
                        <label>Street Address</label>
                        <input
                          type="text"
                          value={orgAddress}
                          onChange={(e) => setOrgAddress(e.target.value)}
                        />
                      </div>
                      <div className="field">
                        <label>City</label>
                        <input
                          type="text"
                          value={orgCity}
                          onChange={(e) => setOrgCity(e.target.value)}
                        />
                      </div>
                      <div className="field">
                        <label>Province / Region</label>
                        <input
                          type="text"
                          value={orgProvince}
                          onChange={(e) => setOrgProvince(e.target.value)}
                        />
                      </div>
                      <div className="field">
                        <label>Postal Code</label>
                        <input
                          type="text"
                          value={orgZip}
                          onChange={(e) => setOrgZip(e.target.value)}
                        />
                      </div>
                      <div className="field">
                        <label>Country</label>
                        <select
                          value={orgCountry}
                          onChange={(e) => setOrgCountry(e.target.value)}
                        >
                          <option value="Philippines">Philippines</option>
                          <option value="United States">United States</option>
                          <option value="Singapore">Singapore</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-section" style={{ marginBottom: 0 }}>
                    <div className="form-section-title">Regional Preferences</div>
                    <div className="form-grid cols3">
                      <div className="field">
                        <label>Timezone</label>
                        <select
                          value={orgTimezone}
                          onChange={(e) => setOrgTimezone(e.target.value)}
                        >
                          <option value="(GMT+8) Asia/Manila">(GMT+8) Asia/Manila</option>
                          <option value="(GMT+9) Asia/Tokyo">(GMT+9) Asia/Tokyo</option>
                          <option value="(GMT-8) America/Los_Angeles">(GMT-8) America/Los_Angeles</option>
                        </select>
                      </div>
                      <div className="field">
                        <label>Date Format</label>
                        <select
                          value={orgDateFormat}
                          onChange={(e) => setOrgDateFormat(e.target.value)}
                        >
                          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                      </div>
                      <div className="field">
                        <label>Default Language</label>
                        <select
                          value={orgLanguage}
                          onChange={(e) => setOrgLanguage(e.target.value)}
                        >
                          <option value="English">English</option>
                          <option value="Cebuano (Bisaya)">Cebuano (Bisaya)</option>
                          <option value="Filipino">Filipino</option>
                        </select>
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
              </div>

              {/* TAB 2: REFERRAL NETWORK */}
              <div className={`settings-pane ${activeTab === "referrals" ? "active" : ""}`}>
                <div className="perm-group">
                  <div className="perm-group-header">
                    <div className="perm-group-icon g-purple">
                      <svg viewBox="0 0 15 15" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.5 13.5A6 6 0 1 0 7.5 1.5a6 6 0 0 0 0 12zM7.5 5v5M5 7.5h5"/></svg>
                    </div>
                    <div className="perm-group-name">Referral Network Opt-In</div>
                  </div>
                  <div className="perm-row">
                    <div className="perm-label">
                      <div className="perm-name">Enable Cross-Organization Referrals</div>
                      <div className="perm-desc">Allows other facilities on the HealthBridge network to refer patients and request data.</div>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={settings.allowCrossOrgReferrals}
                        onChange={toggleCrossOrg}
                      />
                      <div className="toggle-track"></div>
                      <div className="toggle-thumb"></div>
                    </label>
                  </div>
                </div>

                {settings.allowCrossOrgReferrals && (
                  <>
                    <div className="form-wrap" style={{ marginBottom: 16 }}>
                      <div className="form-section" style={{ margin: 0 }}>
                        <div className="form-section-title">Referral Network Capacity Status</div>
                        <p style={{ fontSize: "12px", color: "var(--muted)", marginBottom: 12 }}>
                          Broadcast your current referral acceptance volume and capacity guidelines to external clinics.
                        </p>
                        <div className="color-swatches" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                          <div
                            className={`select-card ${settings.referralCapacityStatus === "ACCEPTING" ? "active" : ""}`}
                            onClick={() => setSettings(prev => prev ? { ...prev, referralCapacityStatus: "ACCEPTING" } : null)}
                            style={{
                              border: settings.referralCapacityStatus === "ACCEPTING" ? "1.5px solid var(--accent)" : "1.5px solid var(--border-subtle)",
                              borderRadius: "var(--rsm)",
                              padding: 12,
                              cursor: "pointer",
                              textAlign: "center",
                              background: settings.referralCapacityStatus === "ACCEPTING" ? "rgba(108,99,255,0.04)" : "var(--surface)"
                            }}
                          >
                            <h4 style={{ fontSize: "12.5px", fontWeight: 700, marginBottom: 4, color: "var(--ink)" }}>Accepting Referrals</h4>
                            <p style={{ fontSize: "10px", color: "var(--muted)", margin: 0, lineHeight: 1.3 }}>Open for all clinical queries and laboratory transfers.</p>
                          </div>
                          <div
                            className={`select-card ${settings.referralCapacityStatus === "LIMITED" ? "active" : ""}`}
                            onClick={() => setSettings(prev => prev ? { ...prev, referralCapacityStatus: "LIMITED" } : null)}
                            style={{
                              border: settings.referralCapacityStatus === "LIMITED" ? "1.5px solid var(--accent)" : "1.5px solid var(--border-subtle)",
                              borderRadius: "var(--rsm)",
                              padding: 12,
                              cursor: "pointer",
                              textAlign: "center",
                              background: settings.referralCapacityStatus === "LIMITED" ? "rgba(108,99,255,0.04)" : "var(--surface)"
                            }}
                          >
                            <h4 style={{ fontSize: "12.5px", fontWeight: 700, marginBottom: 4, color: "var(--ink)" }}>Limited Capacity</h4>
                            <p style={{ fontSize: "10px", color: "var(--muted)", margin: 0, lineHeight: 1.3 }}>Accepting urgent cases or priority consultations only.</p>
                          </div>
                          <div
                            className={`select-card ${settings.referralCapacityStatus === "NOT_ACCEPTING" ? "active" : ""}`}
                            onClick={() => setSettings(prev => prev ? { ...prev, referralCapacityStatus: "NOT_ACCEPTING" } : null)}
                            style={{
                              border: settings.referralCapacityStatus === "NOT_ACCEPTING" ? "1.5px solid var(--accent)" : "1.5px solid var(--border-subtle)",
                              borderRadius: "var(--rsm)",
                              padding: 12,
                              cursor: "pointer",
                              textAlign: "center",
                              background: settings.referralCapacityStatus === "NOT_ACCEPTING" ? "rgba(108,99,255,0.04)" : "var(--surface)"
                            }}
                          >
                            <h4 style={{ fontSize: "12.5px", fontWeight: 700, marginBottom: 4, color: "var(--ink)" }}>Not Accepting</h4>
                            <p style={{ fontSize: "10px", color: "var(--muted)", margin: 0, lineHeight: 1.3 }}>Currently closed for incoming referral scheduling.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-wrap" style={{ marginBottom: 16 }}>
                      <div className="form-section" style={{ margin: 0 }}>
                        <div className="form-section-title">Geographic Scope</div>
                        <div className="field">
                          <label>Geographic Boundaries</label>
                          <select
                            value={settings.referralGeographicScope}
                            onChange={(e) => setSettings(prev => prev ? { ...prev, referralGeographicScope: e.target.value } : null)}
                          >
                            <option value="ANY">Any (No geographic restrictions)</option>
                            <option value="REGION">Same Region Only</option>
                            <option value="PROVINCE">Same Province Only</option>
                            <option value="MUNICIPALITY">Same Municipality Only</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="perm-group">
                      <div className="perm-group-header">
                        <div className="perm-group-icon g-blue">
                          <svg viewBox="0 0 15 15" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="1.5" width="11" height="12" rx="2"/><path d="M5 5.5h5M5 8h5M5 10.5h3"/></svg>
                        </div>
                        <div className="perm-group-name">Accepted Referral Categories</div>
                      </div>
                      <div className="perm-row">
                        <div className="perm-label">
                          <div className="perm-name">Clinical Consultation Referrals</div>
                          <div className="perm-desc">Accept patient transfers for clinical visits.</div>
                        </div>
                        <label className="toggle">
                          <input
                            type="checkbox"
                            checked={isTypeChecked("CLINICAL")}
                            onChange={() => handleTypeToggle("CLINICAL")}
                          />
                          <div className="toggle-track"></div>
                          <div className="toggle-thumb"></div>
                        </label>
                      </div>
                      <div className="perm-row">
                        <div className="perm-label">
                          <div className="perm-name">Emergency Cases &amp; Critical Transfers</div>
                          <div className="perm-desc">Accept emergency case transfers and referrals.</div>
                        </div>
                        <label className="toggle">
                          <input
                            type="checkbox"
                            checked={isTypeChecked("EMERGENCY")}
                            onChange={() => handleTypeToggle("EMERGENCY")}
                          />
                          <div className="toggle-track"></div>
                          <div className="toggle-thumb"></div>
                        </label>
                      </div>
                      <div className="perm-row">
                        <div className="perm-label">
                          <div className="perm-name">Laboratory &amp; Specimen Tests</div>
                          <div className="perm-desc">Accept order transfers for clinical laboratory tests.</div>
                        </div>
                        <label className="toggle">
                          <input
                            type="checkbox"
                            checked={isTypeChecked("LABORATORY")}
                            onChange={() => handleTypeToggle("LABORATORY")}
                          />
                          <div className="toggle-track"></div>
                          <div className="toggle-thumb"></div>
                        </label>
                      </div>
                      <div className="perm-row">
                        <div className="perm-label">
                          <div className="perm-name">Imaging &amp; Diagnostics</div>
                          <div className="perm-desc">Accept referrals for diagnostic checks (X-Ray, ECG, etc.).</div>
                        </div>
                        <label className="toggle">
                          <input
                            type="checkbox"
                            checked={isTypeChecked("DIAGNOSTIC")}
                            onChange={() => handleTypeToggle("DIAGNOSTIC")}
                          />
                          <div className="toggle-track"></div>
                          <div className="toggle-thumb"></div>
                        </label>
                      </div>
                      <div className="perm-row">
                        <div className="perm-label">
                          <div className="perm-name">Pharmacy Dispensing Vouchers</div>
                          <div className="perm-desc">Accept prescription voucher fulfillments.</div>
                        </div>
                        <label className="toggle">
                          <input
                            type="checkbox"
                            checked={isTypeChecked("PHARMACY")}
                            onChange={() => handleTypeToggle("PHARMACY")}
                          />
                          <div className="toggle-track"></div>
                          <div className="toggle-thumb"></div>
                        </label>
                      </div>
                    </div>
                  </>
                )}

                <div className="settings-save-bar">
                  <button type="button" className="btn btn-outline" onClick={() => showToast("Changes discarded")}>Discard</button>
                  <button type="submit" className="btn btn-primary" disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>

              {/* TAB 3: SUBSCRIPTION */}
              <div className={`settings-pane ${activeTab === "subscription" ? "active" : ""}`}>
                {settings.subscription && (
                  <>
                    <div className="form-wrap" style={{ marginBottom: 16 }}>
                      <div className="form-section" style={{ margin: 0 }}>
                        <div className="form-section-title">Organization Capacity Usage</div>
                        
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 12 }}>
                          {/* Active Staff Seats */}
                          <div style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)", borderRadius: "var(--rsm)", padding: 12 }}>
                            <div style={{ fontSize: "10px", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>Staff Seats</div>
                            <div style={{ fontFamily: "Sora, sans-serif", fontSize: "18px", fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>
                              {settings.usage.staffCount} <span style={{ fontSize: "11px", color: "var(--muted)", fontWeight: 500 }}>/ {settings.subscription.maxStaffSeats >= 9999 ? "Unlimited" : settings.subscription.maxStaffSeats}</span>
                            </div>
                            <div style={{ height: 4, background: "var(--border-subtle)", borderRadius: 2, overflow: "hidden", marginBottom: 6 }}>
                              <div style={{ height: "100%", width: `${getPercentage(settings.usage.staffCount, settings.subscription.maxStaffSeats)}%`, background: "var(--accent)", borderRadius: 2 }} />
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "var(--muted)" }}>
                              <span>Allocated Seats</span>
                              <span>{getPercentage(settings.usage.staffCount, settings.subscription.maxStaffSeats)}%</span>
                            </div>
                          </div>

                          {/* Patient Records */}
                          <div style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)", borderRadius: "var(--rsm)", padding: 12 }}>
                            <div style={{ fontSize: "10px", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>Patient Records</div>
                            <div style={{ fontFamily: "Sora, sans-serif", fontSize: "18px", fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>
                              {settings.usage.patientCount} <span style={{ fontSize: "11px", color: "var(--muted)", fontWeight: 500 }}>/ {settings.subscription.maxPatientRecords >= 999999 ? "Unlimited" : settings.subscription.maxPatientRecords}</span>
                            </div>
                            <div style={{ height: 4, background: "var(--border-subtle)", borderRadius: 2, overflow: "hidden", marginBottom: 6 }}>
                              <div style={{ height: "100%", width: `${getPercentage(settings.usage.patientCount, settings.subscription.maxPatientRecords)}%`, background: "var(--accent)", borderRadius: 2 }} />
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "var(--muted)" }}>
                              <span>Registered Patients</span>
                              <span>{getPercentage(settings.usage.patientCount, settings.subscription.maxPatientRecords)}%</span>
                            </div>
                          </div>

                          {/* Storage Limit */}
                          <div style={{ background: "var(--surface)", border: "1px solid var(--border-subtle)", borderRadius: "var(--rsm)", padding: 12 }}>
                            <div style={{ fontSize: "10px", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>Storage Used</div>
                            <div style={{ fontFamily: "Sora, sans-serif", fontSize: "18px", fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>
                              {settings.usage.storageMb} MB <span style={{ fontSize: "11px", color: "var(--muted)", fontWeight: 500 }}>/ {settings.subscription.maxStorageMb >= 102400 ? "100 GB" : `${settings.subscription.maxStorageMb} MB`}</span>
                            </div>
                            <div style={{ height: 4, background: "var(--border-subtle)", borderRadius: 2, overflow: "hidden", marginBottom: 6 }}>
                              <div style={{ height: "100%", width: `${getPercentage(settings.usage.storageMb, settings.subscription.maxStorageMb)}%`, background: "var(--accent)", borderRadius: 2 }} />
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "var(--muted)" }}>
                              <span>Diagnostic Data</span>
                              <span>{getPercentage(settings.usage.storageMb, settings.subscription.maxStorageMb)}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-wrap">
                      <div className="form-section" style={{ margin: 0 }}>
                        <div className="form-section-title">Select Subscription Plan</div>
                        <p style={{ fontSize: "12px", color: "var(--muted)", marginBottom: 12 }}>
                          Choose a tier matching your organization's staff count and record capacity requirements.
                        </p>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                          {/* FREE TRIAL */}
                          <div
                            onClick={() => setSelectedPlan("FREE_TRIAL")}
                            style={{
                              position: "relative",
                              border: selectedPlan === "FREE_TRIAL" ? "1.5px solid var(--accent)" : "1.5px solid var(--border-subtle)",
                              borderRadius: "var(--rsm)",
                              padding: 16,
                              cursor: "pointer",
                              background: selectedPlan === "FREE_TRIAL" ? "rgba(108,99,255,0.03)" : "var(--white)",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                              minHeight: 160,
                            }}
                          >
                            {settings.subscription.billingPlan === "FREE_TRIAL" && (
                              <div style={{ position: "absolute", top: 8, right: 8, fontSize: "8px", fontWeight: 700, background: "var(--accent)", color: "var(--white)", padding: "1px 4px", borderRadius: 8, textTransform: "uppercase" }}>Active</div>
                            )}
                            <div>
                              <div style={{ fontFamily: "Sora, sans-serif", fontSize: "13px", fontWeight: 700, color: "var(--ink)", marginBottom: 2 }}>Free Trial</div>
                              <div style={{ fontFamily: "Sora, sans-serif", fontSize: "16px", fontWeight: 800, color: "var(--ink)", marginBottom: 8 }}>$0<span style={{ fontSize: "10px", fontWeight: 500, color: "var(--muted)" }}> / mo</span></div>
                              <p style={{ fontSize: "10.5px", color: "var(--muted)", lineHeight: 1.3, margin: "0 0 12px 0" }}>For clinics testing EMR capabilities.</p>
                            </div>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 4, fontSize: "10px", color: "var(--ink)" }}>
                              <li style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                <svg width="10" height="10" viewBox="0 0 15 15" fill="none" stroke="currentColor"><path d="M1.5 7.5L5 11l8.5-8.5" /></svg>
                                5 Staff Seats
                              </li>
                              <li style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                <svg width="10" height="10" viewBox="0 0 15 15" fill="none" stroke="currentColor"><path d="M1.5 7.5L5 11l8.5-8.5" /></svg>
                                500 Patient Records
                              </li>
                            </ul>
                          </div>

                          {/* PROFESSIONAL */}
                          <div
                            onClick={() => setSelectedPlan("PROFESSIONAL")}
                            style={{
                              position: "relative",
                              border: selectedPlan === "PROFESSIONAL" ? "1.5px solid var(--accent)" : "1.5px solid var(--border-subtle)",
                              borderRadius: "var(--rsm)",
                              padding: 16,
                              cursor: "pointer",
                              background: selectedPlan === "PROFESSIONAL" ? "rgba(108,99,255,0.03)" : "var(--white)",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                              minHeight: 160,
                            }}
                          >
                            {settings.subscription.billingPlan === "PROFESSIONAL" && (
                              <div style={{ position: "absolute", top: 8, right: 8, fontSize: "8px", fontWeight: 700, background: "var(--accent)", color: "var(--white)", padding: "1px 4px", borderRadius: 8, textTransform: "uppercase" }}>Active</div>
                            )}
                            <div>
                              <div style={{ fontFamily: "Sora, sans-serif", fontSize: "13px", fontWeight: 700, color: "var(--ink)", marginBottom: 2 }}>Professional</div>
                              <div style={{ fontFamily: "Sora, sans-serif", fontSize: "16px", fontWeight: 800, color: "var(--ink)", marginBottom: 8 }}>$49<span style={{ fontSize: "10px", fontWeight: 500, color: "var(--muted)" }}> / mo</span></div>
                              <p style={{ fontSize: "10.5px", color: "var(--muted)", lineHeight: 1.3, margin: "0 0 12px 0" }}>Perfect for private group practices.</p>
                            </div>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 4, fontSize: "10px", color: "var(--ink)" }}>
                              <li style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                <svg width="10" height="10" viewBox="0 0 15 15" fill="none" stroke="currentColor"><path d="M1.5 7.5L5 11l8.5-8.5" /></svg>
                                20 Staff Seats
                              </li>
                              <li style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                <svg width="10" height="10" viewBox="0 0 15 15" fill="none" stroke="currentColor"><path d="M1.5 7.5L5 11l8.5-8.5" /></svg>
                                5,000 Patient Records
                              </li>
                            </ul>
                          </div>

                          {/* ENTERPRISE */}
                          <div
                            onClick={() => setSelectedPlan("ENTERPRISE")}
                            style={{
                              position: "relative",
                              border: selectedPlan === "ENTERPRISE" ? "1.5px solid var(--accent)" : "1.5px solid var(--border-subtle)",
                              borderRadius: "var(--rsm)",
                              padding: 16,
                              cursor: "pointer",
                              background: selectedPlan === "ENTERPRISE" ? "rgba(108,99,255,0.03)" : "var(--white)",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                              minHeight: 160,
                            }}
                          >
                            {settings.subscription.billingPlan === "ENTERPRISE" && (
                              <div style={{ position: "absolute", top: 8, right: 8, fontSize: "8px", fontWeight: 700, background: "var(--accent)", color: "var(--white)", padding: "1px 4px", borderRadius: 8, textTransform: "uppercase" }}>Active</div>
                            )}
                            <div>
                              <div style={{ fontFamily: "Sora, sans-serif", fontSize: "13px", fontWeight: 700, color: "var(--ink)", marginBottom: 2 }}>Enterprise</div>
                              <div style={{ fontFamily: "Sora, sans-serif", fontSize: "16px", fontWeight: 800, color: "var(--ink)", marginBottom: 8 }}>$199<span style={{ fontSize: "10px", fontWeight: 500, color: "var(--muted)" }}> / mo</span></div>
                              <p style={{ fontSize: "10.5px", color: "var(--muted)", lineHeight: 1.3, margin: "0 0 12px 0" }}>For hospitals and health networks.</p>
                            </div>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 4, fontSize: "10px", color: "var(--ink)" }}>
                              <li style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                <svg width="10" height="10" viewBox="0 0 15 15" fill="none" stroke="currentColor"><path d="M1.5 7.5L5 11l8.5-8.5" /></svg>
                                Unlimited Staff Seats
                              </li>
                              <li style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                <svg width="10" height="10" viewBox="0 0 15 15" fill="none" stroke="currentColor"><path d="M1.5 7.5L5 11l8.5-8.5" /></svg>
                                Unlimited Patients
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="settings-save-bar">
                  <button type="button" className="btn btn-outline" onClick={() => showToast("Changes discarded")}>Discard</button>
                  <button type="submit" className="btn btn-primary" disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>

              {/* TAB 4: BRANDING */}
              <div className={`settings-pane ${activeTab === "branding" ? "active" : ""}`}>
                <div className="form-wrap">
                  
                  {/* Logo block */}
                  <div className="form-section">
                    <div className="form-section-title">Logo</div>
                    <div className="logo-uploader">
                      <div className="logo-preview">
                        <svg viewBox="0 0 20 20" width="28" height="28" fill="white"><path d="M10 2a1 1 0 0 1 1 1v1h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3V3a1 1 0 0 1 1-1zm0 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"/></svg>
                      </div>
                      <div>
                        <button type="button" className="btn btn-outline" onClick={() => showToast("Logo upload coming soon")}>Upload Logo</button>
                        <p style={{ fontSize: "11px", color: "var(--faint)", marginTop: "8px", margin: "8px 0 0 0" }}>PNG or SVG, square aspect ratio recommended. Max 2MB.</p>
                      </div>
                    </div>
                  </div>

                  {/* Swatches color block */}
                  <div className="form-section">
                    <div className="form-section-title">Accent Color</div>
                    <p style={{ fontSize: "12px", color: "var(--muted)", marginBottom: "12px", margin: "0 0 12px 0" }}>Used for highlights, buttons, and active states across the EMR.</p>
                    <div className="color-swatches">
                      {[
                        { color: "#6c63ff", name: "Indigo (default)" },
                        { color: "#0ea5e9", name: "Sky Blue" },
                        { color: "#22c55e", name: "Green" },
                        { color: "#f59e0b", name: "Amber" },
                        { color: "#e03030", name: "Red" },
                        { color: "#7c3aed", name: "Violet" },
                        { color: "#ec4899", name: "Pink" },
                        { color: "#0f766e", name: "Teal" },
                      ].map((sw) => (
                        <div
                          key={sw.color}
                          className={`color-swatch ${accentColor === sw.color ? "selected" : ""}`}
                          style={{ background: sw.color }}
                          title={sw.name}
                          onClick={() => setAccentColor(sw.color)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Patient facing display fields */}
                  <div className="form-section" style={{ marginBottom: 0 }}>
                    <div className="form-section-title">Patient-Facing Display Name</div>
                    <div className="form-grid">
                      <div className="field">
                        <label>Display Name (shown on receipts &amp; SMS)</label>
                        <input
                          type="text"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          placeholder="e.g. WellSync Health"
                        />
                      </div>
                      <div className="field">
                        <label>Tagline</label>
                        <input
                          type="text"
                          value={tagline}
                          onChange={(e) => setTagline(e.target.value)}
                          placeholder="e.g. Caring for the Visayas"
                        />
                      </div>
                    </div>
                  </div>

                </div>
                
                <div className="settings-save-bar">
                  <button type="button" className="btn btn-outline" onClick={() => showToast("Changes discarded")}>Discard</button>
                  <button type="button" className="btn btn-primary" onClick={() => showToast("Branding settings saved successfully!")}>Save Changes</button>
                </div>
              </div>

              {/* TAB 5: SECURITY */}
              <div className={`settings-pane ${activeTab === "security" ? "active" : ""}`}>
                
                <div className="perm-group">
                  <div className="perm-group-header">
                    <div className="perm-group-icon g-purple">
                      <svg viewBox="0 0 15 15" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.5 1.5L2 4v4c0 3 2.5 5.5 5.5 6.5C10.5 13.5 13 11 13 8V4z"/></svg>
                    </div>
                    <div className="perm-group-name">Authentication</div>
                  </div>
                  <div className="perm-row">
                    <div className="perm-label">
                      <div className="perm-name">Require two-factor authentication (2FA)</div>
                      <div className="perm-desc">All staff must verify login with an OTP sent via SMS or authenticator app</div>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={require2fa}
                        onChange={(e) => {
                          setRequire2fa(e.target.checked);
                          showToast(e.target.checked ? "2FA enforcement enabled" : "2FA enforcement disabled");
                        }}
                      />
                      <div className="toggle-track"></div>
                      <div className="toggle-thumb"></div>
                    </label>
                  </div>
                  <div className="perm-row">
                    <div className="perm-label">
                      <div className="perm-name">Allow Google SSO sign-in</div>
                      <div className="perm-desc">Staff can sign in using their organization Google Workspace account</div>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={allowGoogleSso}
                        onChange={(e) => {
                          setAllowGoogleSso(e.target.checked);
                          showToast(e.target.checked ? "Google SSO enabled" : "Google SSO disabled");
                        }}
                      />
                      <div className="toggle-track"></div>
                      <div className="toggle-thumb"></div>
                    </label>
                  </div>
                  <div className="perm-row">
                    <div className="perm-label">
                      <div className="perm-name">Auto-lock idle sessions</div>
                      <div className="perm-desc">Automatically sign out users after a period of inactivity</div>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={autoLockIdle}
                        onChange={(e) => {
                          setAutoLockIdle(e.target.checked);
                          showToast(e.target.checked ? "Session auto-lock enabled" : "Session auto-lock disabled");
                        }}
                      />
                      <div className="toggle-track"></div>
                      <div className="toggle-thumb"></div>
                    </label>
                  </div>
                </div>

                <div className="perm-group">
                  <div className="perm-group-header">
                    <div className="perm-group-icon g-blue">
                      <svg viewBox="0 0 15 15" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="1.5" width="11" height="12" rx="2"/><path d="M5 5.5h5M5 8h5M5 10.5h3"/></svg>
                    </div>
                    <div className="perm-group-name">Session &amp; Password Policy</div>
                  </div>
                  <div className="perm-row">
                    <div className="perm-label">
                      <div className="perm-name">Session timeout</div>
                      <div className="perm-desc">Time of inactivity before a user is automatically logged out</div>
                    </div>
                    <select
                      value={sessionTimeout}
                      onChange={(e) => setSessionTimeout(e.target.value)}
                      style={{ border: "none", borderRadius: "var(--rsm)", padding: "7px 10px", fontSize: "12px", fontFamily: "var(--font-sans)", color: "var(--ink)", background: "var(--input-bg)", outline: "none" }}
                    >
                      <option>15 minutes</option>
                      <option>30 minutes</option>
                      <option>1 hour</option>
                      <option>4 hours</option>
                    </select>
                  </div>
                  <div className="perm-row">
                    <div className="perm-label">
                      <div className="perm-name">Minimum password length</div>
                      <div className="perm-desc">Applies to all new and updated staff passwords</div>
                    </div>
                    <select
                      value={minPasswordLength}
                      onChange={(e) => setMinPasswordLength(e.target.value)}
                      style={{ border: "none", borderRadius: "var(--rsm)", padding: "7px 10px", fontSize: "12px", fontFamily: "var(--font-sans)", color: "var(--ink)", background: "var(--input-bg)", outline: "none" }}
                    >
                      <option>8 characters</option>
                      <option>10 characters</option>
                      <option>12 characters</option>
                    </select>
                  </div>
                  <div className="perm-row">
                    <div className="perm-label">
                      <div className="perm-name">Password expiry</div>
                      <div className="perm-desc">Force staff to reset passwords periodically</div>
                    </div>
                    <select
                      value={passwordExpiry}
                      onChange={(e) => setPasswordExpiry(e.target.value)}
                      style={{ border: "none", borderRadius: "var(--rsm)", padding: "7px 10px", fontSize: "12px", fontFamily: "var(--font-sans)", color: "var(--ink)", background: "var(--input-bg)", outline: "none" }}
                    >
                      <option>Never</option>
                      <option>Every 90 days</option>
                      <option>Every 180 days</option>
                    </select>
                  </div>
                </div>

                <div className="perm-group" style={{ marginBottom: 0 }}>
                  <div className="perm-group-header">
                    <div className="perm-group-icon g-yellow">
                      <svg viewBox="0 0 15 15" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="1.5" width="11" height="12" rx="2"/><path d="M5 5.5h5M5 8h5M5 10.5h3"/></svg>
                    </div>
                    <div className="perm-group-name">Audit &amp; Compliance</div>
                  </div>
                  <div className="perm-row">
                    <div className="perm-label">
                      <div className="perm-name">Enable detailed audit logging</div>
                      <div className="perm-desc">Log every record view, edit, and export across the organization</div>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={enableAuditLogging}
                        onChange={(e) => {
                          setEnableAuditLogging(e.target.checked);
                          showToast(e.target.checked ? "Audit logging enabled" : "Audit logging disabled");
                        }}
                      />
                      <div className="toggle-track"></div>
                      <div className="toggle-thumb"></div>
                    </label>
                  </div>
                  <div className="perm-row">
                    <div className="perm-label">
                      <div className="perm-name">Notify admins of bulk data exports</div>
                      <div className="perm-desc">Send an alert when more than 50 records are exported at once</div>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={notifyBulkExports}
                        onChange={(e) => {
                          setNotifyBulkExports(e.target.checked);
                          showToast(e.target.checked ? "Bulk export alerts enabled" : "Bulk export alerts disabled");
                        }}
                      />
                      <div className="toggle-track"></div>
                      <div className="toggle-thumb"></div>
                    </label>
                  </div>
                </div>

                <div className="settings-save-bar">
                  <button type="button" className="btn btn-outline" onClick={() => showToast("Changes discarded")}>Discard</button>
                  <button type="button" className="btn btn-primary" onClick={() => showToast("Security settings saved successfully!")}>Save Changes</button>
                </div>
              </div>

              {/* TAB 6: NOTIFICATIONS */}
              <div className={`settings-pane ${activeTab === "notifications" ? "active" : ""}`}>
                <div className="perm-group" style={{ marginBottom: 0 }}>
                  <div className="perm-group-header">
                    <div className="perm-group-icon g-purple">
                      <svg viewBox="0 0 15 15" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.5 1.5v.8a5 5 0 0 1 4 4.9v2.3l1 2H3l1-2V7.2a5 5 0 0 1 4-4.9V1.5z"/><path d="M6 12.5a1.5 1.5 0 0 0 3 0"/></svg>
                    </div>
                    <div className="perm-group-name">Organization-Wide Alerts</div>
                  </div>
                  <div className="perm-row">
                    <div className="perm-label">
                      <div className="perm-name">Critical lab result notifications</div>
                      <div className="perm-desc">Notify the ordering physician and ward nurse immediately</div>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={criticalLabAlerts}
                        onChange={(e) => {
                          setCriticalLabAlerts(e.target.checked);
                          showToast(e.target.checked ? "Critical lab alerts enabled" : "Critical lab alerts disabled");
                        }}
                      />
                      <div className="toggle-track"></div>
                      <div className="toggle-thumb"></div>
                    </label>
                  </div>
                  <div className="perm-row">
                    <div className="perm-label">
                      <div className="perm-name">System maintenance announcements</div>
                      <div className="perm-desc">Email all admins before scheduled downtime</div>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={maintenanceAnnouncements}
                        onChange={(e) => {
                          setMaintenanceAnnouncements(e.target.checked);
                          showToast(e.target.checked ? "Maintenance announcements enabled" : "Maintenance announcements disabled");
                        }}
                      />
                      <div className="toggle-track"></div>
                      <div className="toggle-thumb"></div>
                    </label>
                  </div>
                  <div className="perm-row">
                    <div className="perm-label">
                      <div className="perm-name">Weekly summary report</div>
                      <div className="perm-desc">Email a weekly digest of patient volume, revenue, and alerts to admins</div>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={weeklySummaryReport}
                        onChange={(e) => {
                          setWeeklySummaryReport(e.target.checked);
                          showToast(e.target.checked ? "Weekly summary report enabled" : "Weekly summary report disabled");
                        }}
                      />
                      <div className="toggle-track"></div>
                      <div className="toggle-thumb"></div>
                    </label>
                  </div>
                  <div className="perm-row">
                    <div className="perm-label">
                      <div className="perm-name">Patient appointment reminders</div>
                      <div className="perm-desc">Send SMS reminders 24 hours before scheduled appointments</div>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={patientAppointmentReminders}
                        onChange={(e) => {
                          setPatientAppointmentReminders(e.target.checked);
                          showToast(e.target.checked ? "Appointment reminders enabled" : "Appointment reminders disabled");
                        }}
                      />
                      <div className="toggle-track"></div>
                      <div className="toggle-thumb"></div>
                    </label>
                  </div>
                </div>

                <div className="settings-save-bar">
                  <button type="button" className="btn btn-outline" onClick={() => showToast("Changes discarded")}>Discard</button>
                  <button type="button" className="btn btn-primary" onClick={() => showToast("Notification settings saved successfully!")}>Save Changes</button>
                </div>
              </div>

              {/* TAB 7: DANGER ZONE */}
              <div className={`settings-pane ${activeTab === "danger" ? "active" : ""}`}>
                <div className="danger-zone">
                  <div className="danger-row">
                    <div>
                      <div className="dr-title">Export all organization data</div>
                      <div className="dr-desc">Download a complete archive of patient records, billing, and audit logs</div>
                    </div>
                    <button type="button" className="btn btn-outline" onClick={() => showToast("Preparing data export…")}>Export Data</button>
                  </div>
                  <div className="danger-row">
                    <div>
                      <div className="dr-title">Transfer organization ownership</div>
                      <div className="dr-desc">Assign a new primary administrator for this organization</div>
                    </div>
                    <button type="button" className="btn btn-outline" onClick={() => showToast("Ownership transfer requires verification")}>Transfer Ownership</button>
                  </div>
                  <div className="danger-row">
                    <div>
                      <div className="dr-title">Deactivate organization</div>
                      <div className="dr-desc">Temporarily suspend access for all facilities and staff under this org</div>
                    </div>
                    <button type="button" className="btn btn-danger" onClick={() => showToast("Organization deactivation requires confirmation")}>Deactivate</button>
                  </div>
                  <div className="danger-row">
                    <div>
                      <div className="dr-title">Delete organization</div>
                      <div className="dr-desc">Permanently delete this organization and all associated data. This cannot be undone.</div>
                    </div>
                    <button type="button" className="btn btn-danger" onClick={() => showToast("Organization deletion requires confirmation")}>Delete Organization</button>
                  </div>
                </div>
              </div>

            </form>
          </div>

        </div>
      </div>

      {toastMessage && (
        <div className="settings-toast">{toastMessage}</div>
      )}
    </div>
  );
}
