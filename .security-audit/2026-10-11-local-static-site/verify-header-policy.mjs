import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('../../dist', import.meta.url)));
const headers = {
  'Content-Security-Policy':
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'",
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy':
    'accelerometer=(), autoplay=(), camera=(), geolocation=(), gyroscope=(), microphone=(), payment=(), usb=()',
  'X-Frame-Options': 'DENY',
};
const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

createServer(async (request, response) => {
  const pathname = new URL(request.url ?? '/', 'http://localhost').pathname;
  const requested = pathname.replace(/^\/+/, '') || 'index.html';
  const file = resolve(root, requested);
  const inDist = file.startsWith(`${root}${sep}`);
  try {
    const body = await readFile(inDist ? file : resolve(root, 'index.html'));
    response.writeHead(200, {
      ...headers,
      'Content-Type': types[extname(inDist ? file : 'index.html')] ?? 'application/octet-stream',
    });
    response.end(body);
  } catch {
    const body = await readFile(resolve(root, 'index.html'));
    response.writeHead(200, { ...headers, 'Content-Type': types['.html'] });
    response.end(body);
  }
}).listen(4174, '127.0.0.1', () => {
  console.log('Security verification server listening on http://127.0.0.1:4174');
});
