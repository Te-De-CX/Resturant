import Image from "next/image";
import MealPlanner from "./MealPlanner";
import Bg from "../../../../../../public/images/dashboard/home/menu.jpg";
import HomeCart from "@/components/layout/Cart/HomeCart";

const Orders = () => {
  return (
    <section className="z-50 md:fixed lg:right-0 lg:top-0 lg:h-screen lg:w-80 w-full bg-white lg:bg-transparent shadow-lg lg:shadow-none">
      <div className="relative h-full w-full">
        {/* Background Image - only visible on desktop */}
        <div className="hidden lg:block absolute inset-0 -z-10">
          <Image
            src={Bg}
            alt="Menu Background"
            fill
            className="object-cover"
            quality={100}
            priority
          />
        </div>
        
        <div className="relative h-full w-full flex flex-col px-4 gap-4">
          <MealPlanner />
          <div className="lg:bg-[#868686] lg:bg-opacity-20 lg:text-white bg-white text-gray-800 p-4 lg:p-6 rounded-xl lg:border-2 lg:border-white lg:backdrop-blur-2xl w-full flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] border-black border-2">
            <div className="[&::-webkit-scrollbar]:hidden">
              <HomeCart />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Orders;