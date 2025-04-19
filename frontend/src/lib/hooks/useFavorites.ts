import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api/apiClient';
import { Product } from '../types/api/products';

// Define a type for the favorite item that comes from the API
interface FavoriteItem {
  product: Product;
  // Add any other fields that might be present in the favorite object
}

export const useFavorites = (userId?: number) => {
  const queryClient = useQueryClient();

  // Get user favorites
  const useGetUserFavorites = () => {
    return useQuery<Product[], Error>({
      queryKey: ['favorites', userId],
      queryFn: async () => {
        const response = await apiClient.get<FavoriteItem[]>(`/favorites/`);
        return response.data.map((fav: FavoriteItem) => fav.product);
      },
      enabled: !!userId,
    });
  };

  // Toggle favorite status
  const useToggleFavorite = () => {
    return useMutation({
      mutationFn: async (productId: number) => {        
        const response = await apiClient.post(`/favorites/toggle/${productId}/`);
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