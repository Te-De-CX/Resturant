// Define all Category-related types
export type Category = {
    id: number;
    name: string;
    description: string;
    image: string;
  };
  
  export type CategoryCreate = Omit<Category, 'id'>;
  export type CategoryUpdate = Partial<CategoryCreate> & { id: number };
  
  export type ApiError = {
    message: string;
    details?: Record<string, unknown>;
  };