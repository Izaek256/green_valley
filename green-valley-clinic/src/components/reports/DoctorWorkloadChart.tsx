import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useAppContext } from '../../hooks/useAppContext';
import { mockStore } from '../../data/mockStore';

export const DoctorWorkloadChart: React.FC = () => {
  const { doctors, appointments } = useAppContext();

  const doctorCount = doctors.map(doctor => {
    const count = appointments.filter(apt => apt.doctorId === doctor.id).length;
    return {
      name: doctor.name.replace('Dr. ', ''),
      count,
    };
  });

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-[#1E2A6E] mb-4">Appointments per Doctor</h3>
      <BarChart width={500} height={300} data={doctorCount}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#E8DFC8" />
      </BarChart>
    </div>
  );
};
