'use client';

import Image, { StaticImageData } from 'next/image';
import { Caesar_Dressing } from 'next/font/google';
import HeroImg from '../../../../public/images/menu/hero/bg.png';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Marquee from 'react-fast-marquee';
import { Steak, Noodles, Pizzas, sushi, Taco, Hotdog } from '@/lib/services/image';
import { FaArrowDown } from 'react-icons/fa';
import { useEffect } from 'react';

const ceaser = Caesar_Dressing({
  subsets: ['latin'],
  weight: '400',
});

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
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const scrollToMenu = () => {
    if (typeof window !== 'undefined') {
      document.getElementById('menu-section')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const marqueeItemVariants = {
    hover: {
      scale: 1.03,
      transition: { duration: 0.3 },
    },
  };

  return (
    <section 
      ref={ref}
      className="relative flex items-center justify-center w-full h-screen min-h-[600px] overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={HeroImg}
          alt="Delicious food background"
          fill
          className="object-cover"
          priority
          quality={100}
          placeholder="blur"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="mx-auto max-w-7xl w-full px-4 text-white">
        <motion.div 
          className="flex flex-col items-center"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {/* Title */}
          <motion.div variants={itemVariants} className="px-4">
            <motion.h2 
              className="text-6xl mt-12 sm:text-6xl md:text-[6rem] font-bold text-yellow-400 text-center"
              style={{ 
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                letterSpacing: '1px'
              }}
            >
              <span className={ceaser.className}>
                Tamang Menu
              </span>
            </motion.h2>
          </motion.div>
          
          {/* Subtitle */}
          <motion.p
            className="px-5 text-lg sm:text-xl md:text-2xl mt-4 max-w-2xl text-center"
            variants={itemVariants}
          >
            Authentic flavors crafted with passion and tradition
          </motion.p>

          {/* Scroll Button */}
          <motion.div
            className="mt-12 relative group"
            variants={itemVariants}
          >
            <button
              onClick={scrollToMenu}
              className="flex flex-col items-center gap-3 h-40 w-40 bg-transparent border-4 border-white justify-center text-white rounded-full shadow-lg transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50"
              aria-label="Scroll to menu section"
            >
              <span className="text-lg font-semibold uppercase tracking-wider">
                Lets see
              </span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ 
                  repeat: Infinity,
                  duration: 2,
                  ease: "linear"
                }}
              >
                <FaArrowDown className="text-3xl" />
              </motion.div>
            </button>
            <div className="absolute inset-0 rounded-full bg-amber-400 blur-md opacity-0 group-hover:opacity-50 -z-10 transition-opacity duration-300" />
          </motion.div>

          {/* Food Image Marquee */}
          <motion.div 
            className="-rotate-3 w-[110vw] border-y-8 border-white/80 mt-12 md:mt-16"
            variants={itemVariants}
          >
            <Marquee speed={40}>
              {images.map((image) => (
                <motion.div 
                  key={image.id} 
                  className="h-44 w-72 border-x-2 border-white overflow-hidden rounded-lg shadow-md mx-1"
                  variants={marqueeItemVariants}
                  whileHover="hover"
                >
                  <Image
                    src={image.name}
                    alt={image.alt}
                    width={288}
                    height={176}
                    className="object-cover w-full h-full opacity-90 hover:opacity-100 transition-opacity duration-300"
                    placeholder="blur"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </Marquee>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;