import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Fortune Caster - 求籤 Cast Your Fortune',
  description: 'Draw fortune sticks and discover your destiny. Mint your fortune as an NFT on Base.',
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

