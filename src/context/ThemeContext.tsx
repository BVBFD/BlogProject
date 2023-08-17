'use client';

import { createContext, useState } from 'react';

type ThemeContextType = {
  toggle: () => void;
  mode: 'light' | 'dark';
};

export const ThemeContext = createContext<ThemeContextType>({
  toggle: () => {},
  mode: 'light',
});

export const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const toggle = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ toggle, mode }}>
      <div className={`theme ${mode}`}>{children}</div>
    </ThemeContext.Provider>
  );
};
