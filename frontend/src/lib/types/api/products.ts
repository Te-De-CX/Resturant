// Define all product-related types
export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: number;
  quantity?: number;
  is_available?: boolean;
  is_favorite?: boolean;
  chefs?: number;
  rating?: number;
  ingredients?: string;
  allergens?: string;
  text?: string;
};

export type ProductCreate = Omit<Product, 'id'>;
export type ProductUpdate = Partial<ProductCreate> & { id: number };

export type ApiError = {
  message: string;
  details?: Record<string, unknown>;
};