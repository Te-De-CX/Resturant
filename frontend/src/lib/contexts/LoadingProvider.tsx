// lib/providers/LoadingProvider.tsx
'use client';

import { useState, createContext, useContext, ReactNode, useEffect } from 'react';
import Loader  from '@/components/others/loader/Loader';

type LoadingContextType = {
  isLoading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
  loadingMessage: string;
  setLoadingMessage: (message: string) => void;
};

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  showLoader: () => {},
  hideLoader: () => {},
  loadingMessage: '',
  setLoadingMessage: () => {},
});

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading...');

  const showLoader = () => setIsLoading(true);
  const hideLoader = () => setIsLoading(false);

  // Optional: Auto-hide after 10 seconds as fallback
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <LoadingContext.Provider 
      value={{ 
        isLoading, 
        showLoader, 
        hideLoader,
        loadingMessage,
        setLoadingMessage
      }}
    >
      {isLoading && <Loader />}
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);