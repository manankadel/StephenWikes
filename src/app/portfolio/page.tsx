// FILE: src/app/portfolio/page.tsx
'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import styles from './Portfolio.module.css';

// --- DATA ---

const biography = {
  p1: "Stephen Wilkes is a photographer and National Geographic Explorer known for his groundbreaking imagery that blends documentary storytelling with fine art. Since opening his studio in New York City in 1983, Wilkes has built a career that spans editorial, commercial and fine art photography, earning a reputation as one of America’s most iconic and innovative visual artists.",
  p2: "Wilkes’ early career interpretations of Mainland China, California’s Highway One, and impressionistic “Burned Objects” set the tone for a series of career-defining projects that catapulted him to the top of the photographic landscape.",
  p3: "In 1998, a one-day assignment to the south side of Ellis Island led to a 5-year photographic study of the island’s long abandoned medical wards where immigrants were detained before they could enter America. Through his photographs and video, Wilkes helped secure $6 million toward the restoration of the south side of the island. A monograph based on the work, Ellis Island: Ghosts of Freedom, was published in 2006 and was named one of TIME magazine’s 5 Best Photography Books of the Year. The work was also featured on NPR and CBS Sunday Morning.",
  p4: "In 2000, Epson America commissioned Wilkes to create a millennial portrait of the United States, “America In Detail,” a 52-day odyssey that was exhibited in New York, Chicago, Los Angeles, and San Francisco."
};

const awardsData = [
  { logo: '/awards/nyf.png', name: 'New York Festivals - Gold', description: 'Recognized for Best Use of Media/Portrait Photography.' },
  { logo: '/awards/ca.png', name: 'Communication Arts - Winner', description: 'Honors the finest in design, advertising, photography, and illustration.' },
  { logo: '/awards/lia.png', name: 'London International Awards - WINNER', description: 'Celebrates world-class creativity and innovation in advertising, design, and technology.' },
  { logo: '/awards/clio.png', name: 'Clio Awards - Silver', description: 'Recognized for excellence in advertising, one of the industry’s most prestigious accolades.' },
  { logo: '/awards/one-show.png', name: 'The One Show - Finalist', description: 'Celebrated for outstanding creative work in advertising and design.' },
  { logo: '/awards/webby.png', name: 'Webby Awards - Honoree', description: 'Commemorates excellence in digital creativity and web content.' },
  { logo: '/awards/fwa.png', name: 'FWA Awards', description: 'Favourite Website Awards for pushing the boundaries of digital design and media.' },
];

