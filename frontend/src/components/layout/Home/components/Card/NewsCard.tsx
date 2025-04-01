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
            <div>
                <p>{date}</p>
                <h3>{name}</h3>
            </div>
        </>
    )

    return newsCard;
}

export default NewsCard;