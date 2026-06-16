"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Button,
  ThemeToggle,
  Modal,
  Toast,
  Field,
  Input,
  Select,
} from "@healthbridge/ui";

// Layer 2 hooks
import {
  usePatients,
  useCreatePatient,
  usePullRequest,
  usePullConfirm,
} from "../../lib/hooks/api/usePatients";
import {
  useAppointments,
  useCreateAppointment,
} from "../../lib/hooks/api/useAppointments";
import {
  usePlugins,
  useTogglePlugin,
  useInstallPlugin,
} from "../../lib/hooks/api/usePlugins";
import { useSubmitNewVisit } from "../../lib/hooks/api/useConsultations";
import { useFacilities } from "../../lib/hooks/api/useFacilities";
import { useAdminRoles } from "../../lib/hooks/api/useStaff";

// Layer 1 (auth sign-out)
import { signOutStaff, getStaffSession } from "../../lib/api/auth";
import { updateSelfAvailability } from "../../lib/api/staff";

import type { NewVisitPayload } from "../../lib/api/consultations";
import type { CreatePatient } from "@healthbridge/contracts";
import { DashboardContext } from "./dashboard-context";
import { BookAppointmentModal } from "./book-appointment-modal";

const DEFAULT_ROLES = ["System Admin"];

const ROLE_COLORS: Record<string, string> = {
  "System Admin": "#7c3aed",
  "Clinic Manager": "#7c3aed",
  "Attending Doctor": "#1d4ed8",
  Nurse: "#059669",
  Pharmacist: "#d97706",
};

function getRoleColor(role: any) {
  if (!role) return "var(--accent)";
  const name = typeof role === "string" ? role : role.name;
  if (DEFAULT_ROLES.includes(name)) {
    return ROLE_COLORS[name] ?? "var(--accent)";
  }
  return role.color || "var(--accent)";
}

const AVAILABLE_ICONS = {
  shield: {
    label: "Shield / Admin",
    svg: (
      <svg viewBox="0 0 15 15">
        <path d="M7.5 1.5L2 4v4c0 3 2.5 5.5 5.5 6.5C10.5 13.5 13 11 13 8V4z" />
      </svg>
    ),
  },
  doctor: {
    label: "Doctor / Staff",
    svg: (
      <svg viewBox="0 0 15 15">
        <circle cx="7.5" cy="4.5" r="2.5" />
        <path d="M2.5 13c0-2.8 2.2-5 5-5s5 2.2 5 5" />
        <path d="M7.5 8v3M6 9.5h3" />
      </svg>
    ),
  },
  nurse: {
    label: "Nurse / Care",
    svg: (
      <svg viewBox="0 0 15 15">
        <rect x="2" y="1.5" width="11" height="12" rx="2" />
        <path d="M7.5 5v4M5.5 7h4" />
      </svg>
    ),
  },
  pharmacist: {
    label: "Pharmacist / Pills",
    svg: (
      <svg viewBox="0 0 15 15">
        <path d="M5 2h5l2 3H3L5 2z" />
        <rect x="2" y="5" width="11" height="8" rx="1.5" />
        <path d="M5 8.5h5M7.5 7v3" />
      </svg>
    ),
  },
  pulse: {
    label: "Pulse / Vitals",
    svg: (
      <svg viewBox="0 0 15 15">
        <path d="M1.5 7.5h3l2-4.5 2 9 1.5-6.5 1.5 2h2" />
      </svg>
    ),
  },
  heart: {
    label: "Heart / Health",
    svg: (
      <svg viewBox="0 0 15 15">
        <path d="M7.5 13S1.5 9.5 1.5 5A3.5 3.5 0 0 1 8 2.5a3.5 3.5 0 0 1 6.5 2.5c0 4.5-6 8-6 8z" />
      </svg>
    ),
  },
};

const ROLE_ICONS_MAPPING: Record<string, string> = {
  "System Admin": "shield",
  "Clinic Manager": "shield",
  "Attending Doctor": "doctor",
  Nurse: "nurse",
  Pharmacist: "pharmacist",
};

function getRoleIcon(role: any) {
  if (!role) return AVAILABLE_ICONS.doctor;
  const name = typeof role === "string" ? role : role.name;
  if (DEFAULT_ROLES.includes(name)) {
    const key = ROLE_ICONS_MAPPING[name] || "doctor";
    return AVAILABLE_ICONS[key as keyof typeof AVAILABLE_ICONS];
  }
  const key = role.icon as keyof typeof AVAILABLE_ICONS;
  return AVAILABLE_ICONS[key] || AVAILABLE_ICONS.doctor;
}

