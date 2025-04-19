'use client';

import { useState, useEffect, useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import ChefCard from '../components/ChefCard';
import { ChefCardProp } from '@/lib/types/about';

interface ChefsCarouselProps {
  chefs: ChefCardProp[];
}

const ChefsCarousel: React.FC<ChefsCarouselProps> = ({ chefs }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCards, setVisibleCards] = useState(1);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Handle responsive visible cards
  useEffect(() => {
    const updateVisibleCards = () => {
      if (!carouselRef.current) return;
      const width = carouselRef.current.offsetWidth;
      if (width >= 1280) return setVisibleCards(3);
      if (width >= 768) return setVisibleCards(2);
      setVisibleCards(1);
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (isPaused || chefs.length <= visibleCards) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % chefs.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [chefs.length, isPaused, visibleCards]);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % chefs.length);
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + chefs.length) % chefs.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Calculate which cards to display
  const getVisibleIndices = () => {
    const indices = [];
    for (let i = 0; i < visibleCards; i++) {
      indices.push((currentIndex + i) % chefs.length);
    }
    return indices;
  };

  return (
    <div className="relative w-full overflow-hidden py-12" ref={carouselRef}>
      {/* Black Circle Background */}
      <div className="absolute inset-0 flex items-center justify-center -z-10">
        <div className="bg-[#191919] rounded-full w-[150vw] h-[150vw] md:w-[120vw] md:h-[120vw] lg:w-[100vw] lg:h-[100vw] max-w-[2000px] max-h-[2000px]" />
      </div>
      
      <div 
        className="relative w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Carousel Container */}
        <div className="flex justify-center items-center">
          <AnimatePresence mode="wait" custom={currentIndex}>
            {getVisibleIndices().map((index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 px-4"
                style={{ width: `${100 / visibleCards}%` }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                layout
              >
                <ChefCard {...chefs[index]} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Navigation Arrows - Only show if there are more cards than visible */}
        {chefs.length > visibleCards && (
          <>
            <motion.button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/70 text-white rounded-full hover:bg-amber-500 transition-all"
              aria-label="Previous chef"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiChevronLeft size={24} />
            </motion.button>
            <motion.button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/70 text-white rounded-full hover:bg-amber-500 transition-all"
              aria-label="Next chef"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiChevronRight size={24} />
            </motion.button>
          </>
        )}
        
        {/* Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: chefs.length }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 w-3 rounded-full ${index === currentIndex ? 'bg-amber-500' : 'bg-gray-300'}`}
              aria-label={`Go to slide ${index + 1}`}
              whileHover={{ scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 400 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChefsCarousel;