import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-gray-600">
          Stephen Wikes Photography
        </Link>
        <div className="space-x-4">
          <Link href="/portfolio" className="text-gray-600 hover:text-gray-800 font-medium">
            Portfolio
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-gray-800 font-medium">
            About
          </Link>
          <Link href="/services" className="text-gray-600 hover:text-gray-800 font-medium">
            Services
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-800 font-medium">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}