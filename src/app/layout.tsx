import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '../components/Navbar' // Import Navbar
import Footer from '../components/Footer' // Import Footer

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Stephen Wikes Photography',
  description: 'Portfolio of Stephen Wikes, a professional photographer based in [Your Location]. Specializing in weddings, portraits, and commercial photography.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50`}>
        <Navbar /> {/* Add Navbar here */}
        <main className="flex-grow"> {/* Add flex-grow to main for sticky footer */}
          {children}
        </main>
        <Footer /> {/* Add Footer here */}
      </body>
    </html>
  )
}