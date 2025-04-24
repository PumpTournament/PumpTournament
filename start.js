const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Check if .env file exists, create if it doesn't
if (!fs.existsSync('.env.local')) {
  console.log('Creating default .env.local file...');
  const envExample = fs.readFileSync('env.example', 'utf8');
  fs.writeFileSync('.env.local', envExample);
}

// Colors for console output
const colors = {
  next: '\x1b[36m', // Cyan
  server: '\x1b[35m', // Magenta
  reset: '\x1b[0m'
};

// Start Next.js development server
const nextProcess = spawn('npm', ['run', 'dev'], {
  stdio: 'pipe',
  shell: true
});

// Start Socket.IO server
const serverProcess = spawn('node', ['server.js'], {
  stdio: 'pipe',
  shell: true
});

console.log('\x1b[32m%s\x1b[0m', '✓ Starting Pump Tournament development environment...');

// Handle Next.js process output
nextProcess.stdout.on('data', (data) => {
  process.stdout.write(`${colors.next}[Next.js] ${colors.reset}${data}`);
});

nextProcess.stderr.on('data', (data) => {
  process.stderr.write(`${colors.next}[Next.js] ${colors.reset}${data}`);
});

// Handle Socket.IO server process output
serverProcess.stdout.on('data', (data) => {
  process.stdout.write(`${colors.server}[Server] ${colors.reset}${data}`);
});

serverProcess.stderr.on('data', (data) => {
  process.stderr.write(`${colors.server}[Server] ${colors.reset}${data}`);
});

// Handle process exit
process.on('SIGINT', () => {
  console.log('\n\x1b[33m%s\x1b[0m', 'Shutting down development environment...');
  nextProcess.kill();
  serverProcess.kill();
  process.exit(0);
});

// Handle child process exit
nextProcess.on('close', (code) => {
  console.log(`\x1b[31m[Next.js] Process exited with code ${code}\x1b[0m`);
  serverProcess.kill();
  process.exit(code);
});

serverProcess.on('close', (code) => {
  console.log(`\x1b[31m[Server] Process exited with code ${code}\x1b[0m`);
  nextProcess.kill();
  process.exit(code);
}); 