'use client';

import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

// --- Configuration for the Grid (from your example) ---
const GRID_ROWS = 12;
const GRID_COLS = 18;
const TOTAL_CELLS = GRID_ROWS * GRID_COLS;

// --- A Smart Cell Component (using your provided logic) ---
const Cell = ({ 
  index,
  scrollYProgress 
}: { 
  index: number;
  scrollYProgress: MotionValue<number>; 
}) => {
  const rowIndex = Math.floor(index / GRID_COLS);
  const colIndex = index % GRID_COLS;
  
  // This is the working logic from your example. It is correct.
  const start = (index / TOTAL_CELLS) * 0.8;
  const end = Math.min(start + 0.15, 1);

  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const scale = useTransform(scrollYProgress, [start, end], [0.3, 1]);

  return (
    <motion.div
      className="relative h-full w-full"
      style={{
        // THE KEY CHANGE: We are using our image here instead of a gradient.
        backgroundImage: `url(/day-to-night-serengeti.jpeg)`,
        backgroundSize: `${GRID_COLS * 100}% ${GRID_ROWS * 100}%`,
        backgroundPosition: `${colIndex * 100 / (GRID_COLS - 1)}% ${rowIndex * 100 / (GRID_ROWS - 1)}%`,
        willChange: 'transform, opacity',
        opacity,
        scale,
      }}
    />
  );
};


export default function DayToNight({ sectionScrollProgress }: { sectionScrollProgress: MotionValue<number> }) {
  
  const cells = Array.from({ length: TOTAL_CELLS }, (_, i) => i);
  
  // Text appears at the very end of the animation (logic from your example)
  const textOpacity = useTransform(sectionScrollProgress, [0.85, 1], [0, 1]);
  const textY = useTransform(sectionScrollProgress, [0.85, 1], [50, 0]);

  return (
    <div className="relative h-full w-full bg-black">
      {/* The Grid Container */}
      <div 
        className="grid h-full w-full"
        style={{
          gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
        }}
      >
        {/* Each cell gets the scroll progress */}
        {cells.map((_, i) => (
            <Cell 
              key={i} 
              index={i} 
              scrollYProgress={sectionScrollProgress}
            />
        ))}
      </div >

      {/* The Title Section */}
      <motion.div
        className="absolute bottom-10 left-10 text-white z-10"
        style={{ 
          opacity: textOpacity,
          y: textY
        }}
      >
        <h3 className="font-serif text-4xl font-bold">Day to Night™</h3>
        <p className="text-lg">Serengeti National Park, Tanzania</p>
      </motion.div>
    </div>
  );
}