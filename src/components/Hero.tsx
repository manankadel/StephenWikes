'use client';

import { useState, useEffect, useMemo, CSSProperties } from 'react'; // Import CSSProperties
import Image from 'next/image';
import styles from './Hero.module.css';

// --- Configuration ---
const TOTAL_IMAGES = 50;
const LAYERS = 6;

const allImageUrls = Array.from({ length: TOTAL_IMAGES }, (_, i) => `/hero-gallery/image${i + 1}.jpg`);

// --- 1. MOVEMENT IS FASTER ---
// We've increased these values by ~50%
const sensitivities = [180, 150, 110, 80, 50, 30]; 

const directions = [
  [-1, -1], [1, -1], [-1, 1], [1, 1], [-0.5, 1.5], [1.5, -0.5],
];

const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Define a type for our layout style object
type ImageLayoutStyle = {
  gridColumn: string;
  gridRow: string;
  aspectRatio: string;
};

// Helper component now accepts layout styles
const ParallaxLayer = ({ images, layouts, className, xOffset, yOffset, priorityLoad }: { 
  images: string[], 
  layouts: ImageLayoutStyle[], 
  className: string, 
  xOffset: number, 
  yOffset: number, 
  priorityLoad: boolean 
}) => (
  <div
    className={`${styles.imageGrid} ${className}`}
    style={{ transform: `translate(${xOffset}px, ${yOffset}px)` }}
  >
    {images.map((src, index) => (
      <div 
        key={src} 
        className={styles.imageWrapper} 
        style={layouts[index] as CSSProperties} // Apply the random layout style
      >
        <Image
          src={src}
          alt={`Portfolio collage image for ${src}`}
          fill
          priority={priorityLoad}
          sizes="(min-width: 768px) 25vw, 50vw"
          style={{ objectFit: 'cover' }}
        />
      </div>
    ))}
  </div>
);

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // useMemo will now generate both shuffled images AND a random layout map
  const { layers, layerLayouts } = useMemo(() => {
    const shuffledUrls = shuffleArray([...allImageUrls]);
    const imagesPerLayer = Math.ceil(TOTAL_IMAGES / LAYERS);
    
    const newLayers = Array.from({ length: LAYERS }, (_, i) => {
      const start = i * imagesPerLayer;
      return shuffledUrls.slice(start, start + imagesPerLayer);
    });

    // --- 2. GENERATE RANDOM SIZES AND POSITIONS ---
    const newLayouts = newLayers.map(layerImages => {
      return layerImages.map(() => {
        // Default style
        const style: ImageLayoutStyle = {
          gridColumn: 'span 1',
          gridRow: 'span 1',
          aspectRatio: '3 / 4',
        };

        // 20% chance for an image to be larger
        if (Math.random() < 0.2) {
          const spanType = Math.random();
          if (spanType < 0.33) { // Span column
            style.gridColumn = 'span 2';
            style.aspectRatio = '2 / 1';
          } else if (spanType < 0.66) { // Span row
            style.gridRow = 'span 2';
            style.aspectRatio = '9 / 16';
          } else { // Span both
            style.gridColumn = 'span 2';
            style.gridRow = 'span 2';
            style.aspectRatio = '1 / 1';
          }
        }
        return style;
      });
    });

    return { layers: newLayers, layerLayouts: newLayouts };
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const offsets = layers.map((_, index) => {
    const sensitivity = sensitivities[index];
    const [dirX, dirY] = directions[index];
    const baseOffsetX = mousePosition.x !== 0 ? (mousePosition.x / window.innerWidth - 0.5) : 0;
    const baseOffsetY = mousePosition.y !== 0 ? (mousePosition.y / window.innerHeight - 0.5) : 0;
    return {
      x: baseOffsetX * sensitivity * dirX,
      y: baseOffsetY * sensitivity * dirY,
    };
  });

  return (
    <div className={styles.heroContainer}>
      {layers.map((imageSet, index) => (
        <ParallaxLayer
          key={`layer-${index}`}
          images={imageSet}
          layouts={layerLayouts[index]} // Pass the generated layout styles
          className={styles[`layer${index + 1}`]}
          xOffset={offsets[index].x}
          yOffset={offsets[index].y}
          priorityLoad={index < 2}
        />
      ))}

      <h1 className={styles.headline}>
        PHOTOGRAPHY<br />THAT MOVES.
      </h1>
    </div>
  );
}