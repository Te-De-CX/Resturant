import { Review, ReviewCreate, ReviewUpdate, ApiError } from '../types/api/reviews';
import { apiClient } from './apiClient';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';


// API Methods
export const reviewApi = {
  getReviews: async (): Promise<Review[]> => {
    const response = await apiClient.get<Review[]>('/reviews/');
    return response.data;
  },

  getProductReviews: async (productId: number): Promise<Review[]> => {
    const response = await apiClient.get<Review[]>(`/reviews/?product=${productId}`);
    return response.data;
  },

  getUserReviews: async (userId: number): Promise<Review[]> => {
    const response = await apiClient.get<Review[]>(`/reviews/?user=${userId}`);
    return response.data;
  },

  createReview: async (reviewData: ReviewCreate): Promise<Review> => {
    const response = await apiClient.post<Review>('/reviews/', reviewData);
    return response.data;
  },

  updateReview: async ({ id, ...reviewData }: ReviewUpdate): Promise<Review> => {
    const response = await apiClient.patch<Review>(`/reviews/${id}/`, reviewData);
    return response.data;
  },

  deleteReview: async (id: number): Promise<void> => {
    await apiClient.delete(`/reviews/${id}/`);
  }
};

// React Query Hooks
export const useReviews = () => {
  return useQuery<Review[], ApiError>({
    queryKey: ['reviews'],
    queryFn: reviewApi.getReviews,
  });
};

export const useProductReviews = (productId: number) => {
  return useQuery<Review[], ApiError>({
    queryKey: ['reviews', 'product', productId],
    queryFn: () => reviewApi.getProductReviews(productId),
    enabled: !!productId,
  });
};

export const useUserReviews = (userId: number) => {
  return useQuery<Review[], ApiError>({
    queryKey: ['reviews', 'user', userId],
    queryFn: () => reviewApi.getUserReviews(userId),
    enabled: !!userId,
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Review, ApiError, ReviewCreate>({
    mutationFn: reviewApi.createReview,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      if (data.product) {
        queryClient.invalidateQueries({ 
          queryKey: ['reviews', 'product', data.product] 
        });
      }
      queryClient.invalidateQueries({ 
        queryKey: ['reviews', 'user', data.user] 
      });
    },
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Review, ApiError, ReviewUpdate>({
    mutationFn: reviewApi.updateReview,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      if (variables.product) {
        queryClient.invalidateQueries({ 
          queryKey: ['reviews', 'product', variables.product] 
        });
      }
      queryClient.invalidateQueries({ 
        queryKey: ['reviews', 'user', variables.user] 
      });
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation<void, ApiError, { id: number; productId?: number; userId: number }>({
    mutationFn: ({ id }) => reviewApi.deleteReview(id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      if (variables.productId) {
        queryClient.invalidateQueries({ 
          queryKey: ['reviews', 'product', variables.productId] 
        });
      }
      queryClient.invalidateQueries({ 
        queryKey: ['reviews', 'user', variables.userId] 
      });
    },
  });
};