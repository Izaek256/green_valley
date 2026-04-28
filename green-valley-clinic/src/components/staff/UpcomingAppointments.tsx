import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Appointment, Patient, Doctor } from '../../data/types';
import { getTodayISO } from '../../lib/utils';

interface UpcomingAppointmentsProps {
  appointments: Appointment[];
  patients: Patient[];
  doctors: Doctor[];
}

export const UpcomingAppointments: React.FC<UpcomingAppointmentsProps> = ({ 
  appointments, 
  patients, 
  doctors 
}) => {
  const navigate = useNavigate();
  const today = getTodayISO();
  
  // Get upcoming appointments (today and future), excluding cancelled
  const upcomingAppointments = appointments
    .filter(a => a.date >= today && a.status !== 'Cancelled')
    .sort((a, b) => {
      if (a.date === b.date) {
        return a.time.localeCompare(b.time);
      }
      return a.date.localeCompare(b.date);
    })
    .slice(0, 8);

  const getPatientName = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? patient.name : 'Unknown Patient';
  };

  const getDoctorName = (doctorId: string) => {
    const doctor = doctors.find(d => d.id === doctorId);
    return doctor ? doctor.name : 'Unknown Doctor';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[#1E2A6E]">Upcoming Appointments</h2>
        <button 
          onClick={() => navigate('/staff/appointments')}
          className="text-sm text-[#A8D98A] hover:text-[#8bc375] font-medium"
        >
          View All
        </button>
      </div>
      <div className="space-y-3">
        {upcomingAppointments.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No upcoming appointments</p>
        ) : (
          upcomingAppointments.map((apt) => (
            <div key={apt.id} className="border-l-4 border-[#A8D98A] pl-4 py-3 bg-gray-50 rounded-r-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-900">{getPatientName(apt.patientId)}</p>
                  <p className="text-sm text-gray-600">
                    <i className="fas fa-user-md mr-1"></i>
                    {getDoctorName(apt.doctorId)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    <i className="fas fa-calendar mr-1"></i>
                    {apt.date === today ? 'Today' : new Date(apt.date).toLocaleDateString()} at {apt.time}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(apt.status)}`}>
                  {apt.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
