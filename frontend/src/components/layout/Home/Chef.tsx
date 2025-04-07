import Image from "next/image";
import { Steak } from "@/lib/services/image";

const Chef = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col gap-3 items-center text-center my-5">
        <h3 className="text-2xl md:text-4xl capitalize font-semibold">
          why we are best food maker
        </h3>
        <p className="w-full md:w-10/12 lg:w-6/12">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem scrambled it to make a type specimen book.
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row my-10 gap-10 mb-20">
        <div className="order-2 lg:order-1 lg:w-1/2">
          <p className="text-base md:text-xl">
            It is a long established fact that a reader will be distracted layout. 
            The point of using Lorem Ipsum is that it has a more-or-less normal 
            distribution of letters, as opposed to using English. Many desktop 
            publishing packages and web page editors now use Lorem Ipsum as their 
            default model text, and a search for &apos;lorem ipsum&apos; will uncover many 
            web sites still in their infancy. Various versions have evolved over 
            the years, sometimes by accident, sometimes on purpose It is a long 
            established fact that a reader will be distracted by the readable 
            content of a page when looking at its layout. The normal distribution 
            of letters, as opposed to using &apos;Content Many desktop publishing 
            packages and web page editors search for &apos;lorem ipsum&apos; will uncover 
            many web sites still in humour and the like. 
            <button className="text-md font-bold block mt-4 md:inline md:mt-0">
              Read More
            </button>
          </p>
        </div>
        
        <div className="order-1 lg:order-2 lg:w-1/2">
          <div className="relative w-full h-64 md:h-80 lg:h-[30rem]">
            <Image
              src={Steak}
              alt="Chef image"
              layout="fill"
              objectFit="cover"
              className="rounded-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chef;