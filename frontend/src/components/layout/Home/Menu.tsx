'use client';
import { useProducts } from "@/lib/api/products";
import { Product } from "@/lib/types/api/products";
import { useState } from "react";
import MenuCard from "./components/Card/MenuCard";

const categories = ["all", "Desserts & Sweet Treats", "Wraps & Shawarma", "Fried Chicken", "Steak & Grill", "Mexican Street Food", "Pizza"] as const;
type CategoryType = typeof categories[number];

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");
  const [visibleProducts, setVisibleProducts] = useState(8); // Initial number of products to show
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
    setVisibleProducts(8); // Reset to 8 when changing categories
  };

  const loadMoreProducts = () => {
    setVisibleProducts(prev => prev + 8); // Load 8 more products
  };

  if (error) return <div className="text-center py-10 text-red-500">Sorry couldnt load products {error.message}</div>;

  return (
    <div className="gap-4 p-4 md:p-6 flex flex-col">
      {/* Category Tabs */}
      <div className="flex justify-center mb-8 md:mb-12">
        <div className="relative w-full max-w-7xl overflow-x-auto pb-2">
          {/* Custom scrollbar styling */}
          <style jsx>{`
            .categories-scroll::-webkit-scrollbar {
              height: 4px;
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
              background: #191919;
            }
          `}</style>
          
          <ul className="categories-scroll flex nowrap gap-1 sm:gap-2 px-2 sm:px-4 py-2 w-max min-w-full">
            {categories.map((category, index) => (
              <li key={index} className="flex-shrink-0">
                <button
                  onClick={() => handleCategoryClick(category)}
                  className={`
                    relative px-4 py-2 sm:px-6 sm:py-3 capitalize font-medium text-gray-700
                    transition-all duration-300 hover:text-black whitespace-nowrap
                    group rounded-lg
                    ${
                      selectedCategory === category
                      ? 'text-black font-semibold bg-yellow-50'
                      : ''
                    }
                  `}
                >
                  {category}
                  
                  {/* Active indicator */}
                  <span className={`
                    absolute inset-x-1 -bottom-1 h-1 rounded-full
                    bg-yellow-400 transition-all duration-300
                    ${selectedCategory === category ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}
                  `}></span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-2 sm:px-4 md:px-6 lg:px-8">
        {isLoading ? (
          // Loading state with skeleton cards
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
        ) : filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.slice(0, visibleProducts).map((product: Product) => (
                <MenuCard 
                  key={product.id}
                  name={product.name} 
                  description={product.text}
                  img={product.image}
                  newPrice={product.price}
                  formerPrice={product.old_price}
                />
              ))}
            </div>
            
            {/* Show "Load More" button if there are more products */}
            {filteredProducts.length > visibleProducts && (
              <div className="flex justify-center mt-8 md:mt-12">
                <button
                  onClick={loadMoreProducts}
                  className="px-8 py-3 bg-yellow-500 hover:bg-amber-700 text-black font-medium rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-lg text-gray-600">No products found in this category</p>
            <button
              onClick={() => setSelectedCategory("all")}
              className="mt-4 px-6 py-2 bg-yellow-400 text-black rounded-lg hover:bg-amber-200 transition-colors"
            >
              View All Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MenuPage;