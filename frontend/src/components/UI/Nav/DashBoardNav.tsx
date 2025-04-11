import { useState, useEffect } from 'react';
import {
  FiHome,
  FiPieChart,
  FiSettings,
  FiUsers,
  FiFileText,
  FiBell,
  FiMenu,
  FiX
} from 'react-icons/fi';

const DashboardNav = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's md breakpoint
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { name: 'Home', icon: FiHome, href: '#' },
    { name: 'Analytics', icon: FiPieChart, href: '#' },
    { name: 'Users', icon: FiUsers, href: '#' },
    { name: 'Documents', icon: FiFileText, href: '#' },
    { name: 'Notifications', icon: FiBell, href: '#' },
    { name: 'Settings', icon: FiSettings, href: '#' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-md z-50">
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      )}

      {/* Mobile Bottom Nav */}
      {isMobile && (
        <>
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg z-50 md:hidden"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          {/* Bottom navigation bar */}
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

          {/* Expanded mobile menu */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setMobileMenuOpen(false)}>
              <div className="absolute bottom-16 left-0 right-0 bg-white rounded-t-lg shadow-xl p-4">
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
                </ul>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default DashboardNav;