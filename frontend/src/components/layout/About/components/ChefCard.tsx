import Image from "next/image";
import { ChefCardProp } from "@/lib/types/about";

const ChefCard: React.FC<ChefCardProp> = ({ key, img, name, text }) => {

    const chefCard = (
        <>
            <div key={key} >
                <Image
                    src={img}
                    alt="Noodles background"
                    fill
                    className="object-cover"
                    quality={100}
                    priority
                />
                <div>
                    <h6>{name}</h6>
                    <p>{text}</p>
                </div>
            </div>
        </>
    )

    return chefCard;
}

export default ChefCard;