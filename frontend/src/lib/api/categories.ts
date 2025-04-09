import {apiClient} from './apiClient';

export const categoryApi = {
  getAllCategories: async () => {
    const response = await apiClient.get('/categories/');
    return response.data;
  },
  getCategoryById: async (id: number) => {
    const response = await apiClient.get(`/categories/${id}/`);
    return response.data;
  },
  createCategory: async (categoryData: { name: string; description?: string }) => {
    const response = await apiClient.post('/categories/', categoryData);
    return response.data;
  },
};