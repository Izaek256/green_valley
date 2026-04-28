import type { Doctor, TimeSlot, Appointment } from '../data/types';

const SLOT_DURATION_MINUTES = 30;

function parseTime(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

export function generateSlots(doctor: Doctor, date: string): TimeSlot[] {
  const dayOfWeek = new Date(date).getDay();
  const hours = doctor.workingHours[dayOfWeek];
  
  if (!hours) return []; // doctor's day off

  const slots: TimeSlot[] = [];
  let current = parseTime(hours.start);
  const end = parseTime(hours.end);

  while (current + SLOT_DURATION_MINUTES <= end) {
    slots.push({ time: formatTime(current), isAvailable: true });
    current += SLOT_DURATION_MINUTES;
  }

  return slots;
}

export function getAvailableSlots(
  doctor: Doctor,
  appointments: Appointment[],
  date: string
): TimeSlot[] {
  const allSlots = generateSlots(doctor, date);
  const bookedAppointments = appointments
    .filter(a => a.doctorId === doctor.id && a.date === date && a.status !== 'Cancelled');

  const bookedTimes = new Set(bookedAppointments.map(a => a.time));

  return allSlots.map(slot => ({
    ...slot,
    isAvailable: !bookedTimes.has(slot.time),
  }));
}
