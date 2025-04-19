import { StaticImageData } from "next/image";

export type TokenResponse = {
  access: string;
  refresh: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  is_staff?: boolean;
  is_superuser?: boolean;
};

export type RegisterData = {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
};

export type ApiError = {
  message: string;
  details?: Record<string, unknown>;
};

export type LoginCredentials = {
    username: string;
    password: string;
  };

export type CurrentUser = {
    id: number;
    address: string;
    image: StaticImageData;
    username: string;
    email: string;
    first_name?: string;
    last_name?: string;
    // Add other user fields as needed
  };
  