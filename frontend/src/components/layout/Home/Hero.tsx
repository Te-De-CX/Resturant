import Image from "next/image";
import { HeroImage } from "@/lib/services/image";
import { RiMotorbikeFill } from "react-icons/ri";

const Hero = () => {
  return (
    <section className="relative w-full py-12 md:py-20 px-4 sm:px-8 lg:px-16 flex flex-col lg:flex-row items-center justify-between overflow-hidden">
      {/* Text Content */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4 z-10">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold capitalize">
          your <span className="text-[#FBBC05]">favorite</span> meals{" "}
          <span className="text-[#FBBC05]">delivered</span> to your door
        </h2>
        
        <p className="text-sm md:text-base w-full lg:w-10/12">
          Order exactly what you crave, anytime, anywhere! This highlights the 
          customization aspect, emphasizes convenience, and makes it clear you&apos;re 
          offering delivery with a wide selection.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-5">
          <button className="text-lg sm:text-xl md:text-2xl font-semibold text-white bg-black py-2 px-5 rounded-full capitalize hover:bg-gray-800 transition-colors">
            order now
          </button>
          <button className="bg-yellow-400 text-black text-base sm:text-lg font-bold py-2 px-3 uppercase flex items-center justify-center gap-1 hover:bg-yellow-500 transition-colors">
            check delivery <RiMotorbikeFill className="text-xl" />
          </button>
        </div>
      </div>

      {/* Image Content */}
      <div className="relative w-full lg:w-1/2 mt-10 lg:mt-0 flex justify-center lg:justify-end">
        <div className="relative w-full max-w-lg">
          <Image
            src={HeroImage}
            alt="hero image"
            width={700}
            height={700}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
        
        {/* Background Circle */}
        <div className="hidden lg:block absolute -right-[15rem] bottom-[5rem] w-[50rem] h-[50rem] bg-yellow-500 -z-10 rounded-full opacity-80" />
      </div>
    </section>
  );
};

export default Hero;