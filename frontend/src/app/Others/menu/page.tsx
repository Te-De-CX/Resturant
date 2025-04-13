'use client';
import { useCartStore } from '@/lib/store/cartStore';

export default function CartView() {
  const { items, total, removeFromCart, updateQuantity, clearCart } = useCartStore();

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {items.length > 0 ? (
        <>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={`cart-item-${item.id}`} className="flex justify-between border-b py-2">
                <div>
                  <h3>{item.name}</h3>
                  <p>${item.price} × {item.quantity}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4 font-bold text-lg">
            Total: ${total ? total.toFixed(2) : "0.00"}
          </div>
          <button
            onClick={clearCart}
            className="mt-4 w-full bg-red-500 text-white py-2 rounded"
          >
            Clear Cart
          </button>
        </>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
}