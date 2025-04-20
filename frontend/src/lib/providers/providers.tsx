'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const Toaster = dynamic(
  () => import('react-hot-toast').then((c) => c.Toaster),
  { ssr: false }
);
// const Loader = dynamic(
//   () => import('@/components/others/loader/Loader'),
//   { ssr: false }
// );

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <QueryClientProvider client={queryClient}>
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