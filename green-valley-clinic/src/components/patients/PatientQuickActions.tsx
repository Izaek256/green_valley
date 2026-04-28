import React from 'react';
import { useNavigate } from 'react-router-dom';

export const PatientQuickActions: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    {
      label: 'Book New Appointment',
      icon: 'fa-calendar-plus',
      color: 'bg-[#A8D98A]',
      onClick: () => navigate('/book'),
    },
    {
      label: 'View Doctors',
      icon: 'fa-user-md',
      color: 'bg-blue-500',
      onClick: () => navigate('/doctors'),
    },
    {
      label: 'Health Resources',
      icon: 'fa-book-medical',
      color: 'bg-purple-500',
      onClick: () => navigate('/health-resources'),
    },
    {
      label: 'Contact Clinic',
      icon: 'fa-phone',
      color: 'bg-orange-500',
      onClick: () => navigate('/contact'),
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-bold text-[#1E2A6E] mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={action.onClick}
            className="flex flex-col items-center p-4 rounded-lg hover:shadow-md transition border border-gray-200"
          >
            <div className={`${action.color} text-white rounded-full p-3 mb-2`}>
              <i className={`fas ${action.icon} text-xl`}></i>
            </div>
            <span className="text-sm font-medium text-[#1E2A6E] text-center">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
