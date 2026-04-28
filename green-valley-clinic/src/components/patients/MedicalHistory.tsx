import React from 'react';
import { mockStore } from '../../data/mockStore';
import type { Patient } from '../../data/types';

interface MedicalHistoryProps {
  patient: Patient;
}

export const MedicalHistory: React.FC<MedicalHistoryProps> = ({ patient }) => {
  const medicalHistory = patient.medicalHistory || [];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-[#1E2A6E] mb-4">Medical History</h2>
      {medicalHistory.length === 0 ? (
        <p className="text-gray-500">No medical records available.</p>
      ) : (
        <div className="space-y-4">
          {medicalHistory.map((entry) => {
            const doctor = mockStore.getDoctorById(entry.doctorId);
            return (
              <div key={entry.id} className="border-l-4 border-[#A8D98A] pl-4 py-2">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-[#1E2A6E]">{entry.date}</p>
                    <p className="text-sm text-gray-600">
                      Dr. {doctor?.name || 'Unknown'}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700">{entry.note}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
