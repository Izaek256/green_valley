import React, { useState } from 'react';
import type { Patient } from '../../data/types';
import { calculateAge } from '../../lib/utils';

interface PatientTableProps {
  patients: Patient[];
  onSelect: (patient: Patient) => void;
  onDelete: (patient: Patient) => void;
}

export const PatientTable: React.FC<PatientTableProps> = ({ patients, onSelect, onDelete }) => {
  const [search, setSearch] = useState('');

  const filtered = patients.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.email.toLowerCase().includes(search.toLowerCase()) ||
    p.phone.includes(search)
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search patients..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
      />

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Age</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Gender</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Contact</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Last Visit</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.map(patient => (
              <tr key={patient.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => onSelect(patient)}>
                <td className="px-4 py-3 text-sm font-medium">{patient.name}</td>
                <td className="px-4 py-3 text-sm">{calculateAge(patient.dateOfBirth)}</td>
                <td className="px-4 py-3 text-sm capitalize">{patient.gender}</td>
                <td className="px-4 py-3 text-sm">{patient.phone}</td>
                <td className="px-4 py-3 text-sm">{patient.updatedAt.split('T')[0]}</td>
                <td className="px-4 py-3 text-sm">
                  <button
                    onClick={(e) => { e.stopPropagation(); onDelete(patient); }}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-center py-8 text-gray-500">No patients found.</p>
        )}
      </div>
    </div>
  );
};
