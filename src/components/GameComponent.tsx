'use client'

import { useEffect, useRef } from 'react'

export default function GameComponent() {
  const gameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Dynamic import for Phaser to avoid SSR issues
      import('phaser').then((Phaser) => {
        if (gameRef.current) {
          // Game config
          const config = {
            type: Phaser.AUTO,
            width: '100%',
            height: '100%',
            backgroundColor: '#000',
            parent: gameRef.current,
            physics: {
              default: 'arcade',
              arcade: {
                gravity: { y: 0 },
                debug: false
              }
            },
            scene: {
              preload: preload,
              create: create,
              update: update
            }
          }

          // Game instance
          const game = new Phaser.Game(config)
          
          // Scene functions
          function preload(this: Phaser.Scene) {
            this.load.setBaseURL('/assets')
            this.load.image('player', 'player.png')
            this.load.image('enemy', 'enemy.png')
            this.load.image('bullet', 'bullet.png')
            this.load.image('health', 'health.png')
            this.load.image('weapon', 'weapon.png')
          }

          function create(this: Phaser.Scene) {
            // Placeholder for the create function
            // This would contain:
            // - Player creation
            // - Enemy generation
            // - Input controls
            // - Weapon pickups
            // - Health regeneration zones
            
            // Add a player sprite as placeholder
            const player = this.physics.add.sprite(400, 300, 'player')
            player.setScale(2)
            
            // Display a message
            this.add.text(
              this.cameras.main.width / 2, 
              this.cameras.main.height / 2, 
              'PUMP TOURNAMENT\nGame Demo\n\nConnect Wallet to Play', 
              { 
                fontFamily: 'VT323, monospace',
                fontSize: '32px',
                align: 'center',
                color: '#ffffff'
              }
            ).setOrigin(0.5)
          }

          function update(this: Phaser.Scene) {
            // Game loop logic would go here
          }

          // Cleanup on component unmount
          return () => {
            game.destroy(true)
          }
        }
      })
    }
  }, [])

  return (
    <div ref={gameRef} className="w-full h-full" />
  )
} 