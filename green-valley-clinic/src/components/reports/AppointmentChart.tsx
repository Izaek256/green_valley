import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useAppContext } from '../../hooks/useAppContext';

export const AppointmentChart: React.FC = () => {
  const { appointments } = useAppContext();

  const statusCount = appointments.reduce((acc, apt) => {
    acc[apt.status] = (acc[apt.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(statusCount).map(([status, count]) => ({
    status,
    count,
  }));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-[#1E2A6E] mb-4">Appointments by Status</h3>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="status" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#A8D98A" />
      </BarChart>
    </div>
  );
};
