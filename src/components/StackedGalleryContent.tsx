import React from 'react';

// Text is now white to be visible on the black background.
export default function StackedGalleryContent() {
  return (
    <div className="text-center">
      <h2 className="text-6xl font-bold font-serif mb-4 text-white">
        Your Title Here
      </h2>
      <p className="max-w-2xl mx-auto text-xl text-gray-300">
        Your description about the gallery goes here. This text is now properly centered and ready for you to edit.
      </p>
    </div>
  );
}