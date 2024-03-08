// @/contexts/ToastContext.tsx
'use client';

import React, { createContext, useState, useCallback, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid'; 

// Define the type for a single toast
interface Toast {
  id?: string;
  messageType: 'success' | 'error';
  message: string;
  duration?: number; // Optional duration in milliseconds
}

// Define the type for the context
interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Toast) => void;
  removeToast: (id: string) => void;
}

// Create the context with a default value
export const ToastContext = createContext<ToastContextType>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {}
});

// Define the type for the ToastProvider props
interface ToastProviderProps {
  children: ReactNode;
}

// Create the ToastProvider component
export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  const addToast = useCallback((toast: Toast) => {
    // Provide a default ID using UUID or similar method
    const toastWithDefaultId = {
      ...toast,
      id: toast.id || uuidv4(),
    };
  
    setToasts((prevToasts) => [...prevToasts, toastWithDefaultId]);
  
    const duration = toast.duration || 5000; // Use a default duration if not specified
      
    setTimeout(() => {
      removeToast(toastWithDefaultId.id);
    }, duration);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};
