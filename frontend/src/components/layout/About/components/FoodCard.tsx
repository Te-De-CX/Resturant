import Image from "next/image";
import { FoodCardProp } from "@/lib/types/about";

const FoodCard: React.FC<FoodCardProp> = ({ title, img, text }) => {
    return (
        <div className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="aspect-w-3 aspect-h-2 w-full">
                <Image
                    src={img}
                    alt={title}
                    width={400}
                    height={300}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            
            <div className="absolute bottom-0 left-0 p-6 text-white opacity-0 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 group-hover:opacity-100">
                <h5 className="mb-2 text-xl font-bold tracking-tight">{title}</h5>
                <p className="text-sm font-light line-clamp-2">{text}</p>
            </div>
            
            <div className="bg-white p-4">
                <h5 className="mb-1 text-lg font-semibold text-gray-900 truncate">{title}</h5>
                <p className="text-sm text-gray-600 line-clamp-2">{text}</p>
            </div>
        </div>
    );
};

export default FoodCard;