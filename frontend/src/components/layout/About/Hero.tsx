'use client';

import Image from 'next/image';
import HeroImg from '../../../../public/images/about/hero/bg.png';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative flex items-center justify-center w-full h-screen min-h-[600px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={HeroImg}
          alt="Delicious noodles background"
          fill
          className="object-cover"
          priority
          quality={100}
          placeholder="blur"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Container */}
      <div className="px-4 mx-auto max-w-7xl w-full text-white">
        <motion.div 
          className="flex flex-col items-start lg:w-1/2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Heading */}
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Creating a New World of <span className='text-yellow-400'>FlaVORs</span>
          </motion.h2>

          {/* Subheading */}
          <motion.p 
            className="mb-8 text-lg md:text-xl lg:w-4/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Order Exactly What You Crave, Anytime, Anywhere! This highlights the customization aspect, 
            emphasizes convenience, and makes it clear you&apos;re offering delivery with a wide selection.
          </motion.p>

          {/* Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <button className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
              Check Blog Post
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-black rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1">
              Book a Reservation
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scrolling Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="white" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="w-8 h-8"
        >
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;