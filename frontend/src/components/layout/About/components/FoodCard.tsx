import Image from "next/image";
import { FoodCardProp } from "@/lib/types/about";

const FoodCard: React.FC<FoodCardProp> = ({ title, img, text }) => {
    return (
        <div className="grid grid-cols-2 items-center" >
            <div className="h-[30rem] w-[35rem] overflow-hidden flex items-center rounded-2xl">
                <Image
                    src={img}
                    alt={title}
                    className="object-cover rounded-2xl"
                />
            </div>
            <div className="flex flex-col gap-2" >
                <h5 className="text-3xl font-semibold capitalize mb-2" >{title}</h5>
                <p className="text-xl leading-8 font-light" >{text}</p>
            </div>
        </div>
    );
};

export default FoodCard;