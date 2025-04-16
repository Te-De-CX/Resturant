import { apiClient } from './apiClient';
import { Ads } from '../types/api/ads';

// API Methods
export const AdsApi = {
  getAllOrders: async (): Promise<Ads[]> => {
    const response = await apiClient.get<Ads[]>('/ads/');
    return response.data;
  },

  getOrderById: async (id: number): Promise<Ads> => {
    const response = await apiClient.get<Ads>(`/ads/${id}/`);
    return response.data;
  },

  getAdsByUser: async (userId: number): Promise<Ads[]> => {
    const response = await apiClient.get<Ads[]>(`/ads/?user_id=${userId}`);
    return response.data;
  },

  updateAdstatus: async (id: number, status: Ads[]): Promise<Ads> => {
    const response = await apiClient.patch<Ads>(`/ads/${id}/`, { status });
    return response.data;
  },

  deleteAds: async (id: number): Promise<void> => {
    await apiClient.delete(`/Ads/${id}/`);
  }
};