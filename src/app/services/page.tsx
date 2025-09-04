import Link from 'next/link';

export default function ServicesPage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto p-8 pt-24">
        <h1 className="text-5xl font-extrabold text-center mb-8 text-gray-900">Our Services</h1>
        <p className="text-center text-xl text-gray-700 mb-12">Tailored photography solutions to capture your most precious moments.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Wedding Photography</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Capturing the magic and emotion of your special day, from intimate ceremonies to grand celebrations.
              We ensure every smile, tear, and dance move is beautifully documented.
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6">
              <li>Full-day coverage</li>
              <li>Engagement session options</li>
              <li>High-resolution digital images</li>
              <li>Customizable packages</li>
            </ul>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300 text-lg font-semibold">
              Learn More
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Portrait Sessions</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              From individual headshots to family portraits, we create stunning images that reflect personality and connection.
              Perfect for professional profiles, family heirlooms, or personal branding.
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6">
              <li>Individual, family, and group portraits</li>
              <li>On-location or studio options</li>
              <li>Professional retouching</li>
              <li>Print options available</li>
            </ul>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300 text-lg font-semibold">
              Learn More
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Commercial & Events</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Showcase your business, products, or corporate events with high-quality imagery.
              We provide visual content that enhances your brand's presence and tells your story effectively.
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6">
              <li>Product photography</li>
              <li>Corporate events and conferences</li>
              <li>Real estate and architectural</li>
              <li>Brand storytelling visuals</li>
            </ul>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300 text-lg font-semibold">
              Learn More
            </button>
          </div>
        </div>
        <div className="text-center mt-12">
          <p className="text-xl text-gray-800">
            Interested in a custom package or have specific needs?
            <Link href="/contact" className="text-blue-600 hover:underline ml-2 font-semibold">Contact us for a personalized quote!</Link>
          </p>
        </div>
      </div>
    </div>
  );
}