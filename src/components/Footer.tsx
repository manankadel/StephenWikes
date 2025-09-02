export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-white p-6 mt-8">
      <div className="container mx-auto text-center">
        <p className="text-lg mb-2">Stephen Wikes Photography</p>
        <p>&copy; {currentYear} All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          {/* Placeholder for social media links */}
          <a href="#" className="text-gray-400 hover:text-white" aria-label="Facebook">
            {/* You can replace with SVG icons later */}
            Facebook
          </a>
          <a href="#" className="text-gray-400 hover:text-white" aria-label="Instagram">
            Instagram
          </a>
          <a href="#" className="text-gray-400 hover:text-white" aria-label="LinkedIn">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}