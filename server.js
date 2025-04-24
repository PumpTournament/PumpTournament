const http = require('http');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 3001;
const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Player data storage
const players = {};
const messages = [];

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log(`Player connected: ${socket.id}`);
  
  // Handle player joining
  socket.on('playerJoin', (data) => {
    console.log(`Player ${data.name} joined with wallet ${data.wallet}`);
    
    // Store player data
    players[socket.id] = {
      id: socket.id,
      name: data.name,
      wallet: data.wallet,
      x: Math.floor(Math.random() * 700) + 50,
      y: Math.floor(Math.random() * 500) + 50,
      kills: 0,
      deaths: 0,
      ptmEarned: 0
    };
    
    // Broadcast to all players
    io.emit('playerJoined', players[socket.id]);
    
    // Send existing players to new player
    socket.emit('currentPlayers', players);
    
    // Send chat history
    socket.emit('chatHistory', messages.slice(-50));
  });
  
  // Handle player movement
  socket.on('playerMovement', (movementData) => {
    if (players[socket.id]) {
      players[socket.id].x = movementData.x;
      players[socket.id].y = movementData.y;
      
      // Broadcast player movement to all players
      socket.broadcast.emit('playerMoved', {
        id: socket.id,
        x: movementData.x,
        y: movementData.y
      });
    }
  });
  
  // Handle shots fired
  socket.on('shotFired', (shotData) => {
    // Broadcast shot to all players
    socket.broadcast.emit('newShot', {
      id: socket.id,
      x: shotData.x, 
      y: shotData.y,
      angle: shotData.angle,
      weaponType: shotData.weaponType || 'default'
    });
  });
  
  // Handle player damage/kill
  socket.on('playerHit', (data) => {
    const { shooterId, targetId, damage } = data;
    
    if (players[targetId]) {
      // Handle kill logic
      if (players[targetId].health <= damage) {
        // Update kill stats
        if (players[shooterId]) {
          players[shooterId].kills += 1;
          players[shooterId].ptmEarned += 1; // Simple PTM reward
          
          // Broadcast kill event
          io.emit('playerKilled', {
            shooter: players[shooterId],
            target: players[targetId]
          });
        }
        
        // Reset target health
        players[targetId].deaths += 1;
        players[targetId].health = 100; // Reset health
        
        // Respawn player
        players[targetId].x = Math.floor(Math.random() * 700) + 50;
        players[targetId].y = Math.floor(Math.random() * 500) + 50;
        
        io.to(targetId).emit('playerRespawn', {
          x: players[targetId].x,
          y: players[targetId].y
        });
      } else {
        // Just update health
        players[targetId].health -= damage;
        io.to(targetId).emit('healthUpdate', {
          health: players[targetId].health
        });
      }
    }
  });
  
  // Handle chat messages
  socket.on('chatMessage', (messageData) => {
    const message = {
      id: Date.now().toString(),
      sender: players[socket.id] ? players[socket.id].name : 'Unknown',
      text: messageData.text,
      timestamp: Date.now()
    };
    
    // Store message
    messages.push(message);
    if (messages.length > 100) {
      messages.shift(); // Keep only last 100 messages
    }
    
    // Broadcast message
    io.emit('newChatMessage', message);
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`Player disconnected: ${socket.id}`);
    
    if (players[socket.id]) {
      // Broadcast player left
      io.emit('playerLeft', players[socket.id]);
      
      // Remove player from data
      delete players[socket.id];
    }
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});

// Export server for testing/dev tools
module.exports = { server, io }; 