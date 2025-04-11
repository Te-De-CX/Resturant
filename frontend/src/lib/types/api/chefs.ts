// Types
export type Chef = {
  id: number;
  name: string;
  profile_picture?: string;
  description?: string;
  text?: string;
  rating?: number;
};

export type ApiError = {
  message: string;
  status?: number;
  details?: Record<string, unknown>;
};
