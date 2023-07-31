import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import Cookies from 'js-cookie';

type CurrencyContextType = {
  currency: string;
  setCurrency: (currency: string) => void;
};

type CurrencyProviderProps = {
  children: ReactNode;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  const [currency, setCurrency] = useState<string>('EGP');

  useEffect(() => {
    const savedCurrency = Cookies.get('currency');
    if (savedCurrency) {
      setCurrency(savedCurrency);
    }
  }, []);

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);
    Cookies.set('currency', newCurrency, { expires: 365, path: '/' });
  };

  const contextValue: CurrencyContextType = {
    currency,
    setCurrency: handleCurrencyChange,
  };

  return <CurrencyContext.Provider value={contextValue}>{children}</CurrencyContext.Provider>;
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
