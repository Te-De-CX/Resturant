import Image from "next/image";
import { FoodCardProp } from "@/lib/types/about";

const FoodCard: React.FC<FoodCardProp> = ({ title, img, text }) => {

    const foodCard = (
        <>
           <div>
            <Image
                src={img}
                alt="Noodles background"
                fill
                className="object-cover"
                quality={100}
                priority
            />
            <div>
                <h5>{title}</h5>
                <p>{text}</p>
            </div>
           </div>
        </>
    )

    return foodCard;
}

export default FoodCard;