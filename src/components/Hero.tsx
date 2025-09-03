'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';

// --- Your image URLs remain here ---
const imageUrls = [
  '/hero-gallery/image1.jpg', '/hero-gallery/image2.jpg', '/hero-gallery/image3.jpg',
  '/hero-gallery/image4.jpg', '/hero-gallery/image5.jpg', '/hero-gallery/image6.jpg',
  '/hero-gallery/image7.jpg', '/hero-gallery/image8.jpg', '/hero-gallery/image9.jpg',
  '/hero-gallery/image10.jpg', '/hero-gallery/image11.jpg', '/hero-gallery/image12.jpg',
  '/hero-gallery/image13.jpg', '/hero-gallery/image14.jpg', '/hero-gallery/image15.jpg',
  '/hero-gallery/image16.jpg', '/hero-gallery/image17.jpg', '/hero-gallery/image18.jpg',
  '/hero-gallery/image19.jpg','/hero-gallery/image20.jpg','/hero-gallery/image21.jpg',
];

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const xOffset = mousePosition.x !== 0 ? -(mousePosition.x / window.innerWidth - 0.5) * 30 : 0;
  const yOffset = mousePosition.y !== 0 ? -(mousePosition.y / window.innerHeight - 0.5) * 30 : 0;

  return (
    // The main container now also handles centering the text
    <div className={styles.heroContainer}>
      <div
        className={styles.imageGrid}
        style={{ transform: `translate(${xOffset}px, ${yOffset}px)` }}
      >
        {imageUrls.map((src, index) => (
          <div key={index} className={styles.imageWrapper}>
            <Image
              src={src}
              alt={`Portfolio collage image ${index + 1}`}
              fill
              priority={index < 10}
              sizes="(min-width: 768px) 33vw, 50vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>

      {/* The text now sits directly inside the container, not in a separate overlay div */}
      <h1 className={styles.headline}>
        PHOTOGRAPHY<br />THAT MOVES.
      </h1>
    </div>
  );
}