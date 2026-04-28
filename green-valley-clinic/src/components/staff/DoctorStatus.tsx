import React from 'react';
import type { Doctor, Appointment } from '../../data/types';
import { getTodayISO } from '../../lib/utils';

interface DoctorStatusProps {
  doctors: Doctor[];
  appointments: Appointment[];
}

export const DoctorStatus: React.FC<DoctorStatusProps> = ({ doctors, appointments }) => {
  const today = getTodayISO();
  const todayAppointments = appointments.filter(a => a.date === today);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-[#1E2A6E] mb-4">Doctor Status</h2>
      <div className="space-y-4">
        {doctors.map((doctor) => {
          const doctorTodayAppointments = todayAppointments.filter(a => a.doctorId === doctor.id);
          const confirmedCount = doctorTodayAppointments.filter(a => a.status === 'Confirmed').length;
          const pendingCount = doctorTodayAppointments.filter(a => a.status === 'Pending').length;
          
          return (
            <div key={doctor.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${doctor.isAvailable ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <div>
                  <p className="font-medium text-gray-900">{doctor.name}</p>
                  <p className="text-sm text-gray-500">{doctor.specialty}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-3 text-sm">
                  {confirmedCount > 0 && (
                    <span className="text-green-600">
                      <i className="fas fa-check-circle mr-1"></i>
                      {confirmedCount}
                    </span>
                  )}
                  {pendingCount > 0 && (
                    <span className="text-yellow-600">
                      <i className="fas fa-clock mr-1"></i>
                      {pendingCount}
                    </span>
                  )}
                  {doctorTodayAppointments.length === 0 && (
                    <span className="text-gray-400">No appointments</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
