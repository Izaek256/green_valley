import React from 'react';
import { useNavigate } from 'react-router-dom';

interface QuickAction {
  label: string;
  icon: string;
  route: string;
  color: string;
}

const quickActions: QuickAction[] = [
  { label: 'New Appointment', icon: 'fa-calendar-plus', route: '/staff/appointments', color: 'bg-blue-500' },
  { label: 'Add Patient', icon: 'fa-user-plus', route: '/staff/patients', color: 'bg-green-500' },
  { label: 'View Reports', icon: 'fa-chart-bar', route: '/staff/reports', color: 'bg-purple-500' },
  { label: 'Manage Staff', icon: 'fa-users-cog', route: '/staff/staff', color: 'bg-orange-500' },
];

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-[#1E2A6E] mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        {quickActions.map((action) => (
          <button
            key={action.label}
            onClick={() => navigate(action.route)}
            className={`${action.color} hover:opacity-90 text-white p-4 rounded-lg flex flex-col items-center justify-center transition-opacity`}
          >
            <i className={`fas ${action.icon} text-2xl mb-2`}></i>
            <span className="text-sm font-medium">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
