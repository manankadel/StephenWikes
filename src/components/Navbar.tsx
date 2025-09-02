import Link from 'next/link';

export default function Navbar() {
  return (
    // Added a subtle border and a slightly stronger shadow
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-gray-600 transition-colors duration-300">
          Stephen Wikes
        </Link>
        <div className="space-x-6">
          <Link href="/portfolio" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300">
            Portfolio
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300">
            About
          </Link>
          <Link href="/services" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300">
            Services
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}