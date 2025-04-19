'use client';

import { useUserOrders } from '@/lib/hooks/useOrders';
import { useProducts } from '@/lib/api/products';
import { useCurrentUser } from '@/lib/api/auth';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import Image from 'next/image';
import Bowl from '../../../../../../public/icons/svgs/etc/bowl.svg'

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

  const formatDate = (dateString: string) => {
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

  const productMap = products?.reduce((acc, product) => {
    acc[product.id] = product;
    return acc;
  }, {} as Record<number, { name: string }>);

  const isLoading = ordersLoading || productsLoading;
  const error = ordersError || productsError;

  // Get only the last 3 orders, sorted by date (newest first)
  const recentOrders = orders?.sort((a, b) => 
    new Date(b.order_date || b.created_at).getTime() - 
    new Date(a.order_date || a.created_at).getTime()
  ).slice(0, 3);

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
    <section className="w-full bg-[#191919] text-white p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        {!recentOrders || recentOrders.length === 0 ? (
          <h1 className="text-xl sm:text-2xl font-bold">No Recent Orders</h1>
        ) : (
          <h1 className="text-xl sm:text-2xl font-bold">Recent Orders</h1>
        )}
          <Link 
            href="/history" 
            className="text-amber-400 hover:text-amber-300 transition-colors text-sm sm:text-base"
          >
            View All
          </Link>
        </div>
        
        {!recentOrders || recentOrders.length === 0 ? (
          <div className="text-center py-10">
            <Image
              src={Bowl}
              alt='bowl' 
              className='w-32'
            />
            <h4>No Recent Transaction</h4>
            <p className="text-gray-400">You haven&apos;t made any transactions. This is where your most recent transaction will show.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="bg-[#2a2a2a] rounded-lg p-4 shadow-md">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
                  <div>
                    <h2 className="font-semibold text-base sm:text-lg">Food Ordered</h2>
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

                <div className="border-t border-gray-700 my-3 pt-3">
                  <ul className="space-y-2">
                    {order.items.map((item) => {
                      const product = productMap?.[item.product];
                      return (
                        <li key={`${order.id}-${item.product}`} className="flex justify-between items-center text-sm sm:text-base">
                          <div className="flex items-center">
                            <span className="truncate max-w-[120px] sm:max-w-[200px]">
                              {product?.name || `Product #${item.product}`}
                            </span>
                            <span className="text-amber-400 ml-2">×{item.quantity}</span>
                          </div>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="flex justify-between items-center border-t border-gray-700 pt-3 text-sm sm:text-base">
                  <span className="font-medium">Total:</span>
                  <span className="text-lg sm:text-xl font-bold">${order.total.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default History;