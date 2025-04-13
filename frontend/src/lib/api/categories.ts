import {apiClient} from './apiClient';
import { useQuery } from '@tanstack/react-query';
import { Category, ApiError } from '../types/api/category';

export const categoryApi = {
  getAllCategories: async(): Promise<Category[]> => {
    const response = await apiClient.get<Category[]>('/categories/');
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

export const useCategories = () => {
  return useQuery<Category[], ApiError>({
    queryKey: ['categories'],
    queryFn: categoryApi.getAllCategories,
  });
};