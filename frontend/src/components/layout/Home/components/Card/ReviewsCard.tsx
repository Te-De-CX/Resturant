import Image from "next/image";
import { ReviewsCardProps } from "@/lib/types/home";

const ReviewsCard: React.FC <ReviewsCardProps> = ({ name,img,text,position,numberOfStars }) => {

    const reviewsCard = (
        <>
           <div className="flex flex-col gap-2 py-2 px-3 rounded-xl bg-[#191919] text-white">
             <div className="flex flex-row gap-2" >
               <Image 
                  src={img}
                  alt={name}
                  className="rounded-full w-12 h-12"
                  width={50} 
               />
               <div className="flex flex-col gap-2" >
                  <h3 className="text-xl font-bold" >{name}</h3>
                  <p>{position}</p>
                  <p>{numberOfStars}</p>
               </div>
             </div>
             <div>
               &quot; <hr />
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