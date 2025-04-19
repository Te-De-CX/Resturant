import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MdDashboard } from "react-icons/md";
import { BiSolidFoodMenu } from "react-icons/bi";
import { BsBagHeart } from "react-icons/bs";
import { RiHistoryFill } from "react-icons/ri";
import { FaCircleUser } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { FiCheck, FiX } from 'react-icons/fi';
import BgImage from "../../../../public/images/dashboard/nav.jpg";
import Image from 'next/image';
import { authApi } from '@/lib/api/auth';
import { FiMenu } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardNav = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

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

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    authApi.logout();
    setShowLogoutModal(false);
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const navItems = [
    { id:1, name: 'Dashboard', icon: MdDashboard, href: '/dashboard' },
    { id:2, name: 'Menu', icon: BiSolidFoodMenu, href: '/dashboard/menu' },
    { id:3, name: 'Favorite', icon: BsBagHeart, href: '/dashboard/favorite' },
    { id:4, name: 'History', icon: RiHistoryFill, href: '/dashboard/history' },
    { id:5, name: 'Profile', icon: FaCircleUser, href: '/dashboard/profile' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside className="fixed left-0 top-0 h-full w-64 z-50">
          <Image
            src={BgImage}
            alt="Background"
            className="absolute inset-0 object-cover -z-10"
            layout="fill"
            priority
          />
          <div className="p-4 border-b">
            <h1 className="text-xl font-semibold text-white">Dashboard</h1>
          </div>
          <div className='px-2 mt-6 flex flex-col h-full justify-between'>
            <nav className="p-4 bg-transparent backdrop-blur-md">
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className="flex items-center p-3 rounded-lg font-semibold text-white hover:text-yellow-400 transition-colors"
                    >
                      <span>{item.name}</span>
                      <item.icon className="w-5 h-5 ml-3" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="p-4 mb-24">
              <button 
                onClick={handleLogout}
                className="flex items-center w-full justify-center p-3 font-bold bg-white text-black rounded-full hover:text-red-400 transition-colors"
              >
                <span>Logout</span>
                <FiLogOut className="w-5 h-5 ml-3" />
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Mobile Navigation */}
      {isMobile && (
        <>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="fixed bottom-4 right-4 bg-yellow-400 text-black p-3 rounded-full shadow-lg z-50"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-40 md:hidden">
            <ul className="flex justify-around">
              {navItems.slice(0, 4).map((item) => (
                <li key={item.name} className="flex-1">
                  <a
                    href={item.href}
                    className="flex flex-col items-center py-3 text-xs text-gray-600 hover:text-blue-600"
                  >
                    <item.icon className="w-5 h-5 mb-1" />
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {mobileMenuOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-30 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div 
                className="absolute bottom-16 left-0 right-0 bg-white rounded-t-lg shadow-xl p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <ul className="space-y-3">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <item.icon className="w-5 h-5 mr-3" />
                        <span>{item.name}</span>
                      </a>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 text-gray-700"
                    >
                      <FiLogOut className="w-5 h-5 mr-3" />
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </>
      )}

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={cancelLogout}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4 text-red-400">Confirm Logout</h3>
              <p className="mb-6 text-lg">Are you sure you want to logout?</p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={cancelLogout}
                  className="px-4 py-2 border border-gray-300 hover:bg-gray-100 flex items-center rounded-2xl"
                >
                  <FiX className="mr-2" />
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="px-4 py-2 bg-yellow-400 text-white rounded-2xl hover:bg-yellow-500 flex items-center"
                >
                  <FiCheck className="mr-2" />
                  Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DashboardNav;