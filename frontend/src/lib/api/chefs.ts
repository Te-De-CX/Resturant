import { Chef, ApiError } from "../types/api/chefs"
import { apiClient } from './apiClient';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';


// API Methods
export const chefApi = {
  getChefs: async (): Promise<Chef[]> => {
    const response = await apiClient.get<Chef[]>('/chefsdata/');
    return response.data;
  },

  getChef: async (id: number): Promise<Chef> => {
    const response = await apiClient.get<Chef>(`/chefsdata/${id}/`);
    return response.data;
  },

  createChef: async (chefData: Omit<Chef, 'id'>): Promise<Chef> => {
    const response = await apiClient.post<Chef>('/chefsdata/', chefData);
    return response.data;
  },

  updateChef: async ({ id, ...chefData }: Partial<Chef> & { id: number }): Promise<Chef> => {
    const response = await apiClient.patch<Chef>(`/chefsdata/${id}/`, chefData);
    return response.data;
  },

  deleteChef: async (id: number): Promise<void> => {
    await apiClient.delete(`/chefsdata/${id}/`);
  }
};

// React Query Hooks
export const useChefs = () => {
  return useQuery<Chef[], ApiError>({
    queryKey: ['chefs'],
    queryFn: chefApi.getChefs,
  });
};

export const useChef = (id: number) => {
  return useQuery<Chef, ApiError>({
    queryKey: ['chef', id],
    queryFn: () => chefApi.getChef(id),
    enabled: !!id,
  });
};

export const useCreateChef = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Chef, ApiError, Omit<Chef, 'id'>>({
    mutationFn: chefApi.createChef,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chefs'] });
    },
  });
};

export const useUpdateChef = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Chef, ApiError, Partial<Chef> & { id: number }>({
    mutationFn: chefApi.updateChef,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['chefs'] });
      queryClient.invalidateQueries({ queryKey: ['chef', variables.id] });
    },
  });
};

export const useDeleteChef = () => {
  const queryClient = useQueryClient();
  
  return useMutation<void, ApiError, number>({
    mutationFn: chefApi.deleteChef,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chefs'] });
    },
  });
};