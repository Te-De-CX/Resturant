'use client';

import { Product } from "@/lib/types/api/products";
import React from "react";
import Image from "next/image";
import { FiHeart } from "react-icons/fi";
import { useCurrentUser } from "@/lib/api/auth";
import { useFavorites } from "@/lib/hooks/useFavorites";
import { IoExpand } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { useCartStore } from '@/lib/store/cartStore';

interface ProductCardProps {
  product: Product ;
  isFavorite?: boolean;
}

const ProductCard = ({ product, isFavorite: initialIsFavorite = false }: ProductCardProps) => {
  const { data: user } = useCurrentUser();
  const { useToggleFavorite } = useFavorites(user?.id);
  const { mutate: toggleFavorite } = useToggleFavorite();
  const [isFavorite, setIsFavorite] = React.useState(initialIsFavorite);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  
  const addToCart = useCartStore((state) => state.addToCart);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      return;
    }
    toggleFavorite(product.id, {
      onSuccess: () => {
        setIsFavorite(!isFavorite);
      },
    });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Product Card */}
      <div 
        className="border rounded-xl p-4 shadow-md flex flex-col relative cursor-pointer hover:shadow-lg transition-shadow bg-[#191919] text-white"
      >
        {/* Favorite Button on Card */}
       

        {product.image && (
          <div className="relative h-48 w-full rounded-xl group overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = '/fallback-image.jpg';
              }}
            />
            
            {/* Expand button positioned at bottom left */}
            <div className="absolute bottom-2 left-2 z-20 transition-opacity duration-300">
              <button
                // onClick={handleToggleFavorite}
                className="p-2 bg-black bg-opacity-30  text-white font-bold rounded-full shadow-md transition-all duration-200 hover:scale-110"
                aria-label="Expand image"
              >
                <IoExpand className="text-xl" 
                    onClick={openModal} />
              </button>
            </div>
            
            {/* Optional overlay for better button visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10 pointer-events-none" />
          </div>
        )}

        <h3 className="text-xl font-semibold mt-2 text-yellow-400">{product.name}</h3>
        <p className="text-[0.7rem] text-white line-clamp-2">{product.text}</p>
        <div className="flex items-center justify-between" >
          <div>
            <p className="text-md font-bold mt-2">${product.price.toFixed(2)}</p>
            <p className="text-xs text-red-500 line-through" >${product.old_price}</p>
          </div>
          <IoMdAdd
              onClick={() => addToCart(product)}
              className="text-2xl p-[0.1rem] border-2 border-white rounded-full text-white"
            />
        </div>
      </div>

      {/* Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div 
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 relative">
              {/* Close Button */}
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>

              {/* Favorite Button in Modal */}
              <button
                onClick={handleToggleFavorite}
                className="absolute top-4 left-4 p-2 rounded-full bg-white/80 backdrop-blur-sm"
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <FiHeart
                  className={`text-2xl ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                />
              </button>

              {/* Product Content */}
              <div className="mt-8">
                {product.image && (
                  <div className="relative h-64 w-full mb-6 ">
                    <Image 
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = '/fallback-image.jpg';
                      }}
                    />
                  </div>
                )}

                <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                <p className="text-gray-700 mb-4">{product.text}</p>
                <p className="text-xl font-bold mb-6">${product.price.toFixed(2)}</p>
                
                <IoMdAdd
                  onClick={() => addToCart(product)}
                  />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;