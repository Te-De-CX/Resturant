import Image from 'next/image';
import HeroImg from '../../../../public/images/about/hero/bg.png';

const Started = () => {
    return (
        <article className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Section Heading */}
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
                How It All <span className="text-amber-600">Started</span>
            </h3>
            
            {/* Content Container */}
            <div className="flex flex-col lg:flex-row gap-12 items-center">
                {/* Text Content */}
                <div className="lg:w-1/2">
                    <p className="text-gray-600 text-lg leading-relaxed">
                        It is a long established fact that a reader will be distracted by the readable 
                        content of a page when looking at its layout. The point of using Lorem Ipsum 
                        is that it has a more-or-less normal distribution of letters, as opposed to 
                        using English. Many desktop publishing packages and web page editors now use 
                        Lorem Ipsum as their default model text, and a search for &apos;lorem ipsum&apos; will 
                        uncover many web sites still in their infancy.
                        <br /><br />
                        Various versions have evolved over the years, sometimes by accident, sometimes 
                        on purpose. It is a long established fact that a reader will be distracted by 
                        the readable content of a page when looking at its layout. The normal distribution 
                        of letters, as opposed to using &apos;Content here, content here&apos;, making it look like 
                        readable English.
                    </p>
                    
                    {/* Read More Button */}
                    <button className="mt-8 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium">
                        Read More
                    </button>
                </div>
                
                {/* Image */}
                <div className="lg:w-1/2 relative rounded-xl overflow-hidden shadow-lg">
                    <Image
                        src={HeroImg}
                        alt="Our restaurant's humble beginnings"
                        className="w-full h-auto object-cover"
                        placeholder="blur"
                    />
                    
                    {/* Image Decorative Element */}
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-amber-400 rounded-tl-xl z-10"></div>
                </div>
            </div>
            
            {/* Decorative Elements */}
            {/* <div className="hidden lg:block absolute left-0 top-1/4 w-16 h-16 bg-amber-100 rounded-full -translate-x-8"></div>
            <div className="hidden lg:block absolute right-0 bottom-1/4 w-24 h-24 bg-amber-200 rounded-full translate-x-12 opacity-70"></div> */}
        </article>
    );
};

export default Started;