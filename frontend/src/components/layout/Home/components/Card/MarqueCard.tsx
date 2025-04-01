import { MarqueCardProps } from "@/lib/types/home";
import Image from "next/image";

const MenuCard: React.FC<MarqueCardProps> = ({ name, price, img,numberOfStars }) => {

    const menuCard = (
        <>
           <Image
                src={img}
                alt={name}
            />
            <div>
                <h3>{name}</h3>
                <p>${price}</p>
                <p>{numberOfStars}</p>
            </div>
        </>
    )

    return menuCard;
}

export default MenuCard;