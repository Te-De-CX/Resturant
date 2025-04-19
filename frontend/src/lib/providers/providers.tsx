'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Loader from '@/components/others/loader/Loader'; // Adjust the import path to your loader file

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  return (
    <QueryClientProvider client={queryClient}>
      {isLoading && <Loader />} {/* Show loader when loading */}
      {children}
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