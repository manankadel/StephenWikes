// FILE: src/app/about/AboutPageClient.tsx
'use client';

import { useRouter } from 'next/navigation';
import HorizontalScroller from '@/components/HorizontalScroller';
import ImageGallery from '@/components/ImageGallery';
import { Chapter, Category } from './data';

type Props = {
  initialView: 'chapters' | 'categories' | 'gallery';
  chapters: Chapter[];
  activeChapter: Chapter | null;
  activeCategory: Category | null;
};

export default function AboutPageClient({
  initialView,
  chapters,
  activeChapter,
  activeCategory,
}: Props) {
  const router = useRouter();

  const handleChapterClick = (chapterId: string) => {
    // Navigate to Layer 2
    router.push(`/about/${chapterId}`);
  };

  const handleCategoryClick = (categoryId: string) => {
    // Navigate to Layer 3
    if (activeChapter) {
      router.push(`/about/${activeChapter.id}/${categoryId}`);
    }
  };

  const handleCloseGallery = () => {
    // Go back from Layer 3 to Layer 2
    if (activeChapter) {
      router.push(`/about/${activeChapter.id}`);
    }
  };
  
  const handleBackToChapters = () => {
    // Go back from Layer 2 to Layer 1
     router.push('/about');
  }

  // Render the correct layer based on the initialView prop
  if (initialView === 'gallery' && activeCategory) {
    return <ImageGallery category={activeCategory} onClose={handleCloseGallery} />;
  }

  if (initialView === 'categories' && activeChapter) {
    return (
      <HorizontalScroller
        items={activeChapter.categories}
        onTitleClick={handleCategoryClick}
        onBack={handleBackToChapters}
      />
    );
  }

  return (
    <HorizontalScroller
      items={chapters}
      onTitleClick={handleChapterClick}
    />
  );
}