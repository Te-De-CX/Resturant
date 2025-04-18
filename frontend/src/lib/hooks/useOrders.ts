// useOrders.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderApi } from '../api/orders';
import { Order, CreateOrderData, ApiError } from '../types/api/orders';

export const useOrders = () => {
  return useQuery<Order[], ApiError>({
    queryKey: ['orders'],
    queryFn: orderApi.getAllOrders,
  });
};

export const useOrder = (id: number) => {
  return useQuery<Order, ApiError>({
    queryKey: ['order', id],
    queryFn: () => orderApi.getOrderById(id),
    enabled: !!id,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation<Order, ApiError, CreateOrderData>({
    mutationFn: orderApi.createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Order, ApiError, { id: number; status: Order['status'] }>({
    mutationFn: ({ id, status }) => orderApi.updateOrderStatus(id, status),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order', variables.id] });
    },
  });
};

export const useUserOrders = (userId?: number) => {
  return useQuery<Order[], ApiError>({
    queryKey: ['orders', 'user', userId],
    queryFn: async () => {
      if (!userId) return [];
      const allOrders = await orderApi.getAllOrders();
      return allOrders.filter(order => 
        order.user === userId
      );
    },
    enabled: !!userId,
  });
};