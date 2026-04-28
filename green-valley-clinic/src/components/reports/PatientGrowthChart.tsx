import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useAppContext } from '../../hooks/useAppContext';

export const PatientGrowthChart: React.FC = () => {
  const { patients } = useAppContext();

  const monthCount = patients.reduce((acc, patient) => {
    const month = patient.createdAt.slice(0, 7); // YYYY-MM
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(monthCount)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, count]) => ({
      month,
      count,
    }));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-[#1E2A6E] mb-4">New Patients Per Month</h3>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#1E2A6E" />
      </BarChart>
    </div>
  );
};
