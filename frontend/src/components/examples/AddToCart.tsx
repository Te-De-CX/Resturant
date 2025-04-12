'use client';
import { useCartStore } from '@/lib/store/cartStore';
import { FiShoppingCart } from 'react-icons/fi';

export default function AddToCartButton({
  product,
}: {
  product: { id: number; name: string; price: number; image?: string };
}) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <button
      onClick={() => addToCart(product)}
      className="mt-2 flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"
    >
      <FiShoppingCart /> Add to Cart
    </button>
  );
}