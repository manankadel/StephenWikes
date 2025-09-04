### ./src/app/contact/page.tsx ###

export default function ContactPage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto p-8 pt-24">
        <h1 className="text-5xl font-extrabold text-center mb-8 text-gray-900">Get in Touch</h1>
        <p className="text-center text-xl text-gray-700 mb-12">
          Have a question, want to book a session, or just say hello? We'd love to hear from you!
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Send Us a Message</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-gray-800 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-lg font-medium text-gray-800 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-lg font-medium text-gray-800 mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg"
                  placeholder="Regarding a photo session..."
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-lg font-medium text-gray-800 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg"
                  placeholder="Tell us about your photography needs..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-xl font-semibold"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Details</h2>
            <div className="space-y-6 text-lg text-gray-700">
              <p>
                <strong className="block text-gray-900 text-xl mb-1">Email:</strong>
                <a href="mailto:info@stephenwikes.com" className="text-blue-600 hover:underline">info@stephenwikes.com</a>
              </p>
              <p>
                <strong className="block text-gray-900 text-xl mb-1">Phone:</strong>
                <a href="tel:+1234567890" className="text-blue-600 hover:underline">+1 (234) 567-890</a>
              </p>
              <p>
                <strong className="block text-gray-900 text-xl mb-1">Address:</strong>
                [Stephen's Studio Address, e.g., 123 Photography Lane, Artsville, State 12345]
              </p>
              <div className="mt-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Follow Us</h3>
                <div className="flex space-x-6">
                  <a href="#" className="text-blue-600 hover:text-blue-800 text-xl" aria-label="Facebook">Facebook</a>
                  <a href="#" className="text-blue-600 hover:text-blue-800 text-xl" aria-label="Instagram">Instagram</a>
                  <a href="#" className="text-blue-600 hover:text-blue-800 text-xl" aria-label="LinkedIn">LinkedIn</a>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Location Map</h3>
                <div className="bg-gray-200 h-64 flex items-center justify-center text-gray-600 rounded-lg">
                  [Placeholder for Google Maps Embed]
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}