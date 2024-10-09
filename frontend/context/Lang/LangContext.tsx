'use client'
import React, { createContext, useState, useContext } from 'react';
import { engLang, viLang } from '@/lang/index';

type LanguageContextType = {
  language: typeof engLang;
  switchLanguage: (lang: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState(engLang);

  const switchLanguage = (lang: string) => {
    if (lang === 'vi') {
      setLanguage(viLang);
    } else {
      setLanguage(engLang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
