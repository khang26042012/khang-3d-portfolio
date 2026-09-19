const { createServer } = require('http');
const next = require('next');
const https = require('https');

const port = parseInt(process.env.PORT || '10000', 10);
const hostname = '0.0.0.0';

console.log(`[SERVER] Initializing Next.js on ${hostname}:${port}...`);

const app = next({ dev: false, hostname, port });
const handle = app.getRequestHandler();

function reportError(err) {
  try {
    const errorText = (err && err.stack) || String(err);
    console.error('[SERVER CRASH]', errorText);
    const req = https.request({
      hostname: 'paste.rs',
      path: '/',
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' }
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => console.log('[PASTE ERROR URL]', data));
    });
    req.write(errorText);
    req.end();
  } catch (e) {
    console.error('Failed to report error:', e);
  }
}

process.on('uncaughtException', (err) => {
  reportError(err);
  setTimeout(() => process.exit(1), 2000);
});

process.on('unhandledRejection', (err) => {
  reportError(err);
  setTimeout(() => process.exit(1), 2000);
});

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      await handle(req, res);
    } catch (err) {
      console.error('Error handling request:', err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  }).listen(port, hostname, () => {
    console.log(`[SERVER READY] Listening on http://${hostname}:${port}`);
  });
}).catch((err) => {
  reportError(err);
  setTimeout(() => process.exit(1), 2000);
});
