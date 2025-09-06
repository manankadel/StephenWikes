// UPDATED FILE: src/components/ImageGallery.tsx
'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Category, GalleryImage } from '@/app/about/data';

type Props = {
  category: Category;
  onClose: () => void;
};

export default function ImageGallery({ category, onClose }: Props) {
  const [activeImage, setActiveImage] = useState<GalleryImage>(category.gallery[0]);
  
  // Create a ref for the scrollable container
  const scrollRef = useRef<HTMLDivElement>(null);

  // A ref to prevent a feedback loop between scrolling and clicking
  const isClickUpdate = useRef(false);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  });

  // This effect updates the active image based on scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // If a click just happened, don't let the scroll event override it
    if (isClickUpdate.current) return;

    const totalImages = category.gallery.length;
    const newIndex = Math.min(Math.floor(latest * totalImages), totalImages - 1);
    
    const currentActiveIndex = category.gallery.findIndex(img => img.src === activeImage.src);

    if (newIndex !== currentActiveIndex) {
      setActiveImage(category.gallery[newIndex]);
    }
  });

  // This effect syncs the scrollbar position when a thumbnail is clicked
  useEffect(() => {
    if (scrollRef.current && isClickUpdate.current) {
      const activeImageIndex = category.gallery.findIndex(img => img.src === activeImage.src);
      const totalImages = category.gallery.length;
      
      const totalScrollableHeight = scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
      const targetScrollTop = (activeImageIndex / totalImages) * totalScrollableHeight;

      scrollRef.current.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth',
      });
      
      // Reset the flag after the programmatic scroll is initiated
      const timer = setTimeout(() => {
        isClickUpdate.current = false;
      }, 500); // A small delay to allow the scroll to happen

      return () => clearTimeout(timer);
    }
  }, [activeImage, category.gallery]);


  const handleThumbnailClick = (image: GalleryImage) => {
    isClickUpdate.current = true; // Set the flag to indicate a click initiated this change
    setActiveImage(image);
  };

  return (
    // 1. This is the new scrollable container. It's invisible but creates the scroll track.
    <div ref={scrollRef} className="fixed inset-0 bg-[#F1ECE5] z-50 overflow-y-auto">
      {/* Give it a height that allows for scrolling. 200vh means two full pages of scrolling. */}
      <div style={{ height: '200vh' }}>
        
        {/* 2. The gallery itself is now sticky within the scroll container */}
        <div className="sticky top-0 h-screen w-full flex p-4 sm:p-8 animate-fade-in">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 p-4 sm:p-8 flex justify-between items-center z-10">
              <div className="font-bold text-lg uppercase tracking-widest">Stephen Wikes</div>
              <button onClick={onClose} className="text-black font-bold text-lg uppercase tracking-widest">Close</button>
          </div>

          {/* Left Metadata */}
          <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 text-sm uppercase">
            <h3 className="text-gray-500">CATEGORY</h3>
            <p className="font-bold tracking-wider">{category.mainTitle}</p>
          </div>

          {/* Main Content Area */}
          <div className="flex w-full h-full pt-16 sm:pt-24 pb-16">
              {/* Main Image */}
              <div className="w-full md:w-10/12 h-full relative">
                <Image 
                    key={activeImage.src} // Key forces re-render for animation
                    src={activeImage.src} 
                    alt={activeImage.alt} 
                    layout="fill" 
                    objectFit="contain"
                    className="animate-fade-in"
                />
              </div>

              {/* Right Thumbnail Sidebar */}
              <div className="hidden md:flex w-2/12 h-full flex-col items-center justify-center space-y-2 pl-4 overflow-y-auto">
                {category.gallery.map((image) => (
                  <div
                    key={image.src}
                    className={`relative w-24 h-32 cursor-pointer flex-shrink-0 border-2 transition-all ${activeImage.src === image.src ? 'border-black' : 'border-transparent opacity-50 hover:opacity-100'}`}
                    onClick={() => handleThumbnailClick(image)}
                  >
                    <Image src={image.src} alt={image.alt} layout="fill" objectFit="cover" />
                  </div>
                ))}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}