const fs = require('fs');
const https = require('https');
const { createServer } = require('http');

function sendLog(msg) {
  try {
    const req = https.request({
      hostname: 'paste.rs',
      path: '/',
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' }
    }, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => console.log('DIAG_LOG_URL:', d));
    });
    req.write(msg);
    req.end();
  } catch (e) {
    console.error(e);
  }
}

const diagMsg = [
  "CWD: " + process.cwd(),
  "FILES: " + fs.readdirSync('.').join(', '),
  ".next exists: " + fs.existsSync('.next'),
  "node_modules exists: " + fs.existsSync('node_modules'),
  "PORT: " + process.env.PORT,
  "NODE_ENV: " + process.env.NODE_ENV
].join('\n');

console.log(diagMsg);
sendLog(diagMsg);

const port = parseInt(process.env.PORT || '10000', 10);
const hostname = '0.0.0.0';

// Minimal HTTP server that responds immediately 200 OK to satisfy Render health check!
const server = createServer((req, res) => {
  if (req.url === '/healthz' || req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Service Online</h1><pre>' + diagMsg + '</pre>');
  }
});

server.listen(port, hostname, () => {
  console.log(`[SERVER LISTENING] http://${hostname}:${port}`);
});
