import Image from 'next/image';
import HeroImg from '../../../../public/images/about/hero/bg.png';
import { chefsData } from '@/lib/data/about/Chefs';
import ChefsCarousel from './carousel/ChefsCarosel';

const Chefs = () => {
    return (
        <section className="relative">
            {/* Hero Background */}
            <div className="absolute inset-0 -z-10 h-[50vh]">
                <Image
                    src={HeroImg}
                    alt="Chefs background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>
            
            {/* Content */}
            <div className="container mx-auto px-4 py-24 relative">
                {/* Section Heading */}
                <h5 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
                    Our <span className="text-amber-400">Top Notch</span> Chefs
                </h5>
                
                {/* Chef Carousel */}
                <div className="mx-auto px-4">
                    <ChefsCarousel chefs={chefsData} />
                </div>
            </div>
        </section>
    );
};

export default Chefs;