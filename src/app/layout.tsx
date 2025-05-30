import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '100 Man DAO - Unity from Diversity',
  description: 'Experience the harmonious convergence of technology and vision. Watch as scattered possibilities unite into perfect unity.',
  keywords: ['DAO', 'Unity', 'Collective', 'Technology', 'Vision'],
  authors: [{ name: '100 Man DAO' }],
  creator: '100 Man DAO',
  publisher: '100 Man DAO',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: '100 Man DAO - Unity from Diversity',
    description: 'Experience the harmonious convergence of technology and vision.',
    siteName: '100 Man DAO',
  },
  twitter: {
    card: 'summary_large_image',
    title: '100 Man DAO - Unity from Diversity',
    description: 'Experience the harmonious convergence of technology and vision.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
