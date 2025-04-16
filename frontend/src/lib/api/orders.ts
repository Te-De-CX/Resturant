// orderApi.ts
import { apiClient } from './apiClient';
import { Order, CreateOrderData } from '../types/api/orders';

export const orderApi = {
  getAllOrders: async (): Promise<Order[]> => {
    const response = await apiClient.get<Order[]>('/orders/');
    return response.data;
  },

  getOrderById: async (id: number): Promise<Order> => {
    const response = await apiClient.get<Order>(`/orders/${id}/`);
    return response.data;
  },

  createOrder: async (orderData: CreateOrderData): Promise<Order> => {
    const response = await apiClient.post<Order>('/orders/', {
      user: orderData.user,
      items: orderData.items,
      total: orderData.total,
    });
    return response.data;
  },

  updateOrderStatus: async (id: number, status: Order['status']): Promise<Order> => {
    const response = await apiClient.patch<Order>(`/orders/${id}/`, { status });
    return response.data;
  },
};