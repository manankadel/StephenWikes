
import './globals.css'
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-playfair' })

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
      <body className={`${inter.variable} ${playfair.variable} bg-black`}>
        <Navbar />
        {/* KEY CHANGE: Added "flex-grow" back to fix the sticky footer */}
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}