// src/api/types.ts

export interface User {
    id: number;
    username: string;
    email: string;
  }
  
  export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
  }
  
  export interface Order {
    id: number;
    user: number;
    order_date: string;
    status: string;
    total: number;
    items: OrderItem[];
  }
  
  export interface OrderItem {
    product: number;
    quantity: number;
    price: number;
  }
  
  export interface Payment {
    id: number;
    order: number;
    payment_method: string;
    payment_status: string;
    payment_date: string;
    amount: number;
  }
  
  export interface Review {
    id: number;
    user: number;
    product: number;
    rating: number;
    comment: string;
    review_date: string;
  }
  
  export interface AuthResponse {
    access: string;
    refresh: string;
  }