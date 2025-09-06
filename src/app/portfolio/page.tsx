export default function PortfolioPage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto p-8 pt-24">
        <h1 className="text-5xl font-extrabold text-center mb-8 text-gray-900">Our Portfolio</h1>
        <p className="text-center text-xl text-gray-700">Explore a diverse collection of our recent work.</p>
        {/* Portfolio gallery will go here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div className="bg-gray-100 h-64 flex items-center justify-center text-gray-500 rounded-lg shadow-lg">Placeholder Image 1</div>
          <div className="bg-gray-100 h-64 flex items-center justify-center text-gray-500 rounded-lg shadow-lg">Placeholder Image 2</div>
          <div className="bg-gray-100 h-64 flex items-center justify-center text-gray-500 rounded-lg shadow-lg">Placeholder Image 3</div>
          <div className="bg-gray-100 h-64 flex items-center justify-center text-gray-500 rounded-lg shadow-lg">Placeholder Image 4</div>
        </div>
      </div>
    </div>
  );
}