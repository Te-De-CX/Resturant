import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount: number, error: unknown) => {
        // Check if it's an Axios error
        if (isAxiosError(error)) {
          if (error.response?.status === 401) {
            return false; // Don't retry for 401 errors
          }
        }
        return failureCount < 3; // Retry others up to 3 times
      },
    },
  },
});

// Type guard for AxiosError
function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}