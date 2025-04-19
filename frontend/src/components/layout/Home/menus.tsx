import MenuCard from "./components/Card/MenuCard";
import { card } from "@/lib/data/home/Menu";

const Menu = () => {
    const menu = (
        <div className="container mx-auto py-12">
            <h3 className="text-center text-4xl capitalize font-semibold mb-12">our best & delicious menu</h3>
            
            {/* Navbar-style menu */}
            <div className="flex justify-center mb-12">
                <ul className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6 px-4 py-2 bg-gray-100 rounded-full shadow-inner">
                    {["all", "bread", "chiffon & rolls", "donut", "pastry and danish", "cakes", "cookies"].map((value, index) => (
                        <li key={index}>
                            <a 
                                href="#" 
                                className="block px-4 py-2 rounded-full capitalize transition-all hover:bg-white hover:shadow-md hover:text-primary focus:bg-white focus:shadow-md focus:text-primary"
                            >
                                {value}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            
            {/* Menu cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-8 md:px-12">
                {card.map((value, index) => (
                    <MenuCard 
                        key={index}
                        name={value.name} 
                        img={value.img} 
                        description={value.text} 
                        newPrice={value.price} 
                        formerPrice={value.formerPrice} 
                    />
                ))}
            </div>
            
            {/* See all button */}
            <div className="flex justify-center mt-12">
                <button className="text-lg py-4 px-12 capitalize text-white bg-black rounded-full hover:bg-gray-800 transition-colors">
                    see all
                </button>
            </div>
        </div>
    )

    return menu;
}

export default Menu;