import {apiClient} from './apiClient';

export const orderApi = {
  getAllOrders: async () => {
    const response = await apiClient.get('/orders/');
    return response.data;
  },
  getOrderById: async (id: number) => {
    const response = await apiClient.get(`/orders/${id}/`);
    return response.data;
  },
  createOrder: async (orderData: {
    items: Array<{ product: number; quantity: number }>;
    total: number;
  }) => {
    const response = await apiClient.post('/orders/', orderData);
    return response.data;
  },
  updateOrderStatus: async (id: number, status: string) => {
    const response = await apiClient.patch(`/orders/${id}/`, { status });
    return response.data;
  },
};