const cv = {
  awards: ["American Photography, Selected Winner, 2014, 2015, 2017, 2018", "PDN Award of Excellence, Advertising, 2018", "Prix Pictet, Consumption, Honorable Mention, 2015", "PDN Award of Excellence, Photojournalism, Vanity Fair 2014", "PDN Award of Excellence, Photojournalism, Sandy 2013", "PDN Award of Excellence, Fine Art, Day to Night Shanghai 2013", "Time Magazine Top 10 Photographers of 2012", "Communication Arts Photography Award of Excellence 2012, 2013", "Sony World Photography Professional Award, 2012", "Adobe Breakthrough Photography Award, 2012", "Photo District News Award of Excellence, 2011", "PX3 Prix de la Photographie Paris Fine Art Series 2nd Place & 3rd Place, Photojournalism 2010", "World in Focus PDN, Portraits/Sense of Place 1st, Place, 2008", "Prix De La Photographie Paris, Honorable Mention; Human Condition, 2007", "Lucie Awards 1st. Place, Professional Photographer, Editorial, The Rise of Big Water, 2007", "Lucie Awards 1st. Place, Fine Art, Ellis Island: Ghost of Freedom Lucie Awards, 2007", "American Photography, Award of Excellence, 2005, 2007, 2009, 2010, 2011, 2013, 2014", "Photo District News Award of Excellence: 2002, 2005, 2006, 2008, 2009, 2010", "Graphis, 1992", "The Art Directors Club Distinctive Merit, 1992", "Communication Arts Award of Excellence 2000, 2001, 2002, 2004, 2006, 2007, 2008, 2010,", "Epson Creativity Award, 2004", "Lucie Award Fine Art Photographer of the Year, 2004", "Adweek Magazine Photographer of the Year, 1992", "Alfred Eisenstaedt Award for Magazine Photography, 2000"],
  soloExhibitions: ["Time & Place, Cavalier Gallery, New York, NY, 2024", "Day to Night: From Africa to Nantucket, C & C Photography Gallery, 2023", "Beyond the Horizon: The Changing Global Ecology, Holden Luntz Gallery, 2023", "Stephen Wilkes: Tapestries, Bryce Wolkowitz Gallery, New York, September, 2021", "Stephen Wilkes: Day to Night, Monroe Gallery , Santa Fe, NM, October , 2019", "Stephen Wilkes: Day to Night, Fahey Klein Gallery, Los Angeles , October 2019", "Day to Night, Florida Museum of Photographic Arts, September, 2019", "Stephen Wilkes: A Witness to Change, Bryce Wolkowitz Gallery, New York, NY, September 2019", "Bird Migration, National Museum of Wildlife Art of The United States, May, 2019", "Day to Night: Holden Luntz Gallery, Palm Beach, Florida, January, 2019", "Day to Night: ProjectB Gallery, Milan , Italy , November, 2018", "Day to Night: Fairfield Museum and History Center, Fairfield, CT 2018", "Day to Night: In the Field with Stephen Wilkes, National Geographic Museum, Washington, DC 2018", "Day to Night, Galerie GADCOLLECTION, Paris, France, October 2017", "Day to Night, Bryce Wolkowitz Gallery, New York, NY, September 2017", "Ellis Island Ghosts of Freedom, Peter Fetterman Gallery, Santa Monica, Ca. March 2017", "Day to Night, Robert Klein Gallery, Boston, MA. August 2016", "Day to Night, Bryce Wolkowitz Gallery, New York, NY, November 2015", "Remnants, Monroe Gallery of Photography, Santa Fe, NM, 2015", "Day to Night, Peter Fetterman Gallery, Santa Monica, CA, September 2014", "Bethlehem Steel, ArtsQuest Center at SteelStacks, PA 2013", "Day to Night, Monroe Gallery of Photography, Santa Fe, NM, April 2012", "Connecticut Responds & Reflects: 9/11, Fairfield Museum, Fairfield, CT, September 2011", "Day to Night, Clampart Gallery, New York, NY, September 2011", "Nu-Art Link Gallery, China, Westport, CT, November 2010", "James A. Michener Art Museum, Ellis Island, Doylestown, PA, June 2010", "Steuben Glass Gallery, Ellis Island, New York, NY, November 2009", "Monroe Gallery of Photography, China, Santa Fe, NM, October 2008", "Fairfield Museum, Images, Fairfield, CT, April 2009", "The Construction of the Olympic Stadium and other Chinese Public Works, ClampArt, New York, NY, June 2008", "China, David Gallery, Los Angeles, CA, January 2008", "Stephen Wilkes, Ellis Island, Chicago Cultural Arts, Chicago, IL, July 2008", "Stephen Wilkes, Ellis Island, Griffin Museum of Photography, Winchester, MA, January 2008", "Stephen Wilkes, China, ClampArt, New York, NY, April 2007", "Stephen Wilkes, Ellis Island, ClampArt, New York, NY, April 2007", "Ellis Island Revisited, Monroe Gallery of Photography, Santa Fe, NM, 2006", "Ellis Island Revisited, David Gallery, Los Angeles, CA, 2006", "In Katrina’s Wake, World Monuments Fund Gallery, New York, NY, 2006", "Bethlehem Steel, Monroe Gallery of Photography, Santa Fe, NM, 2005", "Bethlehem Steel, Apex Fine Art, Los Angeles, CA, 2004", "Ellis Island, Monroe Gallery of Photography, Santa Fe, NM, 2004", "Ellis Island, Apex Fine Art, Los Angeles, CA, 2003", "The Female Form on the Lava Beds of Hawaii, Soho Triad Fine Arts, New York, NY, 2002", "Ellis Island, Soho Triad Fine Arts, New York, NY, 2001", "America in Detail, Chicago, New York, Los Angeles and San Francisco, 2000"],
  groupExhibitions: ["Who Shot Sports: A photographic History, 1843 – Present, Brooklyn Museum, NY, 2017", "Arts in Embassies: Ottawa, Canada, 2015", "Annenberg Space for Photography, Sink or Swim, Designing for a Sea of Change, December, 2014", "Museum of the City of New York, Rising Waters, Photographs of Hurricane Sandy, 2013-2014", "Peter Fetterman Gallery, Forever Young, The Art of Music Photography, 2012", "Florence Lynch Gallery, Hypertexture, New York, NY, 2004", "Soho Triad Fine Arts, Summer Works, New York, NY, 2000", "George Eastman House: The Art of Persuasion, Rochester, NY, 1992"],
  collections: ["George Eastman House International Museum of Film and Photography", "Dow Jones Collection", "The Museum of Fine Arts, Houston", "Library of Congress", "Carl and Marilynn Thoma Art Foundation", "Griffin Museum of Photography", "Jewish Museum New York", "Barclays Bank Corporate Collection", "James A. Michener Art Museum", "The Historic New Orleans Collection", "Museum of the City of New York", "Snite Museum of Art", "9/11 Memorial Museum", "New Mexico Arts Division, Department of Cultural Affairs"],
  professionalMemberships: ["The Newhouse Advisory Board", "The Goldring Journalism Arts Program", "Fairfield Museum Advisory Board", "Save Ellis Island, Board of Directors"],
  teachingExperience: ["School of Visual Arts, May 2017", "Xposure International Photography Festival, 2016", "Ted Talk Dream Conference, 2016", "Greg Gorman Digital Photographic Workshop, 2014", "James A Michener Art Museum Lecturer, 2010", "The George Eastman International Museum of Film and Photography, 2009", "Palm Springs Photo Festival 2008, 2011, 2013, 2019", "ICP Guest Lecturer, 2007", "Hallmark Institute of Photography, 2007", "Photo Plus Expo East, 2000 – present", "Eddie Adams Workshop, 2000 – present", "Maine Photographic Workshop 1988, 1999"],
  bibliography: ["HOT Photo Magazine, June 2019", "Stern Magazine, May 2019", "Photo Magazine, Paris, March 2018", "Artsy", "Travel & Leisure, October, 2017", "Wall Street Journal, September, 2017", "Time Magazine, August, 2017", "Bloomberg Businessweek, April , 2017,", "Smithsonian Magazine, June , 2017", "National Geographic, January, 2016", "National Geographic, March, 2015", "National Geographic, September, 2015", "The New York Times Magazine, June, 2015", "ESPN, February, 2015", "Time Magazine, December, 2014", "Time Magazine, September, 2014", "Vanity Fair, July, 2014", "Vanity Fair, May, 2014", "Fortune Magazine, June, 2014", "Time Magazine, March, 2014", "New York Times Magazine, March, 2014", "Fortune Magazine, January, 2014", "Time Magazine, November, 2013", "Vanity Fair, September, 2013", "NY Daily News, August, 2013", "Huffington Post, August, 2013", "New York Times Magazine, May, 2013", "Forbes Magazine, Spain, May, 2013", "Fortune Magazine, March, 2013", "Better Photography, Mumbai, February, 2013", "Time Magazine, December, 2012", "CBS Sunday Morning, November, 2012", "Digital Photo Pro, November, 2012", "Weston Magazine Group, November, 2012", "Time Magazine, November, 2012", "FotoMagazine, October, 2012", "Fortune Magazine, June, 2012", "Picame, June, 2012", "Digital Journal May, 2012", "Fortune Magazine, January, 2012", "National Geographic, Story: City Solutions, December, 2011", "The Telegraph Online, December, 2011", "Oggi, December, 2011", "Icon, November, 2011", "Flavorwire, September, 2011", "Daily Telegraph, September, 2011", "Huffington Post, September, 2011", "photograph magazine September, 2011", "Photo District News, September, 2011", "The Sun UK, September, 2011", "The Village Voice, September, 2011", "New York Magazine, September 5-12, 2011", "The New York Times Magazine, September 18, 2011", "Fortune Magazine May, 2011", "Venü, November/December, 2010", "TIME Magazine August 2, 2010", "Conde Nast Traveler August, 2010", "Communication Arts August, 2010", "Fortune Magazine May, 2010", "Fast Company Magazine April, 2010", "SPREAD ArtCulture Issue 5, 2010", "Shanghai: A History in Photographs, 2010", "New York Magazine,December, 2009", "Newsweek Magazine December, 2009", "American Photographer 25 Award of Excellence, December 2009", "New York Times Magazine, The Green Issue, Cover, April 16, 2009", "New York Magazine, June 24, 2009", "SPREAD ArtCulture, Issue 4 2009", "Vanity Fair, August, 2009", "Vanity Fair, June, 2009", "Vanity Fair, Madoff’s World, April, 2009", "The Magazine, Volume XVI, Number IV, November, 2008", "Exit Magazine, Madrid, Spain, October, 2008", "Albuquerque Journal, October, 2008", "Santa Fe Reporter, October, 2008", "Pasatiempo, The Santa Fe New Mexican, October 3-9, 2008", "The Outlook Magazine: China, August, 2008", "Life Magazine; China August 2008", "Design Arts Daily: Still Life: China’s Modernization, August, 2008", "The Week, August, 2008", "Bloomberg.com, August, 2008", "New York Magazine On line, August, 2008", "Readers Digest, August, 2008", "L’Illustre France, August, 2008", "Vanity Fair, August, 2008", "French “Photo”, June, 2008", "The Village Voice, June, 2008", "National Geographic, May, 2008", "Focus Magazine, April, 2008", "MetroWest Daily New, Gates Publications, February, 2008", "The Boston Globe, February, 2008", "Los Angeles Times, February, 2008", "Art in America, December, 2007", "National Geographic, September, 2007", "Communication Arts, August, 2004 – 2008", "Vanity Fair, April, 2007", "Play Magazine, The New York Times, March, 2007", "Forbes Magazine, November, 2006", "American Photographer, December, 2006", "Time Magazine, December 18, 2006", "The Wall Street Journal, December 2, 2006", "The London Daily Telegraph, August, 2006", "Interior Design, September, 2006", "ARTnews, October, 2006", "Journal of the Print World, Spring, 2006", "Pasatiempo, October 14 -20, 2005", "The Albuquerque North, October 3, 2004", "The Santa Fe New Mexican, October 14, 2005", "The Santa Fe New Mexican, October 8, 2004", "Pasatiempo, October 1-7, 2004", "Studio Photography & Design, May, 2004", "Photo Insider, January, 2003", "Art Scene, February, 2003", "The Los Angeles Times, February 7, 2003", "Westport Magazine, November, 2001", "The New York Times, June 8, 2001", "Communication Arts, March/April, 2001", "Life Magazine, Spring, 2000", "Life Magazine Spring, 1998", "Photo District, News October, 2000", "The New York Times Magazine, March 22, 1998", "The New York Times Magazine, November 21, 1993", "The San Diego Union, December 29, 1987", "Photo District News, February 1998", "International Photography Issue # 1, 1988", "Photo District News, 1988", "Studio Light, Issue #2, 1987"],
  monographs: ["Day to Night, TASCHEN , 2019", "Ellis Island: Ghosts of Freedom, W.W. Norton 2006", "California One, The Pacific Coast Highway, Friendly Press 1987"],
  groupPublications: ["Consumption: Prix Pictet, 2013", "The Human Face of Big Data, 2012", "Condé Nast Traveler: Photographs, 2012", "The New York Times Magazine: Photographs, 2011", "New York: A Photographer’s City, 2011"],
};

