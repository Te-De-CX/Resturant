import { apiClient } from './apiClient';
import { Order } from '../types/api/orders';

export const paymentApi = {
  processPayment: async (orderData: {
    items: Array<{ product: number; quantity: number }>;
    total: number;
    paymentMethod: string;
  }): Promise<{ success: boolean; order: Order; paymentId?: string }> => {
    const response = await apiClient.post('/payments/', orderData);
    return response.data;
  },
};