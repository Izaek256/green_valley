import React from 'react';
import type { Patient, Appointment, Doctor } from '../../data/types';
import { getTodayISO } from '../../lib/utils';

interface DashboardStatsProps {
  patients: Patient[];
  appointments: Appointment[];
  doctors: Doctor[];
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ patients, appointments, doctors }) => {
  const today = getTodayISO();
  
  const todayAppointments = appointments.filter(a => a.date === today);
  const pendingAppointments = appointments.filter(a => a.status === 'Pending');
  const activeDoctors = doctors.filter(d => d.isAvailable);
  
  // Calculate weekly appointments (next 7 days)
  const weekFromNow = new Date();
  weekFromNow.setDate(weekFromNow.getDate() + 7);
  const weekAppointments = appointments.filter(a => {
    const aptDate = new Date(a.date);
    return aptDate >= new Date(today) && aptDate <= weekFromNow && a.status !== 'Cancelled';
  });

  // Calculate completion rate
  const completedAppointments = appointments.filter(a => a.status === 'Completed').length;
  const totalAppointments = appointments.filter(a => !['Cancelled'].includes(a.status)).length;
  const completionRate = totalAppointments > 0 ? Math.round((completedAppointments / totalAppointments) * 100) : 0;

  const StatCard: React.FC<{ label: string; value: number | string; icon: string; subtitle?: string }> = ({ 
    label, 
    value, 
    icon,
    subtitle 
  }) => (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-3xl font-bold text-[#1E2A6E] mt-2">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <i className={`fas ${icon} text-4xl text-[#A8D98A]`}></i>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard 
        label="Total Patients" 
        value={patients.length} 
        icon="fa-users" 
        subtitle="Registered patients"
      />
      <StatCard 
        label="Today's Appointments" 
        value={todayAppointments.length} 
        icon="fa-calendar-day" 
        subtitle={`${pendingAppointments.length} pending`}
      />
      <StatCard 
        label="This Week" 
        value={weekAppointments.length} 
        icon="fa-calendar-week" 
        subtitle="Next 7 days"
      />
      <StatCard 
        label="Completion Rate" 
        value={`${completionRate}%`} 
        icon="fa-check-circle" 
        subtitle={`${completedAppointments} completed`}
      />
    </div>
  );
};
