import Image from "next/image";
import Bg from "../../../../../../public/images/dashboard/home/menu.jpg";
import Img from "../../../../../../public/images/dashboard/home/routine.jpg";
import HomeCart from "@/components/layout/Cart/HomeCart";

const Orders = () => {
  return (
    <section className="relative h-screen w-80 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src={Bg}
          alt="Menu Background"
          fill
          className="object-cover"
          quality={100}
          priority
        />
      </div>
      <div className="relative h-full w-full flex flex-col items-center justify-center p-4 gap-4">
        <div className="bg-[#868686] bg-opacity-20 text-white p-6 rounded-xl border-2 border-white backdrop-blur-2xl">
            <h3 className="text-xl  capitalize font-bold text-center mb-4">your meal planner</h3>
            <div className="flex flex-col p-3 rounded-xl overflow-hidden relative bg-[#191919] bg-opacity-30">
                <div className="absolute inset-0 -z-10">
                    <Image
                    src={Img}
                    alt="Menu Background"
                    fill
                    className="object-cover"
                    quality={100}
                    priority
                    />
                </div>
                <div className="flex justify-between items-start my-2  ">
                    <h4 className="text-yellow-400 text-xl font-bold" >Mondays</h4>
                    <div className="flex flex-col text-sm" >
                        <p>April 1 2024</p>
                        <p>12:02 pm</p>
                    </div>
                </div>
                <div className="font-semibold" >
                    <p>Pizza and Perpperone toppings</p>
                </div>
                <div className="text-[0.7rem]">
                    Pizza and Perpperone toppings is one of the most healthiest meal
                </div>
            </div>
        </div>
        <div className="bg-[#868686] bg-opacity-20 text-white p-6 rounded-xl border-2 border-white backdrop-blur-2xl w-full flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none]">
          <div className="[&::-webkit-scrollbar]:hidden">
            <HomeCart />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Orders;