'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import GameComponent from '@/components/GameComponent'
import ChatComponent from '@/components/ChatComponent'

export default function GamePage() {
  const [isConnected, setIsConnected] = useState(false)
  
  useEffect(() => {
    // Check if wallet is connected (mock implementation)
    const checkWallet = async () => {
      // In a real app, check if Solana wallet is connected
      setIsConnected(false)
    }
    
    checkWallet()
  }, [])
  
  return (
    <main className="flex min-h-screen flex-col p-4">
      <div className="flex justify-between items-center mb-6">
        <Link href="/" className="flex items-center">
          <h1 className="text-xl font-bold font-pixel">PUMP TOURNAMENT</h1>
        </Link>
        <button className="btn-primary">
          {isConnected ? 'Wallet Connected' : 'Connect Wallet'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="game-container">
            <GameComponent />
          </div>
          
          <div className="mt-4 bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Stats</h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-400">Kills</p>
                <p className="text-xl">0</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Deaths</p>
                <p className="text-xl">0</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">$PTM Earned</p>
                <p className="text-xl">0</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col">
          <div className="bg-gray-800 p-4 rounded-lg mb-4">
            <h2 className="text-xl font-bold mb-2">Leaderboard</h2>
            <div className="space-y-2">
              {/* Mock leaderboard data */}
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-gray-700 rounded">
                  <div className="flex items-center">
                    <span className="text-primary font-bold mr-2">#{index + 1}</span>
                    <span>Player{index + 1}</span>
                  </div>
                  <span>{20 - index * 3} kills</span>
                </div>
              ))}
            </div>
            <Link href="/leaderboard" className="block text-center text-sm text-primary mt-3 hover:underline">
              View Full Leaderboard
            </Link>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg flex-grow">
            <h2 className="text-xl font-bold mb-2">All-Channel Chat</h2>
            <ChatComponent />
          </div>
        </div>
      </div>
    </main>
  )
} 