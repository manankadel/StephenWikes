// FILE: src/app/about/data.ts

// Define the types for our data for clarity and safety
export type GalleryImage = {
  src: string;
  alt: string;
};

export type Category = {
  id: string; // e.g., 'terracotta-army'
  chapterLabel: string; // e.g., 'Category 1/5'
  mainTitle: string;
  description: string;
  leftImage: { src: string };
  rightImage: { src: string };
  gallery: GalleryImage[]; // The images for Layer 3
};

export type Chapter = {
  id: string; // e.g., 'ethereal-beauty'
  chapterLabel: string; // e.g., 'Chapter One'
  mainTitle: string;
  description: string;
  footnote?: string;
  leftImage: { src: string };
  rightImage: { src: string };
  categories: Category[]; // Nested categories for Layer 2
};

// The actual data for the entire "About" section
export const aboutData: Chapter[] = [
  // =======================================================================
  // CHAPTER 1
  // =======================================================================
  {
    id: 'ethereal-beauty',
    chapterLabel: 'Chapter One',
    mainTitle: 'Behold The Ethereal Beauty',
    description: 'Each photograph captures the essence of this remote archipelago, where time seems to stand still amidst the timeless beauty of nature.',
    footnote: '*Each photograph captures the essence of this remote archipelago, where time seems to stand still.',
    leftImage: { src: '/hero-gallery/image1.jpg' },
    rightImage: { src: '/hero-gallery/image2.jpg' },
    categories: [
      {
        id: 'landscapes',
        chapterLabel: 'Category 1/5',
        mainTitle: 'Vast Landscapes',
        description: 'Exploring the sweeping vistas and dramatic scenery of the region, from snow-capped peaks to serene valleys.',
        leftImage: { src: '/hero-gallery/image7.jpg' },
        rightImage: { src: '/hero-gallery/image8.jpg' },
        gallery: [
          { src: '/hero-gallery/image1.jpg', alt: 'A wide shot of a mountain range under a clear sky.' },
          { src: '/hero-gallery/image7.jpg', alt: 'Snow-covered mountains with skiers visible in the distance.' },
          { src: '/hero-gallery/image8.jpg', alt: 'A remote village nestled in a rocky valley.' },
          { src: '/hero-gallery/image14.jpg', alt: 'Sunlight breaking through the clouds over a vast landscape.' },
        ],
      },
      {
        id: 'architecture',
        chapterLabel: 'Category 2/5',
        mainTitle: 'Timeless Architecture',
        description: 'Discovering the unique structures and buildings that tell the history of this ancient land.',
        leftImage: { src: '/hero-gallery/image2.jpg' },
        rightImage: { src: '/hero-gallery/image16.jpg' },
        gallery: [
          { src: '/hero-gallery/image2.jpg', alt: 'A black and white shot of a modern staircase with flowing lines.' },
          { src: '/hero-gallery/image16.jpg', alt: 'A geometric pattern on the facade of a building.' },
          { src: '/hero-gallery/image18.jpg', alt: 'An ancient stone structure against a cloudy sky.' },
          { src: '/hero-gallery/image20.jpg', alt: 'A close-up of intricate architectural details.' },
        ],
      },
      {
        id: 'portraits',
        chapterLabel: 'Category 3/5',
        mainTitle: 'Candid Portraits',
        description: 'Faces and figures that tell the silent stories of the people who call this place home.',
        leftImage: { src: '/hero-gallery/image11.jpg' },
        rightImage: { src: '/hero-gallery/image12.jpg' },
        gallery: [
          { src: '/hero-gallery/image10.jpg', alt: 'A baker carefully arranging pastries in a display case.' },
          { src: '/hero-gallery/image11.jpg', alt: 'A person in silhouette against a bright background.' },
          { src: '/hero-gallery/image12.jpg', alt: 'A woman looking thoughtfully out of a window.' },
          { src: '/hero-gallery/image13.jpg', alt: 'A group of people interacting in a sunlit space.' },
        ],
      },
       {
        id: 'street-life',
        chapterLabel: 'Category 4/5',
        mainTitle: 'Moments in Street Life',
        description: 'Unfiltered scenes from the streets, capturing the rhythm and pulse of everyday existence.',
        leftImage: { src: '/hero-gallery/image3.jpg' },
        rightImage: { src: '/hero-gallery/image4.jpg' },
        gallery: [
          { src: '/hero-gallery/image3.jpg', alt: 'A street scene with a cyclist and pedestrians in front of a grand building.' },
          { src: '/hero-gallery/image4.jpg', alt: 'Two people walking through a historic town square.' },
          { src: '/hero-gallery/image15.jpg', alt: 'The iconic structure of the Manhattan Bridge.' },
        ],
      },
      {
        id: 'abstract-forms',
        chapterLabel: 'Category 5/5',
        mainTitle: 'Abstract Forms',
        description: 'Finding beauty in the lines, textures, and shapes that often go unnoticed.',
        leftImage: { src: '/hero-gallery/image17.jpg' },
        rightImage: { src: '/hero-gallery/image19.jpg' },
        gallery: [
          { src: '/hero-gallery/image2.jpg', alt: 'The curving lines of a modern architectural staircase.' },
          { src: '/hero-gallery/image16.jpg', alt: 'Repeating geometric patterns on a building exterior.' },
          { src: '/hero-gallery/image17.jpg', alt: 'Strong shadows create an abstract composition on a wall.' },
          { src: '/hero-gallery/image19.jpg', alt: 'Close-up texture of a natural rock formation.' },
        ],
      },
    ],
  },
  // =======================================================================
  // CHAPTER 2
  // =======================================================================
  {
    id: 'pulse-of-the-city',
    chapterLabel: 'Chapter Two',
    mainTitle: 'The Pulse of The City',
    description: 'High-contrast settings capture the stark interplay between light and shadow, while wide angles showcase the monumental scale of the city.',
    leftImage: { src: '/hero-gallery/image5.jpg' },
    rightImage: { src: '/hero-gallery/image6.jpg' },
    categories: [
       {
        id: 'urban-giants',
        chapterLabel: 'Category 1/5',
        mainTitle: 'Urban Giants',
        description: 'A study of the skyscrapers and monumental structures that dominate the city skyline.',
        leftImage: { src: '/hero-gallery/image15.jpg' },
        rightImage: { src: '/hero-gallery/image16.jpg' },
        gallery: [
          { src: '/hero-gallery/image15.jpg', alt: 'The Manhattan Bridge connecting two parts of the city.' },
          { src: '/hero-gallery/image16.jpg', alt: 'An upward shot of a modern skyscraper, emphasizing its height.' },
          { src: '/hero-gallery/image5.jpg', alt: 'A construction worker silhouetted against the setting sun.' },
        ],
      },
       {
        id: 'city-at-night',
        chapterLabel: 'Category 2/5',
        mainTitle: 'City at Night',
        description: 'When the sun sets, the city reveals a different character through neon lights and deep shadows.',
        leftImage: { src: '/hero-gallery/image6.jpg' },
        rightImage: { src: '/hero-gallery/image12.jpg' },
        gallery: [
          { src: '/hero-gallery/image6.jpg', alt: 'A vibrant city street illuminated by streetlights and signs at night.' },
          { src: '/hero-gallery/image12.jpg', alt: 'A quiet, reflective moment inside a cafe at night.' },
          { src: '/hero-gallery/image5.jpg', alt: 'The silhouette of a worker against a dramatic sunset sky.' },
        ],
      },
      {
        id: 'the-human-element',
        chapterLabel: 'Category 3/5',
        mainTitle: 'The Human Element',
        description: 'Focusing on the people who inhabit the urban landscape, each with a unique story.',
        leftImage: { src: '/hero-gallery/image10.jpg' },
        rightImage: { src: '/hero-gallery/image3.jpg' },
        gallery: [
          { src: '/hero-gallery/image10.jpg', alt: 'A baker focused on her craft.' },
          { src: '/hero-gallery/image3.jpg', alt: 'A person walking on a busy city street.' },
          { src: '/hero-gallery/image4.jpg', alt: 'A couple walking hand-in-hand.' },
          { src: '/hero-gallery/image13.jpg', alt: 'A crowd of people moving through a public space.' },
        ],
      },
      {
        id: 'hidden-corners',
        chapterLabel: 'Category 4/5',
        mainTitle: 'Hidden Corners',
        description: 'Exploring the quiet alleys, overlooked details, and secret spots away from the main thoroughfares.',
        leftImage: { src: '/hero-gallery/image17.jpg' },
        rightImage: { src: '/hero-gallery/image2.jpg' },
        gallery: [
          { src: '/hero-gallery/image17.jpg', alt: 'An interesting play of light and shadow in a narrow alley.' },
          { src: '/hero-gallery/image2.jpg', alt: 'The elegant curves of an interior staircase.' },
          { src: '/hero-gallery/image18.jpg', alt: 'An old, weathered doorway with character.' },
        ],
      },
      {
        id: 'motion-and-transit',
        chapterLabel: 'Category 5/5',
        mainTitle: 'Motion & Transit',
        description: 'Capturing the constant flow of movement, from the blur of traffic to the rush of commuters.',
        leftImage: { src: '/hero-gallery/image15.jpg' },
        rightImage: { src: '/hero-gallery/image3.jpg' },
        gallery: [
          { src: '/hero-gallery/image15.jpg', alt: 'The grand scale of a city bridge.' },
          { src: '/hero-gallery/image3.jpg', alt: 'A cyclist navigating the city streets.' },
          { src: '/hero-gallery/image6.jpg', alt: 'Light trails from traffic on a busy night street.' },
        ],
      },
    ],
  },
  // =======================================================================
  // CHAPTER 3
  // =======================================================================
    {
    id: 'sacred-serenity',
    chapterLabel: 'Chapter Three',
    mainTitle: 'Bali\'s Sacred Serenity',
    description: 'A journey into the spiritual heart of Bali, where ancient traditions and lush landscapes converge in breathtaking harmony.',
    leftImage: { src: '/hero-gallery/image14.jpg' },
    rightImage: { src: '/hero-gallery/image18.jpg' },
    categories: [
        {
            id: 'ancient-temples',
            chapterLabel: 'Category 1/5',
            mainTitle: 'Ancient Temples',
            description: 'The spiritual centers of Bali, rich with history, intricate carvings, and a palpable sense of peace.',
            leftImage: { src: '/hero-gallery/image18.jpg' },
            rightImage: { src: '/hero-gallery/image20.jpg' },
            gallery: [
              { src: '/hero-gallery/image18.jpg', alt: 'A weathered stone temple against a dramatic sky.' },
              { src: '/hero-gallery/image20.jpg', alt: 'Close-up of a statue with offerings.' },
              { src: '/hero-gallery/image8.jpg', alt: 'A remote village that could be near a sacred site.' },
            ],
        },
        {
            id: 'rice-terraces',
            chapterLabel: 'Category 2/5',
            mainTitle: 'Terraced Rice Fields',
            description: 'Vibrant green slopes unfold like a living canvas, shaped by generations of farmers.',
            leftImage: { src: '/hero-gallery/image7.jpg' },
            rightImage: { src: '/hero-gallery/image14.jpg' },
            gallery: [
              { src: '/hero-gallery/image7.jpg', alt: 'A vast mountain landscape reminiscent of terrace farming.' },
              { src: '/hero-gallery/image14.jpg', alt: 'Lush greenery under a beautiful sky.' },
              { src: '/hero-gallery/image1.jpg', alt: 'Expansive natural beauty.' },
            ],
        },
        {
            id: 'spiritual-rituals',
            chapterLabel: 'Category 3/5',
            mainTitle: 'Spiritual Rituals',
            description: 'Capturing the deep devotion and colorful ceremonies that are an integral part of daily life.',
            leftImage: { src: '/hero-gallery/image13.jpg' },
            rightImage: { src: '/hero-gallery/image4.jpg' },
            gallery: [
              { src: '/hero-gallery/image13.jpg', alt: 'A gathering of people that suggests a communal event.' },
              { src: '/hero-gallery/image4.jpg', alt: 'Two figures walking in traditional-looking attire.' },
              { src: '/hero-gallery/image10.jpg', alt: 'The careful preparation of food, often part of rituals.' },
            ],
        },
        {
            id: 'local-artisans',
            chapterLabel: 'Category 4/5',
            mainTitle: 'Local Artisans',
            description: 'A tribute to the skilled craftspeople who preserve Bali\'s artistic heritage through their work.',
            leftImage: { src: '/hero-gallery/image10.jpg' },
            rightImage: { src: '/hero-gallery/image19.jpg' },
            gallery: [
              { src: '/hero-gallery/image10.jpg', alt: 'A baker demonstrating skill and focus in her craft.' },
              { src: '/hero-gallery/image19.jpg', alt: 'The texture and detail of handcrafted work.' },
              { src: '/hero-gallery/image11.jpg', alt: 'A person engrossed in their work.' },
            ],
        },
        {
            id: 'coastal-views',
            chapterLabel: 'Category 5/5',
            mainTitle: 'Coastal Views',
            description: 'From dramatic cliffs to tranquil beaches, exploring the island\'s stunning and diverse coastline.',
            leftImage: { src: '/hero-gallery/image1.jpg' },
            rightImage: { src: '/hero-gallery/image9.jpg' },
            gallery: [
              { src: '/hero-gallery/image1.jpg', alt: 'A sweeping coastal landscape.' },
              { src: '/hero-gallery/image9.jpg', alt: 'A boat on the water, suggesting a coastal setting.' },
              { src: '/hero-gallery/image14.jpg', alt: 'Sunlight over a vast expanse that could be the sea.' },
            ],
        },
    ],
  },
];