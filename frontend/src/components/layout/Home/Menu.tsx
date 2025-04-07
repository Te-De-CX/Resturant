import MenuCard from "./components/Card/MenuCard";
import { card } from "@/lib/data/home/Menu";

const Menu = () => {

    
    const menu = (
        <>
         <h3 className="text-center text-4xl capitalize font-semibold" >our best & delicious menu</h3>
            <ul>
                {
                    ["all", "bread", "chiffon & rolls", "donut", "pastry and danish", "cakes", "cookies"].map( ( value, index ) => (
                        <li key={index} >
                            <a href="">{value}</a>
                        </li>
                    ))
                }
            </ul>
            <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32">
                {card.map((value, index) => (
                <MenuCard 
                    key={index}
                    name={value.name} 
                    img={value.img} 
                    text={value.text} 
                    newPrice={value.price} 
                    formerPrice={value.formerPrice} 
                />
                ))}
            </div>
            </>
            <div className="flex justify-center mt-8">
                <button className="text-lg py-4 px-12 capitalize text-white bg-black rounded-full" >see all</button>
            </div>
        </>
    )

    return menu;
}

export default Menu;