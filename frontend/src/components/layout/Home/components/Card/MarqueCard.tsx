import { MarqueCardProps } from "@/lib/types/home";
import Image from "next/image";

const MarqueeCard: React.FC<MarqueCardProps> = ({ name, price, img, numberOfStars }) => {

    const renderStars = () => {
        return Array(5).fill(0).map((_, i) => (
            <span key={i} className={i < numberOfStars ? "text-yellow-400" : "text-gray-500"}>
                ★
            </span>
        ));
    };

    return (
        <article className="rounded-xl bg-[#191919] py-3 text-white px-4 items-center mx-2 shadow-lg hover:shadow-xl transition-shadow duration-300 transform flex">
            <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                <Image
                    src={img}
                    alt={name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                />
            </div>
            <div className="flex flex-col gap-1 flex-grow ml-2">
                <h3 className="text-lg font-bold truncate">{name}</h3>
                <div className="flex justify-between items-center">
                    <p className="text-md font-bold text-primary">${price.toFixed(2)}</p>
                    <div className="flex text-lg">
                        {renderStars()}
                    </div>
                </div>
            </div>
        </article>
    );
};


export default  MarqueeCard;