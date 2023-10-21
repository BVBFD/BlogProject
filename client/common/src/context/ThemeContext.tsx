'use client';

import { createContext, useMemo, useState } from 'react';

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

  // useMemo로 감싸서 불필요한 재생성을 방지한 후 결과를 변수에 할당합니다.
  const contextValue = useMemo(() => ({ toggle, mode }), [toggle, mode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <div className={`theme ${mode}`}>{children}</div>
    </ThemeContext.Provider>
  );
};
