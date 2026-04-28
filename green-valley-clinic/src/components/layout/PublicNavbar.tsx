import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const PublicNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Doctors', path: '/doctors' },
    { label: 'Book Appointment', path: '/book' },
    { label: 'Contact', path: '/contact' },
    { label: 'Health Resources', path: '/health-resources' },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-[#1E2A6E]">
            Green Valley Clinic
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-700 hover:text-[#A8D98A]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/login"
              className="bg-[#A8D98A] text-[#1E2A6E] px-4 py-2 rounded hover:bg-[#95c97a]"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700"
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-2">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-gray-700 hover:text-[#A8D98A]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 bg-[#A8D98A] text-[#1E2A6E] px-4 rounded text-center"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
