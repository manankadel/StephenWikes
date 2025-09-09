'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, useTransform, MotionValue } from 'framer-motion';

export default function RevealedContent({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  
  const titleColor = useTransform(scrollYProgress, [0.3, 0.6], ["#FFFFFF", "#111827"]);
  const textColor = useTransform(scrollYProgress, [0.3, 0.6], ["#D1D5DB", "#4B5563"]);
  const textClipPathValue = useTransform(scrollYProgress, [0.3, 0.6], [100, 0]);
  const textClipPath = useTransform(textClipPathValue, (value) => `inset(0% ${value}% 0% 0%)`);
  const imageOpacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);
  const imageScale = useTransform(scrollYProgress, [0.4, 0.7], [0.95, 1]);

  const router = useRouter();

  const handleNavigation = () => {
    // Directly navigate to the portfolio page on click
    router.push('/portfolio');
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div 
        className="flex w-full max-w-7xl items-center justify-center gap-16 p-8 cursor-pointer"
        onClick={handleNavigation}
      >
        <div className="w-3/5 text-left">
          <div className="relative">
            <div style={{ color: 'transparent' }}>
              <p className="text-outline-dark text-sm uppercase tracking-widest mb-4">
                Through this lens
              </p>
              <h2 className="text-outline-dark font-serif text-5xl md:text-7xl font-bold uppercase leading-tight">
                My passions extend far beyond the confines of my workspace. Traveling and photography beckon me with their irresistible allure.
              </h2>
              <p className="text-outline-dark text-xs mt-8 max-w-2xl">
                *In the art of photography, I find not only a means of documenting my travels but also a medium through which I can share my experiences and emotions with others.
              </p>
            </div>
            <motion.div className="absolute inset-0" style={{ clipPath: textClipPath }}>
              <motion.p className="text-sm uppercase tracking-widest mb-4" style={{ color: textColor }}>
                Through this lens
              </motion.p>
              <motion.h2 className="font-serif text-5xl md:text-7xl font-bold uppercase leading-tight" style={{ color: titleColor }}>
                 My passions extend far beyond the confines of my workspace. Traveling and photography beckon me with their irresistible allure.
              </motion.h2>
              <motion.p className="text-xs mt-8 max-w-2xl" style={{ color: textColor }}>
                *In the art of photography, I find not only a means of documenting my travels but also a medium through which I can share my experiences and emotions with others.
              </motion.p>
            </motion.div>
          </div>
        </div>
        <motion.div 
          className="w-2/5"
          style={{ opacity: imageOpacity, scale: imageScale }}
        >
          <div className="relative aspect-[3/4] rounded-lg border-8 border-white shadow-2xl overflow-hidden">
            <Image
              src="/hero-gallery/Stephen.webp"
              alt="Portrait of Stephen Wikes"
              layout="fill"
              objectFit="cover"
              className="grayscale"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}