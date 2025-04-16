'use client';
import { useProducts } from "../../../lib/api/products";
import { useFavorites } from "@/lib/hooks/useFavorites";
import { useSession } from "next-auth/react";
import ProductCard from "../../../components/examples/ProductCard";

const ProductsPage = () => {
  const { data: session } = useSession();
  const { data: products = [], isLoading, error } = useProducts();
  const { data: favorites = [] } = useFavorites(session?.user?.id).useGetUserFavorites();

  if (isLoading) return <div>Loading products...</div>;
  if (error) return <div>Error loading products: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <h2 className="text-2xl font-bold col-span-full">Product List</h2>
      
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={favorites.some((fav) => fav.id === product.id)}
          />
        ))
      ) : (
        <p className="col-span-full text-center">No products found</p>
      )}
    </div>
  );
};

export default ProductsPage;