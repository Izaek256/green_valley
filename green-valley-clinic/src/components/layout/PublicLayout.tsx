import React from 'react';
import { Outlet } from 'react-router-dom';
import { PublicNavbar } from './PublicNavbar';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-[#1E2A6E] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2026 Green Valley Clinic. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
