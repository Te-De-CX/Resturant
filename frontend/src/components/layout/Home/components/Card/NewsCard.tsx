"use client";
import Image from "next/image";
import { NewsCardProps } from "@/lib/types/home";

// NewsCard Component
const NewsCard: React.FC<NewsCardProps> = ({ img, name, date }) => {
  return (
    <div className="group transition-all duration-300 w-full h-full flex flex-col">
      {/* Image container with yellow background */}
      <div className="relative aspect-square mb-4 sm:mb-5 mx-2 sm:mx-3">
        {/* Yellow background div */}
        {/* <div className="absolute bg-yellow-400 right-5 sm:right-8 -bottom-4 sm:-bottom-6 rounded-xl w-full h-full -z-10"></div> */}
        
        {/* Image positioned above with spacing */}
        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-md">
          <Image
            src={img}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, 30vw"
          />
        </div>
      </div>
      
      {/* Text content */}
      <div className="flex flex-col gap-2 sm:gap-3 px-2 sm:px-4 pb-2">
        <p className="text-xs sm:text-sm text-gray-500">{date}</p>
        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 transition-colors duration-300 group-hover:text-primary line-clamp-2">
          {name}
        </h3>
      </div>
    </div>
  );
};

export default NewsCard;