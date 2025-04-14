import { apiClient } from './apiClient';
import { Order, CreateOrderData } from '../types/api/orders';

// API Methods
export const orderApi = {
  getAllOrders: async (): Promise<Order[]> => {
    const response = await apiClient.get<Order[]>('/orders/');
    return response.data;
  },

  getOrderById: async (id: number): Promise<Order> => {
    const response = await apiClient.get<Order>(`/orders/${id}/`);
    return response.data;
  },

  getOrdersByUser: async (userId: number): Promise<Order[]> => {
    const response = await apiClient.get<Order[]>(`/orders/?user_id=${userId}`);
    return response.data;
  },

  createOrder: async (orderData: CreateOrderData): Promise<Order> => {
    const response = await apiClient.post<Order>('/orders/', orderData);
    return response.data;
  },

  updateOrderStatus: async (id: number, status: Order['status']): Promise<Order> => {
    const response = await apiClient.patch<Order>(`/orders/${id}/`, { status });
    return response.data;
  },

  deleteOrder: async (id: number): Promise<void> => {
    await apiClient.delete(`/orders/${id}/`);
  }
};