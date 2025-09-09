// FILE: src/app/portfolio/page.tsx
'use client';

import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import styles from './Portfolio.module.css';

// ... (keep the data and variants definitions as they are) ...
const exhibitions = [
  { year: '2024', title: 'Time & Place', gallery: 'Cavalier Gallery, New York, NY' },
  { year: '2023', title: 'Day to Night: From Africa to Nantucket', gallery: 'C & C Photography Gallery' },
  { year: '2023', title: 'Beyond the Horizon: The Changing Global Ecology', gallery: 'Holden Luntz Gallery' },
  { year: '2021', title: 'Stephen Wilkes: Tapestries', gallery: 'Bryce Wolkowitz Gallery, New York, September' },
  { year: '2019', title: 'Stephen Wilkes: Day to Night', gallery: 'Monroe Gallery, Santa Fe, NM, October' },
  { year: '2019', title: 'Day to Night', gallery: 'Florida Museum of Photographic Arts, September' },
  { year: '2019', title: 'A Witness to Change', gallery: 'Bryce Wolkowitz Gallery, New York, NY, September' },
  { year: '2019', title: 'Bird Migration', gallery: 'National Museum of Wildlife Art of The United States, May' },
  { year: '2018', title: 'Day to Night: ProjectB Gallery', gallery: 'Milan, Italy, November' },
  { year: '2018', title: 'In the Field with Stephen Wilkes', gallery: 'National Geographic Museum, Washington, DC' },
  { year: '2017', title: 'Day to Night', gallery: 'GALERIE GADCOLLECTION, Paris, France, October' },
];

const awards = [
  { logo: '/awards/nyf.png', name: 'New York Festivals', description: 'Gold for Best Use of Media/Portrait Photography' },
  { logo: '/awards/ca.png', name: 'Communication Arts', description: '2022 Award of Excellence for Editorial Design' },
  { logo: '/awards/lia.png', name: 'London International Awards', description: 'London International Awards - Silver' },
  { logo: '/awards/clio.png', name: 'Clio Awards - Silver', description: 'Recognized for Excellence in Photography within Print & OOH' },
  { logo: '/awards/one-show.png', name: 'The One Show - Finalist', description: 'Celebrated for excellence in creative advertising and design' },
  { logo: '/awards/webby.png', name: 'Webby Awards - Honoree', description: 'Honoring excellence in Digital Creativity and Web Design.' },
  { logo: '/awards/fwa.png', name: 'FWA Awards', description: 'Favourite Website Awards for digital design and media.' },
];

const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};


export default function PortfolioPage() {
  return (
    <main className="bg-[#F9FAFB] text-gray-800">
      {/* --- HERO SECTION CHANGES --- */}
      <motion.section
        // MODIFIED: We use a flex column layout for the full height.
        className="h-screen w-full flex flex-col"
        variants={heroContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* MODIFIED: This new container will grow to fill space and center the image inside it. */}
        <div className="flex-grow flex justify-center items-center">
            <motion.div className="w-80 h-80 relative" variants={heroItemVariants}>
              <Image
                src="/hero-gallery/Stephen.webp" // Replace with your portrait image
                alt="Portrait of Stephen Wikes"
                layout="fill"
                objectFit="cover"
                className="grayscale"
              />
            </motion.div>
        </div>
        
        {/* MODIFIED: The title is now in its own container with bottom padding. */}
        <div className='pb-12'>
            <motion.h1
              className={`${styles.heroTitle} font-serif tracking-tighter`}
              variants={heroItemVariants}
            >
              Stephen Wikes
            </motion.h1>
        </div>
      </motion.section>

      {/* --- The rest of the page remains exactly the same --- */}
      <section className="py-24 px-8 lg:px-16">
        <div className={styles.contentWrapper}>
          
           <div className={styles.cvSection}>
            <div className={styles.stickyImageContainer}>
              <div className={styles.stickyImage}>
                <div className="relative w-full aspect-[3/4]">
                   <Image
                    src="/hero-gallery/Stephen.webp" // Use the same portrait image
                    alt="Portrait of Stephen Wikes"
                    layout="fill"
                    objectFit="cover"
                    className="grayscale"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Alfred Eisenstaedt Award for Magazine Photography, 2000
                </p>
              </div>
            </div>

            <div className={styles.cvContent}>
              <h2 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-8">
                Solo Exhibitions
              </h2>
              <div className="space-y-6">
                {exhibitions.map((item, index) => (
                  <div key={index}>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-gray-600">{item.gallery}, {item.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.awardsSection}>
            <h2 className="text-3xl font-serif font-semibold mb-12 text-center">Awards</h2>
            <div className={styles.awardsTimeline}>
              {awards.map((award, index) => (
                <div key={index} className={styles.awardItem}>
                  <div className={styles.awardCard}>
                    <div className="w-24 h-16 relative mb-3 mx-auto">
                      <Image
                        src={award.logo}
                        alt={`${award.name} logo`}
                        layout="fill"
                        objectFit="contain"
                        className="opacity-70"
                      />
                    </div>
                    <div className="text-center">
                        <h3 className="font-bold">{award.name}</h3>
                        <p className="text-sm text-gray-600">{award.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}