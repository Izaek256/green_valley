import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../hooks/useAppContext';
import { mockStore } from '../../data/mockStore';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { doctors } = useAppContext();
  const services = mockStore.getServices();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[#F0F9D4] py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-[#1E2A6E] mb-4">
            Your Health, Our Priority
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Providing exceptional medical care with compassion and expertise
          </p>
          <button
            onClick={() => navigate('/book')}
            className="bg-[#A8D98A] text-[#1E2A6E] px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#95c97a]"
          >
            Book Appointment
          </button>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1E2A6E] mb-8 text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(0, 4).map(service => (
              <div key={service.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
                <i className={`fas ${service.icon} text-4xl text-[#A8D98A] mb-4`}></i>
                <h3 className="text-xl font-semibold text-[#1E2A6E] mb-2">{service.name}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="bg-[#F0F9D4] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1E2A6E] mb-8 text-center">Meet Our Doctors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {doctors.slice(0, 3).map(doctor => (
              <div key={doctor.id} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-[#1E2A6E] mb-2">{doctor.name}</h3>
                <p className="text-[#A8D98A] font-medium mb-2">{doctor.specialty}</p>
                <p className="text-gray-600 text-sm mb-4">{doctor.bio}</p>
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
      </section>
    </div>
  );
};
