'use client';
import { useFavorites } from "@/lib/hooks/useFavorites";
import { useCurrentUser } from "@/lib/api/auth";
import ProductCard from "../../../components/examples/ProductCard";
import { IoCart } from "react-icons/io5";
import { useState } from "react";
import HomeCart from "@/components/layout/Cart/HomeCart";
import { useCartStore } from "@/lib/store/cartStore";


const FavoritesPage = () => {
  const { data: user } = useCurrentUser();
  const { data: favorites = [], isLoading, error } = useFavorites(user?.id).useGetUserFavorites();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items } = useCartStore();

  if (!user) {
    return <div className="p-4">Please sign in to view your favorites</div>;
  }

  if (isLoading) return 
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="border border-gray-200 rounded-lg p-4 animate-pulse">
        <div className="bg-gray-200 h-48 w-full rounded-md"></div>
        <div className="mt-4 space-y-3">
          <div className="bg-gray-200 h-5 w-3/4 rounded"></div>
          <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
          <div className="bg-gray-200 h-6 w-1/3 rounded mt-2"></div>
        </div>
      </div>
    ))}
  </div>
;;
  if (error) return <div>Error loading favorites: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <div className="flex justify-between text-2xl font-bold col-span-full">
      <h2 className="text-2xl font-bold col-span-full">Your Favorites</h2>
      <div className="relative">
        <IoCart 
          className="w-10 cursor-pointer hover:text-amber-500 transition-colors" 
          onClick={() => setIsCartOpen(true)}
        />
        {items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {items.reduce((total, item) => total + item.quantity, 0)}
          </span>
        )}
      </div>
      </div>
      
      {favorites.length > 0 ? (
        favorites.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={true}
          />
        ))
      ) : (
        <p className="col-span-full text-center">You haven&apos;t added any favorites yet</p>
      )}
      {isCartOpen && (
              <div 
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClick={() => setIsCartOpen(false)}
              >
                {/* Blur Background */}
                <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
                
                {/* Cart Content */}
                <div 
                  className="relative  p-5 bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <HomeCart />
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    aria-label="Close cart"
                  >
                    &times;
                  </button>
                </div>
              </div>
            )}
    </div>
  );
};

export default FavoritesPage;