import React, { useState } from 'react';
import type { Appointment, AppointmentStatus } from '../../data/types';
import { useAppContext } from '../../hooks/useAppContext';
import { useToast } from '../../hooks/useToast';
import { mockStore } from '../../data/mockStore';
import { ConfirmDialog } from '../../components/shared/ConfirmDialog';
import { AppointmentTable } from '../../components/appointments/AppointmentTable';

export const AppointmentsPage: React.FC = () => {
  const { appointments, refreshAppointments } = useAppContext();
  const { addToast } = useToast();
  const [cancelDialog, setCancelDialog] = useState<{ open: boolean; appointment: Appointment | null }>({
    open: false,
    appointment: null,
  });

  const handleCancel = (appointment: Appointment) => {
    setCancelDialog({ open: true, appointment });
  };

  const handleConfirmCancel = () => {
    if (cancelDialog.appointment) {
      mockStore.updateAppointment(cancelDialog.appointment.id, { status: 'Cancelled' });
      refreshAppointments();
      addToast('Appointment cancelled successfully', 'success');
      setCancelDialog({ open: false, appointment: null });
    }
  };

  const handleStatusChange = (appointment: Appointment, status: AppointmentStatus) => {
    mockStore.updateAppointment(appointment.id, { status });
    refreshAppointments();
    addToast(`Appointment ${status.toLowerCase()} successfully`, 'success');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#1E2A6E] mb-6">Appointments</h1>
      <AppointmentTable
        appointments={appointments}
        onEdit={() => addToast('Edit functionality coming soon', 'error')}
        onCancel={handleCancel}
        onStatusChange={handleStatusChange}
      />
      
      <ConfirmDialog
        open={cancelDialog.open}
        title="Cancel Appointment"
        description="Are you sure you want to cancel this appointment? This action cannot be undone."
        onConfirm={handleConfirmCancel}
        onCancel={() => setCancelDialog({ open: false, appointment: null })}
        variant="destructive"
      />
    </div>
  );
};
