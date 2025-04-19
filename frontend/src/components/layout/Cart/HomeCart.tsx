'use client';
import { useCartStore } from '@/lib/store/cartStore';
import Image from 'next/image';
import Link from 'next/link';
import { BiTrash } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { FiShoppingBag } from 'react-icons/fi';

const HomeCart = () => {
    const { items, total, subFromCart, addToCart, clearCart } = useCartStore();

    const homeCart = (
        <section className="max-w-md mx-auto py-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                
                {items.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {items.map((item) => (
                            <motion.div 
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mb-4"
                            >
                                <div className="flex items-center justify-between p-3 border-b border-gray-200">
                                    <div className='flex items-center gap-3'>
                                        <div className='relative h-14 w-14 rounded-full overflow-hidden border-2  border-white'>
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.onerror = null;
                                                    target.src = '/fallback-image.jpg';
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-sm text-gray-800">{item.name}</h3>
                                            <p className="text-yellow-500 font-semibold">${item.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    
                                    <motion.div 
                                        className="flex items-center gap-2 bg-yellow-400 px-2 py-1 rounded-full"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <button 
                                            onClick={() => subFromCart(item.id)}
                                            className="h-4 w-4 text-black flex items-center justify-center bg-white font-semibold rounded-full text-xs"
                                        >
                                            -
                                        </button>
                                        <span className="text-sm">{item.quantity}</span>
                                        <button 
                                            onClick={() => addToCart(item)}
                                            className="h-4 w-4 text-black flex items-center justify-center bg-white font-semibold rounded-full text-xs"
                                        >
                                            +
                                        </button>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                        
                        <motion.div 
                            className="mt-6 font-bold text-xl text-right"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            Total: ${total ? total.toFixed(2) : "0.00"}
                        </motion.div>
                        
                        <div className='flex justify-between items-center mt-6'>
                            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                <Link
                                    href="/payment"
                                    className="w-full flex items-center justify-center bg-yellow-400 text-white py-3 px-3 rounded-lg shadow-md hover:bg-yellow-500 transition-colors"
                                >
                                    Proceed to Payment
                                </Link>
                            </motion.div>
                            
                            <motion.button
                                onClick={clearCart}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 text-red-500 hover:text-red-700 transition-colors"
                                aria-label="Clear cart"
                            >
                                <BiTrash className='text-2xl' />
                            </motion.button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        className="flex flex-col items-center justify-center py-12"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 2,
                                ease: "easeInOut",
                            }}
                        >
                            <FiShoppingBag className="text-6xl text-gray-300 mb-4" />
                        </motion.div>
                        
                        <h3 className="text-xl font-bold text-gray-500 mb-2">Your cart is empty</h3>
                        <p className="text-gray-400 mb-6 text-center">Looks like you haven&apos;t added anything to your cart yet</p>
                        
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                href="/dashboard/menu"
                                className="px-6 py-2 bg-yellow-400 text-white rounded-lg shadow hover:bg-yellow-500 transition-colors"
                            >
                                Browse Menu
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </motion.div>
        </section>
    );

    return homeCart;
}

export default HomeCart;