import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import type { Role } from '../../data/types';

interface ProtectedRouteProps {
  allowedRoles: Role[];
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const { user, isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) {
    return null; // Wait for session restore before making any redirect decision
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    if (user.role === 'patient') {
      return <Navigate to="/portal" replace />;
    }
    return <Navigate to="/staff" replace />;
  }

  return <>{children}</>;
};
