import React from 'react';
import { mockStore } from '../../data/mockStore';
import { useToast } from '../../hooks/useToast';
import { ConfirmDialog } from '../shared/ConfirmDialog';
import type { Appointment } from '../../data/types';

interface UpcomingAppointmentsProps {
  appointments: Appointment[];
  onCancel: (appointment: Appointment) => void;
}

export const UpcomingAppointments: React.FC<UpcomingAppointmentsProps> = ({ appointments, onCancel }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-[#1E2A6E] mb-4">Upcoming Appointments</h2>
      {appointments.length === 0 ? (
        <p className="text-gray-500">No upcoming appointments.</p>
      ) : (
        <div className="space-y-3">
          {appointments.map(apt => {
            const doctor = mockStore.getDoctorById(apt.doctorId);
            const service = mockStore.getServiceById(apt.serviceId);
            return (
              <div key={apt.id} className="flex justify-between items-center p-4 bg-gray-50 rounded hover:bg-gray-100 transition">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      apt.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                      apt.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {apt.status}
                    </span>
                    <p className="font-semibold text-[#1E2A6E]">{apt.date} at {apt.time}</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    <i className="fas fa-user-md mr-1"></i>
                    Dr. {doctor?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    <i className="fas fa-stethoscope mr-1"></i>
                    {service?.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Ref: {apt.bookingRef}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onCancel(apt)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium px-3 py-1 rounded hover:bg-red-50 transition"
                  >
                    <i className="fas fa-times mr-1"></i>
                    Cancel
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
