import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const navLinks = [
  { path: '/staff', label: 'Dashboard', icon: 'fa-home', roles: ['admin', 'doctor', 'receptionist'] },
  { path: '/staff/appointments', label: 'Appointments', icon: 'fa-calendar-check', roles: ['admin', 'doctor', 'receptionist'] },
  { path: '/staff/patients', label: 'Patients', icon: 'fa-users', roles: ['admin', 'doctor', 'receptionist'] },
  { path: '/staff/staff', label: 'Staff Management', icon: 'fa-user-tie', roles: ['admin'] },
  { path: '/staff/reports', label: 'Reports', icon: 'fa-chart-bar', roles: ['admin'] },
];

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  if (!user) return null;

  const filteredLinks = navLinks.filter(link => link.roles.includes(user.role));

  return (
    <aside
      className={`bg-[#E8DFC8] h-full transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="p-4 border-b border-gray-300">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div>
              <h2 className="font-bold text-[#1E2A6E]">{user.name}</h2>
              <p className="text-sm text-gray-600 capitalize">{user.role}</p>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-[#A8D98A] rounded"
          >
            <i className={`fas ${collapsed ? 'fa-angle-right' : 'fa-angle-left'}`}></i>
          </button>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {filteredLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-[#A8D98A] text-[#1E2A6E]'
                  : 'text-gray-700 hover:bg-[#F0F9D4]'
              }`}
            >
              <i className={`fas ${link.icon} w-5`}></i>
              {!collapsed && <span>{link.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
