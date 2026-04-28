import React, { useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { useToast } from '../../hooks/useToast';
import { mockStore } from '../../data/mockStore';
import { PatientTable } from '../../components/patients/PatientTable';
import { PatientDetail } from '../../components/patients/PatientDetail';
import { ConfirmDialog } from '../../components/shared/ConfirmDialog';
import type { Patient } from '../../data/types';

export const PatientsPage: React.FC = () => {
  const { patients, refreshPatients } = useAppContext();
  const { addToast } = useToast();
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; patient: Patient | null }>({
    open: false,
    patient: null,
  });

  const handleDelete = (patient: Patient) => {
    setDeleteDialog({ open: true, patient });
  };

  const handleConfirmDelete = () => {
    if (deleteDialog.patient) {
      mockStore.deletePatient(deleteDialog.patient.id);
      refreshPatients();
      addToast('Patient record deleted successfully', 'success');
      setDeleteDialog({ open: false, patient: null });
      setSelectedPatient(null);
    }
  };

  if (selectedPatient) {
    return (
      <div>
        <button
          onClick={() => setSelectedPatient(null)}
          className="mb-4 text-[#A8D98A] hover:underline"
        >
          ← Back to Patients
        </button>
        <PatientDetail patient={selectedPatient} />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#1E2A6E] mb-6">Patients</h1>
      <PatientTable
        patients={patients}
        onSelect={setSelectedPatient}
        onDelete={handleDelete}
      />
      
      <ConfirmDialog
        open={deleteDialog.open}
        title="Delete Patient Record"
        description="Are you sure you want to delete this patient record? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteDialog({ open: false, patient: null })}
        variant="destructive"
      />
    </div>
  );
};
