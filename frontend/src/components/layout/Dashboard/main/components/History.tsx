'use client';

import { useUserOrders } from '@/lib/hooks/useOrders';
import { useProducts } from '@/lib/api/products';
import { useCurrentUser } from '@/lib/api/auth';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import Image from 'next/image';
import Bowl from '../../../../../../public/icons/svgs/etc/bowl.svg';
import { motion } from 'framer-motion';
import { FiClock, FiCheckCircle, FiXCircle, FiLoader } from 'react-icons/fi';

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
        className="p-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="bg-red-900/20 p-4 rounded-xl border border-red-900/50">
          <p className="text-lg text-red-400">{error.message || 'Failed to load your order history'}</p>
          <p className="text-sm mt-2 text-gray-400">Please try refreshing the page</p>
        </div>
      </motion.div>
    );
  }

  return (
    <section className="w-full bg-[#191919] text-white rounded-2xl p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="flex  items-center text-white sm:flex-row justify-between sm:items-center mb-6 gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {!recentOrders || recentOrders.length === 0 ? (
            <h1 className="text-xl text-white sm:text-2xl font-bold ">
              Your Order History
            </h1>
          ) : (
            <h1 className="text-xl text-white sm:text-2xl font-bold ">
              Recent Orders
            </h1>
          )}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/dashboard/history" 
              className=" px-2 py-1 bg-white text-black rounded-2xl transition-colors text-sm sm:text-base flex items-center"
            >
              View All
            </Link>
          </motion.div>
        </motion.div>
        
        {!recentOrders || recentOrders.length === 0 ? (
          <motion.div 
            className="text-center py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
              }}
              className="flex justify-center mb-4"
            >
              <Image
                src={Bowl}
                alt='Empty bowl'
                className='w-20 md:w-32'
              />
            </motion.div>
            <h4 className="text-xl font-semibold mb-2">No Recent Transactions</h4>
            <p className="text-gray-400 max-w-md text-sm mx-auto mb-6">
              You haven&apos;t made any transactions yet. Your delicious journey starts here!
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* <Link
                href="/menu"
                className="inline-block px-6 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors"
              >
                Browse Menu
              </Link> */}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {recentOrders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01 }}
                className="bg-[#2a2a2a] rounded-xl p-5 shadow-lg border border-[#3a3a3a]"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                  <div>
                    {/* <h2 className="font-semibold text-lg">Order #{order.id}</h2> */}
                    <p className="text-gray-400 text-sm">
                      {formatDate(order.order_date || order.created_at)}
                    </p>
                  </div>
                  <div className={`flex items-center px-3 py-1 rounded-full text-xs sm:text-sm ${statusColors[order.status]}`}>
                    {statusIcons[order.status]}
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </div>
                </div>

                <div className="border-t border-gray-700 my-3 pt-3">
                  <ul className="space-y-3">
                    {order.items.map((item) => {
                      const product = productMap?.[item.product];
                      return (
                        <motion.li 
                          key={`${order.id}-${item.product}`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex justify-between items-center text-sm sm:text-base"
                        >
                          <div className="flex items-center">
                            <span className="truncate max-w-[120px] sm:max-w-[200px]">
                              {product?.name || `Product #${item.product}`}
                            </span>
                            <span className="text-amber-400 ml-2">×{item.quantity}</span>
                          </div>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </motion.li>
                      );
                    })}
                  </ul>
                </div>

                <div className="flex justify-between items-center border-t border-gray-700 pt-3 text-sm sm:text-base">
                  <span className="font-medium">Total:</span>
                  <span className="text-lg sm:text-xl font-bold text-amber-400">${order.total.toFixed(2)}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default History;