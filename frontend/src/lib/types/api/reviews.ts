// Types
export type Review = {
  id: number;
  user: number;  // User ID
  product?: number;  // Product ID (optional)
  rating: number;
  comment?: string;
  review_date: string;
};

export type ReviewCreate = Omit<Review, 'id' | 'review_date'>;
export type ReviewUpdate = Partial<ReviewCreate> & { id: number };

export type ApiError = {
  message: string;
  status?: number;
  details?: Record<string, unknown>;
};
