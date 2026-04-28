import React from 'react';
import { mockStore } from '../../data/mockStore';

export const ServicesPage: React.FC = () => {
  const services = mockStore.getServices();

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-[#1E2A6E] mb-8 text-center">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => {
          const doctors = service.doctorIds.map(id => mockStore.getDoctorById(id)).filter(Boolean);
          
          return (
            <div key={service.id} className="bg-white p-6 rounded-lg shadow">
              <i className={`fas ${service.icon} text-4xl text-[#A8D98A] mb-4`}></i>
              <h3 className="text-xl font-semibold text-[#1E2A6E] mb-2">{service.name}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <p className="text-sm text-gray-500">Duration: {service.durationMinutes} minutes</p>
              {doctors.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-medium text-gray-700 mb-2">Available Doctors:</p>
                  {doctors.map(doc => (
                    <p key={doc!.id} className="text-sm text-gray-600">{doc!.name}</p>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
