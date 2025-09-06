// FILE: src/components/HorizontalScroller.tsx
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import styles from '@/app/about/[[...slug]]/About.module.css';

// A generic type for items to be displayed (works for both Chapters and Categories)
type ScrollItem = {
  id: string;
  mainTitle: string;
  description: string;
  chapterLabel: string;
  footnote?: string;
  leftImage: { src: string; width?: number; height?: number; };
  rightImage: { src: string; width?: number; height?: number; };
};

type Props = {
  items: ScrollItem[];
  onTitleClick: (id: string) => void;
  onBack?: () => void; // Optional back function for Layer 2
};

export default function HorizontalScroller({ items, onTitleClick, onBack }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const numItems = items.length;
  const scrollContainerHeight = `${numItems * 100}vh`;
  const horizontalContainerWidth = `${numItems * 100}vw`;

  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${(numItems - 1) * 100}%`]);

  return (
    <section ref={scrollRef} style={{ height: scrollContainerHeight }} className={styles.scrollContainer}>
      {/* Optional Back Button for Layer 2 */}
      {onBack && (
        <button 
            onClick={onBack} 
            className="fixed top-8 left-8 z-50 text-black bg-white/70 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md hover:bg-white transition-colors"
        >
          &larr; Back to Chapters
        </button>
      )}
      
      <div className={styles.stickyWrapper}>
        <motion.div style={{ x, width: horizontalContainerWidth }} className={styles.horizontalContainer}>
          {items.map((item) => (
            <div key={item.id} className={styles.chapter}>
              
              <div className={styles.imageColumn}>
                 <Image 
                  className={styles.scaledImage}
                  src={item.leftImage.src} 
                  alt={item.mainTitle} 
                  width={item.leftImage.width}
                  height={item.leftImage.height}
                  sizes="25vw" 
                  priority 
                 />
              </div>
              
              <div className={styles.centerColumn}>
                 <div className={styles.mainContent}>
                  <p className={styles.chapterLabel}>{item.chapterLabel}</p>
                  <h2 
                    className={`${styles.mainTitle} cursor-pointer hover:opacity-70 transition-opacity`}
                    onClick={() => onTitleClick(item.id)}
                  >
                    {item.mainTitle}
                  </h2>
                  <p className={styles.description}>{item.description}</p>
                </div>
                {item.footnote && (
                  <p className={styles.footnote}>{item.footnote}</p>
                )}
              </div>
              
              <div className={styles.imageColumn}>
                 <Image 
                  className={styles.scaledImage}
                  src={item.rightImage.src} 
                  alt={item.mainTitle} 
                  width={item.rightImage.width}
                  height={item.rightImage.height}
                  sizes="25vw"
                  priority 
                 />
              </div>

            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}