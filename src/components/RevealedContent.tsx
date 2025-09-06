'use client';

import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';

export default function RevealedContent({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  
  const titleColor = useTransform(scrollYProgress, [0.3, 0.6], ["#FFFFFF", "#111827"]);
  const textColor = useTransform(scrollYProgress, [0.3, 0.6], ["#D1D5DB", "#4B5563"]);

  // The simple, straight-line clip-path reveal is restored
  const textClipPathValue = useTransform(scrollYProgress, [0.3, 0.6], [100, 0]);
  const textClipPath = useTransform(textClipPathValue, (value) => `inset(0% ${value}% 0% 0%)`);

  return (
    <div className="absolute inset-0 flex items-center justify-center text-center">
      <div className="max-w-3xl p-8">
        {/* Title Reveal */}
        <div className="relative">
          {/* Base outline text */}
          <h2 className="text-outline-dark font-serif text-5xl md:text-6xl font-bold mb-4" style={{ color: 'transparent' }}>
            Capturing Life, Unfiltered
          </h2>
          {/* Solid text that wipes in */}
          <motion.div className="absolute inset-0" style={{ clipPath: textClipPath }}>
             <motion.h2 className="font-serif text-5xl md:text-6xl font-bold mb-4" style={{ color: titleColor }}>
              Capturing Life, Unfiltered
            </motion.h2>
          </motion.div>
        </div>

        {/* Paragraph Reveal */}
        <div className="relative">
          {/* Base outline text */}
          <p className="text-outline-dark text-lg md:text-xl leading-relaxed" style={{ color: 'transparent' }}>
              Stephen Wikes is a photographer dedicated to finding the extraordinary in the everyday. 
              With a keen eye for light and emotion, his work tells stories that resonate, turning fleeting moments into timeless art.
          </p>
          {/* Solid text that wipes in */}
          <motion.div className="absolute inset-0" style={{ clipPath: textClipPath }}>
            <motion.p className="text-lg md:text-xl leading-relaxed" style={{ color: textColor }}>
              Stephen Wikes is a photographer dedicated to finding the extraordinary in the everyday. 
              With a keen eye for light and emotion, his work tells stories that resonate, turning fleeting moments into timeless art.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}