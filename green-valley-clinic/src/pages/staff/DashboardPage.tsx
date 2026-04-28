import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { 
  QuickActions, 
  RecentPatients, 
  DoctorStatus, 
  UpcomingAppointments, 
  ActivityFeed,
  DashboardStats
} from '../../components/staff';

export const DashboardPage: React.FC = () => {
  const { patients, appointments, doctors, activityLog } = useAppContext();

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#1E2A6E] mb-6">Dashboard</h1>
      
      {/* Stats */}
      <DashboardStats 
        patients={patients} 
        appointments={appointments} 
        doctors={doctors} 
      />

      {/* Quick Actions */}
      <div className="mb-8">
        <QuickActions />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Upcoming Appointments */}
        <UpcomingAppointments 
          appointments={appointments} 
          patients={patients} 
          doctors={doctors} 
        />

        {/* Doctor Status */}
        <DoctorStatus 
          doctors={doctors} 
          appointments={appointments} 
        />
      </div>

      {/* Secondary Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Patients */}
        <RecentPatients patients={patients} />

        {/* Activity Feed */}
        <ActivityFeed activityLog={activityLog} />
      </div>
    </div>
  );
};
