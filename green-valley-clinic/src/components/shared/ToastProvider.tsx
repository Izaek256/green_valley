import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toasts, removeToast } = useAppContext();

  return (
    <>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`p-4 rounded-lg shadow-lg text-white max-w-sm transition-all ${
              toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <p className="flex-1">{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-white hover:text-gray-200 font-bold"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
