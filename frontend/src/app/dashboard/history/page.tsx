'use client';

import { useState } from 'react';
import { useUserOrders } from '@/lib/hooks/useOrders';
import { useProducts } from '@/lib/api/products';
import { useCurrentUser } from '@/lib/api/auth';
import { format, parseISO } from 'date-fns';
import Image from 'next/image';

// Define types for our data structures
type Product = {
  id: number;
  name: string;
  image?: string;
  price?: number;
};

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

const History = () => {
  const { data: user } = useCurrentUser();
  const { 
    data: orders, 
    isLoading: ordersLoading, 
    error: ordersError 
  } = useUserOrders(user?.id);
  
  const { 
    data: products, 
    isLoading: productsLoading, 
    error: productsError 
  } = useProducts();

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

  // Get only the last 3 orders, sorted by date (newest first)
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
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 text-center">
        {error.message || 'Failed to load your order history'}
        <p className="text-sm">Sorry, an error occurred</p>
      </div>
    );
  }

  return (
    <section className="w-full bg-[#191919] text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Recent Orders</h1>
        </div>
        
        {!recentOrders || recentOrders.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-400 text-lg">You haven&apos;t placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentOrders.map((order: Order) => {
              const firstTwoItems = order.items.slice(0, 2);
              const remainingItemsCount = order.items.length - 2;
              
              return (
                <div 
                  key={order.id} 
                  onClick={() => openOrderModal(order)}
                  className="bg-[#2a2a2a] p-4 shadow-md cursor-pointer hover:bg-[#333333] transition-colors rounded-xl"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <p className="text-gray-400 text-xs sm:text-sm">
                        {formatDate(order.order_date || order.created_at)}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs sm:text-sm ${
                      order.status.toLowerCase() === 'completed' 
                        ? 'bg-green-900 text-green-300' 
                        : order.status.toLowerCase() === 'cancelled' 
                          ? 'bg-red-900 text-red-300' 
                          : 'bg-amber-900 text-amber-300'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between gap-4 mt-3">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-4">
                        {firstTwoItems.map((item, index) => (
                          <div key={index} className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-white">
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
                          </div>
                        ))}
                        {remainingItemsCount > 0 && (
                          <div className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-[#2a2a2a] bg-gray-700 flex items-center justify-center text-xs">
                            +{remainingItemsCount}
                          </div>
                        )}
                      </div>

                      <ul className="flex flex-wrap items-center gap-2">
                        {firstTwoItems.map((item) => {
                          const product = productMap?.[item.product];
                          return (
                            <li key={`${order.id}-${item.product}`} className="text-sm sm:text-base">
                              <span className="truncate max-w-[100px] sm:max-w-[150px] md:max-w-[200px]">
                                {product?.name || `Product #${item.product}`}
                              </span>
                            </li>
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
                      <span className="text-lg sm:text-xl font-bold">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Order Details Modal */}
        {isModalOpen && selectedOrder && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
            onClick={closeModal}
          >
            <div 
              className="bg-[#2a2a2a] rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold">Order #{selectedOrder.id}</h2>
                    <p className="text-gray-400 text-sm">
                      {formatDate(selectedOrder.order_date || selectedOrder.created_at)}
                    </p>
                  </div>
                  <button 
                    onClick={closeModal}
                    className="text-gray-400 hover:text-white text-2xl"
                    aria-label="Close modal"
                  >
                    &times;
                  </button>
                </div>

                <div className={`px-3 py-1 rounded-full text-sm w-fit mb-4 ${
                  selectedOrder.status.toLowerCase() === 'completed' 
                    ? 'bg-green-900 text-green-300' 
                    : selectedOrder.status.toLowerCase() === 'cancelled' 
                      ? 'bg-red-900 text-red-300' 
                      : 'bg-amber-900 text-amber-300'
                }`}>
                  {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedOrder.items.map((item: OrderItem) => (
                    <div key={item.product} className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-lg overflow-hidden">
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
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-700 pt-4 mb-4">
                  <h3 className="font-semibold mb-3">Order Items</h3>
                  <ul className="space-y-3">
                    {selectedOrder.items.map((item: OrderItem) => {
                      const product = productMap?.[item.product];
                      return (
                        <li key={item.product} className="flex justify-between items-start">
                          <div className="flex items-start gap-3">
                            <div className="relative h-12 w-12 rounded-lg overflow-hidden flex-shrink-0">
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
                        </li>
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
                    <span>${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default History;