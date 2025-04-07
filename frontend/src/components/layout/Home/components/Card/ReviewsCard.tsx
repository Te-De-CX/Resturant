import Image from "next/image";
import { ReviewsCardProps } from "@/lib/types/home";
import { Star } from "lucide-react"; // Or any other star icon library

const ReviewsCard: React.FC<ReviewsCardProps> = ({ name, img, text, position, numberOfStars }) => {
  const renderStars = () => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < numberOfStars ? "fill-yellow-400 text-yellow-400" : "text-gray-400"} 
      />
    ));
  };

  return (
    <div className="flex flex-col gap-4 p-6 rounded-xl bg-[#191919] text-white hover:bg-[#222222] transition-colors duration-300">
      <div className="flex items-start gap-4">
        <div className="relative flex-shrink-0">
          <Image 
            src={img}
            alt={name}
            width={56}
            height={56}
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-sm text-gray-300">{position}</p>
          <div className="flex gap-1">
            {renderStars()}
            <span className="text-xs text-gray-400 ml-1">({numberOfStars}.0)</span>
          </div>
        </div>
      </div>
      
      <div className="relative">
        <span className="absolute -top-4 left-0 text-3xl text-gray-500">&quot;</span>
        <p className="text-gray-200 pt-4 pl-4">{text}</p>
      </div>
    </div>
  );
};

export default ReviewsCard;