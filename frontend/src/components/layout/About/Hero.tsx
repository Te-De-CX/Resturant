import Image from 'next/image';
import noodlesBg from '../../../../public/images/home/menu/noodles.jpg';

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center w-full h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={noodlesBg}
          alt="Noodles background"
          fill
          className="object-cover"
          quality={100}
          priority
        />
      </div>
      
      {/* Content */}
      <div className="text-center px-4 max-w-2xl mx-auto text-white">
        <h2 className="text-4xl font-bold mb-4">
          Creating a New World of FlaVORs
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