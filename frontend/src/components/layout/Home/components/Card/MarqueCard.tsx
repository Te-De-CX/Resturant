import { MarqueCardProps } from "@/lib/types/home";
import Image from "next/image";

const MarqueeCard: React.FC<MarqueCardProps> = ({ name, price, img, numberOfStars }) => {
    const renderStars = () => {
        return Array(5).fill(0).map((_, i) => (
            <span 
                key={i} 
                className={
                    `text-sm md:text-base ${
                        i < numberOfStars ? "text-yellow-400" : "text-gray-500"
                    }`
                }
            >
                ★
            </span>
        ));
    };

    return (
        <article className="rounded-xl bg-[#191919] py-2 px-3 sm:py-3 sm:px-4 text-white mx-2 sm:mx-3 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center min-w-[240px] sm:min-w-[270px] md:min-w-[280px]">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 overflow-hidden border-2 border-white rounded-full flex-shrink-0">
                <Image
                    src={img}
                    alt={name}
                    fill
                    sizes="(max-width: 640px) 80px, (max-width: 768px) 100px, 120px"
                    className="object-cover"
                />
            </div>
            
            {/* Content */}
            <div className="flex flex-col items-start gap-1 flex-grow ml-3 sm:ml-4">
                <h3 className="text-sm sm:text-base md:text-lg font-bold truncate w-full">
                    {name}
                </h3>
                
                <div className="w-full flex flex-col justify-between items-start mt-1">
                    <p className="text-sm sm:text-base font-bold text-primary">
                        $ {price.toFixed(2)}
                    </p>
                    <div className="flex space-x-0.5">
                        {renderStars()}
                    </div>
                </div>
            </div>
        </article>
    );
};

export default MarqueeCard;