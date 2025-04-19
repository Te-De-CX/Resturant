import Image from 'next/image';
import HeroImg from '../../../../public/images/about/hero/bg.png';

const Hero = () => {
  return (
    <section className="relative flex flex-col lg:flex-row items-center min-h-[80vh] bg-gray-50 overflow-hidden">
      {/* Content Section */}
      <div className="container mx-auto px-6 py-16 lg:py-0 lg:px-12 lg:w-1/2 z-10">
        <div className="max-w-lg mx-auto lg:mx-0">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Find the nearest restaurants around you
          </h3>
          
          <div className="relative mb-6">
            <input 
              type="text" 
              placeholder="Search here..." 
              className="w-full px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-500 text-white p-2 rounded-full hover:bg-primary-600 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="font-medium text-gray-700">New York</p>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="font-medium text-gray-700">United States</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Image Section */}
      <div className="">
        <Image
          src={HeroImg}
          alt="Noodles background"
          className="object-cover w-full h-full"
          quality={100}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </section>
  );
}

export default Hero;