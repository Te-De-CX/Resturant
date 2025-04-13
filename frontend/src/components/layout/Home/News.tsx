"use client";

import { useState, useRef } from 'react';
import NewsCard from "./components/Card/NewsCard";
import { newsData } from "@/lib/data/home/news/data";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const News = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    const nextIndex = currentIndex === newsData.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
    scrollToSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = currentIndex === 0 ? newsData.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    scrollToSlide(prevIndex);
  };

  const scrollToSlide = (index: number) => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const card = container.children[index] as HTMLElement;
      container.scrollTo({
        left: card.offsetLeft - container.offsetLeft - (container.clientWidth - card.clientWidth) / 2,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-center text-2xl sm:text-3xl lg:text-4xl font-semibold capitalize mb-8 sm:mb-12 text-gray-900">
          Latest Burger News
        </h3>
        
        <div className="relative">
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300"
            aria-label="Previous news"
          >
            <FiChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          
          <div 
            ref={carouselRef}
            className="flex overflow-x-hidden snap-x snap-mandatory gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-8 py-2"
          >
            {newsData.map((item, index) => (
              <div 
                key={item.id} 
                className={`flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 snap-center transition-opacity duration-300 ${
                  index === currentIndex ? 'opacity-100' : 'opacity-50'
                }`}
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
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300"
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
            />
          ))}
        </div>
        
        <div className="text-center mt-8 sm:mt-12">
          <button className="px-6 sm:px-8 py-2 sm:py-3 bg-primary text-white font-medium rounded-full hover:bg-primary-dark transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 text-sm sm:text-base">
            Read Blog
          </button>
        </div>
      </div>
    </section>
  );
};

export default News;