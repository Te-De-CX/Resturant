import { apiClient } from './apiClient';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Define all product-related types
type Product = {
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

type ProductCreate = Omit<Product, 'id'>;
type ProductUpdate = Partial<ProductCreate> & { id: number };

type ApiError = {
  message: string;
  details?: Record<string, unknown>;
};

export const productApi = {
  getProducts: async (): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>('/products/');
    return response.data;
  },
  
  getProduct: async (id: number): Promise<Product> => {
    const response = await apiClient.get<Product>(`/products/${id}/`);
    return response.data;
  },
  
  createProduct: async (product: ProductCreate): Promise<Product> => {
    const response = await apiClient.post<Product>('/products/', product);
    return response.data;
  },
  
  updateProduct: async ({ id, ...product }: ProductUpdate): Promise<Product> => {
    const response = await apiClient.patch<Product>(`/products/${id}/`, product);
    return response.data;
  },
  
  deleteProduct: async (id: number): Promise<void> => {
    await apiClient.delete(`/products/${id}/`);
  },
};

// React Query hooks with proper typing
export const useProducts = () => {
  return useQuery<Product[], ApiError>({
    queryKey: ['products'],
    queryFn: productApi.getProducts,
  });
};

export const useProduct = (id: number) => {
  return useQuery<Product, ApiError>({
    queryKey: ['product', id],
    queryFn: () => productApi.getProduct(id),
    enabled: !!id, // Only fetch if ID exists
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Product, ApiError, ProductCreate>({
    mutationFn: productApi.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Product, ApiError, ProductUpdate>({
    mutationFn: productApi.updateProduct,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', variables.id] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation<void, ApiError, number>({
    mutationFn: productApi.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};