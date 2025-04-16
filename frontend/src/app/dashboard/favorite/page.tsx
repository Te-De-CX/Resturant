'use client';
import { useFavorites } from "@/lib/hooks/useFavorites";
import { useSession } from "next-auth/react";
import ProductCard from "@/components/products/ProductCard";

const FavoritesPage = () => {
  const { data: session } = useSession();
  const { data: favorites = [], isLoading, error } = useFavorites(session?.user?.id).useGetUserFavorites();

  if (!session) {
    return <div className="p-4">Please sign in to view your favorites</div>;
  }

  if (isLoading) return <div>Loading favorites...</div>;
  if (error) return <div>Error loading favorites: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <h2 className="text-2xl font-bold col-span-full">Your Favorites</h2>
      
      {favorites.length > 0 ? (
        favorites.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={true}
          />
        ))
      ) : (
        <p className="col-span-full text-center">You haven't added any favorites yet</p>
      )}
    </div>
  );
};

export default FavoritesPage;