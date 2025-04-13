'use client';

import { useState, useEffect } from 'react';
import { MdDashboard } from "react-icons/md";
import { BiSolidFoodMenu } from "react-icons/bi";
import { BsBagHeart } from "react-icons/bs";
import { RiHistoryFill } from "react-icons/ri";
import { FaCircleUser } from "react-icons/fa6";

const PaymentNav = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { name: 'Dashboard', icon: MdDashboard, href: '#' },
    { name: 'Menu', icon: BiSolidFoodMenu, href: '#' },
    { name: 'Favorite', icon: BsBagHeart, href: '#' },
    { name: 'History', icon: RiHistoryFill, href: '#' },
    { name: 'Profile', icon: FaCircleUser, href: '#' },
  ];

  return (
    <>
      {/* Desktop Sidebar - Right Side */}
      {!isMobile && (
        <aside className="fixed right-0 top-0 h-full w-72 bg-gradient-to-b from-amber-800 to-amber-900 shadow-lg z-50">
          <div className="p-6 border-b border-amber-700">
            <h1 className="text-xl font-semibold text-white">Navigation</h1>
          </div>
          <nav className="p-4">
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="flex items-center justify-between p-4 rounded-lg hover:bg-amber-700 text-amber-100 hover:text-white transition-colors"
                  >
                    <span className="font-medium">{item.name}</span>
                    <item.icon className="w-5 h-5" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      )}

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <>
          <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-amber-800 to-amber-900 shadow-lg z-40 md:hidden">
            <ul className="flex justify-around">
              {navItems.slice(0, 4).map((item) => (
                <li key={item.name} className="flex-1">
                  <a
                    href={item.href}
                    className="flex flex-col items-center py-3 text-xs text-amber-100 hover:text-white"
                  >
                    <item.icon className="w-5 h-5 mb-1" />
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Overlay */}
          {mobileMenuOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-30" 
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-amber-800 to-amber-900 rounded-t-2xl shadow-xl p-6">
                <ul className="space-y-4">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="flex items-center p-4 rounded-lg bg-amber-700 text-white"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <item.icon className="w-5 h-5 mr-3" />
                        <span className="font-medium">{item.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default PaymentNav;