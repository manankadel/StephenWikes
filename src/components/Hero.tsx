'use client';

import { useState, useEffect, useMemo, CSSProperties } from 'react';
import Image from 'next/image';
import { motion, useTransform, MotionValue } from 'framer-motion';
import styles from './Hero.module.css';

// --- Configuration ---
const TOTAL_IMAGES = 50;
const LAYERS = 6;

const allImageUrls = Array.from({ length: TOTAL_IMAGES }, (_, i) => `/hero-gallery/image${i + 1}.jpg`);
const sensitivities = [180, 150, 110, 80, 50, 30];
const directions = [[-1, -1], [1, -1], [-1, 1], [1, 1], [-0.5, 1.5], [1.5, -0.5]];

// --- Type Definitions ---
type FinalPosition = { x: string; y: string; rotate: number; zIndex: number; scale: number; };
type ImageLayoutStyle = { top: string; left: string; width: string; transform: string; aspectRatio: string; };

const shuffleArray = (array: string[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// --- Child Component for animation ---
const ParallaxLayer = ({ 
  images, 
  layouts, 
  className, 
  priorityLoad, 
  scrollYProgress, 
  finalPositions,
  mousePosition,
  parallaxStrength,
  index
}: {
  images: string[];
  layouts: ImageLayoutStyle[];
  className: string;
  priorityLoad: boolean;
  scrollYProgress: MotionValue<number>;
  finalPositions: { [key: string]: FinalPosition };
  mousePosition: { x: number; y: number };
  parallaxStrength: MotionValue<number>;
  index: number;
}) => {
  const sensitivity = sensitivities[index];
  const [dirX, dirY] = directions[index];

  const baseOffsetX = typeof window !== 'undefined' ? (mousePosition.x / window.innerWidth - 0.5) : 0;
  const baseOffsetY = typeof window !== 'undefined' ? (mousePosition.y / window.innerHeight - 0.5) : 0;

  const x = useTransform(parallaxStrength, val => baseOffsetX * sensitivity * dirX * val);
  const y = useTransform(parallaxStrength, val => baseOffsetY * sensitivity * dirY * val);

  return (
    <motion.div
      className={`${styles.layerContainer} ${className}`}
      style={{ x, y }}
    >
      {images.map((src, imgIndex) => {
        const initialStyle = layouts[imgIndex] as CSSProperties;
        const finalPos = finalPositions[src] || { x: '0%', y: '0%', rotate: 0, scale: 1, zIndex: 0 };
        
        const imgX = useTransform(scrollYProgress, [0, 1], ['0px', finalPos.x]);
        const imgY = useTransform(scrollYProgress, [0, 1], ['0px', finalPos.y]);
        const rotate = useTransform(scrollYProgress, [0.2, 1], [0, finalPos.rotate]);
        const scale = useTransform(scrollYProgress, [0, 1], [1, finalPos.scale]);

        return (
          <motion.div
            key={src}
            className={styles.imageWrapper}
            style={{ ...initialStyle, x: imgX, y: imgY, rotate, scale, zIndex: finalPos.zIndex }}
          >
            <Image
              src={src}
              alt={`Portfolio collage image for ${src}`}
              fill
              priority={priorityLoad}
              sizes="250px"
              style={{ objectFit: 'cover' }}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

// --- Your Original Hero Component ---
export default function Hero({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { layers, layerLayouts, finalImagePositions } = useMemo((): {
    layers: string[][];
    layerLayouts: ImageLayoutStyle[][];
    finalImagePositions: { [key: string]: FinalPosition };
  } => {
    const shuffledUrls = shuffleArray([...allImageUrls]);
    const imagesPerLayer = Math.ceil(TOTAL_IMAGES / LAYERS);
    
    const finalPositions: { [key: string]: FinalPosition } = {};

    const newLayers = Array.from({ length: LAYERS }, (_, i) => {
        const start = i * imagesPerLayer;
        return shuffledUrls.slice(start, start + imagesPerLayer);
    });

    const newLayouts = newLayers.map(layerImages => {
      return layerImages.map(src => {
        const randomWidth = 133 + Math.random() * 117;
        const initialTop = Math.random() * 85;
        const initialLeft = Math.random() * 85;

        const style: ImageLayoutStyle = {
          top: `${initialTop}%`,
          left: `${initialLeft}%`,
          width: `${randomWidth}px`,
          transform: `rotate(${Math.random() * 50 - 25}deg)`,
          aspectRatio: `${(Math.random() * 0.5) + 0.8}`,
        };

        const randomX = (Math.random() - 0.5) * 300;
        const randomY = (Math.random() - 0.5) * 300;
        const translateX = `calc(${randomX}vw)`;
        const translateY = `calc(${randomY}vh)`;

        finalPositions[src] = { 
            x: translateX, 
            y: translateY,
            rotate: (Math.random() - 0.5) * 180,
            scale: 0,
            zIndex: 50
        };
        
        return style;
      });
    });

    // YEH HAI WOH SAHI LINE.
    return { layers: newLayers, layerLayouts: newLayouts, finalImagePositions: finalPositions };
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const parallaxStrength = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const heroOpacity = useTransform(scrollYProgress, [0.7, 1], [1, 0]);

  return (
    <motion.div style={{ opacity: heroOpacity }}>
      <div className={styles.heroContainer}>
        {layers.map((imageSet, index) => (
          <ParallaxLayer
            key={`layer-${index}`}
            images={imageSet}
            layouts={layerLayouts[index]}
            className={styles[`layer${index + 1}`]}
            priorityLoad={index < 2}
            scrollYProgress={scrollYProgress}
            finalPositions={finalImagePositions}
            mousePosition={mousePosition}
            parallaxStrength={parallaxStrength}
            index={index}
          />
        ))}

        <motion.h1 className={styles.headline} style={{ opacity: headlineOpacity }}>
          PHOTOGRAPHY<br />THAT MOVES.
        </motion.h1>
      </div>
    </motion.div>
  );
}