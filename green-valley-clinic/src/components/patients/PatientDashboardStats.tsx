import React from 'react';
import type { Appointment } from '../../data/types';

interface PatientDashboardStatsProps {
  appointments: Appointment[];
}

export const PatientDashboardStats: React.FC<PatientDashboardStatsProps> = ({ appointments }) => {
  const upcomingCount = appointments.filter(a => a.status !== 'Cancelled' && new Date(a.date) >= new Date()).length;
  const completedCount = appointments.filter(a => a.status === 'Completed').length;
  const cancelledCount = appointments.filter(a => a.status === 'Cancelled').length;
  const pendingCount = appointments.filter(a => a.status === 'Pending').length;

  const stats = [
    {
      label: 'Upcoming',
      value: upcomingCount,
      icon: 'fa-calendar-check',
      color: 'bg-blue-500',
    },
    {
      label: 'Completed',
      value: completedCount,
      icon: 'fa-check-circle',
      color: 'bg-green-500',
    },
    {
      label: 'Pending',
      value: pendingCount,
      icon: 'fa-clock',
      color: 'bg-yellow-500',
    },
    {
      label: 'Cancelled',
      value: cancelledCount,
      icon: 'fa-times-circle',
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-[#1E2A6E]">{stat.value}</p>
            </div>
            <div className={`${stat.color} text-white rounded-full p-3`}>
              <i className={`fas ${stat.icon} text-xl`}></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
