'use client';

import { useState, useEffect, useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ChefCard from '../components/ChefCard';
import { ChefCardProp } from '@/lib/types/about';

interface ChefsCarouselProps {
    chefs: ChefCardProp[];
}

const ChefsCarousel: React.FC<ChefsCarouselProps> = ({ chefs }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);
    
    // Auto-rotate every 5 seconds
    useEffect(() => {
        if (isPaused) return;
        
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % chefs.length);
        }, 5000);
        
        return () => clearInterval(interval);
    }, [chefs.length, isPaused]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % chefs.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + chefs.length) % chefs.length);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    // Calculate visible cards based on screen size
    const getVisibleCards = () => {
        if (!carouselRef.current) return 1;
        const width = carouselRef.current.offsetWidth;
        if (width >= 1280) return 4;
        if (width >= 1024) return 3;
        if (width >= 768) return 2;
        return 1;
    };

    const visibleCards = getVisibleCards();
    const adjustedIndex = currentIndex > chefs.length - visibleCards ? 0 : currentIndex;

    return (
        <div 
            className="relative w-full overflow-hidden"
            ref={carouselRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Carousel Container */}
            <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                    transform: `translateX(-${adjustedIndex * (100 / visibleCards)}%)`,
                    width: `${(chefs.length / visibleCards) * 100}%`
                }}
            >
                {chefs.map((chef, index) => (
                    <div 
                        key={index} 
                        className="flex-shrink-0"
                        style={{ width: `${100 / visibleCards}%` }}
                    >
                        <div className="px-2 h-full">
                            <ChefCard {...chef} />
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Navigation Arrows */}
            <button 
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/75 transition-colors"
                aria-label="Previous chef"
            >
                <FiChevronLeft size={24} />
            </button>
            <button 
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/75 transition-colors"
                aria-label="Next chef"
            >
                <FiChevronRight size={24} />
            </button>
            
            {/* Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: Math.ceil(chefs.length / visibleCards) }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index * visibleCards)}
                        className={`h-2 w-2 rounded-full ${index === Math.floor(adjustedIndex / visibleCards) ? 'bg-amber-500' : 'bg-gray-300'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ChefsCarousel;