import Image from "next/image";
import HeroImage  from "../../../../public/icons/svgs/home/hero.svg";
import { RiMotorbikeFill } from "react-icons/ri";
import Svg1 from "../.../../../../../public/icons/svgs/home/svg1.svg";
import Svg2 from "../.../../../../../public/icons/svgs/home/svg2.svg";
import Svg3 from "../.../../../../../public/icons/svgs/home/svg3.svg";

const Hero = () => {
  return (
    <section className="relative w-full pt-8 md:pt-12 lg:pt-20 px-4 sm:px-6 lg:px-8 xl:px-16 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4 overflow-hidden max-w-[1920px] mx-auto">
      {/* Text Content - now comes first in DOM for better mobile flow */}
      <div className="w-full lg:w-1/2 flex flex-col gap-3 sm:gap-4 md:gap-6 z-10 order-1 lg:order-none">
        <h2 className="text-3xl xs:text-4xl sm:text-4xl md:text-[3.6rem] font-bold capitalize leading-tight sm:leading-tight md:leading-tight">
          your <span className="text-[#FBBC05]">favorite</span> meals{" "}
          <span className="text-[#FBBC05]">delivered</span> to your door
        </h2>
        
        <p className="text-sm sm:text-base md:text-md w-full lg:w-10/12 text-gray-700">
          Order exactly what you crave, anytime, anywhere! This highlights the 
          customization aspect, emphasizes convenience, and makes it clear you&apos;re 
          offering delivery with a wide selection.
        </p>
        
        <div className="flex  flex-row gap-3 sm:gap-4 mt-4 sm:mt-6">
          <button className="text-base sm:text-lg md:text-xl font-semibold text-white bg-black py-2 px-6  sm:px-8 md:px-10 rounded-full capitalize hover:bg-gray-800 transition-colors whitespace-nowrap">
            order now
          </button>
          <button className="text-sm sm:text-base md:text-lg bg-yellow-400 text-black font-bold py-2 px-4 sm:px-5 uppercase flex items-center justify-center gap-1 hover:bg-yellow-500 transition-colors whitespace-nowrap">
            check delivery <RiMotorbikeFill className="text-lg sm:text-xl" />
          </button>
        </div>
      </div>

      {/* Image Content */}
      <div className="relative w-full lg:w-1/2 mt-6 sm:mt-8 md:mt-10 lg:mt-0 flex justify-center lg:justify-end order-0 lg:order-none">
        <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg">
          <Image
            src={HeroImage}
            alt="Delicious food delivery"
            width={700}
            height={700}
            className="w-full h-auto object-contain"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px"
          />
        </div>
        
        {/* Background Circle - now responsive */}
        <div className="hidden lg:block absolute -right-[10rem] lg:-right-[15rem] bottom-[3rem] lg:bottom-[5rem] w-[30rem] lg:w-[40rem] xl:w-[50rem] h-[30rem] lg:h-[40rem] xl:h-[50rem] bg-[#fff423] -z-10 rounded-full" />
        
        {/* Decorative SVGs - now responsive and properly positioned */}
        <div className="hidden sm:block">
          <Image 
            src={Svg1}
            alt="Decorative element 1" 
            className="absolute left-2 sm:left-4 md:left-6 w-[4rem] sm:w-[5rem] md:w-[6rem] lg:w-[7rem] -z-10"
          />
          <Image 
            src={Svg2}
            alt="Decorative element 2" 
            className="absolute left-2 sm:left-3 bottom-2 sm:bottom-4 md:bottom-7 w-[5rem] sm:w-[6rem] md:w-[7rem] lg:w-[8rem] -z-10"
          />
          <Image 
            src={Svg3}
            alt="Decorative element 3" 
            className="absolute right-2 sm:right-3 w-[2.5rem] sm:w-[3rem] md:w-[3.5rem] lg:w-[4rem] -z-10"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;