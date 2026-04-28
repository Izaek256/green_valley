import React from 'react';
import type { Patient } from '../../data/types';
import { calculateAge } from '../../lib/utils';
import { mockStore } from '../../data/mockStore';

interface PatientDetailProps {
  patient: Patient;
}

export const PatientDetail: React.FC<PatientDetailProps> = ({ patient }) => {
  const appointments = mockStore.getAppointmentsByPatient(patient.id);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-[#1E2A6E] mb-4">Personal Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <p className="font-medium">{patient.name}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Date of Birth</label>
            <p className="font-medium">{patient.dateOfBirth}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Age</label>
            <p className="font-medium">{calculateAge(patient.dateOfBirth)} years</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Gender</label>
            <p className="font-medium capitalize">{patient.gender}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <p className="font-medium">{patient.email}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Phone</label>
            <p className="font-medium">{patient.phone}</p>
          </div>
          {patient.address && (
            <div className="col-span-2">
              <label className="text-sm text-gray-600">Address</label>
              <p className="font-medium">{patient.address}</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-[#1E2A6E] mb-4">Medical History</h2>
        {patient.medicalHistory.length === 0 ? (
          <p className="text-gray-500">No medical history recorded.</p>
        ) : (
          <div className="space-y-3">
            {patient.medicalHistory.map(entry => (
              <div key={entry.id} className="border-l-4 border-[#A8D98A] pl-4 py-2">
                <p className="text-sm text-gray-600">{entry.date}</p>
                <p className="mt-1">{entry.note}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-[#1E2A6E] mb-4">Appointment History</h2>
        {appointments.length === 0 ? (
          <p className="text-gray-500">No appointments recorded.</p>
        ) : (
          <div className="space-y-3">
            {appointments.map(apt => (
              <div key={apt.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{apt.date} at {apt.time}</p>
                  <p className="text-sm text-gray-600">{apt.bookingRef}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {apt.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
