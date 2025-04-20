"use client"
import Link from "next/link"

import { useState } from "react";
import Image from "next/image";
import  Logo  from "../../../../public/icons/svgs/etc/logo.svg"
import { useCurrentUser } from "@/lib/api/auth";

const Nav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {data : user } = useCurrentUser()
  
  const pages = [
    { id: 1, name: "home", link: "/" },
    { id: 2, name: "about", link: "/About"  },
    { id: 3, name: "menu", link: "/menu"  },
    { id: 4, name: "resturants",  link: "/restaurants" },
    // { id: 5, name: "payment",  link: "/payment" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/20 backdrop-blur-xl border-b border-white/30 shadow-lg shadow-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-5 py-3">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-5">
            <Image 
              width={30} 
              height={30} 
              src={Logo} 
              alt="Logo" 
              className="filter drop-shadow-md flex justify-center items-center"
            />
            <h5 className=" flex flex-col items-center justify-center text-md capitalize font-bold text-black">
              <span className="leading-4">tamang</span>
              <span className="">foodService</span>
            </h5>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-8">
            {pages.map((page) => (
              <li key={page.id}>
                <Link
                  href={page.link}
                  className="text-black/90 hover:text-black font-medium text-sm uppercase tracking-wider transition-colors drop-shadow-md"
                >
                  {page.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Buttons */}
          <div className="hidden md:flex gap-4 items-center">
            <Link href="/Register" className="px-5 py-1.5 bg-[#191919] hover:bg-opacity-80 text-yellow-400 text-sm font-bold rounded-full border border-white/30 transition-all shadow-sm">
              Get Started
            </Link>
            <Link href="/Login" className="text-black/90 hover:text-black font-semibold text-sm transition-colors">
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 group"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className={`h-0.5 w-6 bg-black rounded-full transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : 'mb-1.5'}`} />
            <div className={`h-0.5 w-6 bg-black rounded-full transition-all ${isMenuOpen ? 'opacity-0' : 'mb-1.5'}`} />
            <div className={`h-0.5 w-6 bg-black rounded-full transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/20">
            <ul className="flex flex-col gap-4">
              {pages.map((page) => (
                <li key={page.id}>
                  <Link
                    href={page.link} 
                    className="block py-2 text-black/90 hover:text-black font-bold uppercase text-2xl text-center my-3 tracking-wider transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {page.name}
                  </Link>
                </li>
              ))}
            </ul>
            {
              user?.username ? (
                <>
                <Link href="/dashboard"  className="w-full py-2 bg-yellow-400 hover:bg-yellow-300/30 text-black text-lg font-bold rounded-full border flex items-center justify-center border-white/30 transition-all my-7">
                Dashboard
              </Link>
                </>
              ):(
                <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-white/20">
              <Link href="/Register"  className="w-full py-2 bg-yellow-400 hover:bg-yellow-300/30 text-black text-lg font-bold rounded-full border flex items-center justify-center border-white/30 transition-all">
                Get Started
              </Link>
              <Link href= "/Login" className=" w-full py-2 text-black/90 hover:text-black text-center  text-2xl  font-bold transition-colors">
                Login
              </Link>
            </div>
              )
            }
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;