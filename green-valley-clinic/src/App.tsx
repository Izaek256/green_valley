import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { ToastProvider } from './components/shared/ToastProvider';
import { ProtectedRoute } from './components/shared/ProtectedRoute';
import { StaffLayout } from './components/layout/StaffLayout';
import { PublicLayout } from './components/layout/PublicLayout';
import { DashboardPage } from './pages/staff/DashboardPage';
import { AppointmentsPage } from './pages/staff/AppointmentsPage';
import { PatientsPage } from './pages/staff/PatientsPage';
import { StaffPage } from './pages/staff/StaffPage';
import { ReportsPage } from './pages/staff/ReportsPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';
import { HomePage } from './pages/public/HomePage';
import { ServicesPage } from './pages/public/ServicesPage';
import { DoctorsPage } from './pages/public/DoctorsPage';
import { BookingPage } from './pages/public/BookingPage';
import { ContactPage } from './pages/public/ContactPage';
import { HealthResourcesPage } from './pages/public/HealthResourcesPage';
import { PatientDashboardPage } from './pages/portal/PatientDashboardPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <ToastProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<PublicLayout />}>
                <Route index element={<HomePage />} />
                <Route path="services" element={<ServicesPage />} />
                <Route path="doctors" element={<DoctorsPage />} />
                <Route path="book" element={<BookingPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="health-resources" element={<HealthResourcesPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
              </Route>
              
              {/* Staff dashboard (protected) */}
              <Route
                path="/staff"
                element={
                  <ProtectedRoute allowedRoles={['admin', 'doctor', 'receptionist']}>
                    <StaffLayout>
                      <DashboardPage />
                    </StaffLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/staff/appointments"
                element={
                  <ProtectedRoute allowedRoles={['admin', 'doctor', 'receptionist']}>
                    <StaffLayout>
                      <AppointmentsPage />
                    </StaffLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/staff/patients"
                element={
                  <ProtectedRoute allowedRoles={['admin', 'doctor', 'receptionist']}>
                    <StaffLayout>
                      <PatientsPage />
                    </StaffLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/staff/staff"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <StaffLayout>
                      <StaffPage />
                    </StaffLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/staff/reports"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <StaffLayout>
                      <ReportsPage />
                    </StaffLayout>
                  </ProtectedRoute>
                }
              />

              {/* Patient portal (protected) */}
              <Route
                path="/portal"
                element={
                  <ProtectedRoute allowedRoles={['patient']}>
                    <PatientDashboardPage />
                  </ProtectedRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ToastProvider>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
