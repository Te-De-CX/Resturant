"use client"

import { useState } from "react";
import Image from "next/image";
import { Logo } from "@/lib/services/image";

const Nav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const pages = [
    { id: 1, name: "home" },
    { id: 2, name: "about" },
    { id: 3, name: "menu" },
    { id: 4, name: "contact" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/20 backdrop-blur-xl border-b border-white/30 shadow-lg shadow-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <Image 
              width={28} 
              height={28} 
              src={Logo} 
              alt="Logo" 
              className="filter drop-shadow-md"
            />
            <h5 className="hidden sm:flex flex-col text-sm font-medium text-black drop-shadow-md">
              <span className="leading-4">tamang</span>
              <span className="text-xs">foodService</span>
            </h5>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-8">
            {pages.map((page) => (
              <li key={page.id}>
                <a 
                  href="#" 
                  className="text-black/90 hover:text-black font-medium text-sm uppercase tracking-wider transition-colors drop-shadow-md"
                >
                  {page.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop Buttons */}
          <div className="hidden md:flex gap-4 items-center">
            <button className="px-5 py-1.5 bg-white/20 hover:bg-white/30 text-black text-sm font-bold rounded-full border border-white/30 transition-all shadow-sm">
              Get Started
            </button>
            <button className="text-black/90 hover:text-black font-medium text-sm transition-colors">
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 group"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className={`h-0.5 w-6 bg-white rounded-full transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : 'mb-1.5'}`} />
            <div className={`h-0.5 w-6 bg-white rounded-full transition-all ${isMenuOpen ? 'opacity-0' : 'mb-1.5'}`} />
            <div className={`h-0.5 w-6 bg-white rounded-full transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/20">
            <ul className="flex flex-col gap-4">
              {pages.map((page) => (
                <li key={page.id}>
                  <a 
                    href="#" 
                    className="block py-2 text-black/90 hover:text-black font-medium uppercase text-sm tracking-wider transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {page.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-white/20">
              <button className="w-full py-2 bg-white/20 hover:bg-white/30 text-black text-sm font-bold rounded-full border border-white/30 transition-all">
                Get Started
              </button>
              <button className="w-full py-2 text-black/90 hover:text-black font-medium text-sm transition-colors">
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;