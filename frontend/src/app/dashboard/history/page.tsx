'use client';

import { useState } from 'react';
import { Product } from '@/lib/types/api/products';
import { useUserOrders } from '@/lib/hooks/useOrders';
import { useProducts } from '@/lib/api/products';
import { useCurrentUser } from '@/lib/api/auth';
import { format, parseISO } from 'date-fns';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiCheckCircle, FiXCircle, FiLoader } from 'react-icons/fi';


type OrderItem = {
  product: number;
  quantity: number;
  price: number;
};

type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';

type Order = {
  id: number;
  user: number;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  subtotal?: number;
  delivery_fee?: number;
  order_date?: string;
  created_at: string;
};

const statusIcons = {
  pending: <FiClock className="mr-1" />,
  processing: <FiLoader className="mr-1 animate-spin" />,
  completed: <FiCheckCircle className="mr-1" />,
  cancelled: <FiXCircle className="mr-1" />
};

const statusColors = {
  pending: 'bg-amber-900 text-amber-300',
  processing: 'bg-blue-900 text-blue-300',
  completed: 'bg-green-900 text-green-300',
  cancelled: 'bg-red-900 text-red-300'
};

const History = () => {
  const { data: user } = useCurrentUser();
  const { data: orders, isLoading: ordersLoading, error: ordersError } = useUserOrders(user?.id);
  const { data: products, isLoading: productsLoading, error: productsError } = useProducts();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return 'Date unavailable';
    
    try {
      const dateToFormat = dateString.includes('T') ? dateString : 
                         dateString.endsWith('Z') ? dateString : 
                         `${dateString}Z`;
      return format(parseISO(dateToFormat), 'MMMM d, yyyy - h:mm a');
    } catch (error) {
      console.warn(`Invalid date format: ${dateString}`, error);
      return 'Date unavailable';
    }
  };

  const productMap = products?.reduce((acc: Record<number, Product>, product: Product) => {
    acc[product.id] = product;
    return acc;
  }, {});

  const isLoading = ordersLoading || productsLoading;
  const error = ordersError || productsError;

  const recentOrders = orders?.sort((a: Order, b: Order) => 
    new Date(b.order_date || b.created_at).getTime() - 
    new Date(a.order_date || a.created_at).getTime()
  ).slice(0, 3);

  const openOrderModal = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  if (isLoading) {
    return (
      <motion.div 
        className="flex justify-center items-center h-64"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="h-12 w-12 rounded-full border-t-2 border-b-2 border-amber-500"
        />
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className="p-4 text-red-500 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="bg-red-900/20 p-4 rounded-xl border border-red-900/50">
          <p className="text-lg">{error.message || 'Failed to load your order history'}</p>
          <p className="text-sm mt-2">Please try refreshing the page</p>
        </div>
      </motion.div>
    );
  }

  return (
    <section className="w-full text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-black">
            Your Order History
          </h1>
        </motion.div>
        
        {!recentOrders || recentOrders.length === 0 ? (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="max-w-md mx-auto p-6 bg-[#2a2a2a] rounded-2xl">
              <div className="text-6xl mb-4 text-gray-500">🍽️</div>
              <h3 className="text-xl font-semibold mb-2">No Orders Yet</h3>
              <p className="text-gray-400 mb-6">Your delicious journey hasn&apos;t started yet</p>
              {/* <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors"
              >
                Browse Menu
              </motion.button> */}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {recentOrders.map((order: Order) => {
              const firstTwoItems = order.items.slice(0, 2);
              const remainingItemsCount = order.items.length - 2;
              
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => openOrderModal(order)}
                  className="bg-[#2a2a2a] p-5 shadow-lg cursor-pointer hover:bg-[#333333] transition-all rounded-2xl border border-[#3a3a3a]"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <p className="text-gray-400 text-sm">
                        {formatDate(order.order_date || order.created_at)}
                      </p>
                    </div>
                    <div className={`flex items-center px-3 py-1 rounded-full text-xs sm:text-sm ${statusColors[order.status]}`}>
                      {statusIcons[order.status]}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between gap-4 mt-4">
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-3">
                        {firstTwoItems.map((item, index) => (
                          <motion.div 
                            key={index}
                            whileHover={{ scale: 1.1, zIndex: 10 }}
                            className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-full border-2 border-white shadow-md"
                          >
                            {productMap?.[item.product]?.image && (
                              <Image
                                src={productMap[item.product].image || ''}
                                alt={productMap?.[item.product]?.name || `Product ${item.product}`}
                                fill
                                className="object-cover rounded-full"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.onerror = null;
                                  target.src = '/fallback-image.jpg';
                                }}
                              />
                            )}
                          </motion.div>
                        ))}
                        {remainingItemsCount > 0 && (
                          <motion.div 
                            whileHover={{ scale: 1.1 }}
                            className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-full border-2 border-[#2a2a2a] bg-gray-700 flex items-center justify-center text-xs shadow-md"
                          >
                            +{remainingItemsCount}
                          </motion.div>
                        )}
                      </div>

                      <ul className="flex flex-wrap items-center gap-2">
                        {firstTwoItems.map((item) => {
                          const product = productMap?.[item.product];
                          return (
                            <motion.li 
                              key={`${order.id}-${item.product}`}
                              whileHover={{ x: 5 }}
                              className="text-sm sm:text-base"
                            >
                              <span className="truncate max-w-[100px] sm:max-w-[150px] md:max-w-[200px]">
                                {product?.name || `Product #${item.product}`}
                              </span>
                            </motion.li>
                          );
                        })}
                        {remainingItemsCount > 0 && (
                          <li className="text-gray-400 text-sm">
                            +{remainingItemsCount} more items
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="flex gap-4 items-center text-sm sm:text-base self-end md:self-center">
                      <span className="font-medium">Total:</span>
                      <span className="text-lg sm:text-xl font-bold text-amber-400">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Order Details Modal */}
        <AnimatePresence>
          {isModalOpen && selectedOrder && (
            <motion.div 
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
              onClick={closeModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="bg-[#2a2a2a] rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-xl"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 20 }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-bold">Order #{selectedOrder.id}</h2>
                      <p className="text-gray-400 text-sm">
                        {formatDate(selectedOrder.order_date || selectedOrder.created_at)}
                      </p>
                    </div>
                    <motion.button 
                      onClick={closeModal}
                      className="text-gray-400 hover:text-white text-2xl"
                      whileHover={{ rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      &times;
                    </motion.button>
                  </div>

                  <div className={`flex items-center px-3 py-1 rounded-full text-sm w-fit mb-6 ${statusColors[selectedOrder.status]}`}>
                    {statusIcons[selectedOrder.status]}
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </div>

                  <motion.div 
                    className="flex flex-wrap gap-3 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ staggerChildren: 0.05 }}
                  >
                    {selectedOrder.items.map((item: OrderItem) => (
                      <motion.div 
                        key={item.product}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        whileHover={{ scale: 1.05 }}
                        className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-xl overflow-hidden border border-[#3a3a3a]"
                      >
                        {productMap?.[item.product]?.image && (
                          <Image
                            src={productMap[item.product].image || ''}
                            alt={productMap?.[item.product]?.name || `Product ${item.product}`}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = '/fallback-image.jpg';
                            }}
                          />
                        )}
                      </motion.div>
                    ))}
                  </motion.div>

                  <div className="border-t border-gray-700 pt-4 mb-4">
                    <h3 className="font-semibold mb-3 text-lg">Order Items</h3>
                    <ul className="space-y-4">
                      {selectedOrder.items.map((item: OrderItem) => {
                        const product = productMap?.[item.product];
                        return (
                          <motion.li 
                            key={item.product}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex justify-between items-start"
                          >
                            <div className="flex items-start gap-3">
                              <div className="relative h-14 w-14 rounded-xl overflow-hidden flex-shrink-0 border border-[#3a3a3a]">
                                {product?.image && (
                                  <Image
                                    src={product.image}
                                    alt={product?.name || `Product ${item.product}`}
                                    fill
                                    className="object-cover"
                                  />
                                )}
                              </div>
                              <div>
                                <p className="font-medium">
                                  {product?.name || `Product #${item.product}`}
                                </p>
                                <p className="text-gray-400 text-sm">Quantity: {item.quantity}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p>${item.price.toFixed(2)}</p>
                              <p className="text-amber-400 text-sm">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </motion.li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between mb-2">
                      <span>Subtotal:</span>
                      <span>${selectedOrder.subtotal?.toFixed(2) || selectedOrder.total.toFixed(2)}</span>
                    </div>
                    {selectedOrder.delivery_fee && selectedOrder.delivery_fee > 0 && (
                      <div className="flex justify-between mb-2">
                        <span>Delivery Fee:</span>
                        <span>${selectedOrder.delivery_fee.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-lg border-t border-gray-700 mt-3 pt-3">
                      <span>Total:</span>
                      <span className="text-amber-400">${selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default History;