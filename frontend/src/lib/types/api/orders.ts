// types.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  description?: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image?: string;
  quantity: number;
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

export interface OrderItem {
  product: number; // Product ID
  quantity: number;
  price: number; // Price at time of order
}

export interface CreateOrderData {
  user: number; // User ID
  items: OrderItem[];
  total: number;
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