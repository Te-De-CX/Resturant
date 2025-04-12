import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartItem = {
  id: number;
  name: string;
  price: number;
  image?: string;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
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
          // Increase quantity if item exists
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          });
        } else {
          // Add new item
          set({ items: [...items, { ...product, quantity: 1 }] });
        }
        // Update total
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
      name: 'cart-storage', // Key for localStorage
    },
  ),
);

// Helper to calculate cart total
const calculateTotal = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);