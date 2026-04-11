import React, { createContext, useContext, useState, useEffect } from 'react';
import { dictionary } from '../locales/dictionary';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Check local storage for saved language or default to 'en'
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'mr' : 'en');
  };

  const t = (key) => {
    // Helper function to fetch nested keys
    const keys = key.split('.');
    let value = dictionary[language];
    for (const k of keys) {
      if (value === undefined) break;
      value = value[k];
    }
    
    // Fallback if missing
    if (value === undefined) {
      console.warn(`Translation key missing: ${key}`);
      return key;
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);
