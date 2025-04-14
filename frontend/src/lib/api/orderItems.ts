import { apiClient } from './apiClient';
import { OrderItems, CreateOrderData } from '../types/api/orders';

// API Methods
export const orderItemsApi = {
  getAllOrders: async (): Promise<OrderItems[]> => {
    const response = await apiClient.get<OrderItems[]>('/orderitems/');
    return response.data;
  },

  getOrderById: async (id: number): Promise<OrderItems> => {
    const response = await apiClient.get<OrderItems>(`/orderitems/${id}/`);
    return response.data;
  },

  getorderitemsByUser: async (userId: number): Promise<OrderItems[]> => {
    const response = await apiClient.get<OrderItems[]>(`/orderitems/?user_id=${userId}`);
    return response.data;
  },

  createOrderItems: async (orderData: CreateOrderData): Promise<OrderItems> => {
    const response = await apiClient.post<OrderItems>('/orderitems/', orderData);
    return response.data;
  },

  updateorderitemstatus: async (id: number, status: OrderItems[]): Promise<OrderItems> => {
    const response = await apiClient.patch<OrderItems>(`/orderitems/${id}/`, { status });
    return response.data;
  },

  deleteOrderItems: async (id: number): Promise<void> => {
    await apiClient.delete(`/orderitems/${id}/`);
  }
};