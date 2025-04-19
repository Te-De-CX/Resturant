import Image from "next/image";
import FoodCard from "./components/FoodCard";
import { foodData } from "@/lib/data/about/Food";

const Delicious = () => {
    return (
        <main className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">
                Why is it so <span className="text-amber-600">delicious</span>?
            </h3>
            
            <div className="flex flex-col gap-8 sm:gap-10">
                <FoodCard 
                    text={foodData[0].text} 
                    img={foodData[0].img} 
                    title={foodData[0].title}  
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-8">
                    <div className="flex flex-col gap-4 px-4 md:px-0 order-2 md:order-1">
                        <h5 className="text-2xl sm:text-3xl font-semibold capitalize mb-2">{foodData[1].title}</h5>
                        <p className="text-base sm:text-xl leading-7 sm:leading-8 font-light">{foodData[1].text}</p>
                    </div>
                    <div className="h-64 sm:h-80 md:h-[30rem] w-full md:w-[35rem] overflow-hidden flex items-center rounded-2xl order-1 md:order-2">
                        <Image
                            src={foodData[1].img}
                            alt={foodData[1].title}
                            className="object-cover rounded-2xl w-full h-full"
                            width={600}
                            height={600}
                        />
                    </div>
                </div>
                
                <FoodCard 
                    text={foodData[2].text} 
                    img={foodData[2].img} 
                    title={foodData[2].title}  
                />
            </div>
        </main>
    );
};

export default Delicious;