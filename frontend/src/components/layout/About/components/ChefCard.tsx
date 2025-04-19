import Image from "next/image";
import { ChefCardProp } from "@/lib/types/about";

const ChefCard: React.FC<ChefCardProp> = ({ img, name, text }) => {
    return (
        <div className="group w-[27rem] p-5 rounded-2xl bg-[#191919] relative h-full overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl mx-2">
            {/* Chef Image */}
            <div className="aspect-square my-3 overflow-hidden rounded-xl">
                <Image
                    src={img}
                    alt={name}
                    width={400}
                    height={400}
                    className=" object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
            </div>
            
            {/* Gradient Overlay */}
            {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" /> */}
            
            {/* Chef Info */}
            <div className=" inset-0 flex flex-col items-start justify-start px-3 py-2 pb-5 text-white">
                <h6 className="text-2xl text-yellow-400 font-bold mb-2">{name}</h6>
                <p className=" font-light line-clamp-3">{text}</p>
            </div>
            
            {/* Specialty Badge */}
            <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                Master Chef
            </div>
        </div>
    );
};

export default ChefCard;