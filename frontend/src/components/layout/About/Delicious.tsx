import Image from "next/image";
import FoodCard from "./components/FoodCard";
import { foodData } from "@/lib/data/about/Food";

const Delicious = () => {
    return (
        <main className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
                Why is it so <span className="text-amber-600">delicious</span>?
            </h3>
            
            <div className="flex flex-col gap-10">
                <FoodCard 
                    text={foodData[0].text} 
                    img={foodData[0].img} 
                    title={foodData[0].title}  
                />
                <div className="grid grid-cols-2 items-center" >
                        <div className="flex flex-col gap-4" >
                            <h5 className="text-3xl font-semibold capitalize mb-2" >{foodData[1].title}</h5>
                            <p className="text-xl leading-8 font-light" >{foodData[1].text}</p>
                        </div>
                    <div className="h-[30rem] w-[35rem] overflow-hidden flex items-center rounded-2xl">
                        <Image
                            src={foodData[1].img}
                            alt={foodData[1].title}
                            className="object-cover rounded-2xl"
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