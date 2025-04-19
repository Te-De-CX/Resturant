'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Loader from '@/components/others/loader/Loader';

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading or add your actual loading logic
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {isLoading && <Loader />}
      {!isLoading && children}
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: 'green',
              secondary: 'white',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: 'red',
              secondary: 'white',
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}