'use client';
import { useProducts } from "../../../lib/api/products";
import { useFavorites } from "@/lib/hooks/useFavorites";
import { useCurrentUser } from "@/lib/api/auth";
import ProductCard from "../../../components/examples/ProductCard";
import HomeCart from "@/components/layout/Cart/HomeCart";
import { useCartStore } from "@/lib/store/cartStore";
import { Product } from "@/lib/types/api/products";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiShoppingCart } from "react-icons/fi";

const categories = ["all", "Desserts & Sweet Treats", "Wraps & Shawarma", "Fried Chicken", "Steak & Grill", "Mexican Street Food", "Pizza"] as const;
type CategoryType = typeof categories[number];

const ProductsPage = () => {
  const { data: user } = useCurrentUser();
  const { data: products = [], isLoading, error } = useProducts();
  const { data: favorites = [] } = useFavorites(user?.id).useGetUserFavorites();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items } = useCartStore();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");
  const [visibleProducts, setVisibleProducts] = useState(8);

  // Safe filtering function with proper typing
  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter((product: Product) => {
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
    setVisibleProducts(prev => prev + 8);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 p-4 md:p-6">
        {[...Array(8)].map((_, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="bg-gray-200 h-48 w-full rounded-md animate-pulse"></div>
            <div className="mt-4 space-y-3">
              <div className="bg-gray-200 h-5 w-3/4 rounded animate-pulse"></div>
              <div className="bg-gray-200 h-4 w-1/2 rounded animate-pulse"></div>
              <div className="bg-gray-200 h-6 w-1/3 rounded mt-2 animate-pulse"></div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className="text-center py-10 text-red-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="bg-red-50 p-4 rounded-lg border border-red-100 max-w-md mx-auto">
          <p className="font-medium">Couldn&apos;t load products</p>
          <p className="text-sm mt-1">{error.message}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="gap-4 p-4 md:p-6 flex flex-col mb-40">
      {/* Category Tabs */}
      <motion.div 
        className="flex justify-center mb-8 md:mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative w-full max-w-7xl overflow-x-auto pb-2">
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
              <motion.li 
                key={index} 
                className="flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
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
                  
                  <span className={`
                    absolute inset-x-1 -bottom-1 h-1 rounded-full
                    bg-yellow-400 transition-all duration-300
                    ${selectedCategory === category ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}
                  `}></span>
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Content Area */}
      <div className="px-2 sm:px-4 md:px-6 lg:px-8">
        {filteredProducts.length > 0 ? (
          <>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {filteredProducts.slice(0, visibleProducts).map((product: Product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <ProductCard
                    product={product}
                    isFavorite={favorites.some((fav) => fav.id === product.id)}
                  />
                </motion.div>
              ))}
            </motion.div>

            {visibleProducts < filteredProducts.length && (
              <motion.div 
                className="flex justify-center mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  onClick={loadMoreProducts}
                  className="px-6 py-2 bg-yellow-400 text-white rounded-full hover:bg-yellow-500 transition-colors"
                  // whileHover={{ scale: 1.05 }}
                  // whileTap={{ scale: 0.95 }}
                >
                  Load More
                </button>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div 
            className="col-span-full text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="max-w-md mx-auto p-6 bg-gray-50 rounded-xl">
              <div className="text-6xl mb-4">🍕</div>
              <h3 className="text-xl font-semibold mb-2">No Products Found</h3>
              <p className="text-gray-500 mb-6">We couldn&apos;t find any products in this category</p>
              <button
                onClick={() => setSelectedCategory("all")}
                className="px-6 py-2 bg-yellow-400 text-white rounded-full hover:bg-yellow-500 transition-colors"
              >
                View All Products
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Cart Button (Floating) */}
      {items.length > 0 && (
        <motion.button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-20 right-5 bg-yellow-400 text-white p-4 rounded-full shadow-lg z-40"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FiShoppingCart className="text-xl" />
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
              {items.length}
            </span>
          )}
        </motion.button>
      )}

      {/* Cart Modal */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Blur Background */}
            <motion.div 
              className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
              onClick={() => setIsCartOpen(false)}
            />
            
            {/* Cart Content */}
            <motion.div 
              className="relative bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto z-10"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Your Cart</h2>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="text-gray-500 hover:text-gray-700 p-1"
                    aria-label="Close cart"
                  >
                    <FiX className="text-xl" />
                  </button>
                </div>
                <HomeCart />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductsPage;