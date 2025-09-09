
'use client';

import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

// This component receives the scroll progress for this specific scene (from 0 to 1)
export default function VideoDayNight({ sectionScrollProgress }: { sectionScrollProgress: MotionValue<number> }) {
  
  // --- Animation for the "DAY" content ---
  // It will be fully visible at the start (0) and fade out by the halfway point (0.5)
  const dayOpacity = useTransform(sectionScrollProgress, [0, 0.4], [1, 0]);
  const dayY = useTransform(sectionScrollProgress, [0, 0.4], [0, -50]); // Moves up as it fades

  // --- Animation for the "NIGHT" content ---
  // It will start fading in after the halfway point (0.5) and be fully visible at the end (1)
  const nightOpacity = useTransform(sectionScrollProgress, [0.6, 1], [0, 1]);
  const nightY = useTransform(sectionScrollProgress, [0.6, 1], [50, 0]); // Moves up into place

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* 1. Background Video */}
      <video
        // IMPORTANT: Replace 'background.mp4' with the name of your video file
        src="/background.mp4"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline // Important for mobile browsers
      />
      
      {/* 2. Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* 3. Content Container */}
      <div className="relative z-20 h-full w-full flex flex-col justify-center items-center text-white text-center p-8">
        
        {/* "DAY" SECTION */}
        <motion.div
          className="absolute flex flex-col items-center"
          style={{ opacity: dayOpacity, y: dayY }}
        >
          <h2 className="font-serif text-8xl md:text-9xl font-bold uppercase">DAY</h2>
          <p className="max-w-xl mt-4 text-lg">
            Exploring the world in the harsh light of day reveals its raw, unfiltered beauty. Every detail is sharp, every shadow tells a story.
          </p>
        </motion.div>

        {/* "NIGHT" SECTION */}
        <motion.div
          className="absolute flex flex-col items-center"
          style={{ opacity: nightOpacity, y: nightY }}
        >
          <h2 className="font-serif text-8xl md:text-9xl font-bold uppercase">NIGHT</h2>
          <p className="max-w-xl mt-4 text-lg">
            When darkness falls, the world transforms. The unseen emerges, and a different kind of magic, quiet and mysterious, takes over.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
