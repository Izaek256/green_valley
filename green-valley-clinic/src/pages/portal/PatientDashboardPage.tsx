import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { mockStore } from '../../data/mockStore';
import { useToast } from '../../hooks/useToast';
import { ConfirmDialog } from '../../components/shared/ConfirmDialog';
import type { Appointment } from '../../data/types';

export const PatientDashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const { addToast } = useToast();
  const [cancelDialog, setCancelDialog] = React.useState<{ open: boolean; appointment: Appointment | null }>({
    open: false,
    appointment: null,
  });

  if (!user) return null;

  const patient = mockStore.getPatients().find(p => p.userId === user.id);
  const appointments = patient ? mockStore.getAppointmentsByPatient(patient.id) : [];
  
  const upcoming = appointments
    .filter(a => a.status !== 'Cancelled' && new Date(a.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const past = appointments
    .filter(a => a.status === 'Completed' || a.status === 'Cancelled' || new Date(a.date) < new Date())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleCancel = (appointment: Appointment) => {
    setCancelDialog({ open: true, appointment });
  };

  const handleConfirmCancel = () => {
    if (cancelDialog.appointment) {
      mockStore.updateAppointment(cancelDialog.appointment.id, { status: 'Cancelled' });
      addToast('Appointment cancelled successfully', 'success');
      setCancelDialog({ open: false, appointment: null });
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F9D4]">
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#1E2A6E]">Patient Portal</h1>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Logout
        </button>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-[#1E2A6E] mb-4">Profile</h2>
            {patient && (
              <div className="space-y-2">
                <p><strong>Name:</strong> {patient.name}</p>
                <p><strong>Email:</strong> {patient.email}</p>
                <p><strong>Phone:</strong> {patient.phone}</p>
                <p><strong>Date of Birth:</strong> {patient.dateOfBirth}</p>
              </div>
            )}
          </div>

          {/* Upcoming Appointments */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-[#1E2A6E] mb-4">Upcoming Appointments</h2>
            {upcoming.length === 0 ? (
              <p className="text-gray-500">No upcoming appointments.</p>
            ) : (
              <div className="space-y-3">
                {upcoming.map(apt => {
                  const doctor = mockStore.getDoctorById(apt.doctorId);
                  return (
                    <div key={apt.id} className="flex justify-between items-center p-4 bg-gray-50 rounded">
                      <div>
                        <p className="font-semibold">{apt.date} at {apt.time}</p>
                        <p className="text-sm text-gray-600">Dr. {doctor?.name}</p>
                        <p className="text-sm text-gray-500">{apt.bookingRef}</p>
                      </div>
                      <button
                        onClick={() => handleCancel(apt)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Past Appointments */}
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h2 className="text-xl font-bold text-[#1E2A6E] mb-4">Past Appointments</h2>
          {past.length === 0 ? (
            <p className="text-gray-500">No past appointments.</p>
          ) : (
            <div className="space-y-3">
              {past.map(apt => {
                const doctor = mockStore.getDoctorById(apt.doctorId);
                return (
                  <div key={apt.id} className="flex justify-between items-center p-4 bg-gray-50 rounded">
                    <div>
                      <p className="font-semibold">{apt.date} at {apt.time}</p>
                      <p className="text-sm text-gray-600">Dr. {doctor?.name}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      apt.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {apt.status}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={cancelDialog.open}
        title="Cancel Appointment"
        description="Are you sure you want to cancel this appointment?"
        onConfirm={handleConfirmCancel}
        onCancel={() => setCancelDialog({ open: false, appointment: null })}
        variant="destructive"
      />
    </div>
  );
};
