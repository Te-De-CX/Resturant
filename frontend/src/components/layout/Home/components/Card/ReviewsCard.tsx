import Image from "next/image";
import { ReviewsCardProps } from "@/lib/types/home";
import { IoStar } from "react-icons/io5";
import { BsQuote } from "react-icons/bs";

const ReviewsCard: React.FC<ReviewsCardProps> = ({ name, img, text, position, numberOfStars }) => {
  const renderStars = () => {
    return Array(5).fill(0).map((_, i) => (
      <IoStar 
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
            width={77}
            height={77}
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-[0.3rem]">
          <h3 className="text-xl font-semibold mb-1">{name}</h3>
          <p className="text-sm text-gray-300">{position}</p>
          <div className="flex gap-1">
            {renderStars()}
            {/* <span className="text-xs text-gray-400 ml-1">({numberOfStars}.0)</span> */}
          </div>
        </div>
      </div>
      
      <div className="relative">
      <div className="flex absolute w-full items-center -top-2 left-0" >
        <BsQuote className="text-[2.5rem]" />
        <hr className=" text-white w-8/12" />
      </div>
        {/* <span className="absolute -top-4 left-0 text-3xl text-gray-500">&quot;</span> */}
        <p className="text-gray-200 text-lg pt-4 pl-4 mt-6">{text}</p>
      </div>
    </div>
  );
};

export default ReviewsCard;