'use client';

import { motion } from 'framer-motion';
import { chefsData } from '@/lib/data/about/Chefs';
import ChefsCarousel from './carousel/ChefsCarosel';

const Chefs = () => {
    return (
        <section className="relative overflow-hidden py-20">
            {/* Content */}
            <div className="container mx-auto px-4 relative">
                {/* Section Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h5 className="text-4xl md:text-5xl font-bold text-black mb-4">
                        Our <span className="text-amber-400">Top Notch</span> Chefs
                    </h5>
                    <motion.div 
                        className="w-24 h-1 bg-amber-400 mx-auto"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    />
                </motion.div>
                
                {/* Chef Carousel */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <ChefsCarousel chefs={chefsData} />
                </motion.div>
            </div>
        </section>
    );
};

export default Chefs;