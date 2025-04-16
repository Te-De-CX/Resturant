// cartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {CartItem} from '../types/api/orders'

type CartStore = {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  subFromCart: (productId: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      addToCart: (product) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          });
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] });
        }
        set({ total: calculateTotal(get().items) });
      },
      subFromCart: (productId) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === productId);
        
        if (!existingItem) return;

        if (existingItem.quantity > 1) {
          set({
            items: items.map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item,
            ),
          });
        } else {
          set({
            items: items.filter((item) => item.id !== productId),
          });
        }
        set({ total: calculateTotal(get().items) });
      },
      removeFromCart: (id) => {
        const { items } = get();
        set({
          items: items.filter((item) => item.id !== id),
        });
        set({ total: calculateTotal(get().items) });
      },
      updateQuantity: (id, quantity) => {
        if (quantity < 1) return;
        
        const { items } = get();
        set({
          items: items.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          ),
        });
        set({ total: calculateTotal(get().items) });
      },
      clearCart: () => set({ items: [], total: 0 }),
    }),
    {
      name: 'cart-storage',
    },
  ),
);

const calculateTotal = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);