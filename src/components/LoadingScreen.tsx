'use client';

import Image from 'next/image';
import { motion } from 'framer-motion'; // <-- IMPORT FRAMER MOTION
import styles from './LoadingScreen.module.css';

interface LoadingScreenProps {
  progress: number;
  currentImage: string;
}

export default function LoadingScreen({ progress, currentImage }: LoadingScreenProps) {
  return (
    // Wrap the entire component in a motion.div
    <motion.div
      className={styles.loadingContainer}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }} // <-- FADE OUT ON EXIT
      transition={{ duration: 0.5, ease: 'easeInOut' }} // <-- ANIMATION TIMING
    >
      {/* The rest of the component's code remains the same */}
      <div className={styles.progressBarContainer}>
        <div className={styles.progressBar} style={{ width: `${progress}%` }} />
      </div>

      <div className={styles.content}>
        <div className={styles.imageWrapper}>
          <Image
            key={currentImage}
            src={currentImage}
            alt="Loading Image"
            width={400}
            height={600}
            style={{ objectFit: 'contain' }}
            className={styles.imageFade}
            priority
          />
        </div>
      </div>

      <div className={styles.footer}>
        <span className={styles.nameLeft}>Cristina</span>
        <span className={styles.progressText}>{`${Math.floor(progress)}%`}</span>
        <span className={styles.nameRight}>Gómez</span>
      </div>
    </motion.div>
  );
}