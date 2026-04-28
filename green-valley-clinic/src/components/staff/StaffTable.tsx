import React from 'react';
import type { StaffMember } from '../../data/types';

interface StaffTableProps {
  staff: StaffMember[];
  onToggleStatus: (staff: StaffMember) => void;
}

export const StaffTable: React.FC<StaffTableProps> = ({ staff, onToggleStatus }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Name</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Role</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Email</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {staff.map(member => (
            <tr key={member.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm font-medium">{member.name}</td>
              <td className="px-4 py-3 text-sm capitalize">{member.role}</td>
              <td className="px-4 py-3 text-sm">{member.email}</td>
              <td className="px-4 py-3 text-sm">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  member.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {member.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="px-4 py-3 text-sm">
                <button
                  onClick={() => onToggleStatus(member)}
                  className="text-blue-600 hover:underline"
                >
                  {member.isActive ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
