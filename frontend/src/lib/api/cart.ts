// // lib/api/cart.ts
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { apiClient } from './apiClient';

// type CartItem = {
//   id: number;
//   product: {
//     id: number;
//     name: string;
//     price: number;
//     image: string | null;
//   };
//   quantity: number;
// };

// type Cart = {
//   id: number;
//   items: CartItem[];
//   total: number;
// };

// export const useCart = () => {
//   return useQuery<Cart>({
//     queryKey: ['cart'],
//     queryFn: async () => {
//       const response = await apiClient.get('/carts/');
//       return response.data;
//     },
//   });
// };

// export const useAddToCart = () => {
//   const queryClient = useQueryClient();
  
//   return useMutation({
//     mutationFn: async ({ productId, quantity }: { productId: number; quantity?: number }) => {
//       const response = await apiClient.post(`/carts/${cartId}/add_item/`, {
//         product: productId,
//         quantity: quantity || 1,
//       });
//       return response.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(['cart']);
//     },
//   });
// };

// export const useRemoveFromCart = () => {
//   const queryClient = useQueryClient();
  
//   return useMutation({
//     mutationFn: async (productId: number) => {
//       const response = await apiClient.post(`/carts/${cartId}/remove_item/`, {
//         product_id: productId,
//       });
//       return response.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(['cart']);
//     },
//   });
// };