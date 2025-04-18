'use client';
import { useProducts } from "@/lib/api/products";
import { Product } from "@/lib/types/api/products";
import { useState } from "react";
import MenuCard from "./components/Card/MenuCard";



const categories = ["all", "bread", "chiffon & rolls", "Fried Chicken", "pastry and danish", "cakes", "cookies"] as const;
type CategoryType = typeof categories[number];

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");
  const { data: allProducts = [], isLoading, error } = useProducts();

  // Safe filtering function with proper typing
  const filteredProducts = selectedCategory === "all" 
    ? allProducts 
    : allProducts.filter((product: Product) => {
        // Check if category exists and has a name property
        if (!product.category?.name || typeof product.category.name !== 'string') {
          return false;
        }
        return product.category.name.toLowerCase() === selectedCategory.toLowerCase();
      });

  const handleCategoryClick = (category: CategoryType) => {
    setSelectedCategory(category);
  };

  if (error) return <div>Error loading products: {error.message}</div>;

  return (
    <div className="gap-4 p-4 flex flex-col">

      <div className="flex justify-center mb-12">
        <div className="relative w-full max-w-6xl overflow-x-auto pb-3">
            {/* Custom scrollbar styling */}
            <style jsx>{`
            .categories-scroll::-webkit-scrollbar {
                height: 6px;
            }
            .categories-scroll::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 10px;
            }
            .categories-scroll::-webkit-scrollbar-thumb {
                background: #888;
                border-radius: 10px;
            }
            .categories-scroll::-webkit-scrollbar-thumb:hover {
                background: #555;
            }
            `}</style>
            
            <ul className="categories-scroll flex nowrap gap-2 px-4 py-3 w-max min-w-full">
            {categories.map((category, index) => (
                <li key={index} className="flex-shrink-0">
                <button
                    onClick={() => handleCategoryClick(category)}
                    className={`
                    relative px-6 py-3 capitalize font-medium text-gray-700
                    transition-all duration-300 hover:text-black
                    group
                    ${
                        selectedCategory === category
                        ? 'text-black font-semibold'
                        : ''
                    }
                    `}
                >
                    {category}
                    
                    {/* Active indicator - thick rounded background shadow */}
                    <span className={`
                    absolute inset-x-1 bottom-0 h-2 rounded-t-full
                    bg-gray-900 transition-all duration-300
                    ${selectedCategory === category ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}
                    `}></span>
                    
                    {/* Floating effect for active item */}
                    {selectedCategory === category && (
                    <span className="absolute inset-0 rounded-lg bg-white shadow-lg z-[-1]"></span>
                    )}
                </button>
                </li>
            ))}
            </ul>
        </div>
    </div>

      {isLoading ? (
        // Loading state with empty cards
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border rounded-lg p-4 animate-pulse">
              <div className="bg-gray-200 h-48 w-full rounded-md"></div>
              <div className="mt-4 space-y-2">
                <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
                <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product: Product) => (
            <div key={product.id}>
              <MenuCard 
                  name ={product.name} 
                  description={product.text}
                  img={product.image}
                  newPrice={product.price}
                  formerPrice={product.old_price}

              />
            </div>
          ))}
        </div>
      ) : (
        <p className="col-span-full text-center">No products found in this category</p>
      )}
    </div>
  );
}

export default MenuPage;