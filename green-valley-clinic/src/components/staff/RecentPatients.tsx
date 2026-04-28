import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Patient } from '../../data/types';

interface RecentPatientsProps {
  patients: Patient[];
}

export const RecentPatients: React.FC<RecentPatientsProps> = ({ patients }) => {
  const navigate = useNavigate();
  
  // Get the 5 most recent patients
  const recentPatients = [...patients]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[#1E2A6E]">Recent Patients</h2>
        <button 
          onClick={() => navigate('/staff/patients')}
          className="text-sm text-[#A8D98A] hover:text-[#8bc375] font-medium"
        >
          View All
        </button>
      </div>
      <div className="space-y-3">
        {recentPatients.map((patient) => (
          <div 
            key={patient.id} 
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
            onClick={() => navigate(`/staff/patients/${patient.id}`)}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#A8D98A] flex items-center justify-center text-white font-bold">
                {patient.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-gray-900">{patient.name}</p>
                <p className="text-sm text-gray-500">{patient.email}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">{patient.phone}</p>
              <p className="text-xs text-gray-400">
                {new Date(patient.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
