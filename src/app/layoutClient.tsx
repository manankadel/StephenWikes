'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from '@/components/LoadingScreen';

// Array of images to cycle through during loading
const loadingImages = [
  '/hero-gallery/image1.jpg',
  '/hero-gallery/image5.jpg',
  '/hero-gallery/image8.jpg',
  '/hero-gallery/image12.jpg',
  '/hero-gallery/image15.jpg',
];

export default function LayoutClient() {
  const [progress, setProgress] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isAnimationDone, setIsAnimationDone] = useState(false);

  useEffect(() => {
    // 1. Listen for the browser's 'load' event.
    // This event fires only after all resources (images, scripts, etc.) are loaded.
    const handlePageLoad = () => {
      setIsPageLoaded(true);
    };

    // If the page is already loaded (e.g., from cache), fire immediately.
    if (document.readyState === 'complete') {
      handlePageLoad();
    } else {
      window.addEventListener('load', handlePageLoad);
    }

    // 2. Start the simulated progress and image cycling timers.
    const progressTimer = setInterval(() => {
      setProgress((prev) => Math.min(prev + 1, 100)); // Let progress go to 100
    }, 40); // 4-second total duration if not loaded

    const imageTimer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % loadingImages.length);
    }, 800);

    // 3. Clean up the event listener and timers.
    return () => {
      window.removeEventListener('load', handlePageLoad);
      clearInterval(progressTimer);
      clearInterval(imageTimer);
    };
  }, []);

  useEffect(() => {
    // 4. Once both the page is loaded AND the progress bar hits 100,
    // wait a moment and then trigger the fade-out animation.
    if (isPageLoaded && progress >= 100) {
      setTimeout(() => {
        setIsAnimationDone(true);
      }, 500); // A 500ms pause at 100% for a better feel
    }
  }, [isPageLoaded, progress]);

  return (
    <AnimatePresence>
      {!isAnimationDone && (
        <LoadingScreen
          progress={progress}
          currentImage={loadingImages[currentImageIndex]}
        />
      )}
    </AnimatePresence>
  );
}