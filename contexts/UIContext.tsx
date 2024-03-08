// 'contexts/UIContext.tsx'
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UIContextType {
  formSubmitted: boolean;
  setFormSubmitted: (submitted: boolean) => void;
}

const UIContext = createContext<UIContextType | null>(null);

interface UIProviderProps {
  children: ReactNode;
}

export const UIProvider: React.FC<UIProviderProps> = ({ children }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <UIContext.Provider value={{ formSubmitted, setFormSubmitted }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUIContext = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUIContext must be used within a UIProvider');
  }
  return context;
};
