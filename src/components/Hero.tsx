'use client';

import { useState, useEffect, useMemo, CSSProperties } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';

// --- Configuration ---
const TOTAL_IMAGES = 50;
const LAYERS = 6;

const allImageUrls = Array.from({ length: TOTAL_IMAGES }, (_, i) => `/hero-gallery/image${i + 1}.jpg`);

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

type ImageLayoutStyle = {
  top: string;
  left: string;
  width: string;
  transform: string;
  aspectRatio: string;
};

const ParallaxLayer = ({ images, layouts, className, xOffset, yOffset, priorityLoad }: { 
  images: string[], 
  layouts: ImageLayoutStyle[], 
  className: string, 
  xOffset: number, 
  yOffset: number, 
  priorityLoad: boolean 
}) => (
  <div
    className={`${styles.layerContainer} ${className}`}
    style={{ transform: `translate(${xOffset}px, ${yOffset}px)` }}
  >
    {images.map((src, index) => (
      <div 
        key={src} 
        className={styles.imageWrapper} 
        style={layouts[index] as CSSProperties}
      >
        <Image
          src={src}
          alt={`Portfolio collage image for ${src}`}
          fill
          priority={priorityLoad}
          sizes="250px" // Updated size hint to match new larger size
          style={{ objectFit: 'cover' }}
        />
      </div>
    ))}
  </div>
);

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { layers, layerLayouts } = useMemo(() => {
    const shuffledUrls = shuffleArray([...allImageUrls]);
    const imagesPerLayer = Math.ceil(TOTAL_IMAGES / LAYERS);
    
    const newLayers = Array.from({ length: LAYERS }, (_, i) => {
      const start = i * imagesPerLayer;
      return shuffledUrls.slice(start, start + imagesPerLayer);
    });

    const newLayouts = newLayers.map(layerImages => {
      return layerImages.map(() => {
        
        // --- THIS IS THE MODIFIED LINE ---
        // Generates a random width between 133px and 250px to make images larger.
        const randomWidth = 133 + Math.random() * 117;

        const style: ImageLayoutStyle = {
          top: `${Math.random() * 85}%`,
          left: `${Math.random() * 85}%`,
          width: `${randomWidth}px`,
          transform: `rotate(${Math.random() * 50 - 25}deg)`,
          aspectRatio: `${(Math.random() * 0.5) + 0.8}`,
        };
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
          layouts={layerLayouts[index]}
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