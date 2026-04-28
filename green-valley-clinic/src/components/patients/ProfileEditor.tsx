import React, { useState } from 'react';
import { mockStore } from '../../data/mockStore';
import { useToast } from '../../hooks/useToast';
import type { Patient } from '../../data/types';

interface ProfileEditorProps {
  patient: Patient;
  onUpdate: () => void;
}

export const ProfileEditor: React.FC<ProfileEditorProps> = ({ patient, onUpdate }) => {
  const { addToast } = useToast();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: patient.name,
    email: patient.email,
    phone: patient.phone,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    address: patient.address || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      mockStore.updatePatient(patient.id, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender as 'male' | 'female' | 'other',
        address: formData.address,
      });
      
      addToast('Profile updated successfully', 'success');
      setEditing(false);
      onUpdate();
    } catch (error) {
      addToast('Failed to update profile', 'error');
    }
  };

  if (!editing) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#1E2A6E]">Profile</h2>
          <button
            onClick={() => setEditing(true)}
            className="text-[#A8D98A] hover:underline text-sm font-medium"
          >
            <i className="fas fa-edit mr-1"></i>
            Edit Profile
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-600">Full Name</p>
            <p className="font-medium text-[#1E2A6E]">{patient.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium text-[#1E2A6E]">{patient.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Phone</p>
            <p className="font-medium text-[#1E2A6E]">{patient.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Date of Birth</p>
            <p className="font-medium text-[#1E2A6E]">{patient.dateOfBirth}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Gender</p>
            <p className="font-medium text-[#1E2A6E] capitalize">{patient.gender}</p>
          </div>
          {patient.address && (
            <div>
              <p className="text-sm text-gray-600">Address</p>
              <p className="font-medium text-[#1E2A6E]">{patient.address}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-[#1E2A6E] mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#A8D98A] focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#A8D98A] focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#A8D98A] focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#A8D98A] focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#A8D98A] focus:border-transparent"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#A8D98A] focus:border-transparent"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-[#A8D98A] text-[#1E2A6E] font-semibold py-2 rounded hover:bg-[#95c97a]"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="flex-1 bg-gray-200 text-gray-700 font-semibold py-2 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
