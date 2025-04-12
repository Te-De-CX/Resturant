import Marquee from "react-fast-marquee";
import MarqueeCard from "./components/Card/MarqueCard";
import { marqueeData } from "@/lib/data/home/others/marquee";

const Marque = () => {

    return (
        <div className="py-12">
            <h2 className="text-4xl font-bold text-center text-white mb-8">Our Popular Menu</h2>
            <Marquee 
                speed={40} 
                // pauseOnHover={true}
            >
                {marqueeData.map((item, index) => (
                    <MarqueeCard key={index} name={item.name} price={item.price} img={item.img} numberOfStars={item.numberOfStars} />
                ))}
            </Marquee>
        </div>
    );
};

export default Marque;