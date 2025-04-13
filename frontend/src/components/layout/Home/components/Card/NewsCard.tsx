import { NewsCardProps } from "@/lib/types/home";
import Image from "next/image";

const NewsCard: React.FC<NewsCardProps> = ({ img, name, date }) => {
  return (
    <div className="group transition-all duration-300 px-4 sm:px-5 w-full">
      {/* Image container with yellow background */}
      <div className="relative aspect-square mx-3 mb-5">
        {/* Yellow background div */}
        <div className="absolute bg-yellow-500 right-10 -bottom-10 rounded-xl w-full h-full -z-10"></div>
        
        {/* Image positioned above with spacing */}
        <div className="relative w-full h-full rounded-xl overflow-hidden">
          <Image
            src={img}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          />
        </div>
      </div>
      
      {/* Text content */}
      <div className="flex flex-col gap-3 p-4 sm:p-6">
        <p className="text-sm text-gray-500">{date}</p>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 transition-colors duration-300 group-hover:text-primary">
          {name}
        </h3>
      </div>
    </div>
  );
};

export default NewsCard;