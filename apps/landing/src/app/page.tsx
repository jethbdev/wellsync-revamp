"use client";

import * as React from "react";
import Link from "next/link";
import { Button, ThemeToggle, Card, CardHeader, CardTitle, CardBody, Pill, Modal, Toast, Field, Input, Select } from "@healthbridge/ui";

export default function LandingHome() {
  // Demo panel switcher states (aligned with EMR)
  const [activeTab, setActiveTab] = React.useState<"dashboard" | "patients" | "schedule" | "alerts" | "records" | "newvisit">("dashboard");
  const [showDemoModal, setShowDemoModal] = React.useState(false);
  
  // Toast notifications in the interactive demo
  const [showToast, setShowToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");
  const [toastType, setToastType] = React.useState<"check" | "alert">("check");

  // Interactive Demo data state (matching EMR portal)
  const [patientsList, setPatientsList] = React.useState([
    { id: "MRN-0034812", name: "Juan Dela Cruz", age: 47, gender: "Male", phone: "+63 917 555 0191", status: "Active", condition: "Hypertension, Stage 2", lastVisit: "Jun 01, 2026", nextAppt: "Jun 14, 2026", dob: "Mar 15, 1978", blood: "O+", physician: "Dr. M. Santos", allergies: "Penicillin", bp: "142/88", hr: "78", temp: "36.8", spo2: "98", weight: "82", rr: "16" },
    { id: "MRN-0041207", name: "Maria Reyes", age: 61, gender: "Female", phone: "+63 918 555 0283", status: "Active", condition: "Diabetes Type 2", lastVisit: "May 28, 2026", nextAppt: "Jun 14, 2026", dob: "Jan 12, 1965", blood: "A+", physician: "Dr. M. Santos", allergies: "Sulfa Drugs", bp: "130/80", hr: "72", temp: "36.5", spo2: "99", weight: "68", rr: "14" },
    { id: "MRN-0028994", name: "Roberto Cruz", age: 55, gender: "Male", phone: "+63 919 555 0374", status: "Monitoring", condition: "Coronary Artery Disease", lastVisit: "Jun 10, 2026", nextAppt: "Jun 14, 2026", dob: "Nov 02, 1970", blood: "B+", physician: "Dr. M. Santos", allergies: "Aspirin", bp: "148/92", hr: "84", temp: "37.0", spo2: "96", weight: "88", rr: "18" },
    { id: "MRN-0052301", name: "Ana Villanueva", age: 34, gender: "Female", phone: "+63 920 555 0465", status: "New", condition: "Anxiety, Insomnia", lastVisit: "—", nextAppt: "Jun 14, 2026", dob: "Sep 25, 1991", blood: "AB+", physician: "Dr. M. Santos", allergies: "None", bp: "120/75", hr: "68", temp: "36.6", spo2: "100", weight: "54", rr: "12" }
  ]);

  const [selectedPatientId, setSelectedPatientId] = React.useState("MRN-0034812");
  const selectedPatient = patientsList.find(p => p.id === selectedPatientId) || patientsList[0];

  const [appointmentsList, setAppointmentsList] = React.useState([
    { id: "appt1", time: "9:00 AM", patientId: "MRN-0034812", type: "Follow-up", reason: "Hypertension management", status: "Checked in" },
    { id: "appt2", time: "9:30 AM", patientId: "MRN-0041207", type: "Follow-up", reason: "Diabetes type 2 check-up", status: "Waiting" },
    { id: "appt3", time: "10:15 AM", patientId: "MRN-0028994", type: "Urgent", reason: "Chest pain, shortness of breath", status: "In room" },
    { id: "appt4", time: "11:00 AM", patientId: "MRN-0052301", type: "New Patient", reason: "Initial consultation", status: "Scheduled" }
  ]);

  const [alertsList, setAlertsList] = React.useState([
    { id: "a1", type: "crit", title: "Insulin Glargine — critically low", desc: "4 units remaining · Minimum threshold: 20 units · Auto-reorder suggested", time: "Just now" },
    { id: "a2", type: "warn", title: "Amoxicillin 500mg — expiring soon", desc: "Batch #B2024-11 · Expires Jun 15 2026 · 18 days remaining", time: "5m ago" },
    { id: "a3", type: "warn", title: "Metformin 850mg — reorder due", desc: "Stock at 110 units · Reorder point: 150 units · Supplier: MedPharma", time: "1h ago" }
  ]);

  // Form states for new patient registration
  const [newRegName, setNewRegName] = React.useState("");
  const [newRegAge, setNewRegAge] = React.useState("");
  const [newRegGender, setNewRegGender] = React.useState("Male");
  const [newRegPhone, setNewRegPhone] = React.useState("");
  const [newRegDob, setNewRegDob] = React.useState("");
  const [newRegBlood, setNewRegBlood] = React.useState("O+");
  const [newRegAllergy, setNewRegAllergy] = React.useState("None");

  // Form states for SOAP consultation entry
  const [patientHeight, setPatientHeight] = React.useState("");
  const [patientWeight, setPatientWeight] = React.useState("");
  const [calculatedBmi, setCalculatedBmi] = React.useState<number | null>(null);
  const [soapNotes, setSoapNotes] = React.useState("");
  const [selectedIcd, setSelectedIcd] = React.useState("");
  const [prescribedMed, setPrescribedMed] = React.useState("");

  // BMI auto computer effect
  React.useEffect(() => {
    const h = parseFloat(patientHeight) / 100;
    const w = parseFloat(patientWeight);
    if (h > 0 && w > 0) {
      setCalculatedBmi(parseFloat((w / (h * h)).toFixed(1)));
    } else {
      setCalculatedBmi(null);
    }
  }, [patientHeight, patientWeight]);

  // Stats Counters
  const [clinicsCount, setClinicsCount] = React.useState(0);
  const [accuracyRate, setAccuracyRate] = React.useState(0);
  const [itemsTracked, setItemsTracked] = React.useState(0.0);
  const [wasteReduction, setWasteReduction] = React.useState(0);

  // Stats simulation on load
  React.useEffect(() => {
    let start = 0;
    const dur = 1500;
    const t0 = performance.now();

    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 4); // ease out quart
      setClinicsCount(Math.round(e * 1200));
      setAccuracyRate(Math.round(e * 99));
      setItemsTracked(parseFloat((e * 48).toFixed(1)));
      setWasteReduction(Math.round(e * 38));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  const triggerToast = (msg: string, type: "check" | "alert" = "check") => {
    setToastMessage(msg);
    setToastType(type);
    setShowToast(true);
  };

  React.useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleRegisterPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRegName || !newRegAge || !newRegPhone) {
      triggerToast("Please fill in name, age and phone number", "alert");
      return;
    }
    const newId = `MRN-00${Math.floor(10000 + Math.random() * 90000)}`;
    const newPat = {
      id: newId,
      name: newRegName,
      age: parseInt(newRegAge),
      gender: newRegGender,
      phone: newRegPhone,
      status: "Active",
      condition: "General Health Checkup",
      lastVisit: "Jun 14, 2026",
      nextAppt: "—",
      dob: newRegDob || "1980-01-01",
      blood: newRegBlood,
      physician: "Dr. M. Santos",
      allergies: newRegAllergy,
      bp: "120/80", hr: "72", temp: "36.6", spo2: "100", weight: "70", rr: "14"
    };

    setPatientsList([newPat, ...patientsList]);
    setSelectedPatientId(newId);
    setNewRegName("");
    setNewRegAge("");
    setNewRegPhone("");
    triggerToast(`Patient ${newRegName} successfully registered!`, "check");
    setActiveTab("patients");
  };

  const handleSaveSoap = (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast(`SOAP Consultation saved for ${selectedPatient.name}`, "check");
    setPatientHeight("");
    setPatientWeight("");
    setSoapNotes("");
    setSelectedIcd("");
    setPrescribedMed("");
    setActiveTab("dashboard");
  };

  const handleDismissAlert = (id: string) => {
    setAlertsList(alertsList.filter(a => a.id !== id));
    triggerToast("Alert dismissed from clinical logs", "check");
  };

  const handleResolveAlerts = () => {
    setAlertsList([]);
    triggerToast("All active clinical alerts resolved", "check");
  };

  return (
    <div style={{ background: "var(--white)", color: "var(--ink)", minHeight: "100vh", position: "relative" }}>
      
      {/* NAVIGATION BAR */}
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 5%",
        height: "64px",
        background: "var(--white)",
        opacity: 0.95,
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border-subtle)"
      }}>
        <Link href="/" className="nav-logo">
          <div className="logo-icon" style={{ background: "none" }}>
            <img src="/favicon.png" alt="Logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <span>Wellsync</span>
        </Link>
        
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#pricing">Pricing</a>
          <ThemeToggle />
          <Link href="/login" className="btn-nav" style={{ textDecoration: "none" }}>
            Sign In
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-bg">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
          <div className="hero-grid" />
        </div>
        
        <div className="hero-badge">
          <div className="badge-dot" />
          <span>Now with AI-powered stock predictions</span>
        </div>

        <h1>Health inventory that<br/><em>never misses a dose</em></h1>
        <p>MediStock keeps your clinic stocked, your records clean, and your team moving — all in one calm, intelligent platform.</p>
        
        <div className="hero-cta">
          <Link href="/signup" className="btn btn-primary">
            Start for free
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 8h10M9 4l4 4-4 4"/>
            </svg>
          </Link>
          <a href="#how" className="btn btn-secondary">Watch demo</a>
        </div>

        <div className="hero-trust">
          <div className="trust-avatars">
            <div className="trust-avatar" style={{ background: "var(--t400)" }}>JM</div>
            <div className="trust-avatar" style={{ background: "var(--t600)" }}>RA</div>
            <div className="trust-avatar" style={{ background: "var(--t800)" }}>KP</div>
            <div className="trust-avatar" style={{ background: "var(--t200)", color: "var(--t900)" }}>TL</div>
          </div>
          <div className="trust-text"><strong>{clinicsCount}+ clinics</strong> trust MediStock daily</div>
        </div>

        {/* HERO VISUAL MOCKUP */}
        <div className="hero-visual">
          <div className="mock-topbar">
            <div className="mock-dots">
              <div className="mock-dot" style={{ background: "#ff6058" }} />
              <div className="mock-dot" style={{ background: "#ffc130" }} />
              <div className="mock-dot" style={{ background: "#27ca40" }} />
            </div>
            <div className="mock-url">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M6 1a5 5 0 1 1 0 10A5 5 0 0 1 6 1zm0 0v10M1 6h10"/>
              </svg>
              <span>healthbridge.dev/dashboard</span>
            </div>
          </div>
          
          <div className="mock-body">
            <div className="mock-sidebar">
              <div className="mock-sidebar-section">Main</div>
              
              <div className="mock-sidebar-item active">
                <svg viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1.5" y="1.5" width="5" height="5" rx="1"/><rect x="8.5" y="1.5" width="5" height="5" rx="1"/><rect x="1.5" y="8.5" width="5" height="5" rx="1"/><rect x="8.5" y="8.5" width="5" height="5" rx="1"/></svg>
                <span>Dashboard</span>
              </div>

              <div className="mock-sidebar-item">
                <svg viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="7.5" cy="5" r="3"/><path d="M1 14c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6"/></svg>
                <span>Patients</span>
                <span className="mock-badge">147</span>
              </div>

              <div className="mock-sidebar-item">
                <svg viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1.5" y="2.5" width="12" height="11" rx="2"/><path d="M5 1.5v2M10 1.5v2M1.5 6.5h12"/></svg>
                <span>Schedule</span>
              </div>

              <div className="mock-sidebar-item">
                <svg viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7.5 1.5v.8a5 5 0 0 1 4 4.9v2.3l1 2H3l1-2V7.2A5 5 0 0 1 8 2.3V1.5z"/><path d="M6.5 12.5a1.5 1.5 0 0 0 3 0"/></svg>
                <span>Alerts</span>
                <span className="mock-badge warn">3</span>
              </div>

              <div className="mock-sidebar-section">Clinical</div>

              <div className="mock-sidebar-item">
                <svg viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="1.5" width="11" height="12" rx="2"/><path d="M5 5.5h5M5 8h5M5 10.5h3"/></svg>
                <span>Medical Records</span>
              </div>

              <div className="mock-sidebar-item">
                <svg viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1.5" y="1.5" width="12" height="12" rx="2"/><path d="M7.5 4.5v6M4.5 7.5h6"/></svg>
                <span>New Visit</span>
              </div>
            </div>
            
            <div className="mock-main">
              <div className="mock-grid">
                <div className="mock-stat">
                  <div className="mock-stat-label">Patients Today</div>
                  <div className="mock-stat-val">147</div>
                  <div className="mock-stat-change">↑ 3 from yesterday</div>
                </div>
                <div className="mock-stat">
                  <div className="mock-stat-label">Pending Labs</div>
                  <div className="mock-stat-val" style={{ color: "var(--warn-text)" }}>4</div>
                  <div className="mock-stat-change warn" style={{ color: "var(--warn-text)" }}>2 critical</div>
                </div>
                <div className="mock-stat">
                  <div className="mock-stat-label">Pending Rx</div>
                  <div className="mock-stat-val">12</div>
                  <div className="mock-stat-change">↓ 2 from avg</div>
                </div>
                <div className="mock-stat">
                  <div className="mock-stat-label">Upcoming Appts</div>
                  <div className="mock-stat-val">8</div>
                  <div className="mock-stat-change">Next: 9:00 AM</div>
                </div>
              </div>
              
              <div className="mock-chart-row">
                <div className="mock-chart">
                  <div className="mock-chart-title">Patient Admissions — last 7 days</div>
                  <div className="mock-bars">
                    <div className="mock-bar" style={{ height: "40%" }} />
                    <div className="mock-bar" style={{ height: "60%" }} />
                    <div className="mock-bar" style={{ height: "45%" }} />
                    <div className="mock-bar hi" style={{ height: "80%" }} />
                    <div className="mock-bar" style={{ height: "55%" }} />
                    <div className="mock-bar hi" style={{ height: "90%" }} />
                    <div className="mock-bar" style={{ height: "65%" }} />
                  </div>
                </div>
                
                <div className="mock-list">
                  <div className="mock-list-title">Checked-in waitlist</div>
                  <div className="mock-list-item">
                    <span>Juan Dela Cruz</span>
                    <span className="mock-pill pill-ok">Checked in</span>
                  </div>
                  <div className="mock-list-item">
                    <span>Maria Reyes</span>
                    <span className="mock-pill pill-warn">Waiting</span>
                  </div>
                  <div className="mock-list-item">
                    <span>Roberto Cruz</span>
                    <span className="mock-pill pill-low">In room</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE DEMO PANEL */}
      <div id="how" className="demo-section">
        <div className="demo-header" style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="sl" style={{ justifyContent: "center" }}>See it in action</div>
          <h2 className="st" style={{ maxWidth: "100%", margin: "0 auto 12px", textAlign: "center" }}>Everything at your fingertips</h2>
          <p className="ss" style={{ maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
            Click any section to explore how MediStock works — add inventory, manage patients, and resolve alerts all in one place.
          </p>
        </div>

        <div className="demo-wrap">
          <div className="demo-topbar">
            <div className="mock-dots">
              <div className="mock-dot" style={{ background: "#ff6058" }} />
              <div className="mock-dot" style={{ background: "#ffc130" }} />
              <div className="mock-dot" style={{ background: "#27ca40" }} />
            </div>
            <div className="mock-url" style={{ maxWidth: 260 }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round">
                <path d="M6 1a5 5 0 1 1 0 10A5 5 0 0 1 6 1zm0 0v10M1 6h10"/>
              </svg>
              <span>medistock.app/{activeTab}</span>
            </div>
          </div>

          <div className="demo-layout">
            {/* SIDEBAR (Mirrors the Staff EMR Sidebar) */}
            <div className="demo-sidebar">
              <div className="demo-sidebar-section">Main</div>
              <div className={`dsb ${activeTab === "dashboard" ? "active" : ""}`} onClick={() => setActiveTab("dashboard")}>
                <svg viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="1.5" y="1.5" width="5" height="5" rx="1"/><rect x="8.5" y="1.5" width="5" height="5" rx="1"/><rect x="1.5" y="8.5" width="5" height="5" rx="1"/><rect x="8.5" y="8.5" width="5" height="5" rx="1"/></svg>
                <span>Dashboard</span>
              </div>
              <div className={`dsb ${activeTab === "patients" ? "active" : ""}`} onClick={() => setActiveTab("patients")}>
                <svg viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="7.5" cy="5" r="3"/><path d="M1 14c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6"/></svg>
                <span>Patients</span>
                <span className="dsb-badge">{patientsList.length}</span>
              </div>
              <div className={`dsb ${activeTab === "schedule" ? "active" : ""}`} onClick={() => setActiveTab("schedule")}>
                <svg viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="1.5" y="2.5" width="12" height="11" rx="2"/><path d="M5 1.5v2M10 1.5v2M1.5 6.5h12"/></svg>
                <span>Schedule</span>
              </div>
              <div className={`dsb ${activeTab === "alerts" ? "active" : ""}`} onClick={() => setActiveTab("alerts")}>
                <svg viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M7.5 1.5v1M7.5 1.5a5 5 0 0 1 5 5v3l1 2H2l1-2v-3a5 5 0 0 1 5-5z"/><path d="M6 12.5a1.5 1.5 0 0 0 3 0"/></svg>
                <span>Alerts</span>
                {alertsList.length > 0 && <span className="dsb-badge warn">{alertsList.length}</span>}
              </div>

              <div className="demo-sidebar-section">Clinical</div>
              <div className={`dsb ${activeTab === "records" ? "active" : ""}`} onClick={() => setActiveTab("records")}>
                <svg viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="1.5" width="11" height="12" rx="2"/><path d="M5 5.5h5M5 8h5M5 10.5h3"/></svg>
                <span>Medical Records</span>
              </div>
              <div className={`dsb ${activeTab === "newvisit" ? "active" : ""}`} onClick={() => setActiveTab("newvisit")}>
                <svg viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="1.5" y="1.5" width="12" height="12" rx="2"/><path d="M7.5 4.5v6M4.5 7.5h6"/></svg>
                <span>New Visit</span>
              </div>
            </div>

            {/* INTERACTIVE CONTENT (Mirrors EMR layouts) */}
            <div className="demo-content">
              
              {/* TAB: DASHBOARD */}
              {activeTab === "dashboard" && (
                <div className="demo-panel active">
                  <div className="dp-head">
                    <div>
                      <div className="dp-title font-sora">Good morning, Dr. Santos 👋</div>
                      <div className="dp-sub">Sunday, June 14, 2026 · Internal Medicine Ward</div>
                    </div>
                    <button className="dp-btn" onClick={() => triggerToast("Ledger and patient records synced!", "check")}>
                      Sync Ledger
                    </button>
                  </div>
                  
                  <div className="dp-stats">
                    <div className="dp-stat">
                      <div className="dp-stat-lbl">Patients Today</div>
                      <div className="dp-stat-val">147</div>
                      <div className="dp-stat-chg">↑ 3 from yesterday</div>
                    </div>
                    <div className="dp-stat">
                      <div className="dp-stat-lbl">Pending Labs</div>
                      <div className="dp-stat-val" style={{ color: "var(--warn-text)" }}>4</div>
                      <div className="dp-stat-chg warn">2 critical</div>
                    </div>
                    <div className="dp-stat">
                      <div className="dp-stat-lbl">Pending Rx</div>
                      <div className="dp-stat-val">12</div>
                      <div className="dp-stat-chg">↓ 2 from avg</div>
                    </div>
                    <div className="dp-stat">
                      <div className="dp-stat-lbl">Upcoming Appts</div>
                      <div className="dp-stat-val">8</div>
                      <div className="dp-stat-chg">Next: 9:00 AM</div>
                    </div>
                  </div>
                  
                  <div style={{ background: "var(--white)", borderRadius: 12, border: "1px solid var(--border)", padding: 16, marginBottom: 14 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink)", marginBottom: 10 }}>Patient Admissions — Last 7 days</div>
                    <div className="dp-mini-chart">
                      <div className="dp-mini-bar" style={{ flex: 1, background: "var(--t100)", height: "45%", borderRadius: "2px 2px 0 0" }} />
                      <div className="dp-mini-bar" style={{ flex: 1, background: "var(--t100)", height: "60%", borderRadius: "2px 2px 0 0" }} />
                      <div className="dp-mini-bar" style={{ flex: 1, background: "var(--t100)", height: "30%", borderRadius: "2px 2px 0 0" }} />
                      <div className="dp-mini-bar" style={{ flex: 1, background: "var(--t400)", height: "85%", borderRadius: "2px 2px 0 0" }} />
                      <div className="dp-mini-bar" style={{ flex: 1, background: "var(--t100)", height: "50%", borderRadius: "2px 2px 0 0" }} />
                      <div className="dp-mini-bar" style={{ flex: 1, background: "var(--t400)", height: "95%", borderRadius: "2px 2px 0 0" }} />
                      <div className="dp-mini-bar" style={{ flex: 1, background: "var(--t100)", height: "70%", borderRadius: "2px 2px 0 0" }} />
                    </div>
                  </div>

                  <div style={{ background: "var(--white)", borderRadius: 12, border: "1px solid var(--border)", padding: 16 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink)", marginBottom: 10 }}>Today's Checked-in Waitlist</div>
                    <table className="dp-table">
                      <thead>
                        <tr><th>Time</th><th>Patient</th><th>Type</th><th>Status</th></tr>
                      </thead>
                      <tbody>
                        {appointmentsList.slice(0, 3).map((appt) => {
                          const pat = patientsList.find(p => p.id === appt.patientId);
                          return (
                            <tr key={appt.id}>
                              <td>{appt.time}</td>
                              <td style={{ fontWeight: 600 }}>{pat?.name}</td>
                              <td>{appt.type}</td>
                              <td>
                                <span className={`dp-pill ${appt.status === "Checked in" ? "ok" : appt.status === "In room" ? "new" : "warn"}`}>
                                  {appt.status}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB: PATIENTS */}
              {activeTab === "patients" && (
                <div className="demo-panel active">
                  <div className="dp-head">
                    <div>
                      <div className="dp-title">Patients Registry</div>
                      <div className="dp-sub">{patientsList.length} registered patient profiles</div>
                    </div>
                    <button className="dp-btn" onClick={() => setActiveTab("newvisit")}>
                      + Register Patient
                    </button>
                  </div>
                  <table className="dp-table">
                    <thead>
                      <tr><th>Name</th><th>MRN</th><th>Age/Sex</th><th>Primary Condition</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                      {patientsList.map((pat) => (
                        <tr key={pat.id} className="dp-row-entering" style={{ cursor: "pointer" }} onClick={() => { setSelectedPatientId(pat.id); setActiveTab("records"); triggerToast(`Loaded logs for ${pat.name}`, "check"); }}>
                          <td style={{ fontWeight: 600 }}>{pat.name}</td>
                          <td>{pat.id}</td>
                          <td>{pat.age} / {pat.gender}</td>
                          <td>{pat.condition}</td>
                          <td>
                            <span className={`dp-pill ${pat.status === "Active" ? "ok" : pat.status === "Monitoring" ? "new" : "warn"}`}>
                              {pat.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* TAB: SCHEDULE */}
              {activeTab === "schedule" && (
                <div className="demo-panel active">
                  <div className="dp-head">
                    <div>
                      <div className="dp-title">Schedule Waitlist Queue</div>
                      <div className="dp-sub">Today's appointments status</div>
                    </div>
                  </div>
                  <table className="dp-table">
                    <thead>
                      <tr><th>Time</th><th>Patient</th><th>Reason</th><th>Type</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                      {appointmentsList.map((appt) => {
                        const pat = patientsList.find(p => p.id === appt.patientId);
                        return (
                          <tr key={appt.id} className="dp-row-entering">
                            <td style={{ fontWeight: 600 }}>{appt.time}</td>
                            <td style={{ fontWeight: 600 }}>{pat?.name}</td>
                            <td>{appt.reason}</td>
                            <td>{appt.type}</td>
                            <td>
                              <span className={`dp-pill ${appt.status === "Checked in" ? "ok" : appt.status === "In room" ? "new" : appt.status === "Waiting" ? "warn" : "neutral"}`}>
                                {appt.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* TAB: ALERTS */}
              {activeTab === "alerts" && (
                <div className="demo-panel active">
                  <div className="dp-head">
                    <div>
                      <div className="dp-title">Active Clinical Alerts</div>
                      <div className="dp-sub">{alertsList.length} unresolved clinical triggers</div>
                    </div>
                    {alertsList.length > 0 && (
                      <button className="dp-btn" onClick={handleResolveAlerts}>
                        Resolve all
                      </button>
                    )}
                  </div>
                  <div>
                    {alertsList.length === 0 ? (
                      <div style={{ textAlign: "center", padding: "40px 0", color: "var(--muted)" }}>
                        All active clinical alerts resolved.
                      </div>
                    ) : (
                      alertsList.map((al) => (
                        <div key={al.id} className="dp-alert-item" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: al.type === "crit" ? "var(--crit-bg)" : "var(--warn-bg)", padding: "10px 14px", borderRadius: 10, marginBottom: 8 }}>
                          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                            <div className={`dp-alert-icon ${al.type === "crit" ? "crit" : "warn"}`} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" style={{ width: 14, height: 14 }}>
                                <path d="M7 1.5L12.5 11H1.5L7 1.5z" strokeWidth="1.5" />
                                <path d="M7 5.5v2.5M7 9.5v.5" strokeWidth="1.5" />
                              </svg>
                            </div>
                            <div>
                              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>{al.title}</div>
                              <div style={{ fontSize: 10, color: "var(--muted)" }}>{al.desc}</div>
                            </div>
                          </div>
                          <button style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--muted)", fontSize: 16, fontWeight: 700 }} onClick={() => handleDismissAlert(al.id)}>×</button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB: MEDICAL RECORDS */}
              {activeTab === "records" && (
                <div className="demo-panel active">
                  <div className="dp-head">
                    <div>
                      <div className="dp-title">Patient Medical Record</div>
                      <div className="dp-sub">SOAP history &amp; clinical timeline</div>
                    </div>
                    <div>
                      <select value={selectedPatientId} onChange={(e) => setSelectedPatientId(e.target.value)} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--rsm)", padding: "4px 8px", fontSize: 11, color: "var(--ink)", outline: "none" }}>
                        {patientsList.map((pat) => (
                          <option key={pat.id} value={pat.id}>{pat.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div style={{ background: "var(--surface)", borderRadius: 12, padding: 14, marginBottom: 14 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 12px", fontSize: 11, marginBottom: 10 }}>
                      <div><strong>Blood Type:</strong> {selectedPatient.blood}</div>
                      <div><strong>Allergies:</strong> <span style={{ color: selectedPatient.allergies === "None" ? "inherit" : "#c03030", fontWeight: selectedPatient.allergies === "None" ? 400 : 600 }}>{selectedPatient.allergies}</span></div>
                      <div><strong>Physician:</strong> {selectedPatient.physician}</div>
                      <div><strong>Date of Birth:</strong> {selectedPatient.dob}</div>
                    </div>
                    <div className="vitals-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                      <div className="vital-card" style={{ padding: "8px 10px", background: "var(--white)", borderRadius: 8 }}>
                        <div className="vital-label" style={{ fontSize: 8 }}>Blood Pressure</div>
                        <div className="vital-val" style={{ fontSize: 13, fontWeight: 700 }}>{selectedPatient.bp}</div>
                      </div>
                      <div className="vital-card" style={{ padding: "8px 10px", background: "var(--white)", borderRadius: 8 }}>
                        <div className="vital-label" style={{ fontSize: 8 }}>Heart Rate</div>
                        <div className="vital-val" style={{ fontSize: 13, fontWeight: 700 }}>{selectedPatient.hr} <span style={{ fontSize: 9, fontWeight: 400, color: "var(--muted)" }}>bpm</span></div>
                      </div>
                      <div className="vital-card" style={{ padding: "8px 10px", background: "var(--white)", borderRadius: 8 }}>
                        <div className="vital-label" style={{ fontSize: 8 }}>Temperature</div>
                        <div className="vital-val" style={{ fontSize: 13, fontWeight: 700 }}>{selectedPatient.temp} <span style={{ fontSize: 9, fontWeight: 400, color: "var(--muted)" }}>°C</span></div>
                      </div>
                      <div className="vital-card" style={{ padding: "8px 10px", background: "var(--white)", borderRadius: 8 }}>
                        <div className="vital-label" style={{ fontSize: 8 }}>Weight</div>
                        <div className="vital-val" style={{ fontSize: 13, fontWeight: 700 }}>{selectedPatient.weight} <span style={{ fontSize: 9, fontWeight: 400, color: "var(--muted)" }}>kg</span></div>
                      </div>
                    </div>
                  </div>

                  <div style={{ background: "var(--white)", borderRadius: 12, border: "1px solid var(--border)", padding: 14 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>SOAP SOAP Notes</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 11 }}>
                      <div>
                        <strong style={{ color: "var(--accent)" }}>Subjective:</strong>
                        <p style={{ color: "var(--muted)", margin: "2px 0 0", lineHeight: 1.4 }}>Patient checks in for a follow-up consultation. Reports compliance with current medication regimen.</p>
                      </div>
                      <div>
                        <strong style={{ color: "var(--accent)" }}>Objective:</strong>
                        <p style={{ color: "var(--muted)", margin: "2px 0 0", lineHeight: 1.4 }}>Vitals stable. Lung fields clear. Patient weight is {selectedPatient.weight} kg, BMI calculated at 24.1.</p>
                      </div>
                      <div>
                        <strong style={{ color: "var(--accent)" }}>Assessment:</strong>
                        <p style={{ color: "var(--muted)", margin: "2px 0 0" }}>{selectedPatient.condition} - Controlled.</p>
                      </div>
                      <div>
                        <strong style={{ color: "var(--accent)" }}>Plan:</strong>
                        <p style={{ color: "var(--muted)", margin: "2px 0 0" }}>Continue current medication. Schedule follow-up in 3 months.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: NEW VISIT (Register & SOAP Form) */}
              {activeTab === "newvisit" && (
                <div className="demo-panel active">
                  <div className="dp-head">
                    <div>
                      <div className="dp-title">Register &amp; SOAP Check-in</div>
                      <div className="dp-sub">Simulate patient check-in &amp; SOAP logs</div>
                    </div>
                  </div>

                  <div className="dp-form-wrap" style={{ maxHeight: "460px", overflowY: "auto" }}>
                    <form onSubmit={handleRegisterPatient} style={{ marginBottom: 16, borderBottom: "1px dashed var(--border)", paddingBottom: 16 }}>
                      <div className="dp-form-title">Patient Demographics</div>
                      <div className="dp-form-grid" style={{ marginBottom: 10 }}>
                        <div className="dp-field">
                          <label>Full Name</label>
                          <input type="text" className="dp-field-input" value={newRegName} onChange={(e) => setNewRegName(e.target.value)} placeholder="e.g. Elena Santos" style={{ border: "1.5px solid var(--border)", width: "100%", padding: 6, borderRadius: "var(--rsm)", outline: "none" }} />
                        </div>
                        <div className="dp-field">
                          <label>Age</label>
                          <input type="number" className="dp-field-input" value={newRegAge} onChange={(e) => setNewRegAge(e.target.value)} placeholder="e.g. 32" style={{ border: "1.5px solid var(--border)", width: "100%", padding: 6, borderRadius: "var(--rsm)", outline: "none" }} />
                        </div>
                      </div>
                      <div className="dp-form-grid" style={{ marginBottom: 12 }}>
                        <div className="dp-field">
                          <label>Contact Number</label>
                          <input type="text" className="dp-field-input" value={newRegPhone} onChange={(e) => setNewRegPhone(e.target.value)} placeholder="e.g. +63 917 123 4567" style={{ border: "1.5px solid var(--border)", width: "100%", padding: 6, borderRadius: "var(--rsm)", outline: "none" }} />
                        </div>
                        <div className="dp-field">
                          <label>Gender</label>
                          <select className="dp-select" value={newRegGender} onChange={(e) => setNewRegGender(e.target.value)} style={{ border: "1.5px solid var(--border)", width: "100%", padding: 6, borderRadius: "var(--rsm)", outline: "none" }}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        </div>
                      </div>
                      <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <button type="submit" className="dp-form-submit">Register Patient</button>
                      </div>
                    </form>

                    <form onSubmit={handleSaveSoap}>
                      <div className="dp-form-title">SOAP Clinical Notes (for {selectedPatient.name})</div>
                      <div className="dp-form-grid" style={{ marginBottom: 10 }}>
                        <div className="dp-field">
                          <label>Height (cm)</label>
                          <input type="number" className="dp-field-input" value={patientHeight} onChange={(e) => setPatientHeight(e.target.value)} placeholder="e.g. 170" style={{ border: "1.5px solid var(--border)", width: "100%", padding: 6, borderRadius: "var(--rsm)", outline: "none" }} />
                        </div>
                        <div className="dp-field">
                          <label>Weight (kg)</label>
                          <input type="number" className="dp-field-input" value={patientWeight} onChange={(e) => setPatientWeight(e.target.value)} placeholder="e.g. 70" style={{ border: "1.5px solid var(--border)", width: "100%", padding: 6, borderRadius: "var(--rsm)", outline: "none" }} />
                        </div>
                      </div>

                      {calculatedBmi !== null && (
                        <div style={{ background: "var(--white)", padding: "8px 12px", borderRadius: 8, marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid var(--border)" }}>
                          <span style={{ fontSize: 10, fontWeight: 700 }}>Calculated BMI:</span>
                          <span className={`dp-pill ${calculatedBmi < 18.5 || calculatedBmi >= 25 ? "warn" : "ok"}`} style={{ fontSize: 10 }}>
                            {calculatedBmi} ({calculatedBmi < 18.5 ? "Underweight" : calculatedBmi < 25 ? "Normal" : "Overweight"})
                          </span>
                        </div>
                      )}

                      <div className="dp-field" style={{ marginBottom: 10 }}>
                        <label>SOAP Notes</label>
                        <textarea className="dp-field-input" value={soapNotes} onChange={(e) => setSoapNotes(e.target.value)} placeholder="Enter SOAP records..." style={{ border: "1.5px solid var(--border)", width: "100%", padding: 6, borderRadius: "var(--rsm)", minHeight: 40, resize: "vertical", outline: "none" }} />
                      </div>

                      <div className="dp-form-grid" style={{ marginBottom: 12 }}>
                        <div className="dp-field">
                          <label>Diagnosis ICD-10</label>
                          <select className="dp-select" value={selectedIcd} onChange={(e) => setSelectedIcd(e.target.value)} style={{ border: "1.5px solid var(--border)", width: "100%", padding: 6, borderRadius: "var(--rsm)", outline: "none" }}>
                            <option value="">Select code...</option>
                            <option value="I10">I10 - Essential Hypertension</option>
                            <option value="E11">E11 - Type 2 Diabetes Mellitus</option>
                            <option value="J45">J45 - Asthma</option>
                          </select>
                        </div>
                        <div className="dp-field">
                          <label>Prescribe Rx</label>
                          <input type="text" className="dp-field-input" value={prescribedMed} onChange={(e) => setPrescribedMed(e.target.value)} placeholder="e.g. Metformin 500mg" style={{ border: "1.5px solid var(--border)", width: "100%", padding: 6, borderRadius: "var(--rsm)", outline: "none" }} />
                        </div>
                      </div>

                      <div className="dp-form-actions">
                        <button type="button" className="dp-form-cancel" onClick={() => setActiveTab("dashboard")}>Cancel</button>
                        <button type="submit" className="dp-form-submit">Save SOAP Note</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* STATS STRIP */}
      <div className="stats-strip">
        <div className="stat-item">
          <div className="stat-num">{clinicsCount}<span>+</span></div>
          <div className="stat-desc">clinics onboarded</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">{accuracyRate}<span>%</span></div>
          <div className="stat-desc">stock accuracy rate</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">{itemsTracked}<span>M</span></div>
          <div className="stat-desc">items tracked monthly</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">{wasteReduction}<span>%</span></div>
          <div className="stat-desc">avg waste reduction</div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <section className="features" id="features">
        <div className="fh">
          <div className="sl">Platform features</div>
          <h2 className="st">Everything your clinic needs — nothing it doesn't</h2>
          <p className="ss">Built for pharmacists, nurses, and administrators who need reliable tools without the complexity.</p>
        </div>
        
        <div className="fg">
          <div className="fc">
            <div className="fi">
              <svg viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
            </div>
            <h3>Real-time inventory tracking</h3>
            <p>Every medication logged as it moves — from receiving dock to patient bedside. Instant visibility, zero manual counts.</p>
          </div>

          <div className="fc">
            <div className="fi">
              <svg viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
            </div>
            <h3>Smart expiry alerts</h3>
            <p>Proactive notifications before medications expire. Set custom lead times and automatically flag batches nearing expiry.</p>
          </div>

          <div className="fc">
            <div className="fi">
              <svg viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
            </div>
            <h3>Demand forecasting</h3>
            <p>AI-powered predictions based on patient throughput, seasonal patterns, and historical usage.</p>
          </div>

          <div className="fc">
            <div className="fi">
              <svg viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <h3>Compliance & audit trails</h3>
            <p>Every transaction timestamped and logged. Stay audit-ready with automatically generated FIFO-compliant records.</p>
          </div>

          <div className="fc">
            <div className="fi">
              <svg viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            </div>
            <h3>Multi-location sync</h3>
            <p>MediStock keeps inventory synchronized across all sites in real time, with per-location controls and permissions.</p>
          </div>

          <div className="fc">
            <div className="fi">
              <svg viewBox="0 0 24 24"><path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/></svg>
            </div>
            <h3>EHR integrations</h3>
            <p>Connect via HL7 FHIR and REST APIs. Medications automatically deducted when prescribed — no double entry.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section style={{ padding: "96px 5%" }}>
        <div className="how-row">
          <div>
            <div className="sl">How it works</div>
            <h2 className="st">From chaos to clarity in three steps</h2>
            <div className="steps">
              <div className="step">
                <div className="step-num">1</div>
                <div className="step-body">
                  <h4>Connect your pharmacy or clinic</h4>
                  <p>Import your existing inventory via CSV or barcode scan in minutes. No IT team required.</p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-num">2</div>
                <div className="step-body">
                  <h4>Track every movement automatically</h4>
                  <p>Scan items in and out at each point of care. MediStock handles batch numbers and lot traceability for you.</p>
                </div>
              </div>

              <div className="step">
                <div className="step-num">3</div>
                <div className="step-body">
                  <h4>Act on intelligent alerts</h4>
                  <p>Get notified about low stock, expiring batches, and reorder opportunities before they become problems.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="how-visual" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontFamily: "Sora, sans-serif", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Today's alerts</div>
            <div className="alert-row">
              <div className="alert-icon crit"><svg viewBox="0 0 15 15" fill="none" stroke="currentColor"><path d="M7.5 2L13 12H2L7.5 2z"/><path d="M7.5 6v3M7.5 10.5v.5"/></svg></div>
              <div className="alert-content">
                <div className="alert-title">Insulin Glargine — critical low</div>
                <div className="alert-sub">4 units remaining · Threshold: 20</div>
              </div>
              <div className="alert-time">Just now</div>
            </div>
            <div className="alert-row">
              <div className="alert-icon warn"><svg viewBox="0 0 15 15" fill="none" stroke="currentColor"><rect x="2" y="2" width="11" height="11" rx="2"/><path d="M7.5 5v3M7.5 9.5v.5"/></svg></div>
              <div className="alert-content">
                <div className="alert-title">Amoxicillin 500mg — expiring</div>
                <div className="alert-sub">Batch #B2024-11 expires in 18 days</div>
              </div>
              <div className="alert-time">2m ago</div>
            </div>
            <div className="alert-row">
              <div className="alert-icon ok"><svg viewBox="0 0 15 15" fill="none" stroke="currentColor"><path d="M3 7.5l3 3 6-6"/></svg></div>
              <div className="alert-content">
                <div className="alert-title">Paracetamol IV — restocked</div>
                <div className="alert-sub">120 units added by Dr. Santos</div>
              </div>
              <div className="alert-time">14m ago</div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <div className="sl">What our customers say</div>
        <h2 className="st" style={{ color: "white" }}>Trusted by healthcare teams across the country</h2>
        
        <div className="tg">
          <div className="tc">
            <p className="tq">"Before MediStock we had spreadsheets nobody trusted. Now our pharmacist gets to spend time with patients, not counting pills."</p>
            <div className="ta">
              <div className="tav" style={{ background: "var(--t400)" }}>DR</div>
              <div>
                <div className="tn">Dr. Rosa Mendez</div>
                <div className="tr">Clinical Director, Primavera Medical Group</div>
              </div>
            </div>
          </div>

          <div className="tc">
            <p className="tq">"We cut medication waste by 41% in the first quarter. The demand forecasting predicted our flu season surge two weeks ahead."</p>
            <div className="ta">
              <div className="tav" style={{ background: "var(--t800)" }}>JT</div>
              <div>
                <div className="tn">James Tan</div>
                <div className="tr">Head Pharmacist, Northside Hospital Network</div>
              </div>
            </div>
          </div>

          <div className="tc">
            <p className="tq">"Regulatory audits used to take weeks of preparation. With MediStock's audit trail I generate a compliant report in minutes."</p>
            <div className="ta">
              <div className="tav" style={{ background: "var(--t200)", color: "var(--t900)" }}>AL</div>
              <div>
                <div className="tn">Anita Lim</div>
                <div className="tr">Compliance Officer, Greenfield Clinics</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: "96px 5%", textAlign: "center" }}>
        <div className="sl" style={{ justifyContent: "center" }}>Pricing</div>
        <h2 className="st" style={{ maxWidth: "100%", margin: "0 auto 12px" }}>Simple, transparent pricing</h2>
        <p className="ss" style={{ maxWidth: 480, margin: "8px auto 0" }}>Scale from a single clinic to a hospital network. No hidden fees.</p>
        
        <div className="pg">
          <div className="pc">
            <div className="ptier">Starter</div>
            <div className="pamt"><sup>$</sup>49</div>
            <div className="pper">per location / month</div>
            <ul className="pfl">
              <li>Up to 500 SKUs</li>
              <li>2 user seats</li>
              <li>Expiry &amp; low-stock alerts</li>
              <li>CSV import / export</li>
              <li>Email support</li>
            </ul>
            <Link href="/signup" className="bpl bpl-o">Get started free</Link>
          </div>

          <div className="pc feat">
            <div className="pbadge">Most popular</div>
            <div className="ptier">Growth</div>
            <div className="pamt"><sup>$</sup>129</div>
            <div className="pper">per location / month</div>
            <ul className="pfl">
              <li>Unlimited SKUs</li>
              <li>15 user seats</li>
              <li>AI demand forecasting</li>
              <li>EHR integration (FHIR)</li>
              <li>Audit trail &amp; compliance exports</li>
              <li>Priority support</li>
            </ul>
            <Link href="/signup" className="bpl bpl-w">Start free trial</Link>
          </div>

          <div className="pc">
            <div className="ptier">Enterprise</div>
            <div className="pamt" style={{ fontSize: 28, paddingTop: 10 }}>Custom</div>
            <div className="pper">multi-site / negotiated</div>
            <ul className="pfl">
              <li>Unlimited locations &amp; users</li>
              <li>Custom EHR / ERP integrations</li>
              <li>Dedicated success manager</li>
              <li>SLA guarantees</li>
              <li>SSO &amp; advanced roles</li>
            </ul>
            <Link href="/signup" className="bpl bpl-o">Contact sales</Link>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <div className="cta-section">
        <div className="cta-box">
          <div className="cta-orb cta-orb-1" />
          <div className="cta-orb cta-orb-2" />
          <h2>Ready to take control of your inventory?</h2>
          <p>Join over 1,200 clinics that have eliminated stock-outs and expiry write-offs. Setup takes less than an hour.</p>
          <div className="cta-btns">
            <Link href="/signup" className="bcw">Start for free — no credit card</Link>
            <a href="#how" className="bco">Schedule a demo</a>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="ft">
          <div className="fb">
            <a href="#" className="flo">
              <div className="logo-icon" style={{ background: "none" }}>
                <img src="/favicon.png" alt="Logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <span>Wellsync</span>
            </a>
            <p>Health inventory management that keeps your clinic stocked, compliant, and confident.</p>
          </div>
          
          <div className="fcl">
            <h5>Product</h5>
            <a href="#">Features</a>
            <a href="#">Integrations</a>
            <a href="#">Pricing</a>
          </div>

          <div className="fcl">
            <h5>Resources</h5>
            <a href="#">Documentation</a>
            <a href="#">API reference</a>
            <a href="#">Compliance guide</a>
          </div>

          <div className="fcl">
            <h5>Company</h5>
            <a href="#">About us</a>
            <a href="#">Customers</a>
            <a href="#">Contact</a>
          </div>
        </div>
        
        <div className="fbottom">
          <span>© 2026 MediStock. All rights reserved.</span>
          <div style={{ display: "flex", gap: 20 }}>
            <a href="#">Privacy policy</a>
            <a href="#">Terms of service</a>
            <a href="#">HIPAA compliance</a>
          </div>
        </div>
      </footer>

      {/* TOAST PANEL */}
      <Toast message={toastMessage} isOpen={showToast} iconType={toastType} />

    </div>
  );
}
