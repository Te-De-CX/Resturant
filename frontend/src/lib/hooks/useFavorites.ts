import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api/apiClient';
import { Product } from '../types/api/products';

export const useFavorites = (userId?: number) => {
  const queryClient = useQueryClient();

  // Get user favorites
  const useGetUserFavorites = () => {
    return useQuery<Product[], Error>({
      queryKey: ['favorites', userId],
      queryFn: async () => {
        const response = await apiClient.get(`/favorites/my_favorites/`);
        return response.data.map((fav: any) => fav.product);
      },
      enabled: !!userId,
    });
  };

  // Toggle favorite status
  const useToggleFavorite = () => {
    return useMutation({
      mutationFn: async (productId: number) => {
        const response = await apiClient.post(`/favorites/toggle_favorite/${productId}/`);
        return response.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['favorites', userId] });
        queryClient.invalidateQueries({ queryKey: ['products'] });
      },
    });
  };

  return {
    useGetUserFavorites,
    useToggleFavorite,
  };
};