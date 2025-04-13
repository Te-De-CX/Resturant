'use client';
// import Image from "next/image";
import { useProducts } from "@/lib/api/products";
import AddToCartButton from "@/components/examples/AddToCart";
// import { FiShoppingCart } from "react-icons/fi";

const Template = () => {
  const { data = [], isLoading, error } = useProducts();

  if (isLoading) return <div>Loading products...</div>;
  if (error) return <div>Error loading products: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <h2 className="text-2xl font-bold col-span-full">Product List</h2>
      {data.length > 0 ? (
        data.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-md flex flex-col">
            {product.image && (
              <div className="relative h-48 w-full">
                {/* <Image
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
                /> */}
              </div>
            )}
            <h3 className="text-xl font-semibold mt-2">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-bold mt-2">${product.price.toFixed(2)}</p>
            
            {/* Add to Cart Button with Icon */}
            <AddToCartButton product={{
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image
              }} />
            
            {/* Alternative: Custom Button with Icon */}
            {/* <button
              onClick={() => addToCart({ productId: product.id })}
              className="mt-2 flex items-center justify-center gap-2 px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"
            >
              <FiShoppingCart /> Add to Cart
            </button> */}
          </div>
        ))
      ) : (
        <p className="col-span-full text-center">No products found</p>
      )}
    </div>
  );
};

export default Template;