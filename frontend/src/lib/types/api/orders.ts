export interface OrderItem {
    id: number;
    product: {
      id: number;
      name: string;
      price: number;
    };
    quantity: number;
    price: number;
  }
  
  export interface Order {
    id: number;
    user: {
      id: number;
      name: string;
      email: string;
    };
    created_at: string;
    status: 'pending' | 'processing' | 'completed' | 'cancelled';
    items: OrderItem[];
    total: number;
    payment_method?: string;
    shipping_address?: string;
  }
  
  export interface CreateOrderData {
    items: Array<{
      product: number;
      quantity: number;
    }>;
    total: number;
    payment_method?: string;
    shipping_address?: string;
  }
  
  export interface ApiError {
    message: string;
    status?: number;
    details?: string;
  }

  export interface OrderItems {
    id: number;
    order: Order;
    product: number;
    quantity: number;
    price: number;
    created_at: string;
  }

  export interface CreateOrderItemsData {
    order: number;
    product: number;
    quantity: number;
    price: number;
  }