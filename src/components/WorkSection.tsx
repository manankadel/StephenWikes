// FILE: src/components/WorkSection.tsx
'use client';

import Link from 'next/link';
// 1. IMPORT 'Variants' FROM FRAMER-MOTION
import { motion, Variants } from 'framer-motion';

// Data for the sections we want to display
const workItems = [
  {
    number: '01',
    title: 'Our Work',
    description: 'A curated selection of our finest photography, showcasing a decade of moments captured.',
    href: '/portfolio',
  },
  {
    number: '02',
    title: 'About Us',
    description: 'The story, the passion, and the philosophy behind the lens of Stephen Wikes.',
    href: '/about',
  },
  {
    number: '03',
    title: 'Services',
    description: 'Tailored photography solutions to capture your most precious and fleeting moments.',
    href: '/services',
  },
  {
    number: '04',
    title: 'Contact',
    description: 'Let\'s start a conversation about how we can bring your vision to life.',
    href: '/contact',
  },
];

// 2. APPLY THE 'Variants' TYPE TO OUR OBJECTS
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Each child will animate 0.2s after the previous one
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function WorkSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* 1. Background Video (Same as the previous section) */}
      <video
        src="/background.mp4"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* 2. Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* 3. Content Container */}
      <div className="relative z-20 h-full w-full flex flex-col justify-center text-white p-8 md:p-16">
        <motion.div
          className="max-w-6xl mx-auto w-full space-y-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible" // The animation triggers when the section scrolls into view
          viewport={{ once: true, amount: 0.3 }} // Ensures animation runs once
        >
          {workItems.map((item) => (
            <motion.div key={item.number} variants={itemVariants}>
              <Link href={item.href} className="block group">
                <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-16">
                  {/* Left Side: Number and Title */}
                  <div className="flex-shrink-0 md:w-1/2">
                    <p className="text-lg text-gray-300 mb-2">{item.number}</p>
                    <h2 className="font-serif text-5xl md:text-7xl font-bold uppercase group-hover:opacity-70 transition-opacity duration-300">
                      {item.title}
                    </h2>
                  </div>
                  {/* Right Side: Description */}
                  <div className="md:w-1/2">
                    <p className="text-lg text-gray-200 max-w-xs group-hover:opacity-70 transition-opacity duration-300">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="w-full h-[1px] bg-white/30 mt-8" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}