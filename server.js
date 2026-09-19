const { createServer } = require('http');
const next = require('next');

const port = parseInt(process.env.PORT || '10000', 10);
const hostname = '0.0.0.0';

console.log(`[SERVER] Booting server on ${hostname}:${port}...`);

let nextHandler = null;
let isReady = false;
let initError = null;

const app = next({ dev: false, hostname, port, dir: __dirname });
app.prepare()
  .then(() => {
    nextHandler = app.getRequestHandler();
    isReady = true;
    console.log('[NEXT.JS ENGINE READY] Handling all portfolio traffic.');
  })
  .catch((err) => {
    initError = (err && err.stack) || String(err);
    console.error('[NEXT.JS PREPARE FAILED]', initError);
  });

const server = createServer(async (req, res) => {
  if (req.url === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('OK');
  }

  if (req.url === '/__debug') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('isReady: ' + isReady + '\n\ninitError: ' + initError);
  }

  if (isReady && nextHandler) {
    try {
      await nextHandler(req, res);
      return;
    } catch (err) {
      console.error('[REQ ERROR]', err);
      res.statusCode = 500;
      return res.end('Internal Server Error');
    }
  }

  if (initError) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    return res.end('Next.js Prepare Failed:\n\n' + initError);
  }

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta http-equiv="refresh" content="2">
        <title>Loading 3D Portfolio...</title>
        <style>
          body { background: #05060d; color: #06b6d4; font-family: monospace; display: flex; height: 100vh; align-items: center; justify-content: center; }
        </style>
      </head>
      <body>
        <div>INITIALIZING 3D ENGINE...</div>
      </body>
    </html>
  `);
});

server.listen(port, hostname, () => {
  console.log(`[HTTP SERVER LIVE] http://${hostname}:${port}`);
});
