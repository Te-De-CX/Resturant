'use client';

import React from "react";
import Image from "next/image";
import { FiHeart } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { useFavorites } from "@/lib/hooks/useFavorites";
import AddToCartButton from "./AddToCart";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    image?: string;
  };
  isFavorite?: boolean;
}

const ProductCard = ({ product, isFavorite: initialIsFavorite = false }: ProductCardProps) => {
  const { data: session } = useSession();
  const { useToggleFavorite } = useFavorites(session?.user?.id);
  const { mutate: toggleFavorite } = useToggleFavorite();
  const [isFavorite, setIsFavorite] = React.useState(initialIsFavorite);

  const handleToggleFavorite = () => {
    if (!session) {
      // Redirect to login or show login modal
      return;
    }
    toggleFavorite(product.id, {
      onSuccess: () => {
        setIsFavorite(!isFavorite);
      },
    });
  };

  return (
    <div className="border rounded-lg p-4 shadow-md flex flex-col relative">
      {/* Favorite Button */}
      <button
        onClick={handleToggleFavorite}
        className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <FiHeart
          className={`text-lg ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
        />
      </button>

      {product.image && (
        <div className="relative h-48 w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-t-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = '/fallback-image.jpg';
            }}
          />
        </div>
      )}

      <h3 className="text-xl font-semibold mt-2">{product.name}</h3>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-lg font-bold mt-2">${product.price.toFixed(2)}</p>
      
      <AddToCartButton product={product} />
    </div>
  );
};

export default ProductCard;