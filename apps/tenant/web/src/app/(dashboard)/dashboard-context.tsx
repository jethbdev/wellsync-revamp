"use client";

import * as React from "react";

export interface DashboardContextType {
  // Data
  patients: any[];
  appointments: any[];
  plugins: any[];
  alerts: any[];
  session: any;
  isLoadingPatients: boolean;
  isLoadingAppointments: boolean;

  // Selected patient
  selectedPatientId: string | null;
  setSelectedPatientId: React.Dispatch<React.SetStateAction<string | null>>;
  selectedPatient: any;

  // Active facility context
  activeFacility: any | null;
  facilities: any[];
  setSelectedFacilityId: (id: string) => void;

  // Stats (derived)
  statPatients: number;
  statAppts: number;
  statLabs: number;
  statRx: number;

  // UI state
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showPullModal: boolean;
  setShowPullModal: React.Dispatch<React.SetStateAction<boolean>>;
  pullStep: "search" | "otp";
  setPullStep: React.Dispatch<React.SetStateAction<"search" | "otp">>;
  showBookModal: boolean;
  setShowBookModal: React.Dispatch<React.SetStateAction<boolean>>;

  // Toast
  triggerToast: (msg: string, type?: "check" | "alert") => void;

  // Alert handlers
  handleDismissAlert: (id: string) => void;
  handleResolveAlerts: () => void;

  // SOAP / New Visit state (kept in context for cross-page access)
  patientHeight: string;
  setPatientHeight: React.Dispatch<React.SetStateAction<string>>;
  patientWeight: string;
  setPatientWeight: React.Dispatch<React.SetStateAction<string>>;
  calculatedBmi: number | null;
  soapNotes: string;
  setSoapNotes: React.Dispatch<React.SetStateAction<string>>;
  selectedIcd: string;
  setSelectedIcd: React.Dispatch<React.SetStateAction<string>>;
  modeOfTransaction: string;
  setModeOfTransaction: React.Dispatch<React.SetStateAction<string>>;
  prescribedMed: string;
  setPrescribedMed: React.Dispatch<React.SetStateAction<string>>;
  prescriptions: any[];
  setPrescriptions: React.Dispatch<React.SetStateAction<any[]>>;

  // Handlers
  handleRegisterPatient: (e: React.FormEvent) => Promise<void>;
  handlePullRequest: (e: React.FormEvent) => Promise<void>;
  handlePullConfirm: (e: React.FormEvent) => Promise<void>;
  handleSaveSoap: (e: React.FormEvent) => Promise<void>;
  handleTogglePlugin: (pluginId: string) => Promise<void>;
  handleInstallPlugin: (pluginId: string) => Promise<void>;
  navigateTo: (path: string) => void;
}

export const DashboardContext = React.createContext<DashboardContextType | undefined>(undefined);

export function useDashboard() {
  const context = React.useContext(DashboardContext);
  if (!context) throw new Error("useDashboard must be used within a DashboardProvider");
  return context;
}
