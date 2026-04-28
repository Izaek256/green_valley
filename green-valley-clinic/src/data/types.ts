// User and Role Types
export type Role = 'admin' | 'doctor' | 'receptionist' | 'patient';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: Role;
  name: string;
  isActive: boolean;
  createdAt: string;
}

// Medical History
export interface MedicalHistoryEntry {
  id: string;
  date: string;
  note: string;
  doctorId: string;
}

// Patient
export interface Patient {
  id: string;
  userId?: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address?: string;
  medicalHistory: MedicalHistoryEntry[];
  createdAt: string;
  updatedAt: string;
}

// Working Hours
export interface WorkingHours {
  [day: number]: { start: string; end: string } | null;
}

// Doctor
export interface Doctor {
  id: string;
  userId: string;
  name: string;
  specialty: string;
  bio: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  isAvailable: boolean;
  workingHours: WorkingHours;
  services: string[];
}

// Appointment
export type AppointmentStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  serviceId: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  notes?: string;
  bookingRef: string;
  createdAt: string;
  updatedAt: string;
}

// Staff Member
export interface StaffMember {
  id: string;
  userId: string;
  name: string;
  role: 'admin' | 'doctor' | 'receptionist';
  email: string;
  phone?: string;
  isActive: boolean;
  createdAt: string;
}

// Service
export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  doctorIds: string[];
  durationMinutes: number;
}

// Time Slot
export interface TimeSlot {
  time: string;
  isAvailable: boolean;
}

// Activity Log
export interface ActivityLogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: 'create' | 'update' | 'delete' | 'auth';
  userId?: string;
}

// Health Article
export interface HealthArticle {
  id: string;
  title: string;
  category: 'Nutrition' | 'Mental Health' | 'Preventive Care' | 'Fitness' | 'General';
  summary: string;
  content: string;
  publishedAt: string;
  imageUrl?: string;
}
