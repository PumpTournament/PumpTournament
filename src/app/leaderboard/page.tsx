'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type LeaderboardEntry = {
  rank: number
  playerName: string
  walletShort: string
  kills: number
  ptmEarned: number
}

export default function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([])
  const [timeFrame, setTimeFrame] = useState<'daily' | 'weekly' | 'allTime'>('daily')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, fetch leaderboard data from an API
    // For now we'll use mock data
    setTimeout(() => {
      const mockData = generateMockLeaderboardData(timeFrame)
      setLeaderboardData(mockData)
      setIsLoading(false)
    }, 500)
  }, [timeFrame])

  const generateMockLeaderboardData = (
    timeFrame: 'daily' | 'weekly' | 'allTime'
  ): LeaderboardEntry[] => {
    // Different data based on timeframe
    const multiplier = timeFrame === 'daily' ? 1 : timeFrame === 'weekly' ? 3 : 7
    
    return Array.from({ length: 50 }, (_, i) => ({
      rank: i + 1,
      playerName: `Player${i + 1}`,
      walletShort: `Wallet${i + 1}...${Math.floor(Math.random() * 1000)}`,
      kills: Math.floor(Math.random() * 30 * multiplier) + 5 * multiplier,
      ptmEarned: Math.floor(Math.random() * 50 * multiplier) + 10 * multiplier
    }))
      .sort((a, b) => b.kills - a.kills)
      .map((entry, index) => ({ ...entry, rank: index + 1 }))
  }

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <Link href="/" className="flex items-center">
          <h1 className="text-xl font-bold font-pixel">PUMP TOURNAMENT</h1>
        </Link>
        <div>
          <Link href="/game" className="btn-primary">
            Play Game
          </Link>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Leaderboard</h1>

        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <div className="flex justify-center space-x-4 mb-4">
            <button
              onClick={() => setTimeFrame('daily')}
              className={`px-4 py-2 rounded ${
                timeFrame === 'daily'
                  ? 'bg-primary text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setTimeFrame('weekly')}
              className={`px-4 py-2 rounded ${
                timeFrame === 'weekly'
                  ? 'bg-primary text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setTimeFrame('allTime')}
              className={`px-4 py-2 rounded ${
                timeFrame === 'allTime'
                  ? 'bg-primary text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              All Time
            </button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="animate-pulse-fast text-xl">Loading...</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-700 text-gray-200">
                    <th className="py-3 px-4 text-left">Rank</th>
                    <th className="py-3 px-4 text-left">Player</th>
                    <th className="py-3 px-4 text-left">Wallet</th>
                    <th className="py-3 px-4 text-right">Kills</th>
                    <th className="py-3 px-4 text-right">$PTM Earned</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((entry) => (
                    <tr
                      key={entry.rank}
                      className={`border-b border-gray-700 ${
                        entry.rank <= 3 ? 'bg-gray-700/30' : ''
                      } hover:bg-gray-700/20`}
                    >
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block w-8 h-8 text-center leading-8 rounded-full font-bold ${
                            entry.rank === 1
                              ? 'bg-yellow-500 text-black'
                              : entry.rank === 2
                              ? 'bg-gray-400 text-black'
                              : entry.rank === 3
                              ? 'bg-amber-700 text-black'
                              : 'bg-gray-700'
                          }`}
                        >
                          {entry.rank}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold">
                        {entry.playerName}
                      </td>
                      <td className="py-3 px-4 text-gray-400">
                        {entry.walletShort}
                      </td>
                      <td className="py-3 px-4 text-right font-mono">
                        {entry.kills}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-primary font-bold">
                        {entry.ptmEarned}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        <div className="text-center text-sm text-gray-400 mt-8">
          <p>Leaderboard updates every hour. PTM rewards are distributed at the end of each period.</p>
          <p className="mt-2">
            Top players earn exclusive rewards and entry into monthly tournaments.
          </p>
        </div>
      </div>
    </main>
  )
} 