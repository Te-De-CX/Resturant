import { NewsCardProps } from "@/lib/types/home";
import Image from "next/image";

const NewsCard: React.FC<NewsCardProps> = ({ img, name, date }) => {
  return (
    <div className="group overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={img}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
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