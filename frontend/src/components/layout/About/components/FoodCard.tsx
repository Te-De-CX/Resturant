import Image from "next/image";
import { FoodCardProp } from "@/lib/types/about";

const FoodCard: React.FC<FoodCardProp> = ({ title, img, text }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-8">
            <div className="h-64 sm:h-80 md:h-[30rem] w-full md:w-[35rem] overflow-hidden flex items-center rounded-2xl">
                <Image
                    src={img}
                    alt={title}
                    className="object-cover rounded-2xl w-full h-full"
                    width={600}
                    height={600}
                />
            </div>
            <div className="flex flex-col gap-2 px-4 md:px-0">
                <h5 className="text-2xl sm:text-3xl font-semibold capitalize mb-2">{title}</h5>
                <p className="text-base sm:text-xl leading-7 sm:leading-8 font-light">{text}</p>
            </div>
        </div>
    );
};

export default FoodCard;