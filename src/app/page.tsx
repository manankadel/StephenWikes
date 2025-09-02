export default function Home() {
  return (
    // We remove the default padding to allow the hero section to be full-width
    <main>
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        // IMPORTANT: Replace this with one of Stephen Wikes' actual high-quality photos!
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop')" }}
      >
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative z-10 text-center text-white p-4">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}>
            Capturing Moments, Creating Memories
          </h1>
          <p className="text-lg md:text-2xl mb-8 max-w-2xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>
            Timeless photography by Stephen Wikes, telling your story through the lens.
          </p>
          <a 
            href="/portfolio" 
            className="bg-white text-gray-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition-colors duration-300 transform hover:scale-105"
          >
            View My Work
          </a>
        </div>
      </section>

      {/* You can add more sections below the hero, e.g., Featured Galleries */}
      <section className="py-20 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Featured Work</h2>
          <p className="text-xl text-gray-600 mb-12">A glimpse into our recent projects</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            <div className="bg-gray-200 h-80 rounded-lg shadow-md"></div>
            <div className="bg-gray-200 h-80 rounded-lg shadow-md"></div>
            <div className="bg-gray-200 h-80 rounded-lg shadow-md"></div>
          </div>
        </div>
      </section>
    </main>
  );
}