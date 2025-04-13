'use client';

import Image from "next/image";
import { useCategories } from "@/lib/api/categories";
import Marquee from "react-fast-marquee";

const Categories = () => {
    const { data = [], isLoading, error } = useCategories();
    
    if (isLoading) return <div>Loading products...</div>;
    if (error) return <div>Error loading products: {error.message}</div>;

    return (
        <>
            <h2 className="text-2xl font-bold mb-4 px-8">Categories</h2>
            <Marquee>
                {data.map((category) => (
                    <div key={category.id} className="bg-[#191919] text-white shadow-md rounded-3xl mx-2 p-4 mb-4 relative h-40 flex flex-col items-center justify-center w-32 gap-2">
                        <div className="relative  h-20 w-20 rounded-full overflow-hidden mx-auto flex items-center border-white border-2">
                            <Image
                                src={category.image}
                                alt={category.name}
                                fill
                                className="object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null;
                                    target.src = '/fallback-image.jpg';
                                }}
                            />
                        </div>
                        <h2 className=" w-full text-xs h-5 flex items-center justify-center text-center font-semibold mt-2">{category.name}</h2>
                    </div>
                ))}
            </Marquee>
        </>
    );
};

export default Categories;