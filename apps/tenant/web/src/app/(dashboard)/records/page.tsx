"use client";

import * as React from "react";
import { useDashboard } from "../dashboard-context";
import {
  Button,
  Card,
  CardBody,
  Pill,
  Tabs,
  Tab,
  TableWrap,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Field,
  Textarea,
  Modal,
  Input,
  Select,
} from "@healthbridge/ui";

// React Query hooks
import { useFamilyTree, useAddRelationship } from "../../../lib/hooks/api/useHouseholds";
import { usePatientDocuments, useUploadDocument, useDeleteDocument } from "../../../lib/hooks/api/useDocuments";
import { usePatients, useUpdatePatient } from "../../../lib/hooks/api/usePatients";
import { apiFetch } from "../../../lib/api-client";

export default function RecordsPage() {
  const { selectedPatient, navigateTo, triggerToast, setSelectedPatientId, facilities } = useDashboard();
  const [activeChartTab, setActiveChartTab] = React.useState<"visits" | "rx" | "labs" | "soap" | "family" | "docs">("visits");
  
  // Referral states
  const [showReferModal, setShowReferModal] = React.useState(false);
  const [referralType, setReferralType] = React.useState("CLINICAL");
  const [urgency, setUrgency] = React.useState("ROUTINE");
  const [referralScope, setReferralScope] = React.useState<"INTRA" | "CROSS">("INTRA");
  const [receivingFacilityId, setReceivingFacilityId] = React.useState("");
  const [receivingOrgSlug, setReceivingOrgSlug] = React.useState("");
  const [receivingFacilityName, setReceivingFacilityName] = React.useState("Central Branch");
  const [consentLevel, setConsentLevel] = React.useState<"FULL" | "SUMMARY">("FULL");
  const [consentChecked, setConsentChecked] = React.useState(false);
  const [referralReason, setReferralReason] = React.useState("");
  const [clinicalSummary, setClinicalSummary] = React.useState("");
  const [networkOrgs, setNetworkOrgs] = React.useState<any[]>([]);

  // Set default receiving facility ID from facilities context
  React.useEffect(() => {
    if (facilities && facilities.length > 0) {
      setReceivingFacilityId(facilities[0].id);
    }
  }, [facilities]);

  // Fetch opted-in network organizations when modal opens
  React.useEffect(() => {
    if (showReferModal) {
      async function loadNetworkOrgs() {
        try {
          const orgs = await apiFetch<any[]>("/api/referrals/network-organizations");
          setNetworkOrgs(orgs);
          if (orgs.length > 0) {
            setReceivingOrgSlug(orgs[0].slug);
          }
        } catch (e) {
          console.error("Failed to load network organizations", e);
        }
      }
      loadNetworkOrgs();
    }
  }, [showReferModal]);

  const handleCreateReferral = async (e: React.FormEvent) => {
    e.preventDefault();
    if (referralScope === "CROSS" && !consentChecked) {
      triggerToast("Patient authorization consent is required for cross-organization data transfers.", "alert");
      return;
    }

    try {
      const body: any = {
        referralType,
        urgency,
        referralReason,
        clinicalSummary,
      };

      if (referralScope === "INTRA") {
        body.receivingFacilityId = receivingFacilityId;
      } else {
        body.receivingOrgSlug = receivingOrgSlug;
        body.receivingFacilityName = receivingFacilityName;
        body.consentLevel = consentLevel;
      }

      // We pass the patient ID as the consultationId fallback so the backend creates a dummy consultation
      await apiFetch(`/api/consultations/${selectedPatient.id}/referrals`, {
        method: "POST",
        body: JSON.stringify(body),
      });

      triggerToast("Patient referral submitted successfully!", "check");
      setShowReferModal(false);
      setReferralReason("");
      setClinicalSummary("");
    } catch (err) {
      console.error("Failed to create referral", err);
      triggerToast("Failed to submit patient referral", "alert");
    }
  };
  
  const bp = selectedPatient.bp || "142/88";
  const [bpSystolic, bpDiastolic] = bp.split("/");

  // Family Tree / Household states
  const [viewMode, setViewMode] = React.useState<"normal" | "graph">("graph");
  const [showAddFamilyModal, setShowAddFamilyModal] = React.useState(false);
  const [relatedPatientId, setRelatedPatientId] = React.useState("");
  const [relationshipType, setRelationshipType] = React.useState("Spouse");

  // Document states
  const [showDocModal, setShowDocModal] = React.useState(false);
  const [docName, setDocName] = React.useState("");
  const [docType, setDocType] = React.useState("Lab Report");

  // Edit Patient Demographics states
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [editFirstName, setEditFirstName] = React.useState("");
  const [editLastName, setEditLastName] = React.useState("");
  const [editPhone, setEditPhone] = React.useState("");
  const [editDob, setEditDob] = React.useState("");
  const [editBloodType, setEditBloodType] = React.useState("O+");
  const [editCivilStatus, setEditCivilStatus] = React.useState("Stable");

  // Hook integrations
  const isPatientSelected = selectedPatient && selectedPatient.id !== "—";
  
  const { data: familyTreeData = [], isLoading: isLoadingFamily } = useFamilyTree(isPatientSelected ? selectedPatient.id : "");
  const addRelationshipMutation = useAddRelationship(isPatientSelected ? selectedPatient.id : "");
  const { data: rawPatients = [] } = usePatients();

  const { data: documentsData = [], isLoading: isLoadingDocs } = usePatientDocuments(isPatientSelected ? selectedPatient.id : "");
  const uploadDocMutation = useUploadDocument(isPatientSelected ? selectedPatient.id : "");
  const deleteDocMutation = useDeleteDocument(isPatientSelected ? selectedPatient.id : "");
  const updatePatientMutation = useUpdatePatient();

  // Autocomplete patient options
  const patientOptions = React.useMemo(() => {
    return rawPatients
      .filter((p: any) => p.id !== selectedPatient.id)
      .map((p: any) => ({
        value: p.id,
        label: `${p.firstName} ${p.lastName} (${p.pin})`,
      }));
  }, [rawPatients, selectedPatient.id]);

  // Map raw relations to UI relative representation (with reciprocal logic)
  const relatives = React.useMemo(() => {
    return (familyTreeData || []).map((r: any) => {
      const isCurrentPatientSource = r.patientId === selectedPatient.id;
      const relative = isCurrentPatientSource ? r.relatedPatient : r.patient;
      
      if (!relative) return null;

      let relationship = r.relationshipType;
      if (!isCurrentPatientSource) {
        if (r.relationshipType === "Child") relationship = "Parent";
        else if (r.relationshipType === "Parent") relationship = "Child";
      }

      return {
        id: relative.id,
        pin: relative.pin,
        name: `${relative.firstName} ${relative.lastName}`,
        age: relative.patientAgeYears ?? (relative.birthDate ? new Date().getFullYear() - new Date(relative.birthDate).getFullYear() : 30),
        gender: relative.sex === "FEMALE" ? "Female" : "Male",
        condition: relative.civilStatus || "Stable",
        relationship,
        isHead: r.isHead,
        raw: relative
      };
    }).filter(Boolean);
  }, [familyTreeData, selectedPatient.id]);

  // Position nodes for visual graph view
  const graphData = React.useMemo(() => {
    const parents = relatives.filter((r: any) => r.relationship === "Parent");
    const spouses = relatives.filter((r: any) => r.relationship === "Spouse");
    const siblings = relatives.filter((r: any) => r.relationship === "Sibling");
    const children = relatives.filter((r: any) => r.relationship === "Child");
    
    const positionedParents = parents.map((p: any, i: number) => {
      let x = 400;
      if (parents.length === 2) {
        x = i === 0 ? 300 : 500;
      } else if (parents.length > 2) {
        x = 200 + (i / (parents.length - 1)) * 400;
      }
      return { ...p, x, y: 60 };
    });

    const positionedSpouses = spouses.map((s: any, i: number) => {
      let x = 240;
      if (spouses.length > 1) {
        x = 100 + (i / (spouses.length - 1)) * 140;
      }
      return { ...s, x, y: 210 };
    });

    const positionedSiblings = siblings.map((sib: any, i: number) => {
      const x = 560 + i * 120;
      return { ...sib, x, y: 210 };
    });

    const positionedChildren = children.map((c: any, i: number) => {
      let x = 400;
      if (children.length === 2) {
        x = i === 0 ? 300 : 500;
      } else if (children.length > 2) {
        x = 150 + (i / (children.length - 1)) * 500;
      }
      return { ...c, x, y: 360 };
    });

    return {
      parents: positionedParents,
      spouses: positionedSpouses,
      siblings: positionedSiblings,
      children: positionedChildren,
    };
  }, [relatives]);

  // Handle Add Family Relation submission
  const handleAddFamilyMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!relatedPatientId) {
      triggerToast("Please select a patient to link", "alert");
      return;
    }
    try {
      await addRelationshipMutation.mutateAsync({
        relatedPatientId,
        relationshipType,
      });
      triggerToast("Family relationship established successfully!");
      setShowAddFamilyModal(false);
      setRelatedPatientId("");
    } catch (err: any) {
      triggerToast(err.message || "Failed to create relationship", "alert");
    }
  };

  // Handle Edit Patient Profile submission
  const handleEditPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editFirstName || !editLastName) {
      triggerToast("First name and Last name are required", "alert");
      return;
    }
    try {
      await updatePatientMutation.mutateAsync({
        id: selectedPatient.id,
        data: {
          firstName: editFirstName,
          lastName: editLastName,
          contactNumber: editPhone,
          birthDate: editDob,
          bloodType: editBloodType,
          civilStatus: editCivilStatus,
        },
      });
      triggerToast("Patient demographic profile updated!");
      setShowEditModal(false);
    } catch (err: any) {
      triggerToast(err.message || "Failed to update profile", "alert");
    }
  };

  // Handle Upload Document submission
  const handleUploadDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName) {
      triggerToast("Please enter a document name", "alert");
      return;
    }
    const cleanName = docName.endsWith(".pdf") ? docName : `${docName}.pdf`;
    const randomSize = Math.floor(500000 + Math.random() * 2500000); // 500KB - 3MB
    const mockFileUrl = `/uploads/${cleanName.toLowerCase().replace(/\s+/g, "-")}`;

    try {
      await uploadDocMutation.mutateAsync({
        fileName: cleanName,
        fileType: docType,
        fileSize: randomSize,
        fileUrl: mockFileUrl,
      });
      triggerToast(`Document "${cleanName}" uploaded successfully!`);
      setShowDocModal(false);
      setDocName("");
    } catch (err: any) {
      triggerToast(err.message || "Failed to upload document", "alert");
    }
  };

  // Handle Delete Document
  const handleDeleteDoc = async (docId: string, docName: string) => {
    if (confirm(`Are you sure you want to delete "${docName}"?`)) {
      try {
        await deleteDocMutation.mutateAsync(docId);
        triggerToast("Document deleted successfully");
      } catch (err: any) {
        triggerToast(err.message || "Failed to delete document", "alert");
      }
    }
  };

  // Byte size formatter helper
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Visual card node render helper
  const renderCard = (node: any, isActive: boolean) => {
    return (
      <div
        key={node.id}
        style={{
          position: "absolute",
          left: node.x - 70,
          top: node.y - 30,
          width: 140,
          height: 60,
          background: isActive ? "var(--accent)" : "var(--white)",
          color: isActive ? "var(--white)" : "var(--ink)",
          border: `1px solid ${isActive ? "var(--accent)" : "var(--border)"}`,
          borderRadius: "var(--rsm)",
          padding: "8px 10px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          cursor: isActive ? "default" : "pointer",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          zIndex: 2,
        }}
        onClick={() => {
          if (!isActive) {
            setSelectedPatientId(node.id);
            triggerToast(`Switched chart to ${node.name}`);
          }
        }}
        className={isActive ? "" : "tree-card-hover"}
      >
        <div style={{ fontSize: "11px", fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {node.name}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px" }}>
          <span style={{ fontSize: "9px", opacity: 0.8 }}>
            {node.relationship || "Patient"} • {node.age}y {node.gender.charAt(0)}
          </span>
          <span style={{ fontSize: "8px", fontWeight: 700, background: isActive ? "rgba(255,255,255,0.2)" : "var(--surface)", color: isActive ? "var(--white)" : "var(--ink)", padding: "2px 4px", borderRadius: "3px" }}>
            {node.condition}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="panel active">
      <div className="panel-inner">
        <div className="ph">
          <div className="ph-left">
            <h2>{selectedPatient.name}</h2>
            <p>{selectedPatient.pin || selectedPatient.id} • {selectedPatient.age} years old, {selectedPatient.gender} • Blood type: {selectedPatient.blood || "O+"}</p>
          </div>
          <div className="ph-actions" style={{ display: "flex", gap: "8px" }}>
            <Button
              variant="outline"
              onClick={() => {
                setReferralReason("");
                setClinicalSummary("");
                setConsentChecked(false);
                setShowReferModal(true);
              }}
              icon={<svg viewBox="0 0 15 15" width={13} height={13} fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M1.5 7.5L5 11l8.5-8.5" /></svg>}
            >
              Refer Patient
            </Button>
            <Button variant="primary" onClick={() => navigateTo("/newvisit")} icon={<svg viewBox="0 0 13 13"><rect x="1.5" y="1.5" width="10" height="10" rx="1.5"/><path d="M6.5 4.5v4M4.5 6.5h4"/></svg>}>
              Start Visit
            </Button>
          </div>
        </div>

        <div className="patient-layout">
          {/* Demographics Card */}
          <div>
            <div className="patient-card" style={{ marginBottom: 12 }}>
              <div className="patient-avatar-lg" style={{ background: "var(--accent)" }}>
                {selectedPatient.name.split(" ").map((n: string) => n[0]).join("")}
              </div>
              <h3 className="patient-name">{selectedPatient.name}</h3>
              <p className="patient-id">PIN: {selectedPatient.pin || selectedPatient.id}</p>
              <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
                <Pill variant="ok">Active</Pill>
                <Pill variant="warn">{selectedPatient.condition}</Pill>
              </div>

              <div className="patient-meta">
                <div className="patient-meta-row"><span className="patient-meta-label">Date of Birth</span><span className="patient-meta-value">{selectedPatient.dob || "Mar 15, 1978"}</span></div>
                <div className="patient-meta-row"><span className="patient-meta-label">Age</span><span className="patient-meta-value">{selectedPatient.age} years</span></div>
                <div className="patient-meta-row"><span className="patient-meta-label">Sex</span><span className="patient-meta-value">{selectedPatient.gender}</span></div>
                <div className="patient-meta-row"><span className="patient-meta-label">Blood Type</span><span className="patient-meta-value">{selectedPatient.blood || "O+"}</span></div>
                <div className="patient-meta-row"><span className="patient-meta-label">Phone</span><span className="patient-meta-value">{selectedPatient.phone}</span></div>
                <div className="patient-meta-row"><span className="patient-meta-label">Physician</span><span className="patient-meta-value">{selectedPatient.physician || "Dr. M. Santos"}</span></div>
                <div className="patient-meta-row"><span className="patient-meta-label">Allergies</span><span className="patient-meta-value" style={{ color: "var(--crit-text)" }}>{selectedPatient.allergies || "Penicillin"}</span></div>
              </div>

              <Button
                variant="outline"
                style={{ width: "100%", marginTop: 12, display: "flex", justifyContent: "center", gap: "6px" }}
                onClick={() => {
                  const parts = selectedPatient.name.split(" ");
                  setEditFirstName(parts[0] || "");
                  setEditLastName(parts.slice(1).join(" ") || "");
                  setEditPhone(selectedPatient.phone || "");
                  setEditDob(selectedPatient.dob || "");
                  setEditBloodType(selectedPatient.blood || "O+");
                  setEditCivilStatus(selectedPatient.condition || "Stable");
                  setShowEditModal(true);
                }}
              >
                <svg viewBox="0 0 12 12" style={{ width: 12, height: 12, fill: "none", stroke: "currentColor", strokeWidth: 1.5 }}><path d="M1.5 8.5v2h2l6-6-2-2-6 6zm6.5-6l2 2"/></svg>
                Edit Profile
              </Button>
            </div>

            {/* Vitals Grid */}
            <div className="patient-card">
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "var(--muted)", marginBottom: 10 }}>Latest Vitals</div>
              <div className="vitals-grid">
                <div className="vital-card">
                  <div className="vital-label">BP</div>
                  <div className="vital-val">
                    {bpSystolic}
                    {bpDiastolic && <span className="vital-unit">/{bpDiastolic}</span>}
                  </div>
                  <div className="vital-status warn">Elevated</div>
                </div>
                <div className="vital-card"><div className="vital-label">HR</div><div className="vital-val">{selectedPatient.hr || "78"}<span className="vital-unit"> bpm</span></div><div className="vital-status ok">Normal</div></div>
                <div className="vital-card"><div className="vital-label">Temp</div><div className="vital-val">{selectedPatient.temp || "36.8"}<span className="vital-unit">°C</span></div><div className="vital-status ok">Normal</div></div>
                <div className="vital-card"><div className="vital-label">SpO2</div><div className="vital-val">{selectedPatient.spo2 || "98"}<span className="vital-unit">%</span></div><div className="vital-status ok">Normal</div></div>
                <div className="vital-card"><div className="vital-label">Weight</div><div className="vital-val">{selectedPatient.weight || "82"}<span className="vital-unit"> kg</span></div><div className="vital-status warn">Overweight</div></div>
                <div className="vital-card"><div className="vital-label">RR</div><div className="vital-val">{selectedPatient.rr || "16"}<span className="vital-unit">/min</span></div><div className="vital-status ok">Normal</div></div>
              </div>
            </div>
          </div>

          {/* SOAP Tabs */}
          <div>
            <div style={{ marginBottom: 16 }}>
              <Tabs>
                <Tab id="visits" label="Visit History" isActive={activeChartTab === "visits"} onClick={() => setActiveChartTab("visits")} />
                <Tab id="rx" label="Prescriptions" isActive={activeChartTab === "rx"} onClick={() => setActiveChartTab("rx")} />
                <Tab id="labs" label="Lab Results" isActive={activeChartTab === "labs"} onClick={() => setActiveChartTab("labs")} />
                <Tab id="soap" label="SOAP Notes" isActive={activeChartTab === "soap"} onClick={() => setActiveChartTab("soap")} />
                <Tab id="family" label="Family &amp; Household" isActive={activeChartTab === "family"} onClick={() => setActiveChartTab("family")} />
                <Tab id="docs" label="Clinical Documents" isActive={activeChartTab === "docs"} onClick={() => setActiveChartTab("docs")} />
              </Tabs>
            </div>

            {/* VISIT HISTORY TAB */}
            {activeChartTab === "visits" && (
              <div className="timeline">
                <div className="tl-item">
                  <div className="tl-dot">
                    <svg viewBox="0 0 12 12"><rect x="1" y="1" width="10" height="10" rx="1.5" /><path d="M3.5 4.5h5M3.5 6.5h5" /></svg>
                  </div>
                  <div className="tl-body">
                    <div className="tl-date">Jun 01, 2026 — Follow-up</div>
                    <div className="tl-title">Hypertension Management</div>
                    <div className="tl-detail">
                      BP still elevated at {selectedPatient.bp || "142/88"}. Discussed medication adherence and dietary sodium restriction. Weight up 2kg since last visit. Referred for 24h ambulatory BP monitoring.
                    </div>
                    <div className="tl-pills">
                      <Pill variant="warn">BP Elevated</Pill>
                      <Pill variant="ok">Weight ↑</Pill>
                    </div>
                  </div>
                </div>

                <div className="tl-item">
                  <div className="tl-dot">
                    <svg viewBox="0 0 12 12"><path d="M4 1.5h4l1.5 2.5h-7L4 1.5z" /><rect x="1.5" y="4" width="9" height="6.5" rx="1" /></svg>
                  </div>
                  <div className="tl-body">
                    <div className="tl-date">May 10, 2026 — Prescription Renewal</div>
                    <div className="tl-title">Rx Renewal — Amlodipine 10mg</div>
                    <div className="tl-detail">Patient requested early renewal. Compliant with current regimen. Added Hydrochlorothiazide 25mg for BP control.</div>
                    <div className="tl-pills">
                      <Pill variant="ok">Dispensed</Pill>
                    </div>
                  </div>
                </div>

                <div className="tl-item">
                  <div className="tl-dot">
                    <svg viewBox="0 0 12 12"><path d="M3.5 1.5v5L1 10a.9.9 0 0 0 .8 1.5h8.4a.9.9 0 0 0 .8-1.5L8.5 6.5V1.5" /><path d="M3 1.5h6" /></svg>
                  </div>
                  <div className="tl-body">
                    <div className="tl-date">Apr 22, 2026 — Lab Results</div>
                    <div className="tl-title">Lipid Panel &amp; Metabolic Panel</div>
                    <div className="tl-detail">LDL: 138 mg/dL (borderline high). Fasting glucose: 99 mg/dL. eGFR: 78 (mild reduction — monitor). Creatinine: 1.1.</div>
                    <div className="tl-pills">
                      <Pill variant="warn">LDL High</Pill>
                      <Pill variant="ok">Glucose OK</Pill>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PRESCRIPTIONS TAB */}
            {activeChartTab === "rx" && (
              <div style={{ background: "var(--white)", borderRadius: "var(--rlg)", padding: "16px 18px" }}>
                <div className="rx-row">
                  <div className="rx-icon"><svg viewBox="0 0 14 14"><path d="M4 1.5h6l2 3H2L4 1.5z"/><rect x="1" y="4.5" width="12" height="8" rx="1.5"/><path d="M5 8h4M7 6.5v3"/></svg></div>
                  <div style={{ flex: 1 }}>
                    <div className="rx-drug">Amlodipine 10mg</div>
                    <div className="rx-dose">Once daily, morning • For hypertension</div>
                  </div>
                  <div className="rx-right">
                    <div className="rx-qty">Qty: 30</div>
                    <div className="rx-refills">Refills: 2 left • Expires Aug 2026</div>
                  </div>
                  <Pill variant="ok" style={{ marginLeft: 12 }}>Active</Pill>
                </div>

                <div className="rx-row">
                  <div className="rx-icon"><svg viewBox="0 0 14 14"><path d="M4 1.5h6l2 3H2L4 1.5z"/><rect x="1" y="4.5" width="12" height="8" rx="1.5"/><path d="M5 8h4M7 6.5v3"/></svg></div>
                  <div style={{ flex: 1 }}>
                    <div className="rx-drug">Hydrochlorothiazide 25mg</div>
                    <div className="rx-dose">Once daily • For hypertension (add-on)</div>
                  </div>
                  <div className="rx-right">
                    <div className="rx-qty">Qty: 30</div>
                    <div className="rx-refills">Refills: 3 left • Expires Nov 2026</div>
                  </div>
                  <Pill variant="ok" style={{ marginLeft: 12 }}>Active</Pill>
                </div>

                <div className="rx-row">
                  <div className="rx-icon"><svg viewBox="0 0 14 14"><path d="M4 1.5h6l2 3H2L4 1.5z"/><rect x="1" y="4.5" width="12" height="8" rx="1.5"/><path d="M5 8h4M7 6.5v3"/></svg></div>
                  <div style={{ flex: 1 }}>
                    <div className="rx-drug">Rosuvastatin 10mg</div>
                    <div className="rx-dose">Once nightly • For dyslipidemia</div>
                  </div>
                  <div className="rx-right">
                    <div className="rx-qty">Qty: 30</div>
                    <div className="rx-refills">Refills: 1 left • Expires Jul 2026</div>
                  </div>
                  <Pill variant="warn" style={{ marginLeft: 12 }}>Renew Soon</Pill>
                </div>
              </div>
            )}

            {/* LAB RESULTS TAB */}
            {activeChartTab === "labs" && (
              <TableWrap>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Test</TableHead>
                      <TableHead>Result</TableHead>
                      <TableHead>Reference Range</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="td-bold">LDL Cholesterol</TableCell>
                      <TableCell style={{ color: "var(--warn-text)", fontWeight: 600 }}>138 mg/dL</TableCell>
                      <TableCell className="td-muted">&lt; 100 mg/dL</TableCell>
                      <TableCell className="td-muted">Apr 22, 2026</TableCell>
                      <TableCell><Pill variant="warn">High</Pill></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="td-bold">HDL Cholesterol</TableCell>
                      <TableCell>52 mg/dL</TableCell>
                      <TableCell className="td-muted">&gt; 40 mg/dL</TableCell>
                      <TableCell className="td-muted">Apr 22, 2026</TableCell>
                      <TableCell><Pill variant="ok">Normal</Pill></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="td-bold">Fasting Glucose</TableCell>
                      <TableCell>99 mg/dL</TableCell>
                      <TableCell className="td-muted">70–99 mg/dL</TableCell>
                      <TableCell className="td-muted">Apr 22, 2026</TableCell>
                      <TableCell><Pill variant="ok">Normal</Pill></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="td-bold">eGFR</TableCell>
                      <TableCell style={{ color: "var(--warn-text)", fontWeight: 600 }}>78 mL/min</TableCell>
                      <TableCell className="td-muted">&gt; 90 mL/min</TableCell>
                      <TableCell className="td-muted">Apr 22, 2026</TableCell>
                      <TableCell><Pill variant="warn">Mild ↓</Pill></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="td-bold">HbA1c</TableCell>
                      <TableCell>5.6%</TableCell>
                      <TableCell className="td-muted">&lt; 5.7%</TableCell>
                      <TableCell className="td-muted">Jan 15, 2026</TableCell>
                      <TableCell><Pill variant="ok">Normal</Pill></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableWrap>
            )}

            {/* SOAP NOTES EDIT TAB */}
            {activeChartTab === "soap" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Finalized SOAP Note */}
                <div style={{ background: "var(--white)", borderRadius: "var(--rlg)", padding: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--ink)" }}>SOAP Note — Jun 01, 2026</div>
                    <Pill variant="ok">Finalized</Pill>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "12px", color: "var(--ink)", lineHeight: 1.6 }}>
                    <div>
                      <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase", color: "var(--faint)", marginBottom: "4px" }}>S — Subjective</div>
                      <div style={{ color: "var(--muted)" }}>Patient reports mild headaches in the morning, mostly when forgetting medication. Denies chest pain, dyspnea, or palpitations. Has been "stressed at work." Admits to salty food intake. Diet non-compliant.</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase", color: "var(--faint)", marginBottom: "4px" }}>O — Objective</div>
                      <div style={{ color: "var(--muted)" }}>BP: 142/88 mmHg (left arm, seated). HR: 78 bpm. Weight: 82kg (+2kg). SpO2: 98%. Lungs clear to auscultation. No pedal edema. JVP not elevated.</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase", color: "var(--faint)", marginBottom: "4px" }}>A — Assessment</div>
                      <div style={{ color: "var(--muted)" }}>Hypertension, Stage 2 — inadequately controlled. Likely exacerbated by dietary non-compliance and psychosocial stress. Early renal impairment (eGFR 78) warrants monitoring.</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase", color: "var(--faint)", marginBottom: "4px" }}>P — Plan</div>
                      <div style={{ color: "var(--muted)" }}>1. Continue Amlodipine 10mg + Hydrochlorothiazide 25mg. 2. Order 24h ambulatory BP monitoring. 3. Refer to dietician for DASH diet counseling. 4. Repeat lipid panel in 3 months. 5. Follow-up in 2 weeks.</div>
                    </div>
                  </div>
                </div>

                {/* Edit SOAP Draft Form */}
                <Card>
                  <CardBody>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 12 }}>New SOAP Draft</div>
                    <form onSubmit={(e) => { e.preventDefault(); triggerToast("SOAP note draft saved", "check"); }}>
                      <Field label="Subjective (Symptoms / Chief Complaint)">
                        <Textarea placeholder="Patient reports mild headache and fatigue..." required />
                      </Field>
                      <Field label="Objective (Physician Findings)">
                        <Textarea placeholder="BP elevated at 142/88. Heart sounds normal. No edema." required style={{ marginTop: 8 }} />
                      </Field>
                      <div style={{ marginTop: 12, display: "flex", justifyContent: "flex-end" }}>
                        <Button type="submit" variant="primary">
                          Save SOAP Draft
                        </Button>
                      </div>
                    </form>
                  </CardBody>
                </Card>
              </div>
            )}

            {/* FAMILY & HOUSEHOLD TAB */}
            {activeChartTab === "family" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div className="tbl-filters" style={{ display: "flex", gap: 8 }}>
                    <Button
                      variant={viewMode === "graph" ? "primary" : "outline"}
                      onClick={() => setViewMode("graph")}
                      style={{ height: "32px", padding: "0 12px", fontSize: "12px" }}
                    >
                      Graph View
                    </Button>
                    <Button
                      variant={viewMode === "normal" ? "primary" : "outline"}
                      onClick={() => setViewMode("normal")}
                      style={{ height: "32px", padding: "0 12px", fontSize: "12px" }}
                    >
                      List View
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setShowAddFamilyModal(true)}
                    style={{ height: "32px", fontSize: "12px" }}
                  >
                    + Link Family Member
                  </Button>
                </div>

                {isLoadingFamily ? (
                  <div style={{ textAlign: "center", padding: "30px", color: "var(--muted)", fontSize: "13px" }}>
                    Loading pedigree chart...
                  </div>
                ) : relatives.length === 0 ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: 300,
                      background: "var(--white)",
                      borderRadius: "var(--rmd)",
                      border: "1px solid var(--border)",
                      textAlign: "center",
                      padding: 24,
                      boxShadow: "var(--card-shadow)",
                    }}
                  >
                    <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--accent-light)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                      <svg viewBox="0 0 15 15" style={{ width: 28, height: 28, stroke: "var(--accent)", fill: "none", strokeWidth: 1.5 }}><path d="M7.5 1.5l5.5 3v6l-5.5 3-5.5-3v-6zM7.5 1.5v12M2 4.5l5.5 3 5.5-3" /></svg>
                    </div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", marginBottom: 6 }}>No Family Members Linked</h3>
                    <p style={{ fontSize: 12.5, color: "var(--muted)", maxWidth: 360, marginBottom: 16 }}>
                      Link this patient profile with spouses, children, parents, or siblings to map their household pedigree structure.
                    </p>
                    <Button variant="primary" onClick={() => setShowAddFamilyModal(true)}>
                      Link Family Member
                    </Button>
                  </div>
                ) : (
                  <>
                    {/* VISUAL PEDIGREE GRAPH */}
                    {viewMode === "graph" && (
                      <div style={{ overflowX: "auto", padding: "10px 0" }}>
                        <div
                          style={{
                            position: "relative",
                            width: 800,
                            height: 450,
                            background: "var(--white)",
                            borderRadius: "var(--rmd)",
                            border: "1px solid var(--border)",
                            boxShadow: "var(--card-shadow)",
                            margin: "0 auto",
                          }}
                        >
                          {/* SVG connections */}
                          <svg
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              pointerEvents: "none",
                            }}
                          >
                            {/* Connect parents */}
                            {graphData.parents.map((p: any) => (
                              <path
                                key={p.id}
                                d={`M ${p.x} 90 V 135 H 400 V 180`}
                                stroke="var(--accent)"
                                strokeWidth="2"
                                fill="none"
                                opacity="0.4"
                              />
                            ))}
                            {/* Connect spouses (dashed line) */}
                            {graphData.spouses.map((s: any) => (
                              <path
                                key={s.id}
                                d={`M ${s.x + 70} 210 H 330`}
                                stroke="var(--accent)"
                                strokeWidth="2"
                                strokeDasharray="4 4"
                                fill="none"
                                opacity="0.6"
                              />
                            ))}
                            {/* Connect siblings */}
                            {graphData.siblings.map((sib: any) => (
                              <path
                                key={sib.id}
                                d={`M 470 210 H ${sib.x - 70}`}
                                stroke="var(--accent)"
                                strokeWidth="2"
                                fill="none"
                                opacity="0.4"
                              />
                            ))}
                            {/* Connect children */}
                            {graphData.children.map((c: any) => (
                              <path
                                key={c.id}
                                d={`M 400 240 V 285 H ${c.x} V 330`}
                                stroke="var(--accent)"
                                strokeWidth="2"
                                fill="none"
                                opacity="0.4"
                              />
                            ))}
                          </svg>

                          {/* Render relative nodes */}
                          {graphData.parents.map((p: any) => renderCard(p, false))}
                          {graphData.spouses.map((s: any) => renderCard(s, false))}
                          {graphData.siblings.map((sib: any) => renderCard(sib, false))}
                          {graphData.children.map((c: any) => renderCard(c, false))}

                          {/* Render active patient node */}
                          {renderCard(
                            {
                              id: selectedPatient.id,
                              name: selectedPatient.name,
                              relationship: "Active Patient",
                              age: selectedPatient.age,
                              gender: selectedPatient.gender,
                              condition: selectedPatient.condition,
                              x: 400,
                              y: 210,
                            },
                            true
                          )}
                        </div>
                      </div>
                    )}

                    {/* Pedigree list view */}
                    {viewMode === "normal" && (
                      <TableWrap>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Relative Name</TableHead>
                              <TableHead>Relationship</TableHead>
                              <TableHead>Age / Sex</TableHead>
                              <TableHead>Condition</TableHead>
                              <TableHead></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {relatives.map((rel: any) => (
                              <TableRow key={rel.id}>
                                <TableCell className="td-bold">
                                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <div className="pt-avatar" style={{ background: "var(--accent-light)", color: "var(--accent)" }}>
                                      {rel.name.split(" ").map((n: string) => n[0]).join("")}
                                    </div>
                                    <div>
                                      <div className="td-bold">{rel.name}</div>
                                      <div className="td-muted">{rel.pin}</div>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Pill variant="new">{rel.relationship}</Pill>
                                </TableCell>
                                <TableCell>{rel.age} years ({rel.gender.charAt(0)})</TableCell>
                                <TableCell>
                                  <span className="td-bold">{rel.condition}</span>
                                </TableCell>
                                <TableCell>
                                  <div className="td-actions">
                                    <div
                                      className="td-btn"
                                      title="Switch to Chart"
                                      onClick={() => {
                                        setSelectedPatientId(rel.id);
                                        triggerToast(`Switched chart to ${rel.name}`);
                                      }}
                                    >
                                      <svg viewBox="0 0 12 12">
                                        <rect x="1" y="1" width="10" height="10" rx="1.5" />
                                        <path d="M3.5 4.5h5M3.5 6.5h5M3.5 8.5h3" />
                                      </svg>
                                    </div>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableWrap>
                    )}
                  </>
                )}
              </div>
            )}

            {/* CLINICAL DOCUMENTS TAB */}
            {activeChartTab === "docs" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--ink)" }}>Patient Attachment Records</div>
                  <Button
                    variant="primary"
                    onClick={() => setShowDocModal(true)}
                    style={{ height: "32px", fontSize: "12px" }}
                  >
                    + Upload Document
                  </Button>
                </div>

                {isLoadingDocs ? (
                  <div style={{ textAlign: "center", padding: "30px", color: "var(--muted)", fontSize: "13px" }}>
                    Loading clinical attachments...
                  </div>
                ) : documentsData.length === 0 ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: 240,
                      background: "var(--white)",
                      borderRadius: "var(--rmd)",
                      border: "1px solid var(--border)",
                      textAlign: "center",
                      padding: 24,
                      boxShadow: "var(--card-shadow)",
                    }}
                  >
                    <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--accent-light)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                      <svg viewBox="0 0 15 15" style={{ width: 24, height: 24, stroke: "var(--accent)", fill: "none", strokeWidth: 1.5 }}><rect x="3" y="1.5" width="9" height="12" rx="1.5" /><path d="M5.5 4.5h4M5.5 7.5h4M5.5 10.5h4" /></svg>
                    </div>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", marginBottom: 4 }}>No Documents Uploaded</h3>
                    <p style={{ fontSize: 12, color: "var(--muted)", maxWidth: 320, marginBottom: 12 }}>
                      Keep track of lab sheets, scanned notes, and x-ray charts directly on this profile.
                    </p>
                    <Button variant="primary" onClick={() => setShowDocModal(true)}>
                      Upload Document
                    </Button>
                  </div>
                ) : (
                  <TableWrap>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>File Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Size</TableHead>
                          <TableHead>Uploaded By</TableHead>
                          <TableHead>Date Added</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {documentsData.map((doc: any) => (
                          <TableRow key={doc.id}>
                            <TableCell className="td-bold">
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <svg viewBox="0 0 14 14" style={{ width: 16, height: 16, stroke: "var(--muted)", fill: "none" }}><path d="M2.5 1.5h6l3 3v8a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1z" /><path d="M8.5 1.5v3h3" /></svg>
                                <span
                                  style={{ cursor: "pointer", textDecoration: "underline", color: "var(--accent)" }}
                                  onClick={() => {
                                    triggerToast(`Simulating download of "${doc.fileName}"...`);
                                    window.open(doc.fileUrl, "_blank");
                                  }}
                                >
                                  {doc.fileName}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Pill variant="ok">{doc.fileType}</Pill>
                            </TableCell>
                            <TableCell>{formatBytes(doc.fileSize)}</TableCell>
                            <TableCell className="td-muted">
                              {doc.uploader ? `${doc.uploader.firstName} ${doc.uploader.lastName}` : "System"}
                            </TableCell>
                            <TableCell className="td-muted">
                              {new Date(doc.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </TableCell>
                            <TableCell>
                              <div className="td-actions">
                                <div
                                  className="td-btn"
                                  title="Download File"
                                  onClick={() => {
                                    triggerToast(`Simulating download of "${doc.fileName}"...`);
                                    window.open(doc.fileUrl, "_blank");
                                  }}
                                  style={{ marginRight: 6 }}
                                >
                                  <svg viewBox="0 0 12 12"><path d="M6 1.5v6.5M3 5l3 3 3-3M1.5 10.5h9"/></svg>
                                </div>
                                <div
                                  className="td-btn"
                                  title="Delete Document"
                                  onClick={() => handleDeleteDoc(doc.id, doc.fileName)}
                                  style={{ color: "var(--crit-text)" }}
                                >
                                  <svg viewBox="0 0 12 12"><path d="M2 3h8M3 3v7a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V3M4.5 3V1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V3"/></svg>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableWrap>
                )}
              </div>
            )}

          </div>
        </div>
      </div>

      {/* REFER PATIENT MODAL */}
      <Modal isOpen={showReferModal} onClose={() => setShowReferModal(false)} title="Create Patient Referral Slip">
        <form onSubmit={handleCreateReferral}>
          <div className="form-wrap" style={{ boxShadow: "none", padding: 0, margin: 0, maxHeight: "500px", overflowY: "auto" }}>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Field label="Referral Category Type">
                <Select
                  value={referralType}
                  onChange={(e) => setReferralType(e.target.value)}
                  options={[
                    { value: "CLINICAL", label: "Clinical Consultation" },
                    { value: "EMERGENCY", label: "Emergency / Critical" },
                    { value: "LABORATORY", label: "Laboratory Testing" },
                    { value: "DIAGNOSTIC", label: "Imaging & Diagnostics" },
                    { value: "PHARMACY", label: "Pharmacy Dispense" },
                  ]}
                />
              </Field>
              <Field label="Urgency Level">
                <Select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  options={[
                    { value: "ROUTINE", label: "Routine" },
                    { value: "URGENT", label: "Urgent" },
                    { value: "EMERGENCY", label: "Emergency" },
                  ]}
                />
              </Field>
            </div>

            <div style={{ marginTop: 12 }}>
              <Field label="Referral Network Scope">
                <Select
                  value={referralScope}
                  onChange={(e) => setReferralScope(e.target.value as any)}
                  options={[
                    { value: "INTRA", label: "Intra-Organization (Internal Clinic)" },
                    { value: "CROSS", label: "Cross-Organization (External Partner)" },
                  ]}
                />
              </Field>
            </div>

            {referralScope === "INTRA" ? (
              <div style={{ marginTop: 12 }}>
                <Field label="Select Receiving Facility">
                  <Select
                    value={receivingFacilityId}
                    onChange={(e) => setReceivingFacilityId(e.target.value)}
                    options={facilities.map((f: any) => ({
                      value: f.id,
                      label: f.name,
                    }))}
                  />
                </Field>
              </div>
            ) : (
              <div style={{ marginTop: 12, padding: "12px 14px", border: "1px solid var(--border-subtle)", borderRadius: "var(--rsm)", background: "var(--surface)" }}>
                <Field label="Receiving Network Organization">
                  {networkOrgs.length > 0 ? (
                    <Select
                      value={receivingOrgSlug}
                      onChange={(e) => setReceivingOrgSlug(e.target.value)}
                      options={networkOrgs.map((o: any) => ({
                        value: o.slug,
                        label: `${o.name} (${o.referralCapacityStatus.toLowerCase()})`,
                      }))}
                    />
                  ) : (
                    <div style={{ fontSize: "12px", color: "var(--crit-text)", fontWeight: 600 }}>
                      ⚠️ No partner organizations opted into the referral network.
                    </div>
                  )}
                </Field>
                <div style={{ marginTop: 12 }}>
                  <Field label="Target Facility / Branch Name">
                    <Input
                      type="text"
                      value={receivingFacilityName}
                      onChange={(e) => setReceivingFacilityName(e.target.value)}
                      placeholder="e.g. Central Branch Hospital"
                      required
                    />
                  </Field>
                </div>
                <div style={{ marginTop: 12 }}>
                  <Field label="Consent-Gated Sharing Level">
                    <Select
                      value={consentLevel}
                      onChange={(e) => setConsentLevel(e.target.value as any)}
                      options={[
                        { value: "FULL", label: "Full clinical packet (vitals, prescriptions, diagnoses)" },
                        { value: "SUMMARY", label: "Summary only (patient metadata and referral reason)" },
                      ]}
                    />
                  </Field>
                </div>
                <div style={{ marginTop: 12 }}>
                  <label style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "12.5px", cursor: "pointer", color: "var(--ink)", fontWeight: 600 }}>
                    <input
                      type="checkbox"
                      checked={consentChecked}
                      onChange={() => setConsentChecked(!consentChecked)}
                      style={{ cursor: "pointer", accentColor: "var(--accent)" }}
                    />
                    Patient explicitly consents to this network data transfer.
                  </label>
                </div>
              </div>
            )}

            <div style={{ marginTop: 12 }}>
              <Field label="Reason for Referral">
                <Textarea
                  value={referralReason}
                  onChange={(e) => setReferralReason(e.target.value)}
                  placeholder="Describe target clinical query or diagnostic orders..."
                  required
                  style={{ height: "60px" }}
                />
              </Field>
            </div>

            <div style={{ marginTop: 12 }}>
              <Field label="Clinical Summary / Notes (Optional)">
                <Textarea
                  value={clinicalSummary}
                  onChange={(e) => setClinicalSummary(e.target.value)}
                  placeholder="Log symptoms, clinical history, or medical advice..."
                  style={{ height: "80px" }}
                />
              </Field>
            </div>

            <div className="form-actions" style={{ marginTop: 20 }}>
              <Button type="button" variant="ghost" onClick={() => setShowReferModal(false)}>Cancel</Button>
              <Button type="submit" variant="primary">Submit Referral</Button>
            </div>
          </div>
        </form>
      </Modal>

      {/* EDIT PATIENT DEMOGRAPHICS MODAL */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Demographic Profile">
        <form onSubmit={handleEditPatient}>
          <div className="form-wrap" style={{ boxShadow: "none", padding: 0, margin: 0 }}>
            <div className="form-grid">
              <Field label="First Name">
                <Input
                  type="text"
                  value={editFirstName}
                  onChange={(e) => setEditFirstName(e.target.value)}
                  placeholder="Juan"
                  required
                />
              </Field>
              <Field label="Last Name">
                <Input
                  type="text"
                  value={editLastName}
                  onChange={(e) => setEditLastName(e.target.value)}
                  placeholder="Dela Cruz"
                  required
                />
              </Field>
            </div>
            <div className="form-grid" style={{ marginTop: 12 }}>
              <Field label="Contact Phone">
                <Input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  placeholder="+63 917 123 4567"
                />
              </Field>
              <Field label="Date of Birth">
                <Input
                  type="date"
                  value={editDob}
                  onChange={(e) => setEditDob(e.target.value)}
                />
              </Field>
            </div>
            <div className="form-grid" style={{ marginTop: 12 }}>
              <Field label="Blood Type">
                <Select
                  value={editBloodType}
                  onChange={(e) => setEditBloodType(e.target.value)}
                  options={["O+","A+","B+","AB+","O-","A-","B-","AB-"].map((v) => ({ value: v, label: v }))}
                />
              </Field>
              <Field label="Civil Status / Condition">
                <Select
                  value={editCivilStatus}
                  onChange={(e) => setEditCivilStatus(e.target.value)}
                  options={[
                    { value: "Stable", label: "Stable" },
                    { value: "Critical", label: "Critical" },
                    { value: "Monitoring", label: "Monitoring" },
                    { value: "Under Treatment", label: "Under Treatment" },
                  ]}
                />
              </Field>
            </div>
            <div className="form-actions" style={{ marginTop: 20 }}>
              <Button type="button" variant="ghost" onClick={() => setShowEditModal(false)}>Cancel</Button>
              <Button type="submit" variant="primary" disabled={updatePatientMutation.isPending}>
                {updatePatientMutation.isPending ? "Saving..." : "Save Profile Changes"}
              </Button>
            </div>
          </div>
        </form>
      </Modal>

      {/* ADD FAMILY MEMBER MODAL */}
      <Modal isOpen={showAddFamilyModal} onClose={() => setShowAddFamilyModal(false)} title="Establish Household Relationship">
        <form onSubmit={handleAddFamilyMember}>
          <div className="form-wrap" style={{ boxShadow: "none", padding: 0, margin: 0 }}>
            {patientOptions.length === 0 ? (
              <div style={{ textAlign: "center", padding: "16px", color: "var(--muted)", fontSize: "13px" }}>
                No other patients registered in this facility. Register a patient first to link them.
              </div>
            ) : (
              <>
                <Field label="Select Registered Patient">
                  <Select
                    value={relatedPatientId}
                    onChange={(e) => setRelatedPatientId(e.target.value)}
                    options={[{ value: "", label: "Choose a patient..." }, ...patientOptions]}
                    required
                  />
                </Field>
                <div style={{ marginTop: 12 }}>
                  <Field label="Relationship Role to Active Patient">
                    <Select
                      value={relationshipType}
                      onChange={(e) => setRelationshipType(e.target.value)}
                      options={[
                        { value: "Spouse", label: "Spouse" },
                        { value: "Child", label: "Child" },
                        { value: "Parent", label: "Parent" },
                        { value: "Sibling", label: "Sibling" },
                      ]}
                    />
                  </Field>
                </div>
                <div className="form-actions" style={{ marginTop: 20 }}>
                  <Button type="button" variant="ghost" onClick={() => setShowAddFamilyModal(false)}>Cancel</Button>
                  <Button type="submit" variant="primary" disabled={addRelationshipMutation.isPending}>
                    {addRelationshipMutation.isPending ? "Linking..." : "Establish Relationship"}
                  </Button>
                </div>
              </>
            )}
          </div>
        </form>
      </Modal>

      {/* UPLOAD DOCUMENT MODAL */}
      <Modal isOpen={showDocModal} onClose={() => setShowDocModal(false)} title="Upload Patient Document / Attachment">
        <form onSubmit={handleUploadDoc}>
          <div className="form-wrap" style={{ boxShadow: "none", padding: 0, margin: 0 }}>
            <Field label="Document Name / Title">
              <Input
                type="text"
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
                placeholder="e.g. Lipids Report April 2026"
                required
              />
            </Field>
            <div style={{ marginTop: 12 }}>
              <Field label="Document Category Type">
                <Select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  options={[
                    { value: "Lab Report", label: "Lab Report / Lab Slip" },
                    { value: "Prescription Scan", label: "Prescription Scan" },
                    { value: "Consent Sheet", label: "Consent Sheet" },
                    { value: "Radiology Scan", label: "Radiology / X-Ray / MRI" },
                    { value: "Other Attachment", label: "Other Attachment" },
                  ]}
                />
              </Field>
            </div>

            {/* Drag & Drop Simulation */}
            <div
              style={{
                marginTop: 16,
                padding: "24px 16px",
                border: "2px dashed var(--border)",
                borderRadius: "var(--rsm)",
                background: "var(--surface)",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => {
                if (!docName) setDocName("Attached Clinical Record");
              }}
            >
              <svg viewBox="0 0 16 16" style={{ width: 32, height: 32, stroke: "var(--accent)", fill: "none", marginBottom: 8 }}><path d="M8 2.5v7.5M5 6.5l3-3 3 3M1.5 13.5h13"/></svg>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--ink)" }}>Simulate File Attachment</div>
              <div style={{ fontSize: "11px", color: "var(--muted)", marginTop: 4 }}>Click here to select a virtual file for clinical record attachment.</div>
            </div>

            <div className="form-actions" style={{ marginTop: 20 }}>
              <Button type="button" variant="ghost" onClick={() => setShowDocModal(false)}>Cancel</Button>
              <Button type="submit" variant="primary" disabled={uploadDocMutation.isPending}>
                {uploadDocMutation.isPending ? "Uploading..." : "Save Attachment"}
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
