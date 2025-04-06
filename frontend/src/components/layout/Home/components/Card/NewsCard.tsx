import { NewsCardProps } from "@/lib/types/home";
import Image from "next/image";

const NewsCard: React.FC<NewsCardProps> = ({ img, name,
    date 
 }) => {

    const newsCard = (
        <>
           <Image
                src={img}
                alt={name}
            />
            <div className="flex flex-col gap-2 items-start" >
                <p className="text-sm" >{date}</p>
                <h3 className="text-xl font-semibold" >{name}</h3>
            </div>
        </>
    )

    return newsCard;
}

export default NewsCard;