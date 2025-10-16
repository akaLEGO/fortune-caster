import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Fortune Caster - 求籤 Cast Your Fortune',
  description: 'Draw digital fortune sticks and get complete life guidance. Mint your fortune as an NFT on Base.',
  manifest: '/farcaster-manifest.json',
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Fortune Caster - Cast Your Fortune',
    description: 'Draw digital fortune sticks and get complete life guidance. Mint as NFT on Base.',
    url: 'https://fortune-caster-six.vercel.app',
    siteName: 'Fortune Caster',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Fortune Caster - Digital Fortune Sticks',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fortune Caster - Cast Your Fortune',
    description: 'Draw digital fortune sticks and get complete life guidance. Mint as NFT on Base.',
    images: ['/og-image.png'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: '#f97316',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

