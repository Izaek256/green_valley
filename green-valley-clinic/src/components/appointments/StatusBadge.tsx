import React from 'react';
import type { AppointmentStatus } from '../../data/types';

const statusColors: Record<AppointmentStatus, string> = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Confirmed: 'bg-blue-100 text-blue-800',
  Completed: 'bg-green-100 text-green-800',
  Cancelled: 'bg-red-100 text-red-800',
};

export const StatusBadge: React.FC<{ status: AppointmentStatus }> = ({ status }) => (
  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}>
    {status}
  </span>
);
