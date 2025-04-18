import { StaticImageData } from "next/image";
import { Category } from "./category";

export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image?: StaticImageData;
  category: Category;
  quantity?: number;
  is_available?: boolean;
  is_favorite?: boolean;
  chefs?: number;
  rating?: number;
  ingredients?: string;
  allergens?: string;
  text?: string;
  old_price: number
};

export type ProductCreate = Omit<Product, 'id'>;
export type ProductUpdate = Partial<ProductCreate> & { id: number };

export type ApiError = {
  message: string;
  details?: Record<string, unknown>;
};