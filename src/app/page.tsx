'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Hero from '@/components/Hero';
import RevealedContent from '@/components/RevealedContent';
import DayToNight from '@/components/DayToNight'; // Import the new component

export default function Home() {
  const scrollContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: scrollContainerRef });

  // --- Refs and Scroll Hooks for Individual Sections ---
  const heroSectionRef = useRef(null);
  const dayToNightSectionRef = useRef(null); // Ref for the new section

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroSectionRef,
    offset: ['start start', 'end end'],
  });

  // This hook tracks scroll progress ONLY within the DayToNight section
  const { scrollYProgress: dayToNightProgress } = useScroll({
    target: dayToNightSectionRef,
    offset: ['start end', 'end start'], // Animate as it passes through the viewport
  });

  // --- Animation Values ---
  const backgroundColor = useTransform(heroProgress, [0.3, 0.6], ["#000000", "#F5F5F5"]);
  const contentOpacity = useTransform(heroProgress, [0.3, 0.6], [0, 1]);
  const contentScale = useTransform(heroProgress, [0.3, 0.6], [0.95, 1]);
  
  // Fade out the revealed content as the next section comes up
  const contentFadeOut = useTransform(heroProgress, [0.8, 1], [1, 0]);

  return (
    // We now use the main ref on the body, but keep section refs
    <main ref={scrollContainerRef}>
      
      {/* --- SECTION 1 & 2: HERO & REVEAL --- */}
      {/* This section now has a defined height */}
      <section ref={heroSectionRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div className="absolute inset-0 z-0" style={{ backgroundColor }} />
          
          <motion.div 
            className="absolute inset-0 z-10"
            style={{ opacity: contentOpacity, scale: contentScale, y: useTransform(contentFadeOut, v => v * -100) }} // Moves up and out
          >
            <RevealedContent scrollYProgress={heroProgress} />
          </motion.div>
          
          <Hero scrollYProgress={heroProgress} />
        </div>
      </section>

      {/* --- SECTION 3: DAY TO NIGHT INTERACTIVE --- */}
      {/* This section is where the interactive magic happens */}
      <section ref={dayToNightSectionRef} className="relative h-screen bg-black">
        <div className="sticky top-0 h-screen overflow-hidden">
          <DayToNight sectionScrollProgress={dayToNightProgress} />
        </div>
      </section>

      {/* The rest of the landing page will go here... */}
      <section className="h-screen bg-[#F5F5F5]">
        {/* Placeholder for the next section */}
      </section>
      
    </main>
  );
}