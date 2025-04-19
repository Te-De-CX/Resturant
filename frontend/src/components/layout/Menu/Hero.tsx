'use client';

import Image, { StaticImageData } from 'next/image';
import HeroImg from '../../../../public/images/menu/hero/bg.png';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import { Steak, Noodles, Pizzas, sushi, Taco, Hotdog } from '@/lib/services/image';
import { FaArrowDown } from 'react-icons/fa';

// Step 1: First, you'll need to add your custom font to your Next.js project
// Create a fonts.ts file in your lib folder with this content:
/*
import { Montserrat, Playfair_Display } from 'next/font/google';

export const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});
*/

// If using a custom downloaded font, add it to your styles/globals.css:
/*
@font-face {
  font-family: 'YourFontName';
  src: url('/fonts/YourFontName-Regular.woff2') format('woff2'),
       url('/fonts/YourFontName-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
*/

type FoodImage = {
  id: number;
  name: StaticImageData;
  alt: string;
};

const images: FoodImage[] = [
  { id: 1, name: Steak, alt: 'Juicy steak' },
  { id: 2, name: Noodles, alt: 'Delicious noodles' },
  { id: 3, name: Pizzas, alt: 'Fresh pizza' },
  { id: 4, name: sushi, alt: 'Sushi platter' },
  { id: 5, name: Taco, alt: 'Tasty taco' },
  { id: 6, name: Hotdog, alt: 'Classic hotdog' },
];

const Hero = () => {
  const scrollToMenu = () => {
    document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative flex items-center justify-center w-full h-screen min-h-[600px] overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src={HeroImg}
          alt="Delicious food background"
          fill
          className="object-cover"
          priority
          quality={100}
          placeholder="blur"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="px-4 mx-auto max-w-7xl w-full text-white">
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Apply custom font to the Tamang Menu text */}
          <motion.h2 
            className="text-4xl sm:text-6xl md:text-[6rem] font-bold text-yellow-400 text-center font-playfair"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{ 
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              letterSpacing: '1px'
            }}
          >
            Tamang Menu
          </motion.h2>
          
          <motion.p
            className="text-lg sm:text-xl md:text-2xl mt-4 max-w-2xl text-center font-montserrat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Authentic flavors crafted with passion and tradition
          </motion.p>

          {/* Rotating "See Menu" button */}
          <motion.div
            className="mt-12 relative group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={scrollToMenu}
              className="flex items-center gap-3 px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-full shadow-lg transition-all duration-300 group-hover:shadow-xl"
            >
              <span className="text-lg font-semibold uppercase tracking-wider">
                See Menu
              </span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ 
                  repeat: Infinity,
                  duration: 2,
                  ease: "linear"
                }}
                className="text-xl"
              >
                <FaArrowDown />
              </motion.div>
            </button>
            <div className="absolute inset-0 rounded-full bg-amber-400 blur-md opacity-0 group-hover:opacity-50 -z-10 transition-opacity duration-300" />
          </motion.div>

          {/* Food image marquee */}
          <div className="-rotate-3 border-y-8 border-white/80 w-full mt-12 md:mt-16">
            <Marquee pauseOnHover speed={40}>
              {images.map((image) => (
                <motion.div 
                  key={image.id} 
                  className="h-44 w-72 mx-2 overflow-hidden rounded-lg shadow-md"
                  whileHover={{ scale: 1.03 }}
                >
                  <Image
                    src={image.name}
                    alt={image.alt}
                    className="object-cover w-full h-full opacity-80 hover:opacity-100 transition-opacity duration-300"
                    sizes="(max-width: 768px) 100vw, 288px"
                  />
                </motion.div>
              ))}
            </Marquee>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;