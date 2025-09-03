
import Hero from '@/components/Hero';

export default function Home() {
  return (
    // The main tag is only a container here. The Hero component handles its own height.
    <main>
      <Hero />

      {/* 
        You can add other sections of your homepage below the fold here.
        For example:
        <div className="container mx-auto p-8 text-white">
          <h2 className="text-4xl text-center">Featured Work</h2>
          ...
        </div>
      */}
    </main>
  );
}