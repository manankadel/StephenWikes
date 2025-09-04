export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto p-8 pt-24">
        <h1 className="text-5xl font-extrabold text-center mb-8 text-gray-900">About Stephen Wikes</h1>
        <div className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-700">
          <p className="mb-4">
            Stephen Wikes is a passionate photographer with over 15 years of experience capturing moments and telling stories through the lens.
            Based in [Your City/Region], Stephen specializes in [e.g., wedding, portrait, landscape] photography, bringing a unique blend of artistry and technical skill to every project.
          </p>
          <p className="mb-4">
            His approach is centered around understanding his clients' vision and delivering timeless images that truly reflect their personality and the emotion of the moment.
            Whether it's the candid joy of a wedding day, the thoughtful gaze in a portrait, or the breathtaking grandeur of a landscape, Stephen's goal is to create visuals that resonate deeply.
          </p>
          <p>
            When not behind the camera, Stephen enjoys [mention a hobby, e.g., hiking with his dog, exploring new places, listening to jazz].
          </p>
          <div className="flex justify-center mt-12 mb-8">
            <div className="bg-gray-200 w-64 h-64 rounded-full flex items-center justify-center text-gray-600 text-center text-sm overflow-hidden shadow-xl">
              Placeholder for Stephen's Headshot
            </div>
          </div>
          <h2 className="text-3xl font-bold mt-12 mb-6 text-center text-gray-900">Client Testimonials</h2>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
            <p className="italic text-gray-800">"Stephen captured our wedding day perfectly. Every photo tells a story, and he was so professional and easy to work with!"</p>
            <p className="text-right mt-2 font-medium text-gray-600">- Jane & John Doe</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <p className="italic text-gray-800">"The portraits Stephen took of my family are absolutely stunning. He made everyone feel comfortable and the results exceeded our expectations."</p>
            <p className="text-right mt-2 font-medium text-gray-600">- The Smith Family</p>
          </div>
        </div>
      </div>
    </div>
  );
}