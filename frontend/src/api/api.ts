import axios, { AxiosResponse } from 'axios';
import { API_ENDPOINTS } from './constants';
import {
  User,
  Product,
  Order,
  Payment,
  Review,
  AuthResponse,
  OrderItem,
} from '../types/types';

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL as string,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the JWT token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 (Unauthorized) and it's not a retry request
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post<AuthResponse>(
          API_ENDPOINTS.AUTH.REFRESH,
          {
            refresh: refreshToken,
          }
        );

        // Update the tokens in localStorage
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
        return api(originalRequest);
      } catch (err) {
        // If refresh fails, log the user out
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login'; // Redirect to login page
      }
    }

    return Promise.reject(error);
  }
);

// Authentication functions
export const login = async (
  username: string,
  password: string
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, {
    username,
    password,
  });
  localStorage.setItem('access_token', response.data.access);
  localStorage.setItem('refresh_token', response.data.refresh);
  return response.data;
};

export const logout = (): void => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

// User functions
export const getUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>(API_ENDPOINTS.USERS);
  return response.data;
};

export const createUser = async (userData: {
  username: string;
  email: string;
  password: string;
}): Promise<User> => {
  const response = await api.post<User>(API_ENDPOINTS.USERS, userData);
  return response.data;
};

// Product functions
export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>(API_ENDPOINTS.PRODUCTS);
  return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get<Product>(`${API_ENDPOINTS.PRODUCTS}${id}/`);
  return response.data;
};

// Order functions
export const getOrders = async (): Promise<Order[]> => {
  const response = await api.get<Order[]>(API_ENDPOINTS.ORDERS);
  return response.data;
};

export const createOrder = async (orderData: {
  items: OrderItem[];
  total: number;
}): Promise<Order> => {
  const response = await api.post<Order>(API_ENDPOINTS.ORDERS, orderData);
  return response.data;
};

// Export the Axios instance for custom requests
export default api;