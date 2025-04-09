// src/api/constants.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL; // Replace with your Django backend URL

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/token/`,
    REFRESH: `${API_BASE_URL}/token/refresh/`,
  },
  USERS: `${API_BASE_URL}/users/`,
  PRODUCTS: `${API_BASE_URL}/products/`,
  ORDERS: `${API_BASE_URL}/orders/`,
  CATEGORIES: `${API_BASE_URL}/categories/`,
  PAYMENTS: `${API_BASE_URL}/payments/`,
  REVIEWS: `${API_BASE_URL}/reviews/`,
};