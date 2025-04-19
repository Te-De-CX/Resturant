import { useCreateOrder } from './useOrders';
import { CreateOrderData } from '../types/api/orders';

export const useCart = () => {
  const createOrderMutation = useCreateOrder();

  const createOrderFromCart = async (
    userId: number, 
    cartItems: Array<{
      productId: number;
      quantity: number;
      price: number;
    }>
  ) => {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const orderData: CreateOrderData = {
      user: userId,
      items: cartItems.map(item => ({
        product: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
      total,
    };

    return createOrderMutation.mutateAsync(orderData);
  };

  return {
    createOrderFromCart,
    isLoading: createOrderMutation.isPending, // Changed from isLoading to isPending
    isError: createOrderMutation.isError,
    error: createOrderMutation.error,
  };
};