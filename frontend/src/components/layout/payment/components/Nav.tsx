'use client';

import { useState, useEffect } from 'react';
import { MdPayment } from "react-icons/md";
import { BiTransfer } from "react-icons/bi";
import { FaMobileAlt } from "react-icons/fa";
import { RiCouponLine } from "react-icons/ri";
import {  FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const PaymentNav = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('pay with card');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { name: 'pay with card', icon: MdPayment, href: '#' },
    { name: 'bank transfer', icon: BiTransfer, href: '#' },
    { name: 'ussd', icon: FaMobileAlt, href: '#' },
    { name: 'coupon', icon: RiCouponLine, href: '#' },
  ];

  const handleItemClick = (name: string) => {
    setActiveItem(name);
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Navigation - Right Side */}
      {!isMobile && (
        <motion.aside 
          className="fixed right-0 top-0 h-full w-72 bg-gradient-to-b from-amber-700 to-amber-800 shadow-xl z-50"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <div className="p-6 border-b border-amber-600">
            <h1 className="text-xl font-semibold text-white">Payment Methods</h1>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <motion.li 
                  key={item.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <a
                    href={item.href}
                    onClick={() => handleItemClick(item.name)}
                    className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                      activeItem === item.name
                        ? 'bg-amber-600 text-white shadow-md'
                        : 'text-amber-100 hover:bg-amber-600/50 hover:text-white'
                    }`}
                  >
                    <span className="font-medium capitalize">{item.name}</span>
                    <item.icon className="w-5 h-5" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>
        </motion.aside>
      )}

      {/* Mobile Navigation */}
      {isMobile && (
        <>
          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="fixed bottom-6 right-6 bg-amber-600 text-white p-4 rounded-full shadow-lg z-50 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Payment methods"
          >
            {mobileMenuOpen ? (
              <FiX className="text-xl" />
            ) : (
              <MdPayment className="text-xl" />
            )}
          </motion.button>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <>
                <motion.div
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />

                <motion.div
                  className="fixed bottom-20 right-6 w-64 bg-gradient-to-b from-amber-700 to-amber-800 rounded-xl shadow-xl z-50 overflow-hidden"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 100, opacity: 0 }}
                  transition={{ type: 'spring', damping: 25 }}
                >
                  <div className="p-4 border-b border-amber-600">
                    <h2 className="text-lg font-semibold text-white">Payment Methods</h2>
                  </div>
                  <ul className="p-2">
                    {navItems.map((item) => (
                      <motion.li
                        key={item.name}
                        whileTap={{ scale: 0.95 }}
                      >
                        <a
                          href={item.href}
                          onClick={() => handleItemClick(item.name)}
                          className={`flex items-center justify-between p-3 rounded-lg my-1 transition-colors ${
                            activeItem === item.name
                              ? 'bg-amber-600 text-white'
                              : 'text-amber-100 hover:bg-amber-600/50'
                          }`}
                        >
                          <span className="font-medium capitalize text-sm">{item.name}</span>
                          <item.icon className="w-4 h-4" />
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
};

export default PaymentNav;