'use client';
import { motion, useTransform } from 'framer-motion';
import Image from 'next/image';
import styles from './Hero.module.css'; // We reuse the hero styles

interface AnimatedGalleryProps {
  imageUrls: string[];
  progress: any; // This will be the scroll progress from 0 to 1
}

export default function AnimatedGallery({ imageUrls, progress }: AnimatedGalleryProps) {
  const columns = [
    imageUrls.filter((_, i) => i % 3 === 0),
    imageUrls.filter((_, i) => i % 3 === 1),
    imageUrls.filter((_, i) => i % 3 === 2),
  ];
  const headings = ["Fine Art", "Commissioned", "Motion"];

  // --- Scroll-based Animations ---
  // Fade out the headline as we scroll
  const headlineOpacity = useTransform(progress, [0, 0.2], [1, 0]); 
  // Fade in the gallery headings as we scroll past the halfway point
  const headingsOpacity = useTransform(progress, [0.5, 0.7], [0, 1]);
  // Move the entire gallery container up as we scroll
  const galleryY = useTransform(progress, [0, 1], ['0%', '-50%']);

  return (
    <motion.div style={{ y: galleryY }} className="relative h-[200vh] text-black">
      <div className="sticky top-0 h-screen">
        <div className="absolute inset-0">
          {/* Gallery Headings - Initially hidden */}
          <motion.div 
            style={{ opacity: headingsOpacity }} 
            className="w-full h-full flex flex-col justify-center items-center"
          >
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3">
              {headings.map(heading => <h2 key={heading} className="text-4xl font-serif text-center text-gray-800">{heading}</h2>)}
            </div>
          </motion.div>

          {/* Headline Text - Initially visible */}
          <div className="w-full h-full flex justify-center items-center">
            <motion.h1 style={{ opacity: headlineOpacity }} className={styles.headline}>
              PHOTOGRAPHY<br/>THAT MOVES.
            </motion.h1>
          </div>
        </div>

        {/* The Images - These will animate based on scroll progress */}
        <div className="relative w-full h-full">
          {imageUrls.map((src, i) => {
            const column_index = i % 3;
            const image_in_column_index = Math.floor(i/3);
            const total_in_column = columns[column_index].length;
            
            // --- Calculate Start and End Positions ---
            // Start: Random position from original hero logic (approximated)
            const randomXStart = (Math.random() - 0.5) * 80; // in vw
            const randomYStart = (Math.random() - 0.5) * 80; // in vh
            
            // End: Organized stack position
            const finalXEnd = (column_index - 1) * 33; // in vw
            const finalYEnd = 0; // Center of the screen
            
            // --- Create Transformations ---
            // Animate X and Y position based on scroll progress
            const x = useTransform(progress, [0, 1], [`${randomXStart}vw`, `${finalXEnd}vw`]);
            const y = useTransform(progress, [0, 1], [`${randomYStart}vh`, `${finalYEnd}vh`]);
            
            // Animate Rotation for the stacked effect
            const finalRotate = (image_in_column_index - (total_in_column - 1) / 2) * 4;
            const rotate = useTransform(progress, [0, 1], [0, finalRotate]);
            
            // Animate Scale to keep the original small size in the hero
            const scale = useTransform(progress, [0, 1], [0.3, 1]); // Start small, end at full size

            return (
              <motion.div
                key={src}
                layoutId={src}
                className="absolute left-1/2 top-1/2 rounded-lg overflow-hidden shadow-2xl cursor-pointer bg-white"
                style={{
                  width: '30vw',
                  height: '40vw',
                  maxWidth: '400px',
                  maxHeight: '600px',
                  transformOrigin: 'bottom center',
                  zIndex: image_in_column_index,
                  x,
                  y,
                  rotate,
                  scale,
                }}
                whileHover={{ scale: 1.05, rotate: 0, y: `${finalYEnd - 20}`, zIndex: 99, transition: { duration: 0.2 } }}
              >
                <Image src={src} alt={`Gallery image ${src}`} fill sizes="30vw" style={{ objectFit: 'cover' }} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}