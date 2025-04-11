import { NewsCardProps } from "@/lib/types/home";
import Image from "next/image";

const NewsCard: React.FC<NewsCardProps> = ({ img, name, date }) => {
  return (
    <div className="transition-all duration-300 px-5">
      <div className="flex relative gap-14 aspect-[4/4] mx-3 mb-5 ">
        <div className="bg-yellow-500 right-10 top-10 rounded-xl absolute w-full h-full"></div>
        <div className="relativerounded-lg overflow-hidden flex">
          <Image
            src={img}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 h-44 w-44 group-hover:scale-105 rounded-xl"
            // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
      </div>
      </div>
      <div className="flex flex-col gap-3 p-6">
        <p className="text-sm text-gray-500">{date}</p>
        <h3 className="text-xl font-semibold text-gray-800 transition-colors duration-300 group-hover:text-primary">
          {name}
        </h3>
      </div>
    </div>
  );
};

export default NewsCard;