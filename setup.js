const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// ANSI colors for better output
const colors = {
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  reset: '\x1b[0m'
};

console.log(`${colors.blue}=== Pump Tournament Setup ====${colors.reset}`);
console.log(`${colors.blue}Initializing project environment...${colors.reset}\n`);

// Create necessary directories
const directories = [
  'public/assets/images',
  'public/assets/audio'
];

directories.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    console.log(`${colors.yellow}Creating directory: ${dir}${colors.reset}`);
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// Create placeholder assets
const placeholderImagePath = path.join(__dirname, 'public/assets/player.png');
if (!fs.existsSync(placeholderImagePath)) {
  console.log(`${colors.yellow}Creating placeholder player asset${colors.reset}`);
  
  // Create a simple colored square 32x32 pixel PNG (this is just a representation, not actual code to create a PNG)
  console.log(`${colors.yellow}Note: You will need to add actual game assets in public/assets/${colors.reset}`);
}

// Create .env.local from env.example if it doesn't exist
if (fs.existsSync('env.example') && !fs.existsSync('.env.local')) {
  console.log(`${colors.yellow}Creating .env.local from env.example${colors.reset}`);
  fs.copyFileSync('env.example', '.env.local');
}

// Install dependencies
console.log(`\n${colors.blue}Installing dependencies...${colors.reset}`);
const npmInstall = spawn('npm', ['install'], { 
  stdio: 'inherit', 
  shell: true 
});

npmInstall.on('close', (code) => {
  if (code !== 0) {
    console.log(`${colors.red}Error installing dependencies. Please run 'npm install' manually.${colors.reset}`);
    process.exit(1);
  }
  
  console.log(`\n${colors.green}✓ Dependencies installed successfully${colors.reset}`);
  console.log(`\n${colors.blue}Setup completed!${colors.reset}`);
  console.log(`${colors.blue}You can now run the development environment:${colors.reset}`);
  console.log(`\n  ${colors.yellow}npm run dev:all${colors.reset}\n`);
  console.log(`This will start both the Next.js app and the Socket.IO server.`);
  console.log(`Access the game at: ${colors.green}http://localhost:3000${colors.reset}`);
}); 