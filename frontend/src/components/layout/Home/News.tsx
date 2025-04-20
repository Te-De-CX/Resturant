"use client";

import { useState, useRef, useCallback, useEffect } from 'react';
import NewsCard from "./components/Card/NewsCard";
import { newsData } from "@/lib/data/home/news/data";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const News = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Move scrollToSlide definition before functions that use it
  const scrollToSlide = useCallback((index: number) => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const card = container.children[index] as HTMLElement;
      container.scrollTo({
        left: card.offsetLeft - container.offsetLeft - (container.clientWidth - card.clientWidth) / 2,
        behavior: 'smooth'
      });
    }
  }, []);

  // Now include scrollToSlide in dependencies
  const nextSlide = useCallback(() => {
    const nextIndex = currentIndex === newsData.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
    scrollToSlide(nextIndex);
  }, [currentIndex, scrollToSlide]); // Added scrollToSlide

  const prevSlide = useCallback(() => {
    const prevIndex = currentIndex === 0 ? newsData.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    scrollToSlide(prevIndex);
  }, [currentIndex, scrollToSlide]);

  // const scrollToSlide = useCallback((index: number) => {
  //   if (carouselRef.current) {
  //     const container = carouselRef.current;
  //     const card = container.children[index] as HTMLElement;
  //     container.scrollTo({
  //       left: card.offsetLeft - container.offsetLeft - (container.clientWidth - card.clientWidth) / 2,
  //       behavior: 'smooth'
  //     });
  //   }
  // }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      nextSlide();
    }

    if (touchStart - touchEnd < -50) {
      prevSlide();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-semibold capitalize mb-8 sm:mb-12 text-gray-900">
          Latest Burger News
        </h2>
        
        <div className="relative">
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Previous news"
          >
            <FiChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          
          <div 
            ref={carouselRef}
            className="flex overflow-x-hidden snap-x snap-mandatory gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-8 py-2"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            role="region"
            aria-label="News carousel"
            aria-live="polite"
          >
            {newsData.map((item, index) => (
              <div 
                key={item.id} 
                className={`flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 snap-center transition-opacity duration-300 ${
                  index === currentIndex ? 'opacity-100' : 'opacity-50'
                }`}
                aria-hidden={index !== currentIndex}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${newsData.length}`}
              >
                <NewsCard 
                  img={item.img} 
                  name={item.name} 
                  date={item.date} 
                />
              </div>
            ))}
          </div>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Next news"
          >
            <FiChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
        
        <div className="flex justify-center mt-6 gap-2">
          {newsData.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                scrollToSlide(index);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-primary w-4' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;