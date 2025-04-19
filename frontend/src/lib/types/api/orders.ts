import { StaticImageData } from "next/dist/shared/lib/get-img-props";

// types.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  image?: StaticImageData;
  description?: string;
  old_price: number
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: StaticImageData | string;
  quantity: number;
}

export interface Order {
  id: number;
  user: number;
  created_at: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  items: OrderItem[];
  total: number;
  payment_method?: string;
  shipping_address?: string;
  order_date: string;
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