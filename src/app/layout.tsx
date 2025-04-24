import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pump Tournament',
  description: 'Web3 social gaming platform built on the Solana blockchain, centered around pixel-style multiplayer real-time shooting battles',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
} 