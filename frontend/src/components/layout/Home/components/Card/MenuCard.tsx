import { MenuCardProps } from "@/lib/types/home";
import React from "react";
import { GrCart } from "react-icons/gr";
import Image from "next/image";

const MenuCard: React.FC<MenuCardProps> = ({ name, img, text, newPrice, formerPrice }) => {
    return (
      <div className="bg-[#191919] p-4 rounded-xl h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]">
        <div className="w-full h-56 overflow-hidden rounded-lg mb-4 relative">
          <Image
            src={img}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover hover:scale-105 transition-transform duration-300"
            priority={false}
          />
        </div>
        
        <div className="flex flex-col gap-2 flex-grow">
          <h3 className="text-lg font-bold text-[#FBBC05] line-clamp-1">{name}</h3>
          <p className="text-gray-300 text-sm line-clamp-2 min-h-[2.5rem]">{text}</p>
          
          <div className="flex justify-between items-center mt-auto pt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-white">${newPrice}</span>
              {formerPrice && (
                <span className="text-sm text-red-500 line-through">${formerPrice}</span>
              )}
            </div>
            <button className="p-2 rounded-full bg-[#FBBC05] hover:bg-yellow-400 transition-colors">
              <GrCart size={18} className="text-gray-900" />
            </button>
          </div>
        </div>
      </div>
    );
  };

export default MenuCard;