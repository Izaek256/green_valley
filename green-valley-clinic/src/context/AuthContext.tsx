import React, { createContext, useState, useEffect, useCallback } from 'react';
import type { User } from '../data/types';
import { mockStore } from '../data/mockStore';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; user?: User }>;
  logout: () => void;
  register: (data: RegisterPayload) => Promise<{ success: boolean; error?: string }>;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  dateOfBirth: string;
  phone: string;
  gender: 'male' | 'female' | 'other';
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Restore session from localStorage
    const session = localStorage.getItem('gvc_session');
    if (session) {
      try {
        const userData = JSON.parse(session);
        // Ensure store is initialized before accessing data
        mockStore.initialize();
        const currentUser = mockStore.getUserByEmail(userData.email);
        
        if (currentUser && currentUser.isActive) {
          setUser({ ...currentUser, passwordHash: '' });
        } else {
          localStorage.removeItem('gvc_session');
        }
      } catch {
        localStorage.removeItem('gvc_session');
      }
    }
    setIsInitializing(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      // Ensure store is initialized
      mockStore.initialize();
      const foundUser = mockStore.getUserByEmail(email);
      
      if (!foundUser) {
        return { success: false, error: 'Invalid email or password' };
      }

      if (!foundUser.isActive) {
        return { success: false, error: 'Your account has been deactivated. Please contact support.' };
      }

      if (foundUser.passwordHash !== password) {
        return { success: false, error: 'Invalid email or password' };
      }

      // Create session
      const sessionData = {
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
        name: foundUser.name,
        isActive: foundUser.isActive,
      };
      
      localStorage.setItem('gvc_session', JSON.stringify(sessionData));
      const userWithoutPassword = { ...foundUser, passwordHash: '' };
      setUser(userWithoutPassword);
      
      return { success: true, user: userWithoutPassword };
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('gvc_session');
    setUser(null);
    window.location.href = '/login';
  }, []);

  const register = useCallback(async (data: RegisterPayload) => {
    try {
      // Ensure store is initialized
      mockStore.initialize();
      // Check if email already exists
      const existingUser = mockStore.getUserByEmail(data.email);
      if (existingUser) {
        return { success: false, error: 'An account with this email already exists.' };
      }

      // Create user
      const newUser = mockStore.createUser({
        email: data.email,
        passwordHash: data.password,
        role: 'patient',
        name: data.name,
        isActive: true,
      });

      // Create patient record
      mockStore.createPatient({
        userId: newUser.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        medicalHistory: [],
      });

      // Create session
      const sessionData = {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        name: newUser.name,
        isActive: newUser.isActive,
      };
      
      localStorage.setItem('gvc_session', JSON.stringify(sessionData));
      setUser({ ...newUser, passwordHash: '' });
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isInitializing, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
