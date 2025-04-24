'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const [showWalletOptions, setShowWalletOptions] = useState(false)
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-pixel text-sm lg:flex">
        <div className="flex items-center">
          <Image 
            src="/Logo.png" 
            alt="Pump Tournament Logo" 
            width={40} 
            height={40}
            className="mr-2"
          />
          <p className="text-xl font-bold">PUMP TOURNAMENT</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            className="btn-primary"
            onClick={() => setShowWalletOptions(!showWalletOptions)}
          >
            Connect Wallet
          </button>
          {showWalletOptions && (
            <div className="absolute right-4 mt-16 bg-gray-800 p-3 rounded-lg shadow-lg">
              <button className="w-full text-left p-2 hover:bg-gray-700 rounded">Phantom</button>
              <button className="w-full text-left p-2 hover:bg-gray-700 rounded">Solflare</button>
            </div>
          )}
        </div>
      </div>

      <div className="relative flex place-items-center flex-col text-center my-10">
        <h1 className="text-5xl font-bold mb-6">
          Enter the <span className="text-primary">Pump Tournament</span>
        </h1>
        <p className="text-xl max-w-2xl mb-8">
          A Web3 social gaming platform built on Solana with pixel-style multiplayer shooting battles and $PTM token rewards
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link href="/game" className="btn-primary text-lg px-8 py-3">
            Play Now
          </Link>
          <Link href="/leaderboard" className="btn-secondary text-lg px-8 py-3">
            Leaderboard
          </Link>
        </div>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 my-10">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-3 text-primary">Browser Battles</h2>
          <p>Instant-access pixel-style multiplayer battles with silky-smooth controls and no downloads required.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-3 text-secondary">Token Rewards</h2>
          <p>Earn $PTM through victories, community interactions, and referrals, sustained by a buyback wallet.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-3 text-accent">Social Gaming</h2>
          <p>Real-time all-channel chat, leaderboards, and cross-platform sharing foster player connections.</p>
        </div>
      </div>

      <footer className="w-full max-w-5xl mt-10 border-t border-gray-700 pt-8 flex flex-col items-center">
        <p className="text-center">Built on Solana blockchain with 100% Pump.fun fair launch</p>
        <div className="flex gap-4 mt-4">
          <Link href="/about" className="text-primary hover:underline">About</Link>
          <Link href="/whitepaper" className="text-primary hover:underline">Whitepaper</Link>
          <Link href="https://twitter.com/PumpTournament" className="text-primary hover:underline">Twitter</Link>
          <Link href="https://discord.gg/pumptournament" className="text-primary hover:underline">Discord</Link>
        </div>
      </footer>
    </main>
  )
} 