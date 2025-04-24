import Link from 'next/link'

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <Link href="/" className="flex items-center">
          <h1 className="text-xl font-bold font-pixel">PUMP TOURNAMENT</h1>
        </Link>
        <div className="flex gap-4">
          <Link href="/game" className="btn-primary">
            Play Game
          </Link>
          <Link href="/leaderboard" className="btn-secondary">
            Leaderboard
          </Link>
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">About Pump Tournament</h1>
        
        <div className="space-y-8">
          <section className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-primary">Vision</h2>
            <p className="mb-4">
              Pump Tournament is committed to forging a decentralized global gaming ecosystem, 
              seamlessly integrating pixel-style multiplayer real-time shooting battles with 
              vibrant social interaction and blockchain innovation, empowering every player 
              to compete, connect, and thrive.
            </p>
            <p>
              In the Pump Tournament universe, players dive into beautifully crafted browser-based 
              arenas without downloads, engaging in silky-smooth battles while leveraging real-time 
              all-channel chat to foster a dynamic, inclusive, and collaborative Web3 community.
            </p>
          </section>
          
          <section className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-secondary">Core Features</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Browser-Based Shooting Battles:</strong> Instant-access, pixel-style 
                multiplayer battles with silky-smooth controls and exquisite page design, 
                requiring no downloads.
              </li>
              <li>
                <strong>Dynamic Token Rewards:</strong> Earn $PTM through victories, community 
                interactions, and referrals, sustained by a buyback wallet.
              </li>
              <li>
                <strong>Vibrant Social Experience:</strong> Real-time all-channel chat, 
                leaderboards, and cross-platform sharing foster player connections and 
                community spirit.
              </li>
              <li>
                <strong>Fair Launch Mechanism:</strong> 100% Pump.fun fair launch ensures 
                transparent token distribution and dynamic reward optimization.
              </li>
              <li>
                <strong>Solana Technical Advantage:</strong> Solana's high throughput and 
                low fees deliver seamless real-time battles and on-chain reward distribution.
              </li>
            </ul>
          </section>
          
          <section className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-accent">Gameplay</h2>
            <p className="mb-4">
              Players join team or solo modes via browser, engaging in pixel-style dynamic 
              arenas to defeat opponents through precise shooting and strategy, accumulating 
              kills and team points.
            </p>
            <p className="mb-4">
              Arenas feature diverse modes (e.g., Team Deathmatch, Capture the Flag, Survival), 
              with pickable advanced weapons (e.g., sniper rifles, rocket launchers) and health 
              regeneration zones for strategic depth.
            </p>
            <p>
              Real-time all-channel chat enables players to coordinate tactics, share strategies, 
              or engage in casual banter during battles, fostering a lively community atmosphere.
            </p>
          </section>
          
          <section className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-primary">Tokenomics</h2>
            <p className="mb-4">
              $PTM is Pump Tournament's native token, built on Solana's SPL Token standard 
              and distributed via a 100% Pump.fun fair launch, designed to incentivize gameplay, 
              social engagement, and community governance.
            </p>
            <p>
              Players can use $PTM to purchase premium weapon skins, power-ups, or custom arena 
              themes, enhancing personalization. The token also grants governance rights, allowing 
              holders to vote on new features, game modes, and ecosystem developments.
            </p>
          </section>
          
          <section className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-secondary">Roadmap</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold">Q2-Q3 2025: Project Initiation & Testing</h3>
                <p>Core game development, community building, and beta tournaments</p>
              </div>
              <div>
                <h3 className="font-bold">Q4 2025: Mainnet Launch</h3>
                <p>$PTM token on Solana mainnet via Pump.fun fair launch</p>
              </div>
              <div>
                <h3 className="font-bold">Q1-Q2 2026: Ecosystem Expansion</h3>
                <p>New game modes, Solana ecosystem partnerships, and global promotion</p>
              </div>
            </div>
          </section>
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-xl mb-4">Join the Pump Tournament community</p>
          <div className="flex justify-center gap-4">
            <a href="https://twitter.com/PumpTournament" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors">
              Twitter
            </a>
            <a href="https://discord.gg/pumptournament" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
              Discord
            </a>
          </div>
        </div>
      </div>
    </main>
  )
} 