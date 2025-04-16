import React, { useEffect, useState } from 'react';
import { useAds } from '../../../../../lib/hooks/useAds';
import Image from 'next/image';
import { Steak } from '@/lib/services/image';

const AdsComponent = () => {
  const { useGetAllAds } = useAds();
  const { data: ads, isLoading, error } = useGetAllAds();
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  // Auto-rotate ads every 5 seconds
  useEffect(() => {
    if (!ads || ads.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => 
        prevIndex === ads.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [ads]);

  if (isLoading) return (
    <div className="flex justify-center items-center h-32">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Error!</strong>
      <span className="block sm:inline"> {error.message}</span>
    </div>
  );

  if (!ads || ads.length === 0) return (
    <div className="text-center py-8">
      <p className="text-gray-500 text-lg">No ads available at the moment</p>
    </div>
  );

  return (
  <>
    <div className='flex items-center px-5 mt-3' >
    <div className="w-full rounded-xl overflow-hidden relative h-28"> {/* Smaller fixed height */}
      <div className="flex transition-transform duration-500 ease-in-out"
           style={{ transform: `translateX(-${currentAdIndex * 100}%)` }}>
        {ads.map((ad, index) => (
          <div key={ad.id} className="w-full flex-shrink-0 relative">
            <div className="relative w-full h-48"> {/* Fixed height container */}
              <Image 
                src={ad.image || Steak} 
                alt={ad.title || 'Advertisement'} 
                fill
                className="object-cover"
                quality={90}
                priority={index === 0} // Only prioritize first image
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'https://via.placeholder.com/1200x200?text=Ad+Image';
                }}
              />
              <div className="absolute bottom-20 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h2 className="text-white font-bold text-lg">{ad.title}</h2>
                <p className="text-white/90 text-sm line-clamp-1">{ad.description}</p>
                {/* <div className="flex justify-between text-xs text-white/80 mt-1">
                  <span>Active: {new Date(ad.startDate).toLocaleDateString()}</span>
                  <span>Until: {new Date(ad.endDate).toLocaleDateString()}</span>
                </div> */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      {ads.length > 1 && (
        <div className="absolute bottom-2 left-0 right-3 flex justify-end gap-1">
          {ads.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentAdIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${index === currentAdIndex ? 'bg-white w-4' : 'bg-white/50'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
    </div>
  </>
  );
};

export default AdsComponent;