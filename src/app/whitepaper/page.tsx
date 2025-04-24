import Link from 'next/link'

export default function WhitepaperPage() {
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
          <Link href="/about" className="btn-secondary">
            About
          </Link>
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Pump Tournament Whitepaper</h1>
        
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Vision</h2>
          <p className="mb-4">
            Pump Tournament is committed to forging a decentralized global gaming ecosystem, seamlessly integrating
            pixel-style multiplayer real-time shooting battles with vibrant social interaction and blockchain innovation,
            empowering every player to compete, connect, and thrive. In the Pump Tournament universe, players dive into
            beautifully crafted browser-based arenas without downloads, engaging in silky-smooth battles while leveraging
            real-time all-channel chat to foster a dynamic, inclusive, and collaborative Web3 community.
          </p>
          <p>
            Powered by Solana's high-performance and transparent blockchain, Pump Tournament transcends traditional
            browser games, evolving into a player-driven digital economy—where every kill sparks achievement, every chat
            fuels camaraderie, and every contribution earns $PTM token rewards.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">1. Project Overview</h2>
          <p className="mb-4">
            Pump Tournament is a Web3 social gaming platform built on the Solana blockchain, centered around pixel-style
            multiplayer real-time shooting battles accessible directly via browsers, requiring no downloads. Players
            engage in smooth, visually stunning battles, picking up advanced weapons and utilizing health regeneration
            mechanics, while earning $PTM token rewards through in-game challenges, leaderboards, and referral programs.
          </p>
          <p>
            The project adopts a 100% Pump.fun fair launch, ensuring no presale or team allocation, with all tokens
            distributed via community-driven mechanisms. Pump Tournament harnesses real-time all-channel chat and player
            governance to create an open, transparent, and vibrant gaming ecosystem.
          </p>
          
          <h3 className="text-xl font-bold mt-6 mb-3">Core Features</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Browser-Based Shooting Battles:</strong> Instant-access, pixel-style multiplayer battles with silky-smooth
              controls and exquisite page design, requiring no downloads.
            </li>
            <li>
              <strong>Dynamic Token Rewards:</strong> Earn $PTM through victories, community interactions, and referrals,
              sustained by a buyback wallet.
            </li>
            <li>
              <strong>Vibrant Social Experience:</strong> Real-time all-channel chat, leaderboards, and cross-platform sharing
              foster player connections and community spirit.
            </li>
            <li>
              <strong>Fair Launch Mechanism:</strong> 100% Pump.fun fair launch ensures transparent token distribution and
              dynamic reward optimization.
            </li>
            <li>
              <strong>Solana Technical Advantage:</strong> Solana's high throughput and low fees deliver seamless real-time
              battles and on-chain reward distribution.
            </li>
          </ul>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">2. Gameplay Mechanics</h2>
          <p className="mb-4">
            Pump Tournament's core gameplay revolves around multiplayer real-time shooting battles, enhanced with Web3
            features, real-time all-channel chat, advanced weapon pickups, and health regeneration mechanics, delivering
            an immersive and accessible social gaming experience.
          </p>
          
          <h3 className="text-xl font-bold mt-6 mb-3">Gameplay Flow</h3>
          <h4 className="font-bold mt-4 mb-2">Shooting Battles:</h4>
          <p className="mb-4">
            Players join team or solo modes via browser, engaging in pixel-style dynamic arenas to defeat opponents
            through precise shooting and strategy, accumulating kills and team points. Arenas feature diverse modes
            (e.g., Team Deathmatch, Capture the Flag, Survival), with pickable advanced weapons (e.g., sniper rifles,
            rocket launchers) and health regeneration zones for strategic depth.
          </p>
          
          <h4 className="font-bold mt-4 mb-2">Competitive Challenges:</h4>
          <p className="mb-4">
            Players compete for leaderboard rankings based on kills, victories, and team contributions, with top
            performers earning $PTM rewards tied to mode difficulty. Special events, such as time-limited tournaments or
            global showdowns, offer bonus $PTM for exceptional performance.
          </p>
          
          <h4 className="font-bold mt-4 mb-2">Social Interaction:</h4>
          <p>
            Real-time all-channel chat enables players to coordinate tactics, share strategies, or engage in casual
            banter during battles, fostering a lively community atmosphere. Players can like, comment, or share
            highlights of kills or team plays, with community-voted top moments earning additional $PTM rewards.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">3. Token Economy</h2>
          <p className="mb-4">
            $PTM is Pump Tournament's native token, built on Solana's SPL Token standard and distributed via a 100%
            Pump.fun fair launch, designed to incentivize gameplay, social engagement, and community governance.
          </p>
          
          <h3 className="text-xl font-bold mt-6 mb-3">Token Utility</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>In-Game Spending:</strong> Purchase premium weapon skins, dynamic power-ups, or exclusive arena themes.
              Unlock advanced battle modes or create private arenas for tailored multiplayer experiences.
            </li>
            <li>
              <strong>Reward Mechanism:</strong> Rewards for kills, leaderboard rankings, event participation, and social
              contributions. Buddy Link referrals grant $PTM and points, boosting community expansion.
            </li>
            <li>
              <strong>Community Governance:</strong> $PTM holders participate in on-chain voting to decide new skins, battle
              modes, or event themes. Governance empowers players to shape the platform, fostering long-term engagement
              and token value alignment.
            </li>
          </ul>
        </div>

        <div className="text-center mt-10">
          <Link href="/game" className="btn-primary inline-block px-8 py-3">
            Play Pump Tournament
          </Link>
        </div>
      </div>
    </main>
  )
} 