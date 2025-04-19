'use client';

import Image from "next/image";
import { ChefCardProp } from "@/lib/types/about";
import { motion } from "framer-motion";

const ChefCard: React.FC<ChefCardProp> = ({ img, name, text }) => {
    return (
        <motion.div 
            className="group w-full max-w-[27rem] p-5 rounded-2xl relative h-full overflow-hidden mx-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            {/* Blur Background */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10" />
            
            {/* Chef Image */}
            <motion.div 
                className="aspect-square my-3 overflow-hidden rounded-xl relative z-10"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
                <Image
                    src={img}
                    alt={name}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full"
                />
            </motion.div>
            
            {/* Chef Info */}
            <div className="relative z-10 flex flex-col items-start justify-start px-3 py-2 pb-5 text-white">
                <motion.h6 
                    className="text-2xl text-amber-400 font-bold mb-2"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    {name}
                </motion.h6>
                <motion.p 
                    className="font-light line-clamp-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {text}
                </motion.p>
            </div>
            
            {/* Specialty Badge with animation */}
            <motion.div 
                className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.3 }}
                whileHover={{ scale: 1.1 }}
            >
                Master Chef
            </motion.div>
        </motion.div>
    );
};

export default ChefCard;