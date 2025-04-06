import Image from 'next/image';
import HeroImg from '../../../../public/images/about/hero/bg.png';

const Hero = () => {
  return (
    <section className="relative flex flex-col  justify-center w-full h-screen">
      <div className="absolute inset-0 -z-10">
        <Image
          src={HeroImg}
          alt="Noodles background"
          fill
          className="object-cover"
          quality={100}
          priority
        />
      </div>
      <div className="px-4 mx-auto text-white flex flex-col items-start">
        <h2 className=" w-5/12 text-6xl font-bold mb-4">
          Creating a New World of <span className='text-yellow-400'>FlaVORs</span>
        </h2>
        <p className="mb-8 text-lg">
          Order Exactly What You Crave, Anytime, Anywhere! This highlights the customization aspect, 
          emphasizes convenience, and makes it clear you&apos;re offering delivery with a wide selection.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="px-6 py-2 bg-primary rounded-lg">
            check blog post
          </button>
          <button className="px-6 py-2 bg-secondary rounded-lg">
            book a reservation
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;