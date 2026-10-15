'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

type Locale = 'en' | 'ur';

interface LocaleContextType {
  locale: Locale;
  isUrdu: boolean;
  toggleLocale: () => void;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: 'en',
  isUrdu: false,
  toggleLocale: () => {},
});

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === 'en' ? 'ur' : 'en'));
  }, []);

  return (
    <LocaleContext.Provider
      value={{ locale, isUrdu: locale === 'ur', toggleLocale }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
