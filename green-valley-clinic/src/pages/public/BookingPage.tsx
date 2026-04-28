import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../hooks/useAppContext';
import { useToast } from '../../hooks/useToast';
import { mockStore } from '../../data/mockStore';
import { SlotPicker } from '../../components/appointments/SlotPicker';
import type { TimeSlot } from '../../data/types';

export const BookingPage: React.FC = () => {
  const { doctors } = useAppContext();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [patientInfo, setPatientInfo] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    const doctorId = searchParams.get('doctorId');
    if (doctorId) {
      setSelectedDoctor(doctorId);
    }
  }, [searchParams]);

  const doctor = doctors.find(d => d.id === selectedDoctor);
  const services = doctor ? doctor.services.map(id => mockStore.getServiceById(id)).filter(Boolean) : [];

  const handleNext = () => {
    if (step === 1 && (!selectedDoctor || !selectedService)) {
      addToast('Please select a doctor and service', 'error');
      return;
    }
    if (step === 2 && (!selectedDate || !selectedSlot)) {
      addToast('Please select a date and time slot', 'error');
      return;
    }
    setStep(step + 1);
  };

  const handleSubmit = () => {
    if (!selectedDoctor || !selectedDate || !selectedSlot || !patientInfo.name || !patientInfo.email) {
      addToast('Please fill in all required fields', 'error');
      return;
    }

    // Check slot availability one more time
    const slots = mockStore.getAvailableSlots(selectedDoctor, selectedDate);
    const isSlotStillAvailable = slots.find(s => s.time === selectedSlot.time && s.isAvailable);
    
    if (!isSlotStillAvailable) {
      addToast('This slot is no longer available. Please select another time.', 'error');
      return;
    }

    // Create or find patient
    let patient = mockStore.getPatients().find(p => p.email === patientInfo.email);
    if (!patient) {
      patient = mockStore.createPatient({
        name: patientInfo.name,
        email: patientInfo.email,
        phone: patientInfo.phone,
        dateOfBirth: '1990-01-01',
        gender: 'other',
        medicalHistory: [],
      });
    }

    // Create appointment
    const appointment = mockStore.createAppointment({
      patientId: patient.id,
      doctorId: selectedDoctor,
      serviceId: selectedService,
      date: selectedDate,
      time: selectedSlot.time,
      status: 'Pending',
      notes: '',
    });

    addToast(`Appointment booked successfully! Reference: ${appointment.bookingRef}`, 'success');
    navigate('/');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-[#1E2A6E] mb-8 text-center">Book an Appointment</h1>
      
      {/* Progress */}
      <div className="flex justify-center mb-8">
        {[1, 2, 3].map(s => (
          <div
            key={s}
            className={`w-10 h-10 rounded-full flex items-center justify-center mx-2 ${
              s <= step ? 'bg-[#A8D98A] text-[#1E2A6E]' : 'bg-gray-200'
            }`}
          >
            {s}
          </div>
        ))}
      </div>

      {/* Step 1: Select Doctor & Service */}
      {step === 1 && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-[#1E2A6E] mb-4">Select Doctor & Service</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
              <select
                value={selectedDoctor}
                onChange={(e) => { setSelectedDoctor(e.target.value); setSelectedService(''); }}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              >
                <option value="">Choose a doctor</option>
                {doctors.map(doc => (
                  <option key={doc.id} value={doc.id}>{doc.name} - {doc.specialty}</option>
                ))}
              </select>
            </div>
            {doctor && services.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                >
                  <option value="">Choose a service</option>
                  {services.map(service => (
                    <option key={service!.id} value={service!.id}>{service!.name}</option>
                  ))}
                </select>
              </div>
            )}
            <button
              onClick={handleNext}
              className="w-full bg-[#A8D98A] text-[#1E2A6E] py-3 rounded font-semibold hover:bg-[#95c97a]"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Select Date & Time */}
      {step === 2 && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-[#1E2A6E] mb-4">Select Date & Time</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            {selectedDate && selectedDoctor && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Available Time Slots</label>
                <SlotPicker
                  doctorId={selectedDoctor}
                  date={selectedDate}
                  onSlotSelect={setSelectedSlot}
                  selectedSlot={selectedSlot || undefined}
                />
              </div>
            )}
            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 border border-gray-300 py-3 rounded hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="flex-1 bg-[#A8D98A] text-[#1E2A6E] py-3 rounded font-semibold hover:bg-[#95c97a]"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Confirm & Submit */}
      {step === 3 && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-[#1E2A6E] mb-4">Confirm Appointment</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded">
              <p><strong>Doctor:</strong> {doctor?.name}</p>
              <p><strong>Date:</strong> {selectedDate}</p>
              <p><strong>Time:</strong> {selectedSlot?.time}</p>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Your Name"
                value={patientInfo.name}
                onChange={(e) => setPatientInfo({ ...patientInfo, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={patientInfo.email}
                onChange={(e) => setPatientInfo({ ...patientInfo, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
              <input
                type="tel"
                placeholder="Your Phone"
                value={patientInfo.phone}
                onChange={(e) => setPatientInfo({ ...patientInfo, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 border border-gray-300 py-3 rounded hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 bg-[#A8D98A] text-[#1E2A6E] py-3 rounded font-semibold hover:bg-[#95c97a]"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
