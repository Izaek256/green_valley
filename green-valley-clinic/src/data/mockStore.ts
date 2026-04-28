import type {
  User,
  Patient,
  Doctor,
  Appointment,
  StaffMember,
  Service,
  ActivityLogEntry,
  TimeSlot,
} from './types';
import { generateSeedData } from './seed';
import { getAvailableSlots as getSlots } from '../lib/slotUtils';

const STORAGE_KEYS = {
  users: 'gvc_users',
  patients: 'gvc_patients',
  doctors: 'gvc_doctors',
  staff: 'gvc_staff',
  services: 'gvc_services',
  appointments: 'gvc_appointments',
  activityLog: 'gvc_activity_log',
  initialized: 'gvc_initialized',
};

class MockStoreImpl {
  private users: User[] = [];
  private patients: Patient[] = [];
  private doctors: Doctor[] = [];
  private staff: StaffMember[] = [];
  private services: Service[] = [];
  private appointments: Appointment[] = [];
  private activityLog: ActivityLogEntry[] = [];

  initialize(): void {
    const initialized = localStorage.getItem(STORAGE_KEYS.initialized);
    
    if (initialized === 'true') {
      this.loadFromStorage();
    } else {
      const seedData = generateSeedData();
      this.users = seedData.users;
      this.patients = seedData.patients;
      this.doctors = seedData.doctors;
      this.staff = seedData.staff;
      this.services = seedData.services;
      this.appointments = seedData.appointments.map(apt => ({
        ...apt,
        bookingRef: this.generateBookingRef(),
      }));
      this.activityLog = [];
      
      this.saveAllToStorage();
      localStorage.setItem(STORAGE_KEYS.initialized, 'true');
    }
  }

  private loadFromStorage(): void {
    this.users = this.parseFromStorage<User[]>(STORAGE_KEYS.users, []);
    this.patients = this.parseFromStorage<Patient[]>(STORAGE_KEYS.patients, []);
    this.doctors = this.parseFromStorage<Doctor[]>(STORAGE_KEYS.doctors, []);
    this.staff = this.parseFromStorage<StaffMember[]>(STORAGE_KEYS.staff, []);
    this.services = this.parseFromStorage<Service[]>(STORAGE_KEYS.services, []);
    this.appointments = this.parseFromStorage<Appointment[]>(STORAGE_KEYS.appointments, []);
    this.activityLog = this.parseFromStorage<ActivityLogEntry[]>(STORAGE_KEYS.activityLog, []);
  }

