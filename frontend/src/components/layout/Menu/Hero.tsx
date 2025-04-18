'use client';

import Image from 'next/image';
import HeroImg from '../../../../public/images/menu/hero/bg.png';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';

const Hero = () => {
  return (
    <section className="relative flex items-center justify-center w-full h-screen min-h-[600px] overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src={HeroImg}
          alt="Delicious noodles background"
          fill
          className="object-cover"
          priority
          quality={100}
          placeholder="blur"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="px-4 mx-auto max-w-7xl w-full text-white">
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-[6rem] font-bold text-yellow-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Creating a New World of FlaVORs
          </motion.h2>
          <div>
            <Marquee>
              
            </Marquee>
          </div>
        </motion.div>
      </div>


    </section>
  );
};

export default Hero;