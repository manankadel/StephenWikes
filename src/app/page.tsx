// FILE: src/app/page.tsx
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Hero from '@/components/Hero';
import RevealedContent from '@/components/RevealedContent';
import VideoDayNight from '@/components/VideoDayNight';
import WorkSection from '@/components/WorkSection';

export default function Home() {
  const mainSectionRef = useRef(null);

  // --- Master Scroll Timeline ---
  const { scrollYProgress } = useScroll({
    target: mainSectionRef,
    offset: ['start start', 'end end'],
  });

  // --- Scene Timelines ---
  const sceneOneProgress = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const sceneTwoProgress = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  // --- Scene 1 Animations ---
  const backgroundColor = useTransform(sceneOneProgress, [0.3, 0.8], ["#000000", "#F5F5F5"]);

  // --- Clickability Logic ---
  const heroPointerEvents = useTransform(sceneOneProgress, (value) => (value < 0.6 ? 'auto' : 'none'));
  const contentPointerEvents = useTransform(sceneOneProgress, (value) => (value > 0.7 ? 'auto' : 'none'));

  // --- Cross-Fade Between Scenes ---
  const sceneOneOpacity = useTransform(scrollYProgress, [0.75, 0.8], [1, 0]);
  const sceneTwoOpacity = useTransform(scrollYProgress, [0.8, 0.85], [0, 1]);
  
  const sceneTwoPointerEvents = useTransform(sceneTwoOpacity, (value) => (value > 0 ? 'auto' : 'none'));

  return (
    <main>
      <section ref={mainSectionRef} className="relative h-[800vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          
          <motion.div className="absolute inset-0 z-0" style={{ backgroundColor }} />
          
          {/* --- SCENE 1 CONTAINER --- */}
          <motion.div style={{ opacity: sceneOneOpacity }} className="absolute inset-0">

            <motion.div style={{ pointerEvents: heroPointerEvents }} className="absolute inset-0 z-10">
              <Hero scrollYProgress={sceneOneProgress} />
            </motion.div>

            <motion.div style={{ pointerEvents: contentPointerEvents }} className="absolute inset-0 z-20">
              <RevealedContent scrollYProgress={sceneOneProgress} />
            </motion.div>
            
          </motion.div>

          {/* --- SCENE 2 CONTAINER --- */}
          <motion.div 
            className="absolute inset-0 z-30" 
            style={{ 
              opacity: sceneTwoOpacity, 
              pointerEvents: sceneTwoPointerEvents
            }}
          >
            <VideoDayNight sectionScrollProgress={sceneTwoProgress} />
          </motion.div>

        </div>
      </section>

      {/* --- 2. REPLACE THE PLACEHOLDER WITH THE NEW WORKSECTION --- */}
      <WorkSection />

    </main>
  );
}