const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const CvSection = ({ title, items }: { title: string, items: string[] }) => (
  <div className={styles.cvSubSection}>
    <h3 className={styles.cvSubheading}>{title}</h3>
    <ul className={styles.cvList}>
      {items.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  </div>
);

export default function PortfolioPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-80%']);

  return (
    <main className="bg-[#F9FAFB] text-gray-800">
      <section ref={scrollRef} className={styles.scrollContainer}>
        <div className={styles.stickyWrapper}>
          <motion.div style={{ x }} className={styles.horizontalContainer}>

            {/* PANEL 1: HERO INTRODUCTION */}
            <div className={styles.panel}>
              <motion.div
                className="h-screen w-full flex flex-col"
                variants={heroContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="flex-grow flex justify-center items-center">
                  <motion.div className="w-80 h-80 relative" variants={heroItemVariants}>
                    <Image
                      src="/hero-gallery/Stephen.webp"
                      alt="Portrait of Stephen Wikes"
                      layout="fill"
                      objectFit="cover"
                      className="grayscale"
                      priority
                    />
                  </motion.div>
                </div>
                <div className='pb-12'>
                  <motion.h1
                    className={`${styles.heroTitle} font-serif tracking-tighter`}
                    variants={heroItemVariants}
                  >
                    Stephen Wikes
                  </motion.h1>
                </div>
              </motion.div>
            </div>

            {/* PANEL 2: BIOGRAPHY */}
            <div className={styles.panel}>
              <div className={styles.contentWrapper}>
                <div className={styles.bioSection}>
                  <div className={styles.stickyImageContainer}>
                    <div className={styles.stickyImage}>
                      <div className="relative w-full aspect-[3/4]">
                        <Image
                          src="/hero-gallery/Stephen.webp"
                          alt="Portrait of Stephen Wikes"
                          layout="fill"
                          objectFit="cover"
                          className="grayscale"
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.bioContent}>
                    <h2 className={styles.panelTitle}>Biography</h2>
                    <p>{biography.p1}</p>
                    <p>{biography.p2}</p>
                    <p>{biography.p3}</p>
                    <p>{biography.p4}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* PANEL 3: CURRICULUM VITAE (C.V.) */}
            <div className={styles.panel}>
              <div className={styles.cvPanelContent}>
                <h2 className={styles.cvMainTitle}>C.V.</h2>
                <div className={`${styles.cvScrollableContent} ${styles.scrollableContent}`}>
                  <div className={styles.cvSubSection}>
                    <p><strong>10/28/1957</strong></p>
                    <p><strong>NEW YORK, NEW YORK</strong></p>
                  </div>
                  <div className={styles.cvSubSection}>
                     <h3 className={styles.cvSubheading}>Education</h3>
                     <p>1976 – 1980</p>
                     <p><strong>Bachelor of Science</strong></p>
                     <p>S.I. Newhouse School of Public Communications, Syracuse University</p>
                     <p>Major: Photography</p>
                     <p>Concentration; Business Communications</p>
                     <p>Martin J. Whitman School of Management, Syracuse University</p>
                  </div>
                  <CvSection title="Awards" items={cv.awards} />
                  <CvSection title="Solo Exhibitions" items={cv.soloExhibitions} />
                  <CvSection title="Group Exhibitions" items={cv.groupExhibitions} />
                  <CvSection title="Collections" items={cv.collections} />
                  <CvSection title="Professional Memberships" items={cv.professionalMemberships} />
                  <CvSection title="Teaching Experience" items={cv.teachingExperience} />
                  <CvSection title="Monographs" items={cv.monographs} />
                  <CvSection title="Group Publications" items={cv.groupPublications} />
                </div>
              </div>
            </div>

            {/* PANEL 4: AWARDS */}
            <div className={styles.panel}>
              <div className={styles.awardsPanelContent}>
                <h2 className={styles.awardsMainTitle}>Awards</h2>
                <div className={styles.awardsTimeline}>
                  {awardsData.map((award, index) => (
                    <div key={index} className={styles.awardItem}>
                      <div className={styles.awardCard}>
                        <div className={styles.awardLogoContainer}>
                          <Image
                            src={award.logo}
                            alt={`${award.name} logo`}
                            layout="fill"
                            objectFit="contain"
                          />
                        </div>
                        <div className={styles.awardText}>
                            <h3 className={styles.awardName}>{award.name}</h3>
                            <p className={styles.awardDescription}>{award.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* PANEL 5: BIBLIOGRAPHY */}
            <div className={styles.panel}>
                <div className={styles.bibliographyPanelContent}>
                    <h2 className={styles.bibliographyMainTitle}>Bibliography</h2>
                    <div className={`${styles.bibliographyScrollableContent} ${styles.scrollableContent}`}>
                        <ul className={styles.bibliographyColumns}>
                            {cv.bibliography.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

          </motion.div>
        </div>
      </section>
    </main>
  );
}