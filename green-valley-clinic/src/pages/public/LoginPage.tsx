import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { validateEmail, validateRequired } from '../../lib/validators';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState<'staff' | 'patient'>('patient');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const emailError = validateEmail(email);
    const passwordError = validateRequired(password, 'Password');
    
    if (emailError || passwordError) {
      setError(emailError || passwordError || '');
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      // Redirect based on user role
      if (result.user?.role === 'patient') {
        navigate('/portal');
      } else {
        navigate('/staff');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F9D4] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-[#1E2A6E] mb-2">Green Valley Clinic</h1>
        <p className="text-gray-600 mb-6">{userType === 'staff' ? 'Staff Login' : 'Patient Login'}</p>

        {/* User Type Toggle */}
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setUserType('patient')}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
              userType === 'patient'
                ? 'bg-[#A8D98A] text-[#1E2A6E]'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Patient
          </button>
          <button
            onClick={() => setUserType('staff')}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
              userType === 'staff'
                ? 'bg-[#A8D98A] text-[#1E2A6E]'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Staff
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#A8D98A] focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#A8D98A] focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#A8D98A] text-[#1E2A6E] font-semibold py-3 rounded hover:bg-[#95c97a] disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          {userType === 'patient' ? (
            <>
              Don't have an account? <Link to="/register" className="text-[#A8D98A] hover:underline">Register here</Link>
            </>
          ) : (
            <>Patient? <Link to="/portal" className="text-[#A8D98A] hover:underline">Go to Patient Portal</Link></>
          )}
        </p>
      </div>
    </div>
  );
};
