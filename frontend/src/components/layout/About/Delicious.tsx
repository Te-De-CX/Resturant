import FoodCard from "./components/FoodCard";
import { foodData } from "@/lib/data/about/Food";

const Delicious = () => {
    return (
        <main className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
                Why is it so <span className="text-amber-600">delicious</span>?
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {foodData.map((value) => (
                    <div key={value.id} className="h-full">
                        <FoodCard 
                            text={value.text} 
                            img={value.img} 
                            title={value.title}  
                        />
                    </div>
                ))}
            </div>
        </main>
    );
};

export default Delicious;