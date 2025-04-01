import Image from "next/image";
import { ReviewsCardProps } from "@/lib/types/home";

const ReviewsCard: React.FC <ReviewsCardProps> = ({ name,img,text,position,numberOfStars }) => {

    const reviewsCard = (
        <>
           <div>
             <Image 
                src={img}
                alt={name}
             />
             <div>
                <h3>{name}</h3>
                <p>{position}</p>
                <p>{numberOfStars}</p>
             </div>
             <p>
                {text}
             </p>
           </div>
        </>
    )

    return reviewsCard;
}

export default ReviewsCard;