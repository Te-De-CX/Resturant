import axios, { AxiosError, InternalAxiosRequestConfig, AxiosRequestConfig } from 'axios';
import { queryClient } from '../helpers/react-query';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const apiClient = axios.create({
  baseURL: `${baseURL}`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('access');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface RetryableAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableAxiosRequestConfig | undefined;
    
    if (error.response?.status === 401 && 
        originalRequest && 
        originalRequest.url !== '/token/refresh/') {
      
      if (originalRequest._retry) {
        return Promise.reject(error);
      }
      
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refresh');
        if (refreshToken) {
          const { data } = await axios.post(`${baseURL}/token/refresh/`, { 
            refresh: refreshToken 
          });
          
          localStorage.setItem('access', data.access);
          
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${data.access}`;
          }
          
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        queryClient.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);