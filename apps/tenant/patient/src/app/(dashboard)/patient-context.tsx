"use client";

import * as React from "react";

export interface PatientContextType {
  profile: any;
  isLoading: boolean;
  activeRx: any[];
  allConsultations: any[];
  vitalsLog: any[];
  upcomingAppointments: any[];
  triggerToast: (msg: string) => void;
  handleConfirmAppointment: (id: string) => Promise<void>;
  handleCancelAppointment: (id: string) => Promise<void>;
  navigateTo: (path: string) => void;
  notifications: any[];
  readNotifIds: string[];
  dismissedNotifIds: string[];
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  dismissNotification: (id: string) => void;
  dismissAll: () => void;
}

export const PatientContext = React.createContext<PatientContextType | undefined>(undefined);

export function usePatient() {
  const context = React.useContext(PatientContext);
  if (!context) throw new Error("usePatient must be used within a PatientProvider");
  return context;
}

