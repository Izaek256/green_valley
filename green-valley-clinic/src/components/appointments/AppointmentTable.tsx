import React, { useState } from 'react';
import type { Appointment, AppointmentStatus } from '../../data/types';
import { mockStore } from '../../data/mockStore';
import { StatusBadge } from './StatusBadge';
// import { useToast } from '../../hooks/useToast';

interface AppointmentTableProps {
  appointments: Appointment[];
  onEdit: (appointment: Appointment) => void;
  onCancel: (appointment: Appointment) => void;
  onStatusChange: (appointment: Appointment, status: AppointmentStatus) => void;
}

export const AppointmentTable: React.FC<AppointmentTableProps> = ({ 
  appointments, 
  // onEdit,
  onCancel,
  onStatusChange 
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | 'All'>('All');
  // const { addToast } = useToast();

  const filtered = appointments.filter(apt => {
    const patient = mockStore.getPatientById(apt.patientId);
    const doctor = mockStore.getDoctorById(apt.doctorId);
    
    const matchesSearch = search === '' || 
      patient?.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor?.name.toLowerCase().includes(search.toLowerCase()) ||
      apt.bookingRef.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search appointments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as AppointmentStatus | 'All')}
          className="px-4 py-2 border border-gray-300 rounded"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Booking Ref</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Patient</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Doctor</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Time</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.map(apt => {
              const patient = mockStore.getPatientById(apt.patientId);
              const doctor = mockStore.getDoctorById(apt.doctorId);
              
              return (
                <tr key={apt.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">{apt.bookingRef}</td>
                  <td className="px-4 py-3 text-sm">{patient?.name}</td>
                  <td className="px-4 py-3 text-sm">{doctor?.name}</td>
                  <td className="px-4 py-3 text-sm">{apt.date}</td>
                  <td className="px-4 py-3 text-sm">{apt.time}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={apt.status} />
                  </td>
                  <td className="px-4 py-3 text-sm space-x-2">
                    {apt.status === 'Pending' && (
                      <button
                        onClick={() => onStatusChange(apt, 'Confirmed')}
                        className="text-blue-600 hover:underline"
                      >
                        Confirm
                      </button>
                    )}
                    {apt.status !== 'Cancelled' && apt.status !== 'Completed' && (
                      <button
                        onClick={() => onCancel(apt)}
                        className="text-red-600 hover:underline"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-center py-8 text-gray-500">No appointments found.</p>
        )}
      </div>
    </div>
  );
};
