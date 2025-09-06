// FILE: src/app/about/[[...slug]]/page.tsx

import path from 'path';
import fs from 'fs';
import sizeOf from 'image-size';
import { aboutData } from '../data';
import AboutPageClient from '../AboutPageClient';

// Helper function to add dimensions to an array of items (chapters or categories)
const addImageDimensions = (items: any[]) => {
  if (!items) return [];
  return items.map(item => {
    try {
      const leftImagePath = path.join(process.cwd(), 'public', item.leftImage.src);
      const rightImagePath = path.join(process.cwd(), 'public', item.rightImage.src);

      const leftImageBuffer = fs.readFileSync(leftImagePath);
      const rightImageBuffer = fs.readFileSync(rightImagePath);

      const leftImageDims = sizeOf(leftImageBuffer);
      const rightImageDims = sizeOf(rightImageBuffer);

      return {
        ...item,
        leftImage: { ...item.leftImage, width: leftImageDims.width, height: leftImageDims.height },
        rightImage: { ...item.rightImage, width: rightImageDims.width, height: rightImageDims.height },
      };
    } catch (error) {
      console.error(`Could not find images for item: ${item.mainTitle}. Make sure the image paths in data.ts are correct.`);
      // Return item without dimensions if images are missing to prevent crash
      return {
        ...item,
        leftImage: { ...item.leftImage, width: 800, height: 600 }, // Fallback dimensions
        rightImage: { ...item.rightImage, width: 800, height: 600 }, // Fallback dimensions
      };
    }
  });
};

export default async function AboutPage({ params }: { params: { slug?: string[] } }) {
  const { slug } = params;

  let view: 'chapters' | 'categories' | 'gallery' = 'chapters';
  let chaptersWithDims: any[] = [];
  let activeChapterWithDims = null;
  let activeCategoryWithDims = null;

  if (slug?.length === 1) {
    // URL is /about/[chapterId] -> We are in Layer 2
    view = 'categories';
    const chapterId = slug[0];
    const chapterData = aboutData.find(c => c.id === chapterId);
    if (chapterData) {
      activeChapterWithDims = {
        ...chapterData,
        categories: addImageDimensions(chapterData.categories)
      };
    }
  } else if (slug?.length === 2) {
    // URL is /about/[chapterId]/[categoryId] -> We are in Layer 3
    view = 'gallery';
    const chapterId = slug[0];
    const categoryId = slug[1];
    const parentChapter = aboutData.find(c => c.id === chapterId);
    if (parentChapter) {
        // Find the specific category but pass the whole chapter context
         activeChapterWithDims = { ...parentChapter };
         activeCategoryWithDims = parentChapter.categories.find(cat => cat.id === categoryId) || null;
    }
  } else {
    // URL is /about -> We are in Layer 1
    view = 'chapters';
    chaptersWithDims = addImageDimensions(aboutData);
  }
  
  return (
    <div className="bg-white">
      <AboutPageClient
        initialView={view}
        chapters={chaptersWithDims}
        activeChapter={activeChapterWithDims}
        activeCategory={activeCategoryWithDims}
      />
    </div>
  );
}