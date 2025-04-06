import { MarqueCardProps } from "@/lib/types/home";
import Image from "next/image";

const MenuCard: React.FC<MarqueCardProps> = ({ name, price, img,numberOfStars }) => {

    const menuCard = (
        <>
           <article className="flex rounded-xl bg-[#191919] text-white py-2 px-4" >
            <Image
                src={img}
                alt={name}
                className="rounded-full w-32 h-32"
            />
            <div className="flex flex-col gap-2 text-lg font-bold items-start" >
                <h3>{name}</h3>
                <p>${price}</p>
                <p>{numberOfStars}</p>
            </div>
           </article>
        </>
    )

    return menuCard;
}

export default MenuCard;