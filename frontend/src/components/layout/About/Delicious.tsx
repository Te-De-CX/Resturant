import FoodCard from "./components/FoodCard";
import { foodData } from "@/lib/data/about/Food";

const Delicious = () => {

    const delicious = (
        <>
           <main>
            <h3>why is it so delicious</h3>
            <div>
                {
                    foodData.map( value => (
                        <FoodCard 
                            key={value.id} 
                            text={value.text} 
                            img={value.img} 
                            title={value.title}  
                        />
                    ))
                }
            </div>
           </main>
        </>
    )

    return delicious;
}

export default Delicious;