  private saveToStorage(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  private parseFromStorage<T>(key: string, defaultValue: T): T {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  private saveAllToStorage(): void {
    this.saveToStorage(STORAGE_KEYS.users, this.users);
    this.saveToStorage(STORAGE_KEYS.patients, this.patients);
    this.saveToStorage(STORAGE_KEYS.doctors, this.doctors);
    this.saveToStorage(STORAGE_KEYS.staff, this.staff);
    this.saveToStorage(STORAGE_KEYS.services, this.services);
    this.saveToStorage(STORAGE_KEYS.appointments, this.appointments);
    this.saveToStorage(STORAGE_KEYS.activityLog, this.activityLog);
  }

  private addActivityLog(message: string, type: ActivityLogEntry['type'], userId?: string): void {
    const entry: ActivityLogEntry = {
      id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
      timestamp: new Date().toISOString(),
      message,
      type,
      userId,
    };
    this.activityLog.unshift(entry);
    this.saveToStorage(STORAGE_KEYS.activityLog, this.activityLog);
  }

  generateBookingRef(): string {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const seq = String(this.appointments.length + 1).padStart(4, '0');
    return `GVC-${date}-${seq}`;
  }

  // Users
  getUserByEmail(email: string): User | undefined {
    return this.users.find(u => u.email === email);
  }

  createUser(data: Omit<User, 'id' | 'createdAt'>): User {
    const user: User = {
      ...data,
      id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
      createdAt: new Date().toISOString(),
    };
    this.users.push(user);
    this.saveToStorage(STORAGE_KEYS.users, this.users);
    this.addActivityLog(`New user created: ${user.name}`, 'create');
    return user;
  }

  updateUser(id: string, data: Partial<User>): User {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) throw new Error('User not found');
    
    this.users[index] = { ...this.users[index], ...data };
    this.saveToStorage(STORAGE_KEYS.users, this.users);
    this.addActivityLog(`User updated: ${this.users[index].name}`, 'update');
    return this.users[index];
  }

  // Patients
  getPatients(): Patient[] {
    return this.patients;
  }

  getPatientById(id: string): Patient | undefined {
    return this.patients.find(p => p.id === id);
  }

  createPatient(data: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>): Patient {
    const now = new Date().toISOString();
    const patient: Patient = {
      ...data,
      id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
      createdAt: now,
      updatedAt: now,
    };
    this.patients.push(patient);
    this.saveToStorage(STORAGE_KEYS.patients, this.patients);
    this.addActivityLog(`New patient registered: ${patient.name}`, 'create');
    return patient;
  }

  updatePatient(id: string, data: Partial<Patient>): Patient {
    const index = this.patients.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Patient not found');
    
    this.patients[index] = {
      ...this.patients[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    this.saveToStorage(STORAGE_KEYS.patients, this.patients);
    this.addActivityLog(`Patient record updated: ${this.patients[index].name}`, 'update');
    return this.patients[index];
  }

  deletePatient(id: string): void {
    const index = this.patients.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Patient not found');
    
    const patientName = this.patients[index].name;
    this.patients.splice(index, 1);
    this.saveToStorage(STORAGE_KEYS.patients, this.patients);
    this.addActivityLog(`Patient record deleted: ${patientName}`, 'delete');
  }

  // Appointments
  getAppointments(): Appointment[] {
    return this.appointments;
  }

  getAppointmentById(id: string): Appointment | undefined {
    return this.appointments.find(a => a.id === id);
  }

  getAppointmentsByPatient(patientId: string): Appointment[] {
    return this.appointments.filter(a => a.patientId === patientId);
  }

  getAppointmentsByDoctor(doctorId: string): Appointment[] {
    return this.appointments.filter(a => a.doctorId === doctorId);
  }

  createAppointment(data: Omit<Appointment, 'id' | 'bookingRef' | 'createdAt' | 'updatedAt'>): Appointment {
    const now = new Date().toISOString();
    const appointment: Appointment = {
      ...data,
      id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
      bookingRef: this.generateBookingRef(),
      createdAt: now,
      updatedAt: now,
    };
    this.appointments.push(appointment);
    this.saveToStorage(STORAGE_KEYS.appointments, this.appointments);
    this.addActivityLog(`New appointment created: ${appointment.bookingRef}`, 'create');
    return appointment;
  }

  updateAppointment(id: string, data: Partial<Appointment>): Appointment {
    const index = this.appointments.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Appointment not found');
    
    this.appointments[index] = {
      ...this.appointments[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    this.saveToStorage(STORAGE_KEYS.appointments, this.appointments);
    this.addActivityLog(`Appointment updated: ${this.appointments[index].bookingRef}`, 'update');
    return this.appointments[index];
  }

  deleteAppointment(id: string): void {
    const index = this.appointments.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Appointment not found');
    
    const bookingRef = this.appointments[index].bookingRef;
    this.appointments.splice(index, 1);
    this.saveToStorage(STORAGE_KEYS.appointments, this.appointments);
    this.addActivityLog(`Appointment deleted: ${bookingRef}`, 'delete');
  }

  // Doctors
  getDoctors(): Doctor[] {
    return this.doctors;
  }

  getDoctorById(id: string): Doctor | undefined {
    return this.doctors.find(d => d.id === id);
  }

  updateDoctor(id: string, data: Partial<Doctor>): Doctor {
    const index = this.doctors.findIndex(d => d.id === id);
    if (index === -1) throw new Error('Doctor not found');
    
    this.doctors[index] = { ...this.doctors[index], ...data };
    this.saveToStorage(STORAGE_KEYS.doctors, this.doctors);
    this.addActivityLog(`Doctor record updated: ${this.doctors[index].name}`, 'update');
    return this.doctors[index];
  }

  // Staff
  getStaff(): StaffMember[] {
    return this.staff;
  }

  getStaffById(id: string): StaffMember | undefined {
    return this.staff.find(s => s.id === id);
  }

  createStaff(data: Omit<StaffMember, 'id' | 'createdAt'>): StaffMember {
    const staff: StaffMember = {
      ...data,
      id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
      createdAt: new Date().toISOString(),
    };
    this.staff.push(staff);
    this.saveToStorage(STORAGE_KEYS.staff, this.staff);
    this.addActivityLog(`New staff member added: ${staff.name}`, 'create');
    return staff;
  }

  updateStaff(id: string, data: Partial<StaffMember>): StaffMember {
    const index = this.staff.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Staff member not found');
    
    this.staff[index] = { ...this.staff[index], ...data };
    this.saveToStorage(STORAGE_KEYS.staff, this.staff);
    this.addActivityLog(`Staff record updated: ${this.staff[index].name}`, 'update');
    return this.staff[index];
  }

  // Services
  getServices(): Service[] {
    return this.services;
  }

  getServiceById(id: string): Service | undefined {
    return this.services.find(s => s.id === id);
  }

  // Activity Log
  getActivityLog(): ActivityLogEntry[] {
    return this.activityLog;
  }

  // Slot availability
  getAvailableSlots(doctorId: string, date: string): TimeSlot[] {
    const doctor = this.getDoctorById(doctorId);
    if (!doctor) return [];
    const appointments = this.getAppointmentsByDoctor(doctorId);
    return getSlots(doctor, appointments, date);
  }

  // Reset (for testing)
  reset(): void {
    localStorage.removeItem(STORAGE_KEYS.initialized);
    Object.values(STORAGE_KEYS).forEach(key => {
      if (key !== STORAGE_KEYS.initialized) {
        localStorage.removeItem(key);
      }
    });
    this.users = [];
    this.patients = [];
    this.doctors = [];
    this.staff = [];
    this.services = [];
    this.appointments = [];
    this.activityLog = [];
  }
}

export const mockStore = new MockStoreImpl();
