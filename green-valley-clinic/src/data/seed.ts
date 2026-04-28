import type { User, Patient, Doctor, StaffMember, Service, Appointment } from './types';

// Helper to generate UUID
function generateId(): string {
  return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Helper to format date as YYYY-MM-DD
function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

// Generate working hours for doctors (Mon-Fri 9:00-17:00, Sat 9:00-13:00, Sun off)
function generateWorkingHours(): Record<number, { start: string; end: string } | null> {
  return {
    0: null, // Sunday - off
    1: { start: '09:00', end: '17:00' }, // Monday
    2: { start: '09:00', end: '17:00' }, // Tuesday
    3: { start: '09:00', end: '17:00' }, // Wednesday
    4: { start: '09:00', end: '17:00' }, // Thursday
    5: { start: '09:00', end: '17:00' }, // Friday
    6: { start: '09:00', end: '13:00' }, // Saturday
  };
}

export function generateSeedData() {
  const now = new Date();
  
  // Services
  const services: Service[] = [
    {
      id: generateId(),
      name: 'General Consultation',
      description: 'Routine medical checkups and general health consultations',
      icon: 'fa-stethoscope',
      doctorIds: [], // Will be populated after doctors are created
      durationMinutes: 30,
    },
    {
      id: generateId(),
      name: 'Pediatrics',
      description: 'Specialized medical care for infants, children, and adolescents',
      icon: 'fa-baby',
      doctorIds: [],
      durationMinutes: 30,
    },
    {
      id: generateId(),
      name: 'Cardiology',
      description: 'Heart and cardiovascular system diagnostics and treatment',
      icon: 'fa-heart',
      doctorIds: [],
      durationMinutes: 45,
    },
    {
      id: generateId(),
      name: 'Dermatology',
      description: 'Skin, hair, and nail condition diagnosis and treatment',
      icon: 'fa-hand-dots',
      doctorIds: [],
      durationMinutes: 30,
    },
    {
      id: generateId(),
      name: 'Orthopedics',
      description: 'Bone, joint, and muscle disorder treatment',
      icon: 'fa-bone',
      doctorIds: [],
      durationMinutes: 45,
    },
  ];

  // Doctors
  const doctorNames = [
    { name: 'Dr. Sarah Johnson', specialty: 'General Medicine' },
    { name: 'Dr. Michael Chen', specialty: 'Pediatrics' },
    { name: 'Dr. Emily Rodriguez', specialty: 'Cardiology' },
    { name: 'Dr. James Wilson', specialty: 'Dermatology' },
    { name: 'Dr. Lisa Thompson', specialty: 'Orthopedics' },
  ];

  const doctors: Doctor[] = doctorNames.map((doc, index) => {
    const doctorId = generateId();
    const userId = generateId();
    
    // Link doctors to services
    if (index === 0) services[0].doctorIds.push(doctorId);
    if (index === 1) services[1].doctorIds.push(doctorId);
    if (index === 2) services[2].doctorIds.push(doctorId);
    if (index === 3) services[3].doctorIds.push(doctorId);
    if (index === 4) services[4].doctorIds.push(doctorId);

    return {
      id: doctorId,
      userId,
      name: doc.name,
      specialty: doc.specialty,
      bio: `Experienced ${doc.specialty.toLowerCase()} specialist with over 10 years of practice. Dedicated to providing comprehensive patient care.`,
      email: doc.name.toLowerCase().replace(/[\s.]/g, '') + '@greenvalleyclinic.com',
      phone: `+1-555-010${index}`,
      isAvailable: true,
      workingHours: generateWorkingHours(),
      services: [services[index].id],
    };
  });

  // Staff Members (Admin, Receptionist)
  const staff: StaffMember[] = [
    {
      id: generateId(),
      userId: generateId(),
      name: 'Admin User',
      role: 'admin',
      email: 'admin@greenvalleyclinic.com',
      phone: '+1-555-0200',
      isActive: true,
      createdAt: new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: generateId(),
      userId: generateId(),
      name: 'Receptionist One',
      role: 'receptionist',
      email: 'receptionist@greenvalleyclinic.com',
      phone: '+1-555-0201',
      isActive: true,
      createdAt: new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: generateId(),
      userId: generateId(),
      name: ' deactivated Staff',
      role: 'receptionist',
      email: 'deactivated@greenvalleyclinic.com',
      phone: '+1-555-0202',
      isActive: false,
      createdAt: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  // Patients
  const patientData = [
    { name: 'Jane Smith', email: 'jane.smith@email.com', phone: '+1-555-1001', dob: '1985-03-15', gender: 'female' as const },
    { name: 'John Doe', email: 'john.doe@email.com', phone: '+1-555-1002', dob: '1978-07-22', gender: 'male' as const },
    { name: 'Emily Davis', email: 'emily.davis@email.com', phone: '+1-555-1003', dob: '1990-11-08', gender: 'female' as const },
    { name: 'Michael Brown', email: 'michael.brown@email.com', phone: '+1-555-1004', dob: '1982-01-30', gender: 'male' as const },
    { name: 'Sarah Wilson', email: 'sarah.wilson@email.com', phone: '+1-555-1005', dob: '1995-06-12', gender: 'female' as const },
    { name: 'David Martinez', email: 'david.martinez@email.com', phone: '+1-555-1006', dob: '1988-09-25', gender: 'male' as const },
    { name: 'Lisa Anderson', email: 'lisa.anderson@email.com', phone: '+1-555-1007', dob: '1975-12-03', gender: 'female' as const },
    { name: 'Robert Taylor', email: 'robert.taylor@email.com', phone: '+1-555-1008', dob: '1992-04-18', gender: 'male' as const },
    { name: 'Jennifer Thomas', email: 'jennifer.thomas@email.com', phone: '+1-555-1009', dob: '1987-08-07', gender: 'female' as const },
    { name: 'William Jackson', email: 'william.jackson@email.com', phone: '+1-555-1010', dob: '1980-02-14', gender: 'male' as const },
    { name: 'Maria Garcia', email: 'maria.garcia@email.com', phone: '+1-555-1011', dob: '1993-10-29', gender: 'female' as const },
    { name: 'James White', email: 'james.white@email.com', phone: '+1-555-1012', dob: '1986-05-21', gender: 'male' as const },
  ];

  const patients: Patient[] = patientData.map((p, index) => ({
    id: generateId(),
    userId: generateId(), // Link to user account
    name: p.name,
    email: p.email,
    phone: p.phone,
    dateOfBirth: p.dob,
    gender: p.gender,
    address: `${100 + index} Main Street, Green Valley, CA 90001`,
    medicalHistory: [
      {
        id: generateId(),
        date: formatDate(new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)),
        note: 'Annual checkup completed. All vitals normal.',
        doctorId: doctors[0].id,
      },
    ],
    createdAt: new Date(now.getTime() - (60 + index * 5) * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(now.getTime() - index * 24 * 60 * 60 * 1000).toISOString(),
  }));

  // Users (for all staff, doctors, and some patients)
  const users: User[] = [
    // Admin user
    {
      id: staff[0].userId,
      email: staff[0].email,
      passwordHash: 'admin123',
      role: 'admin',
      name: staff[0].name,
      isActive: true,
      createdAt: staff[0].createdAt,
    },
    // Receptionist users
    {
      id: staff[1].userId,
      email: staff[1].email,
      passwordHash: 'recep123',
      role: 'receptionist',
      name: staff[1].name,
      isActive: true,
      createdAt: staff[1].createdAt,
    },
    {
      id: staff[2].userId,
      email: staff[2].email,
      passwordHash: 'staff123',
      role: 'receptionist',
      name: staff[2].name,
      isActive: false,
      createdAt: staff[2].createdAt,
    },
    // Doctor users
    ...doctors.map((doctor) => ({
      id: doctor.userId,
      email: doctor.email,
      passwordHash: 'doctor123',
      role: 'doctor' as const,
      name: doctor.name,
      isActive: true,
      createdAt: new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    })),
    // Patient users (first 3 patients can login)
    ...patients.slice(0, 3).map((patient) => ({
      id: patient.userId!,
      email: patient.email,
      passwordHash: 'patient123',
      role: 'patient' as const,
      name: patient.name,
      isActive: true,
      createdAt: patient.createdAt,
    })),
  ];

  // Appointments (mix of past and future)
  const appointments: Appointment[] = [];
  const statuses: Array<'Pending' | 'Confirmed' | 'Completed' | 'Cancelled'> = 
    ['Pending', 'Confirmed', 'Completed', 'Cancelled'];

  // Generate 25 appointments
  for (let i = 0; i < 25; i++) {
    const daysOffset = Math.floor(Math.random() * 60) - 30; // -30 to +30 days
    const appointmentDate = new Date(now.getTime() + daysOffset * 24 * 60 * 60 * 1000);
    const hour = 9 + Math.floor(Math.random() * 8); // 9 AM to 5 PM
    const minute = Math.random() > 0.5 ? 0 : 30;
    
    let status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
    if (daysOffset < 0) {
      // Past appointments are mostly completed
      status = Math.random() > 0.2 ? 'Completed' : 'Cancelled';
    } else if (daysOffset === 0) {
      // Today's appointments
      status = Math.random() > 0.5 ? 'Confirmed' : 'Pending';
    } else {
      // Future appointments
      status = statuses[Math.floor(Math.random() * 3)]; // Pending, Confirmed, or Completed
    }

    const patientId = patients[i % patients.length].id;
    const doctorId = doctors[i % doctors.length].id;
    const serviceId = services[i % services.length].id;

    appointments.push({
      id: generateId(),
      patientId,
      doctorId,
      serviceId,
      date: formatDate(appointmentDate),
      time: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
      status,
      notes: i % 3 === 0 ? 'Follow-up appointment' : undefined,
      bookingRef: '', // Will be generated by Mock_Store
      createdAt: new Date(appointmentDate.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(appointmentDate.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    });
  }

  return {
    users,
    patients,
    doctors,
    staff,
    services,
    appointments,
  };
}
