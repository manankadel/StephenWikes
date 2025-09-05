'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Hero from '@/components/Hero';
import RevealedContent from '@/components/RevealedContent';
import DayToNight from '@/components/DayToNight';

export default function Home() {
  const mainSectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: mainSectionRef,
    offset: ['start start', 'end end'],
  });

  // --- UNIFIED TIMELINE ---
  // Scene 1 (Hero & Reveal) happens in the first half of the scroll (0% to 50%)
  const heroProgress = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  // Scene 2 (DayToNight Fractal) happens in the second half (50% to 100%)
  const dayToNightProgress = useTransform(scrollYProgress, [0.5, 1], [0, 1]);


  // --- ANIMATION VALUES FOR SCENE 1 ---
  const revealProgress = useTransform(heroProgress, [0.3, 0.8], [0, 1]); // Based on hero's own progress
  const backgroundColor = useTransform(revealProgress, [0, 1], ["#000000", "#F5F5F5"]);
  const contentOpacity = useTransform(revealProgress, [0, 1], [0, 1]);
  const contentScale = useTransform(revealProgress, [0, 1], [0.95, 1]);


  // --- THE KEY FIX: Fading between the two scenes ---
  // Scene 1 (Hero) will fade OUT as we approach the halfway mark.
  const sceneOneOpacity = useTransform(scrollYProgress, [0.45, 0.5], [1, 0]);
  // Scene 2 (DayToNight) will fade IN right at the halfway mark.
  const sceneTwoOpacity = useTransform(scrollYProgress, [0.5, 0.55], [0, 1]);


  return (
    <main>
      {/* We have ONE main section that is 800vh tall to give both animations plenty of space */}
      <section ref={mainSectionRef} className="relative h-[800vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          
          {/* Layer 1: The Animated Background */}
          <motion.div className="absolute inset-0 z-0" style={{ backgroundColor }} />
          
          {/* --- SCENE 1 CONTAINER --- */}
          <motion.div style={{ opacity: sceneOneOpacity }}>
            {/* The Revealed Content */}
            <motion.div 
              className="absolute inset-0 z-10"
              style={{ opacity: contentOpacity, scale: contentScale }}
            >
              <RevealedContent scrollYProgress={revealProgress} />
            </motion.div>
            
            {/* The Hero Photos */}
            <Hero scrollYProgress={heroProgress} />
          </motion.div>

          {/* --- SCENE 2 CONTAINER --- */}
          {/* This entire section is invisible until the first one is done */}
          <motion.div 
            className="absolute inset-0 z-20" 
            style={{ opacity: sceneTwoOpacity }}
          >
            <DayToNight sectionScrollProgress={dayToNightProgress} />
          </motion.div>

        </div>
      </section>

      {/* Placeholder for the rest of your page */}
      <section className="h-screen bg-[#F5F5F5]">
        <div className="flex items-center justify-center h-full">
          <h2 className="text-4xl font-serif">The Journey Continues...</h2>
        </div>
      </section>
    </main>
  );
}