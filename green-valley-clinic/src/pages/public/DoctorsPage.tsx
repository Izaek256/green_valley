import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { useNavigate } from 'react-router-dom';

export const DoctorsPage: React.FC = () => {
  const { doctors } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-[#1E2A6E] mb-8 text-center">Our Doctors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map(doctor => (
          <div key={doctor.id} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-[#1E2A6E] mb-2">{doctor.name}</h3>
            <p className="text-[#A8D98A] font-medium mb-2">{doctor.specialty}</p>
            <p className="text-gray-600 text-sm mb-4">{doctor.bio}</p>
            <p className="text-sm text-gray-500 mb-4">
              <i className="fas fa-envelope mr-2"></i>
              {doctor.email}
            </p>
            <button
              onClick={() => navigate(`/book?doctorId=${doctor.id}`)}
              className="w-full bg-[#A8D98A] text-[#1E2A6E] py-2 rounded hover:bg-[#95c97a]"
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
