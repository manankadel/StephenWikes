'use client';

import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function DayToNight({ sectionScrollProgress }: { sectionScrollProgress: MotionValue<number> }) {
  
  // Animate the horizontal position of our "wipe" element from -100% to 0
  const wipeX = useTransform(sectionScrollProgress, [0, 1], ["-100%", "0%"]);

  // The text reveal logic is restored to the simple wipe
  const textClipPathValue = useTransform(sectionScrollProgress, [0.2, 0.8], [100, 0]);
  const textClipPath = useTransform(textClipPathValue, (value) => `inset(0% ${value}% 0% 0%)`);

  return (
    <div className="relative h-full w-full">
      {/* --- SVG "GOOEY" FILTER DEFINITION --- */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="gooey-liquid-filter">
            {/* Creates a blur effect */}
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            {/* Increases the contrast, creating sharp edges from the blur */}
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            {/* Puts the original graphic back on top */}
            <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
          </filter>
        </defs>
      </svg>
      
      {/* The base Black & White Image (always visible) */}
      <Image
        src="/day-to-night-serengeti.jpeg"
        alt="A Stephen Wilkes Day to Night photograph (black and white)"
        fill
        style={{ objectFit: 'cover', filter: 'grayscale(1)' }}
        quality={90}
      />
      
      {/* This container will have the "gooey" filter applied to it */}
      <div 
        className="absolute inset-0"
        style={{ filter: 'url(#gooey-liquid-filter)' }}
      >
        {/* This is the animated "wipe" element. It's a white box that moves across the screen. */}
        {/* The filter will make its edge look liquid as it reveals the color image. */}
        <motion.div
          className="absolute inset-0 bg-white"
          style={{ 
            x: wipeX,
            maskImage: 'url(/day-to-night-serengeti.jpeg)',
            maskSize: 'cover',
            WebkitMaskImage: 'url(/day-to-night-serengeti.jpeg)',
            WebkitMaskSize: 'cover',
          }}
        />
      </div>

      {/* The Title Section */}
      <div className="absolute bottom-10 left-10">
        <h3 className="text-outline font-serif text-4xl font-bold">Day to Night™</h3>
        <p className="text-outline text-lg">Serengeti National Park, Tanzania</p>
        
        <motion.div 
          className="absolute top-0 left-0"
          style={{ clipPath: textClipPath }}
        >
          <h3 className="text-white font-serif text-4xl font-bold">Day to Night™</h3>
          <p className="text-white text-lg">Serengeti National Park, Tanzania</p>
        </motion.div>
      </div>
    </div>
  );
}