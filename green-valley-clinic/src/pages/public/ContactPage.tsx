import React, { useState } from 'react';
import { useToast } from '../../hooks/useToast';

export const ContactPage: React.FC = () => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast('Please fill in all fields', 'error');
      return;
    }
    addToast('Your message has been sent. We\'ll get back to you within 24 hours.', 'success');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-[#1E2A6E] mb-8 text-center">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-[#1E2A6E] mb-4">Get In Touch</h2>
          <div className="space-y-4">
            <p className="flex items-center gap-3">
              <i className="fas fa-map-marker-alt text-[#A8D98A] text-xl"></i>
              <span>123 Green Valley Road, Green Valley, CA 90001</span>
            </p>
            <p className="flex items-center gap-3">
              <i className="fas fa-phone text-[#A8D98A] text-xl"></i>
              <span>+1 (555) 123-4567</span>
            </p>
            <p className="flex items-center gap-3">
              <i className="fas fa-envelope text-[#A8D98A] text-xl"></i>
              <span>info@greenvalleyclinic.com</span>
            </p>
          </div>
          
          <div className="mt-8 bg-gray-200 h-64 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Map Placeholder</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-[#1E2A6E] mb-4">Send us a Message</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#A8D98A] text-[#1E2A6E] py-3 rounded font-semibold hover:bg-[#95c97a]"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
