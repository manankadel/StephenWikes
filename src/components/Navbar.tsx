
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full p-6 z-50">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white hover:text-gray-300 transition-colors">
          Stephen Wikes
        </Link>
        <div className="space-x-6">
          <Link href="/portfolio" className="text-white hover:text-gray-300 font-medium transition-colors">
            Portfolio
          </Link>
          <Link href="/about" className="text-white hover:text-gray-300 font-medium transition-colors">
            About
          </Link>
          <Link href="/services" className="text-white hover:text-gray-300 font-medium transition-colors">
            Services
          </Link>
          <Link href="/contact" className="text-white hover:text-gray-300 font-medium transition-colors">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}