import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { mockStore } from '../../data/mockStore';
import { useToast } from '../../hooks/useToast';
import { ConfirmDialog } from '../../components/shared/ConfirmDialog';
import { PatientDashboardStats } from '../../components/patients/PatientDashboardStats';
import { MedicalHistory } from '../../components/patients/MedicalHistory';
import { ProfileEditor } from '../../components/patients/ProfileEditor';
import { PatientQuickActions } from '../../components/patients/PatientQuickActions';
import { UpcomingAppointments } from '../../components/patients/UpcomingAppointments';
import type { Appointment } from '../../data/types';

export const PatientDashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const { addToast } = useToast();
  const [cancelDialog, setCancelDialog] = React.useState<{ open: boolean; appointment: Appointment | null }>({
    open: false,
    appointment: null,
  });
  const [refreshKey, setRefreshKey] = React.useState(0);

  if (!user) return null;

  const patient = mockStore.getPatients().find(p => p.userId === user.id);
  if (!patient) {
    return (
      <div className="min-h-screen bg-[#F0F9D4] flex items-center justify-center">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h2 className="text-2xl font-bold text-[#1E2A6E] mb-2">Patient Profile Not Found</h2>
          <p className="text-gray-600">Please contact the clinic for assistance.</p>
        </div>
      </div>
    );
  }

  const appointments = mockStore.getAppointmentsByPatient(patient.id);
  
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
      setRefreshKey(prev => prev + 1);
    }
  };

  const handleProfileUpdate = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#F0F9D4]">
      <header className="bg-white shadow-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#1E2A6E]">Patient Portal</h1>
            <p className="text-sm text-gray-600">Welcome back, {patient.name}!</p>
          </div>
          <button 
            onClick={logout} 
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            <i className="fas fa-sign-out-alt mr-2"></i>
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <PatientDashboardStats appointments={appointments} />

        {/* Quick Actions */}
        <PatientQuickActions />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Profile */}
          <div className="lg:col-span-1">
            <ProfileEditor patient={patient} onUpdate={handleProfileUpdate} />
          </div>

          {/* Upcoming Appointments */}
          <div className="lg:col-span-2">
            <UpcomingAppointments appointments={upcoming} onCancel={handleCancel} />
          </div>
        </div>

        {/* Medical History */}
        <div className="mb-6">
          <MedicalHistory patient={patient} />
        </div>

        {/* Past Appointments */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-[#1E2A6E] mb-4">Past Appointments</h2>
          {past.length === 0 ? (
            <p className="text-gray-500">No past appointments.</p>
          ) : (
            <div className="space-y-3">
              {past.map(apt => {
                const doctor = mockStore.getDoctorById(apt.doctorId);
                const service = mockStore.getServiceById(apt.serviceId);
                return (
                  <div key={apt.id} className="flex justify-between items-center p-4 bg-gray-50 rounded">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-[#1E2A6E]">{apt.date} at {apt.time}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          apt.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {apt.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        <i className="fas fa-user-md mr-1"></i>
                        Dr. {doctor?.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        <i className="fas fa-stethoscope mr-1"></i>
                        {service?.name}
                      </p>
                    </div>
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
