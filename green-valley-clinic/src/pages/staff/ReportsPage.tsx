import React from 'react';
import { AppointmentChart } from '../../components/reports/AppointmentChart';
import { PatientGrowthChart } from '../../components/reports/PatientGrowthChart';
import { DoctorWorkloadChart } from '../../components/reports/DoctorWorkloadChart';

export const ReportsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-[#1E2A6E] mb-6">Reports</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AppointmentChart />
        <PatientGrowthChart />
        <DoctorWorkloadChart />
      </div>
    </div>
  );
};
