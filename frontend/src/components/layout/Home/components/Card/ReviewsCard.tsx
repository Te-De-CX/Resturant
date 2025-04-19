import Image from "next/image";
import { ReviewsCardProps } from "@/lib/types/home";
import { IoStar } from "react-icons/io5";
import { BsQuote } from "react-icons/bs";

const ReviewsCard: React.FC<ReviewsCardProps> = ({ name, img, text, position, numberOfStars }) => {
  const renderStars = () => {
    return Array(5).fill(0).map((_, i) => (
      <IoStar 
        key={i} 
        className={`w-4 h-4 ${i < numberOfStars ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`}
      />
    ));
  };

  return (
    <div className="flex flex-col gap-4 p-5 sm:p-6 rounded-xl bg-[#191919] text-white hover:bg-[#222222] transition-colors duration-300 h-full">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20">
          <Image 
            src={img}
            alt={`${name}'s profile picture`}
            width={80}
            height={80}
            className="rounded-full object-cover w-full h-full"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-lg sm:text-xl font-semibold">{name}</h3>
          <p className="text-xs sm:text-sm text-gray-300">{position}</p>
          <div className="flex gap-1 mt-1">
            {renderStars()}
          </div>
        </div>
      </div>
      
      <div className="relative flex-grow">
        <div className="flex absolute w-full items-center -top-2 left-0">
          <BsQuote className="text-3xl sm:text-4xl text-gray-600" />
          <hr className="border-gray-700 w-8/12" />
        </div>
        <p className="text-gray-200 text-base sm:text-lg pt-4 pl-4 mt-6">
          {text}
        </p>
      </div>
    </div>
  );
};

export default ReviewsCard;