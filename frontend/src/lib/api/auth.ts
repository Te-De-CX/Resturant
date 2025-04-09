import { apiClient } from './apiClient';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Define all your types
type TokenResponse = {
  access: string;
  refresh: string;
};

type User = {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  is_staff?: boolean;
  is_superuser?: boolean;
};

type LoginData = {
  username: string;
  password: string;
};

type RegisterData = {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
};

type ApiError = {
  message: string;
  details?: Record<string, unknown>;
};

export const authApi = {
  login: async (data: LoginData): Promise<TokenResponse> => {
    const response = await apiClient.post<TokenResponse>('/token/', data);
    return response.data;
  },
  register: async (data: RegisterData): Promise<User> => {
    const response = await apiClient.post<User>('/users/', data);
    return response.data;
  },
  logout: async (): Promise<void> => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  },
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<User>('/users/me/');
    return response.data;
  },
};

// React Query hooks
export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation<TokenResponse, ApiError, LoginData>({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
};

export const useCurrentUser = () => {
  return useQuery<User | null, ApiError>({
    queryKey: ['currentUser'],
    queryFn: authApi.getCurrentUser,
    enabled: !!localStorage.getItem('access'),
    initialData: null, // Provide proper initial data
  });
};

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