// ──────────────────────────────────────────────────────────────────────
// Inner component (has access to useSearchParams)
// ──────────────────────────────────────────────────────────────────────
function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const navigateTo = React.useCallback(
    (path: string) => {
      router.push(path);
    },
    [router],
  );

  // ── React Query data ────────────────────────────────────────────────
  const { data: patientData = [], isLoading: isLoadingPatients } =
    usePatients();
  const { data: appointmentData = [], isLoading: isLoadingAppointments } =
    useAppointments();
  const { data: pluginData = [] } = usePlugins();
  const { data: facilities = [] } = useFacilities();
  const { data: roles = [] } = useAdminRoles();

  const [selectedFacilityId, setSelectedFacilityId] = React.useState<
    string | null
  >(null);
  const [switcherOpen, setSwitcherOpen] = React.useState(false);
  const switcherRef = React.useRef<HTMLDivElement>(null);

  // Initialize selected facility
  React.useEffect(() => {
    if (facilities.length > 0 && !selectedFacilityId) {
      const saved = sessionStorage.getItem("hb_active_facility_id");
      const activeFac =
        facilities.find((f: any) => f.id === saved) || facilities[0];
      setSelectedFacilityId(activeFac.id);
    }
  }, [facilities, selectedFacilityId]);

  const activeFacility = React.useMemo(() => {
    return facilities.find((f: any) => f.id === selectedFacilityId) || null;
  }, [facilities, selectedFacilityId]);

  // Click outside to close switcher
  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        switcherRef.current &&
        !switcherRef.current.contains(e.target as Node)
      ) {
        setSwitcherOpen(false);
      }
    };
    if (switcherOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [switcherOpen]);

  const selectFacility = (id: string) => {
    setSelectedFacilityId(id);
    sessionStorage.setItem("hb_active_facility_id", id);
    setSwitcherOpen(false);
    triggerToast(
      `Switched facility to ${facilities.find((f: any) => f.id === id)?.name}`,
    );
  };

  const createPatientMutation = useCreatePatient();
  const pullRequestMutation = usePullRequest();
  const pullConfirmMutation = usePullConfirm();
  const submitNewVisitMutation = useSubmitNewVisit();
  const togglePluginMutation = useTogglePlugin();
  const installPluginMutation = useInstallPlugin();

  // Map raw API patients to display shape
  const patients = React.useMemo(
    () =>
      patientData.map((p: any) => ({
        id: p.id,
        pin: p.pin,
        name: `${p.firstName} ${p.lastName}`,
        age: p.patientAgeYears ?? 35,
        gender: p.sex === "FEMALE" ? "Female" : "Male",
        phone: p.contactNumber ?? "—",
        status: p.status ?? "Active",
        condition: p.civilStatus ?? "Stable",
        lastVisit: p.updatedAt
          ? new Date(p.updatedAt).toLocaleDateString()
          : "—",
        nextAppt: "—",
        dob: p.birthDate
          ? new Date(p.birthDate).toISOString().split("T")[0]
          : "",
        blood: p.bloodType ?? "O+",
      })),
    [patientData],
  );

  const appointments = React.useMemo(
    () =>
      appointmentData.map((a: any) => ({
        id: a.id,
        time: a.scheduledTime ?? "9:00 AM",
        date: a.scheduledDate,
        patientId: a.patientId,
        type:
          a.purpose?.toLowerCase().includes("urgent") ||
          a.purpose?.toLowerCase().includes("chest pain")
            ? "Urgent"
            : a.purpose?.toLowerCase().includes("initial") ||
                a.purpose?.toLowerCase().includes("new")
              ? "New Patient"
              : a.purpose?.toLowerCase().includes("tele")
                ? "Teleconsultation"
                : "Consultation",
        reason: a.purpose ?? "Follow-up",
        status: a.status === "PENDING" ? "Scheduled" : a.status,
        color: "var(--accent)",
        meetingLink: a.meetingLink ?? undefined,
        passcode: a.passcode ?? undefined,
      })),
    [appointmentData],
  );

  // ── Session ─────────────────────────────────────────────────────────
  const [session, setSession] = React.useState<any>(null);
  React.useEffect(() => {
    let active = true;
    getStaffSession()
      .then((s) => {
        if (!active) return;
        if (!s) {
          router.push("/login");
        } else {
          setSession(s);
          if ((s.user as any).isFirstLogin) {
            router.push("/login");
          }
        }
      })
      .catch((err) => {
        if (!active) return;
        // Ignore aborted requests during page transitions
        if (
          err.name === "AbortError" ||
          err.message?.includes("NetworkError") ||
          err.message?.includes("Failed to fetch")
        ) {
          return;
        }
        console.error("Staff session retrieval failed:", err);
        router.push("/login");
      });
    return () => {
      active = false;
    };
  }, [pathname, router]);

  // ── Selected patient ────────────────────────────────────────────────
  const [selectedPatientId, setSelectedPatientId] = React.useState<
    string | null
  >(null);
  React.useEffect(() => {
    if (patients.length > 0 && !selectedPatientId) {
      setSelectedPatientId(patients[0].id);
    }
  }, [patients, selectedPatientId]);
  const selectedPatient = patients.find((p) => p.id === selectedPatientId) ??
    patients[0] ?? { id: "—", name: "No Patient Selected" };

  // ── Stats ────────────────────────────────────────────────────────────
  const statPatients = patients.length;
  const statAppts = appointments.length;
  const statLabs = 4; // placeholder until labs module is built
  const statRx = 12; // placeholder until pharmacy module is built

  // ── Notifications (local state) ─
  const [alerts, setAlerts] = React.useState([
    {
      id: "a1",
      type: "crit",
      title: "Insulin Glargine — critically low",
      desc: "4 units remaining · Minimum threshold: 20 units · Auto-reorder suggested",
      time: "Just now",
    },
    {
      id: "a2",
      type: "warn",
      title: "Amoxicillin 500mg — expiring soon",
      desc: "Batch #B2024-11 · Expires Jun 15 2026 · 18 days remaining",
      time: "5m ago",
    },
    {
      id: "a3",
      type: "warn",
      title: "Metformin 850mg — reorder due",
      desc: "Stock at 110 units · Reorder point: 150 units · Supplier: MedPharma",
      time: "1h ago",
    },
    {
      id: "a4",
      type: "info",
      title: "Dr. Santos completed a consultation for Chat Patient",
      desc: "Consultation note finalized for hypertension follow-up",
      time: "2h ago",
    },
    {
      id: "a5",
      type: "info",
      title: "System backup completed successfully",
      desc: "Daily incremental database backup verified and stored",
      time: "4h ago",
    },
  ]);

  // ── Notifications dropdown toggle & click-outside ──────────────────
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const notificationsRef = React.useRef<HTMLDivElement>(null);
  const notificationBellRef = React.useRef<HTMLButtonElement>(null);

  // ── Toast ─────────────────────────────────────────────────────────────
  const [showToast, setShowToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");
  const [toastType, setToastType] = React.useState<"check" | "alert">("check");

  const triggerToast = React.useCallback(
    (msg: string, type: "check" | "alert" = "check") => {
      setToastMessage(msg);
      setToastType(type);
      setShowToast(true);
    },
    [],
  );

  React.useEffect(() => {
    if (showToast) {
      const t = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(t);
    }
  }, [showToast]);

  // ── Register patient modal ────────────────────────────────────────────
  const [showModal, setShowModal] = React.useState(false);
  const [newRegName, setNewRegName] = React.useState("");
  const [newRegAge, setNewRegAge] = React.useState("");
  const [newRegGender, setNewRegGender] = React.useState("Male");
  const [newRegPhone, setNewRegPhone] = React.useState("");
  const [newRegDob, setNewRegDob] = React.useState("");
  const [newRegBlood, setNewRegBlood] = React.useState("O+");
  const [newRegAllergy, setNewRegAllergy] = React.useState("None");

  // ── Pull record modal ─────────────────────────────────────────────────
  const [showPullModal, setShowPullModal] = React.useState(false);
  const [pullPin, setPullPin] = React.useState("");
  const [pullOtp, setPullOtp] = React.useState("");
  const [pullStep, setPullStep] = React.useState<"search" | "otp">("search");
  const [pullTargetOrg, setPullTargetOrg] = React.useState("");

  // ── Book appointment modal ────────────────────────────────────────────
  const [showBookModal, setShowBookModal] = React.useState(false);
  const createAppointmentMutation = useCreateAppointment();

  // ── New visit SOAP state ──────────────────────────────────────────────
  const [patientHeight, setPatientHeight] = React.useState("");
  const [patientWeight, setPatientWeight] = React.useState("");
  const [calculatedBmi, setCalculatedBmi] = React.useState<number | null>(null);
  const [soapNotes, setSoapNotes] = React.useState("");
  const [selectedIcd, setSelectedIcd] = React.useState("");
  const [modeOfTransaction, setModeOfTransaction] = React.useState("WALK_IN");
  const [prescribedMed, setPrescribedMed] = React.useState("");
  const [prescriptions, setPrescriptions] = React.useState<any[]>([]);

  // BMI auto-compute
  React.useEffect(() => {
    const h = parseFloat(patientHeight) / 100;
    const w = parseFloat(patientWeight);
    setCalculatedBmi(
      h > 0 && w > 0 ? parseFloat((w / (h * h)).toFixed(1)) : null,
    );
  }, [patientHeight, patientWeight]);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationsOpen &&
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node) &&
        notificationBellRef.current &&
        !notificationBellRef.current.contains(event.target as Node)
      ) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [notificationsOpen]);

  // ── Alert handlers ────────────────────────────────────────────────────
  const handleDismissAlert = React.useCallback(
    (id: string) => {
      setAlerts((prev) => prev.filter((a) => a.id !== id));
      triggerToast("Alert dismissed from clinical logs");
    },
    [triggerToast],
  );

  const handleResolveAlerts = React.useCallback(() => {
    setAlerts([]);
    triggerToast("All active clinical alerts resolved");
  }, [triggerToast]);

  // ── Patient registration ──────────────────────────────────────────────
  const handleRegisterPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRegName || !newRegDob || !newRegPhone) {
      triggerToast(
        "Please fill in name, date of birth and phone number",
        "alert",
      );
      return;
    }
    const parts = newRegName.trim().split(" ");
    const firstName = parts[0] ?? "Unknown";
    const lastName = parts.slice(1).join(" ") || "Patient";

    try {
      const newPatient = await createPatientMutation.mutateAsync({
        firstName,
        lastName,
        sex: newRegGender.toUpperCase() === "FEMALE" ? "FEMALE" : "MALE",
        birthDate: newRegDob,
        contactNumber: newRegPhone,
        orgType: "PRIVATE",
        bloodType: newRegBlood,
      } as CreatePatient);

      triggerToast(`Patient ${firstName} ${lastName} registered!`);
      setShowModal(false);
      setNewRegName("");
      setNewRegDob("");
      setNewRegPhone("");
      setSelectedPatientId(newPatient.id);
      navigateTo("/patients");
    } catch (err: any) {
      triggerToast(err.message || "Failed to register patient", "alert");
    }
  };

  // ── Pull patient record ───────────────────────────────────────────────
  const handlePullRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pullPin) return;
    try {
      const data = await pullRequestMutation.mutateAsync(pullPin);
      setPullTargetOrg(data.targetOrgSlug ?? "");
      setPullStep("otp");
      triggerToast("Verification code sent to patient");
    } catch (err: any) {
      triggerToast(err.message || "Failed to initiate record pull", "alert");
    }
  };

  const handlePullConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pullPin || !pullOtp) return;
    try {
      await pullConfirmMutation.mutateAsync({
        patientPin: pullPin,
        otp: pullOtp,
      });
      triggerToast("Patient records imported successfully!");
      setShowPullModal(false);
      setPullPin("");
      setPullOtp("");
      setPullStep("search");
    } catch (err: any) {
      triggerToast(err.message || "OTP verification failed", "alert");
    }
  };

  // ── SOAP / New Visit submission ───────────────────────────────────────
  const handleSaveSoap = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient || selectedPatient.id === "—") {
      triggerToast("No patient selected", "alert");
      return;
    }

    // Map prescriptions array for submitNewVisit
    const prescriptionsPayload = prescriptions.map((p) => ({
      medicineName: p.medicineName,
      dose: p.dose || "1 tablet",
      frequency: p.frequency || "Once daily",
      duration: p.duration || "30 days",
      quantity: p.quantity,
    }));

    try {
      await submitNewVisitMutation.mutateAsync({
        patientId: selectedPatient.id,
        chiefComplaint: soapNotes || "Routine Consultation",
        soapNotes,
        vitals: {
          heightCm: parseFloat(patientHeight) || undefined,
          weightKg: parseFloat(patientWeight) || undefined,
          bmi: calculatedBmi ?? undefined,
        },
        icd10Code: selectedIcd || undefined,
        diagnosisType: "FINAL",
        prescriptions: prescriptionsPayload,
        modeOfTransaction,
      });

      triggerToast(`SOAP notes saved for ${selectedPatient.name}`);
      setPatientHeight("");
      setPatientWeight("");
      setSoapNotes("");
      setSelectedIcd("");
      setPrescribedMed("");
      setModeOfTransaction("WALK_IN");
      setPrescriptions([]);
      navigateTo("/records");
    } catch (err: any) {
      triggerToast(err.message || "Failed to save consultation", "alert");
    }
  };

  // ── Plugin handlers ───────────────────────────────────────────────────
  const handleTogglePlugin = async (pluginId: string) => {
    try {
      await togglePluginMutation.mutateAsync(pluginId);
      triggerToast("Plugin state toggled");
    } catch (err: any) {
      triggerToast(err.message || "Failed to toggle plugin", "alert");
    }
  };

  const handleInstallPlugin = async (pluginId: string) => {
    try {
      await installPluginMutation.mutateAsync(pluginId);
      triggerToast("Plugin installed successfully");
    } catch (err: any) {
      triggerToast(err.message || "Failed to install plugin", "alert");
    }
  };

  // ── Route helpers ─────────────────────────────────────────────────────
  const isRouteActive = (path: string) => {
    if (path === "/") return pathname === "/";
    if (path === "/patients") {
      return (
        pathname.startsWith("/patients") ||
        pathname.startsWith("/records") ||
        pathname.startsWith("/newvisit")
      );
    }
    return pathname.startsWith(path);
  };

  // ── Sidebar user display ──────────────────────────────────────────────
  const displayName = session?.user?.name ?? "Staff";
  const displayRole = session?.session?.roleName ?? "Provider";
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const isSystemAdmin = displayRole === "System Admin";

  return (
    <DashboardContext.Provider
      value={{
        patients,
        appointments,
        plugins: pluginData,
        alerts,
        session,
        isLoadingPatients,
        isLoadingAppointments,
        selectedPatientId,
        setSelectedPatientId,
        selectedPatient,
        statPatients,
        statAppts,
        statLabs,
        statRx,
        showModal,
        setShowModal,
        showPullModal,
        setShowPullModal,
        pullStep,
        setPullStep,
        showBookModal,
        setShowBookModal,
        triggerToast,
        handleDismissAlert,
        handleResolveAlerts,
        patientHeight,
        setPatientHeight,
        patientWeight,
        setPatientWeight,
        calculatedBmi,
        soapNotes,
        setSoapNotes,
        selectedIcd,
        setSelectedIcd,
        modeOfTransaction,
        setModeOfTransaction,
        prescribedMed,
        setPrescribedMed,
        prescriptions,
        setPrescriptions,
        handleRegisterPatient,
        handlePullRequest,
        handlePullConfirm,
        handleSaveSoap,
        handleTogglePlugin,
        handleInstallPlugin,
        navigateTo,
        activeFacility,
        facilities,
        setSelectedFacilityId: selectFacility,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .notifications-dropdown {
            position: absolute;
            right: 0;
            top: 48px;
            width: 340px;
            background: var(--white);
            border: 1px solid var(--border-subtle);
            border-radius: var(--rmd);
            box-shadow: var(--card-shadow);
            z-index: 1000;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            text-align: left;
          }
          .notif-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 16px;
            border-bottom: 1px solid var(--border-subtle);
          }
          .notif-header span {
            font-family: 'Sora', sans-serif;
            font-weight: 700;
            font-size: 14px;
            color: var(--ink);
          }
          .notif-close-btn {
            background: transparent;
            border: none;
            cursor: pointer;
            color: var(--muted);
            padding: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.15s, color 0.15s;
          }
          .notif-close-btn:hover {
            background: var(--surface);
            color: var(--ink);
          }
          .notif-close-btn svg {
            width: 14px;
            height: 14px;
          }
          .notif-body {
            max-height: 280px;
            overflow-y: auto;
          }
          .notif-item {
            display: flex;
            gap: 12px;
            padding: 12px 16px;
            border-bottom: 1px solid var(--border-subtle);
            cursor: pointer;
            transition: background 0.15s;
          }
          .notif-item:last-child {
            border-bottom: none;
          }
          .notif-item:hover {
            background: var(--surface);
          }
          .notif-avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 12px;
            flex-shrink: 0;
            position: relative;
          }
          .notif-dot {
            position: absolute;
            bottom: -1px;
            right: -1px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            border: 1.5px solid var(--white);
          }
          .notif-content {
            display: flex;
            flex-direction: column;
            gap: 2px;
          }
          .notif-title {
            font-size: 12px;
            font-weight: 600;
            color: var(--ink);
            line-height: 1.4;
          }
          .notif-meta {
            font-size: 10.5px;
            color: var(--muted);
          }
          .notif-empty {
            padding: 24px;
            text-align: center;
            color: var(--muted);
            font-size: 13px;
          }
          .notif-footer {
            padding: 10px 16px;
            border-top: 1px solid var(--border-subtle);
            background: var(--surface);
            display: flex;
          }
          .notif-view-all {
            width: 100%;
            background: transparent;
            border: 1px solid var(--border);
            border-radius: var(--rsm);
            padding: 8px;
            font-family: 'DM Sans', sans-serif;
            font-size: 12px;
            font-weight: 600;
            color: var(--ink);
            cursor: pointer;
            transition: background 0.15s, border-color 0.15s;
            text-align: center;
          }
          .notif-view-all:hover {
            background: var(--white);
            border-color: var(--accent);
            color: var(--accent);
          }
        `,
          }}
        />

        {/* TOPBAR */}
        <div className="topbar">
          <a
            href="#"
            className="tb-logo"
            onClick={(e) => {
              e.preventDefault();
              navigateTo("/");
            }}
          >
            <div className="tb-logo-icon">
              <svg viewBox="0 0 20 20">
                <path d="M10 2a1 1 0 0 1 1 1v1h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3V3a1 1 0 0 1 1-1zm0 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
              </svg>
            </div>
            <span>HealthBridge EMR</span>
          </a>

          <div className="tb-search">
            <svg className="tb-search-icon" viewBox="0 0 16 16">
              <circle cx="7" cy="7" r="5" />
              <path d="M10.5 10.5l3 3" />
            </svg>
            <input
              type="text"
              placeholder="Search patients, records, prescriptions..."
            />
          </div>

          <div className="tb-right" style={{ position: "relative" }}>
            <div style={{ position: "relative" }}>
              <button
                className={`tb-icon-btn ${notificationsOpen ? "active" : ""}`}
                title="Notifications"
                ref={notificationBellRef}
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <svg viewBox="0 0 16 16">
                  <path d="M8 1.5v.8a5 5 0 0 1 4 4.9v2.3l1 2H3l1-2V7.2A5 5 0 0 1 8 2.3V1.5z" />
                  <path d="M6.5 12.5a1.5 1.5 0 0 0 3 0" />
                </svg>
                {alerts.length > 0 && <span className="tb-badge" />}
              </button>

              {/* Notifications Dropdown */}
              {notificationsOpen && (
                <div
                  className="notifications-dropdown"
                  ref={notificationsRef}
                  style={{ top: "42px" }}
                >
                  <div className="notif-header">
                    <span>Notifications</span>
                    <button
                      className="notif-close-btn"
                      onClick={() => setNotificationsOpen(false)}
                    >
                      <svg viewBox="0 0 15 15">
                        <path
                          d="M3.25 3.25l8.5 8.5M11.75 3.25l-8.5 8.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="notif-body">
                    {alerts.length > 0 ? (
                      alerts.map((al) => {
                        const isCrit = al.type === "crit";
                        const isWarn = al.type === "warn";
                        const dotColor = isCrit
                          ? "var(--crit-text)"
                          : isWarn
                            ? "var(--warn-text)"
                            : "var(--accent)";

                        // Avatar initials & color based on alert
                        let initials = "SY";
                        let avatarBg = "var(--accent-light)";
                        let avatarColor = "var(--accent)";

                        if (al.title.includes("Insulin")) {
                          initials = "DP";
                          avatarBg = "rgba(239, 68, 68, 0.12)";
                          avatarColor = "var(--crit-text)";
                        } else if (
                          al.title.includes("Amoxicillin") ||
                          al.title.includes("Metformin")
                        ) {
                          initials = "IV";
                          avatarBg = "rgba(245, 158, 11, 0.12)";
                          avatarColor = "var(--warn-text)";
                        } else if (al.title.includes("consultation")) {
                          initials = "CL";
                          avatarBg = "rgba(34, 197, 94, 0.12)";
                          avatarColor = "#16a34a";
                        }

                        return (
                          <div
                            key={al.id}
                            className="notif-item"
                            onClick={() => {
                              setNotificationsOpen(false);
                              navigateTo("/notifications");
                            }}
                          >
                            <div
                              className="notif-avatar"
                              style={{
                                background: avatarBg,
                                color: avatarColor,
                              }}
                            >
                              {initials}
                              <span
                                className="notif-dot"
                                style={{ background: dotColor }}
                              />
                            </div>
                            <div className="notif-content">
                              <div className="notif-title">{al.title}</div>
                              <div className="notif-meta">
                                {al.title.includes("Insulin")
                                  ? "Dispensary"
                                  : al.title.includes("consultation")
                                    ? "Clinical"
                                    : al.title.includes("System")
                                      ? "System"
                                      : "Inventory"}{" "}
                                • {al.time}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="notif-empty">No new notifications</div>
                    )}
                  </div>
                  <div className="notif-footer">
                    <button
                      className="notif-view-all"
                      onClick={() => {
                        setNotificationsOpen(false);
                        navigateTo("/notifications");
                      }}
                    >
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            <ThemeToggle />

            {displayRole === "Attending Doctor" && (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  marginRight: "12px",
                  marginLeft: "12px",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: session?.user?.isAcceptingConsultations
                      ? "#10b981"
                      : "#f59e0b",
                    boxShadow: session?.user?.isAcceptingConsultations
                      ? "0 0 8px #10b981"
                      : "0 0 8px #f59e0b",
                    transition: "all 0.2s",
                  }}
                />
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "var(--muted)",
                  }}
                >
                  {session?.user?.isAcceptingConsultations
                    ? "Accepting Consults"
                    : "On Break"}
                </span>
                <button
                  onClick={async () => {
                    if (!session?.user) return;
                    const nextVal = !session.user.isAcceptingConsultations;
                    try {
                      await updateSelfAvailability(nextVal);
                      setSession((prev: any) => ({
                        ...prev,
                        user: {
                          ...prev.user,
                          isAcceptingConsultations: nextVal,
                        },
                      }));
                      triggerToast(
                        nextVal
                          ? "You are now accepting consultations."
                          : "Status set to On Break.",
                      );
                    } catch (err: any) {
                      triggerToast(
                        err.message || "Failed to update availability",
                        "alert",
                      );
                    }
                  }}
                  style={{
                    padding: "3px 8px",
                    borderRadius: "6px",
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    fontSize: "10px",
                    fontWeight: 600,
                    cursor: "pointer",
                    color: "var(--ink)",
                    transition: "all 0.15s ease",
                    marginLeft: "4px",
                  }}
                >
                  Change
                </button>
              </div>
            )}

            <div className="tb-divider" />

            <div
              className="tb-avatar"
              title="View Profile"
              style={{ cursor: "pointer" }}
              onClick={() => navigateTo("/profile")}
            >
              {initials}
            </div>
            <div
              className="tb-user"
              style={{ cursor: "pointer" }}
              onClick={() => navigateTo("/profile")}
            >
              <div className="tb-user-name">{displayName}</div>
              {(() => {
                const userRoleObject = roles.find(
                  (r: any) => r.name === displayRole,
                ) || { name: displayRole };
                const customColor = getRoleColor(userRoleObject);
                const roleIcon = getRoleIcon(userRoleObject);
                return (
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: "2px 6px",
                      borderRadius: "6px",
                      background: `${customColor}14`,
                      fontSize: "10px",
                      fontWeight: 600,
                      color: customColor,
                      lineHeight: "1",
                      marginTop: "4px",
                      alignSelf: "flex-start",
                    }}
                  >
                    {React.cloneElement(roleIcon.svg, {
                      style: {
                        width: "11px",
                        height: "11px",
                        stroke: customColor,
                        strokeWidth: 2,
                        fill: "none",
                        flexShrink: 0,
                      },
                    })}
                    <span>{displayRole}</span>
                  </div>
                );
              })()}
            </div>

            <button
              className="tb-icon-btn"
              title="Sign out"
              onClick={async () => {
                await signOutStaff();
                window.location.href = "/login";
              }}
            >
              <svg viewBox="0 0 16 16">
                <path d="M6 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3M10 11l4-4-4-4M14 8H6" />
              </svg>
            </button>
          </div>
        </div>

        {/* APP BODY */}
        <div className="app-body">
          {/* SIDEBAR */}
          <div className="sidebar">
            <div
              className={`sb-facility ${switcherOpen ? "open" : ""}`}
              ref={switcherRef}
            >
              <button
                className="sb-facility-btn"
                onClick={() => setSwitcherOpen(!switcherOpen)}
              >
                <div className="sb-facility-icon">
                  <svg viewBox="0 0 15 15">
                    <path d="M2 13.5V4.5L7.5 1.5 13 4.5v9" />
                    <path d="M5.5 13.5V10h4v3.5" />
                    <path d="M4.5 6.5H6M9 6.5h1.5" />
                  </svg>
                </div>
                <div className="sb-facility-text">
                  <div className="sb-facility-org">
                    {session?.session?.tenantSlug
                      ? `${session.session.tenantSlug.replace(/-/g, " ")} group`
                      : "HealthBridge Group"}
                  </div>
                  <div className="sb-facility-name">
                    {activeFacility
                      ? activeFacility.name
                      : "Select Facility..."}
                  </div>
                </div>
                <svg className="sb-facility-chevron" viewBox="0 0 12 12">
                  <path d="M2.5 4.5l3.5 3.5 3.5-3.5" />
                </svg>
              </button>
              {switcherOpen && (
                <div className="sb-facility-menu">
                  <div className="sb-facility-menu-head">Facilities</div>
                  {facilities.map((fac: any) => {
                    const isActive = fac.id === selectedFacilityId;
                    return (
                      <div
                        key={fac.id}
                        className={`sb-facility-item ${isActive ? "active" : ""}`}
                        onClick={() => selectFacility(fac.id)}
                      >
                        <div className="role-icon purple">
                          <svg viewBox="0 0 15 15">
                            <path d="M2 13.5V4.5L7.5 1.5 13 4.5v9" />
                            <path d="M5.5 13.5V10h4v3.5" />
                            <path d="M4.5 6.5H6M9 6.5h1.5" />
                          </svg>
                        </div>
                        <div className="sb-facility-item-text">
                          <div className="sb-facility-item-name">
                            {fac.name}
                          </div>
                          <div className="sb-facility-item-loc">
                            {fac.address || "No address listed"}
                          </div>
                        </div>
                        {isActive && (
                          <svg
                            className="sb-facility-item-check"
                            viewBox="0 0 15 15"
                          >
                            <path d="M2.5 6.5l3 3 5-6" />
                          </svg>
                        )}
                      </div>
                    );
                  })}
                  {isSystemAdmin && (
                    <div className="sb-facility-menu-foot">
                      <button
                        className="sb-facility-manage"
                        onClick={() => {
                          setSwitcherOpen(false);
                          navigateTo("/facilities");
                        }}
                      >
                        <svg viewBox="0 0 13 13">
                          <circle cx="6.5" cy="6.5" r="5" />
                          <path d="M6.5 4v3l2 1.5" />
                        </svg>
                        Manage facilities
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <span className="sb-section">Main</span>

            <div
              className={`sb-item ${isRouteActive("/") ? "active" : ""}`}
              onClick={() => navigateTo("/")}
            >
              <svg viewBox="0 0 15 15">
                <rect x="1.5" y="1.5" width="5" height="5" rx="1" />
                <rect x="8.5" y="1.5" width="5" height="5" rx="1" />
                <rect x="1.5" y="8.5" width="5" height="5" rx="1" />
                <rect x="8.5" y="8.5" width="5" height="5" rx="1" />
              </svg>
              <span>Dashboard</span>
            </div>

            <div
              className={`sb-item ${isRouteActive("/patients") ? "active" : ""}`}
              onClick={() => navigateTo("/patients")}
            >
              <svg viewBox="0 0 15 15">
                <circle cx="7.5" cy="5" r="3" />
                <path d="M1 14c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6" />
              </svg>
              <span>Patients</span>
              <span className="sb-badge">{patients.length}</span>
            </div>

            <div
              className={`sb-item ${isRouteActive("/schedule") ? "active" : ""}`}
              onClick={() => navigateTo("/schedule")}
            >
              <svg viewBox="0 0 15 15">
                <rect x="1.5" y="2.5" width="12" height="11" rx="2" />
                <path d="M5 1.5v2M10 1.5v2M1.5 6.5h12" />
              </svg>
              <span>Appointments</span>
            </div>

            <div
              className={`sb-item ${isRouteActive("/referrals") ? "active" : ""}`}
              onClick={() => navigateTo("/referrals")}
            >
              <svg
                viewBox="0 0 15 15"
                width={15}
                height={15}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              >
                <path d="M1.5 7.5L5 11l8.5-8.5" />
              </svg>
              <span>Referrals</span>
            </div>

            {(session?.session?.permissions?.includes("inventory:read") ||
              session?.session?.permissions?.includes("dispense:read")) &&
              pluginData.some(
                (p) => p.id === "clinical-inventory" && p.isActive,
              ) && (
                <>
                  <span className="sb-section">Inventory</span>
                  {session?.session?.permissions?.includes("inventory:read") && (
                    <>
                      <div
                        className={`sb-item ${isRouteActive("/inventory/stock") ? "active" : ""}`}
                        onClick={() => navigateTo("/inventory/stock")}
                      >
                        <svg
                          viewBox="0 0 15 15"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.2"
                        >
                          <path
                            d="M7.5 1.5L2 4.5v6l5.5 3 5.5-3v-6L7.5 1.5zM2 4.5l5.5 3 5.5-3M7.5 7.5v6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>Stock Levels</span>
                      </div>
                      <div
                        className={`sb-item ${isRouteActive("/inventory/locations") ? "active" : ""}`}
                        onClick={() => navigateTo("/inventory/locations")}
                      >
                        <svg
                          viewBox="0 0 15 15"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.2"
                        >
                          <rect x="1.5" y="1.5" width="12" height="12" rx="1.5" />
                          <path
                            d="M1.5 5.5h12M5.5 1.5v12M9.5 1.5v12"
                            strokeLinecap="round"
                          />
                        </svg>
                        <span>Storage Areas</span>
                      </div>
                      <div
                        className={`sb-item ${isRouteActive("/inventory/ledger") ? "active" : ""}`}
                        onClick={() => navigateTo("/inventory/ledger")}
                      >
                        <svg
                          viewBox="0 0 15 15"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.2"
                        >
                          <rect x="1.5" y="1.5" width="12" height="12" rx="1.5" />
                          <path
                            d="M3.5 4.5h8M3.5 7.5h8M3.5 10.5h8"
                            strokeLinecap="round"
                          />
                        </svg>
                        <span>Movement History</span>
                      </div>
                    </>
                  )}
                  {session?.session?.permissions?.includes("dispense:read") && (
                    <div
                      className={`sb-item ${isRouteActive("/dispensing") ? "active" : ""}`}
                      onClick={() => navigateTo("/dispensing")}
                    >
                      <svg
                        viewBox="0 0 15 15"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      >
                        <path d="M5 2h5l2 3H3L5 2z" strokeLinecap="round" strokeLinejoin="round" />
                        <rect x="2" y="5" width="11" height="8" rx="1.5" />
                        <path d="M5 8.5h5M7.5 7v3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>Dispensing Desk</span>
                    </div>
                  )}
                </>
              )}

            {session?.session?.permissions?.includes("reports:read") && (
              <div
                className={`sb-item ${isRouteActive("/reports") ? "active" : ""}`}
                onClick={() => navigateTo("/reports")}
              >
                <svg
                  viewBox="0 0 15 15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                >
                  <rect x="1.5" y="1.5" width="12" height="12" rx="1.5" />
                  <path d="M4.5 10.5v-3m3 3v-5m3 5v-2" strokeLinecap="round" />
                </svg>
                <span>Reports</span>
              </div>
            )}

            {/* Redundant clinical section removed (records and newvisit are sub-routes of patients) */}

            <span className="sb-section">Administration</span>
            <div
              className={`sb-item ${isRouteActive("/staff") ? "active" : ""}`}
              onClick={() => navigateTo("/staff")}
            >
              <svg viewBox="0 0 15 15">
                <circle cx="7.5" cy="4.5" r="2.5" />
                <path d="M1.5 12.5c0-2.5 2.5-4 6-4s6 1.5 6 4" />
              </svg>
              <span>Staff Management</span>
            </div>
            {isSystemAdmin && (
              <div
                className={`sb-item ${isRouteActive("/roles") ? "active" : ""}`}
                onClick={() => navigateTo("/roles")}
              >
                <svg
                  viewBox="0 0 15 15"
                  width={15}
                  height={15}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                >
                  <rect x="1.5" y="4.5" width="12" height="9" rx="1.5" />
                  <circle cx="5" cy="9" r="1.5" />
                  <path d="M10 6h2M10 8h2M10 10h2" />
                </svg>
                <span>Roles &amp; Permissions</span>
              </div>
            )}
            {isSystemAdmin && (
              <div
                className={`sb-item ${isRouteActive("/facilities") ? "active" : ""}`}
                onClick={() => navigateTo("/facilities")}
              >
                <svg
                  viewBox="0 0 15 15"
                  width={15}
                  height={15}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                >
                  <path d="M1 14V3.5A1.5 1.5 0 0 1 2.5 2h5A1.5 1.5 0 0 1 9 3.5V14m-8 0h13M9 14V7.5A1.5 1.5 0 0 1 10.5 6h2A1.5 1.5 0 0 1 14 7.5V14M3 5h3v2H3zm0 4h3v2H3zm8 0h1v2h-1z" />
                </svg>
                <span>Facilities</span>
              </div>
            )}
            {isSystemAdmin && (
              <div
                className={`sb-item ${isRouteActive("/settings") ? "active" : ""}`}
                onClick={() => navigateTo("/settings")}
              >
                <svg
                  viewBox="0 0 15 15"
                  width={15}
                  height={15}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                >
                  <path d="M7.5 7.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM1.5 5.5l1.5 1M1.5 9.5l1.5-1M13.5 5.5l-1.5 1M13.5 9.5l-1.5-1M5.5 1.5l1 1.5M9.5 1.5l-1 1.5M5.5 13.5l1-1.5M9.5 13.5l-1-1.5" />
                </svg>
                <span>Organization Settings</span>
              </div>
            )}
            {isSystemAdmin && (
              <div
                className={`sb-item ${isRouteActive("/plugins") ? "active" : ""}`}
                onClick={() => navigateTo("/plugins")}
              >
                <svg viewBox="0 0 15 15">
                  <path d="M7.5 1a1 1 0 0 0-1 1v1.1a4.5 4.5 0 0 0-1.8.8l-1-.7a1 1 0 0 0-1.4.2L2.1 5.6a1 1 0 0 0 .2 1.4l.9.6v1.8l-.9.6a1 1 0 0 0-.2 1.4l1.2 2.2a1 1 0 0 0 1.4.2l1-.7a4.5 4.5 0 0 0 1.8.8V14a1 1 0 0 0 1 1 1 1 0 0 0 1-1v-1.1a4.5 4.5 0 0 0 1.8-.8l1 .7a1 1 0 0 0 1.4-.2l1.2-2.2a1 1 0 0 0-.2-1.4l-.9-.6v-1.8l.9-.6a1 1 0 0 0 .2-1.4l-1.2-2.2a1 1 0 0 0-1.4-.2l-1 .7A4.5 4.5 0 0 0 8.5 3.1V2a1 1 0 0 0-1-1zm0 4a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z" />
                </svg>
                <span>Plugins</span>
              </div>
            )}

            <div className="sb-footer">
              <div
                className={`sb-item ${isRouteActive("/profile") ? "active" : ""}`}
                onClick={() => navigateTo("/profile")}
              >
                <svg
                  viewBox="0 0 15 15"
                  width="15"
                  height="15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                >
                  <circle cx="7.5" cy="5" r="2.5" />
                  <path d="M1.5 12.5c0-2.5 2.5-4 6-4s6 1.5 6 4" />
                </svg>
                <span>My Profile</span>
              </div>
            </div>
          </div>

          {/* CONTENT PANEL */}
          <div className="content">{children}</div>
        </div>

        {/* REGISTER PATIENT DIALOG */}
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Register Patient Profile"
        >
          <form onSubmit={handleRegisterPatient}>
            <div
              className="form-wrap"
              style={{ boxShadow: "none", padding: 0, margin: 0 }}
            >
              <div className="form-grid">
                <Field label="First &amp; Last Name">
                  <Input
                    type="text"
                    value={newRegName}
                    onChange={(e) => setNewRegName(e.target.value)}
                    placeholder="Juan Dela Cruz"
                    required
                  />
                </Field>
                <Field label="Age">
                  <Input
                    type="number"
                    value={newRegAge}
                    onChange={(e) => setNewRegAge(e.target.value)}
                    placeholder="30"
                    required
                  />
                </Field>
              </div>
              <div className="form-grid">
                <Field label="Sex / Gender">
                  <Select
                    value={newRegGender}
                    onChange={(e) => setNewRegGender(e.target.value)}
                    options={[
                      { value: "Male", label: "Male" },
                      { value: "Female", label: "Female" },
                    ]}
                  />
                </Field>
                <Field label="Contact Phone">
                  <Input
                    type="tel"
                    value={newRegPhone}
                    onChange={(e) => setNewRegPhone(e.target.value)}
                    placeholder="+63 917 123 4567"
                    required
                  />
                </Field>
              </div>
              <div className="form-grid">
                <Field label="Date of Birth">
                  <Input
                    type="date"
                    value={newRegDob}
                    onChange={(e) => setNewRegDob(e.target.value)}
                  />
                </Field>
                <Field label="Blood Type">
                  <Select
                    value={newRegBlood}
                    onChange={(e) => setNewRegBlood(e.target.value)}
                    options={[
                      "O+",
                      "A+",
                      "B+",
                      "AB+",
                      "O-",
                      "A-",
                      "B-",
                      "AB-",
                    ].map((v) => ({ value: v, label: v }))}
                  />
                </Field>
              </div>
              <div className="form-grid full">
                <Field label="Allergies">
                  <Input
                    type="text"
                    value={newRegAllergy}
                    onChange={(e) => setNewRegAllergy(e.target.value)}
                    placeholder="e.g. Penicillin, Sulfa"
                  />
                </Field>
              </div>
              <div className="form-actions" style={{ marginTop: 20 }}>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={createPatientMutation.isPending}
                >
                  {createPatientMutation.isPending
                    ? "Registering..."
                    : "Register Record"}
                </Button>
              </div>
            </div>
          </form>
        </Modal>

        {/* PULL PATIENT RECORD DIALOG */}
        <Modal
          isOpen={showPullModal}
          onClose={() => setShowPullModal(false)}
          title="Cross-Tenant Record Pull"
        >
          {pullStep === "search" ? (
            <form onSubmit={handlePullRequest}>
              <div
                className="form-wrap"
                style={{ boxShadow: "none", padding: 0, margin: 0 }}
              >
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--muted)",
                    marginBottom: "16px",
                  }}
                >
                  Enter the global patient PIN to locate their health record in
                  another organization and request a direct sync transfer.
                </p>
                <Field label="Global Patient PIN">
                  <Input
                    type="text"
                    value={pullPin}
                    onChange={(e) => setPullPin(e.target.value)}
                    placeholder="PIN code (e.g. P123456789)"
                    required
                  />
                </Field>
                <div className="form-actions" style={{ marginTop: 20 }}>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowPullModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={pullRequestMutation.isPending}
                  >
                    {pullRequestMutation.isPending
                      ? "Searching..."
                      : "Search Global Directory"}
                  </Button>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handlePullConfirm}>
              <div
                className="form-wrap"
                style={{ boxShadow: "none", padding: 0, margin: 0 }}
              >
                <div
                  style={{
                    background: "var(--surface)",
                    padding: "12px",
                    borderRadius: "var(--rsm)",
                    fontSize: "13px",
                    marginBottom: "16px",
                  }}
                >
                  <strong>Patient found at:</strong>{" "}
                  <span
                    style={{
                      color: "var(--accent)",
                      textTransform: "capitalize",
                    }}
                  >
                    {pullTargetOrg}
                  </span>
                  <p
                    style={{
                      margin: "6px 0 0 0",
                      fontSize: "12px",
                      color: "var(--muted)",
                    }}
                  >
                    A verification code has been generated. Enter the code sent
                    to the patient to authorize EMR data copy.
                  </p>
                </div>
                <Field label="SMS OTP Verification Code">
                  <Input
                    type="text"
                    value={pullOtp}
                    onChange={(e) => setPullOtp(e.target.value)}
                    placeholder="6-digit code"
                    required
                  />
                </Field>
                <div className="form-actions" style={{ marginTop: 20 }}>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setPullStep("search")}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={pullConfirmMutation.isPending}
                  >
                    {pullConfirmMutation.isPending
                      ? "Importing..."
                      : "Confirm & Import EMR"}
                  </Button>
                </div>
              </div>
            </form>
          )}
        </Modal>

        {/* BOOK APPOINTMENT DIALOG */}
        <BookAppointmentModal
          isOpen={showBookModal}
          onClose={() => setShowBookModal(false)}
          patients={patients}
          isPending={createAppointmentMutation.isPending}
          plugins={pluginData}
          onSubmit={async (data) => {
            await createAppointmentMutation.mutateAsync(data);
            triggerToast("Appointment booked successfully!");
            setShowBookModal(false);
          }}
        />

        {/* TOAST */}
        <Toast message={toastMessage} isOpen={showToast} iconType={toastType} />
      </div>
    </DashboardContext.Provider>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            color: "var(--text-muted)",
            background: "var(--surface)",
          }}
        >
          <span>Loading EMR platform layout...</span>
        </div>
      }
    >
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </React.Suspense>
  );
}
