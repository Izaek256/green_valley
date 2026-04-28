import React, { createContext, useState, useCallback, useEffect } from 'react';
import type { Patient, Appointment, Doctor, StaffMember, ActivityLogEntry } from '../data/types';
import { mockStore } from '../data/mockStore';

interface ToastPayload {
  id: string;
  message: string;
  type: 'success' | 'error';
}

interface AppContextValue {
  patients: Patient[];
  appointments: Appointment[];
  doctors: Doctor[];
  staff: StaffMember[];
  activityLog: ActivityLogEntry[];
  toasts: ToastPayload[];
  refreshPatients: () => void;
  refreshAppointments: () => void;
  refreshAll: () => void;
  addToast: (message: string, type: 'success' | 'error') => void;
  removeToast: (id: string) => void;
}

export const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [activityLog, setActivityLog] = useState<ActivityLogEntry[]>([]);
  const [toasts, setToasts] = useState<ToastPayload[]>([]);

  const refreshPatients = useCallback(() => {
    setPatients(mockStore.getPatients());
  }, []);

  const refreshAppointments = useCallback(() => {
    setAppointments(mockStore.getAppointments());
  }, []);

  const refreshAll = useCallback(() => {
    setPatients(mockStore.getPatients());
    setAppointments(mockStore.getAppointments());
    setDoctors(mockStore.getDoctors());
    setStaff(mockStore.getStaff());
    setActivityLog(mockStore.getActivityLog());
  }, []);

  const addToast = useCallback((message: string, type: 'success' | 'error') => {
    const id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, message, type }]);
    
    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Load initial data
  useEffect(() => {
    // Initialize mock store with seed data
    mockStore.initialize();
    refreshAll();
  }, [refreshAll]);

  return (
    <AppContext.Provider
      value={{
        patients,
        appointments,
        doctors,
        staff,
        activityLog,
        toasts,
        refreshPatients,
        refreshAppointments,
        refreshAll,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
