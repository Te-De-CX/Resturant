import { TokenResponse, RegisterData, ApiError, LoginCredentials } from '../types/api/auth';
import { useRouter } from 'next/navigation';
import { apiClient } from './apiClient';
import { useMutation, useQuery, useQueryClient, UseMutationResult  } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { CurrentUser } from '../types/api/auth';
import { jwtDecode } from 'jwt-decode';


export const authApi = {
  login: async (credentials: LoginCredentials): Promise<TokenResponse> => {
      const response = await apiClient.post('/token/', credentials);
      return response.data;
      },
  register: async (userData: RegisterData): Promise<TokenResponse> => {
    const response = await apiClient.post<{
      access: string;
      refresh: string;
    }>('/users/', userData);
    return {
      access: response.data.access,
      refresh: response.data.refresh,
    };
  },
  logout: async (): Promise<void> => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  },
  getCurrentUser: async (): Promise<CurrentUser> => {
    const token = localStorage.getItem('access');
    if (!token) throw new Error('No access token');
    
    const decoded: { user_id: number } = jwtDecode(token);
    const userId = decoded.user_id;
    const response = await apiClient.get<CurrentUser>(`/users/${userId}/`);
    return response.data;
  },
};

// React Query hooks

export const useLogin = (): UseMutationResult<
  TokenResponse,
  Error,
  LoginCredentials,
  unknown
> => {
  const queryClient = useQueryClient();
  
  return useMutation<TokenResponse, Error, LoginCredentials>({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      toast.success('Login successful!');
    },
    onError: (error) => {
      toast.error(error.message || 'Login failed');
    },
  });
};
  
export const useRegister = (): UseMutationResult<
  TokenResponse, 
  Error, 
  RegisterData
> => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (userData: RegisterData) => authApi.register(userData),
    onSuccess: (data: TokenResponse) => {
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      toast.success('Registration successful!');
      router.push('/dashboard');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Registration failed. Please try again.');
    }
  });
};

export const useCurrentUser = () => {
  return useQuery<CurrentUser, AxiosError>({
    queryKey: ['currentUser'],
    queryFn: async () => {
      try {
        return await authApi.getCurrentUser();
      } catch (error) {
        if (isAxiosError(error)) {
          // Handle specific error cases
          if (error.response?.status === 401) {
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
          }
          throw error;
        }
        throw new Error('An unknown error occurred');
      }
    },
    retry: (failureCount, error) => {
      if (error.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

// Type guard
function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}

export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return useMutation<void, ApiError, void>({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.clear();
      queryClient.setQueryData(['currentUser'], null);
    },
  });
};