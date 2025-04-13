// lib/utils/auth.ts
import { redirect } from 'next/navigation';
import { useCartStore } from '../store/cartStore';
import { useCurrentUser } from '../api/auth';

export const useProtectedRoute = () => {
  const { data: user, isLoading } = useCurrentUser();
  const { items } = useCartStore();

  if (isLoading) return { loading: true };

  if (!user) {
    redirect('/login'); // Redirect to login if not authenticated
  }

  if (!items || items.length === 0) {
    redirect('/cart'); // Redirect to cart if empty
  }

  return { user, items };
};