'use client';

import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import AnimatedGallery from '@/components/AnimatedGallery'; // Import the new component

// Use a reasonable number of images for good performance
const TOTAL_IMAGES = 15;
const allImageUrls = Array.from({ length: TOTAL_IMAGES }, (_, i) => `/hero-gallery/image${i + 1}.jpg`);

export default function HomePageClient() {
  const targetRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within the targetRef container
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  return (
    // This container defines the scrollable area for the entire animation.
    <div ref={targetRef} style={{ height: '300vh', position: 'relative', background: '#000' }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* We render only the new component and pass the scroll progress to it */}
        <AnimatedGallery imageUrls={allImageUrls} progress={scrollYProgress} />
      </div>
    </div>
  );
}