// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { orderItemsApi } from '../api/orderItems';
// import { OrderItems , CreateOrderData, ApiError } from '../types/api/orders';

// export const useOrders = () => {
//   return useQuery<OrderItems[], ApiError>({
//     queryKey: ['orders'],
//     queryFn: orderItemsApi.getAllOrders,
//   });
// };

// export const useOrder = (id: number) => {
//   return useQuery<OrderItems, ApiError>({
//     queryKey: ['order', id],
//     queryFn: () => orderItemsApi.getOrderById(id),
//     enabled: !!id,
//   });
// };

// export const useUserOrders = (userId?: number) => {
//     return useQuery<OrderItems[], ApiError>({
//       queryKey: ['orders', 'user', userId],
//       queryFn: async () => {
//         const allOrders = await orderItemsApi.getAllOrders();
//         // Filter client-side by user ID
//         return userId 
//           ? allOrders.filter(order => order.user.id === userId) 
//           : [];
//       },
//       enabled: !!userId, // Only fetch if userId exists
//     });
//   };

// export const useCreateOrder = () => {
//   const queryClient = useQueryClient();
  
//   return useMutation<OrderItems, ApiError, CreateOrderItemsData>({
//     mutationFn: orderItemsApi.createOrderItems,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['orders'] });
//       queryClient.invalidateQueries({ queryKey: ['userOrders'] });
//     },
//   });
// };

// export const useUpdateOrderStatus = () => {
//   const queryClient = useQueryClient();
  
//   return useMutation<OrderItems, ApiError, { id: number; status: OrderItems['status'] }>({
//     mutationFn: ({ id, status }) => orderItemsApi.updateOrderStatus(id, status),
//     onSuccess: (data, variables) => {
//       queryClient.invalidateQueries({ queryKey: ['orders'] });
//       queryClient.invalidateQueries({ queryKey: ['order', variables.id] });
//       queryClient.invalidateQueries({ queryKey: ['userOrders'] });
//     },
//   });
// };

// export const useDeleteOrder = () => {
//   const queryClient = useQueryClient();
  
//   return useMutation<void, ApiError, number>({
//     mutationFn: orderItemsApi.deleteOrder,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['orders'] });
//       queryClient.invalidateQueries({ queryKey: ['userOrders'] });
//     },
//   });
// };