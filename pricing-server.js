#!/usr/bin/env node
/* LeadsPitch local pricing helper
 *
 *   node pricing-server.js [--root <dir>] [--port <n>] [--open]
 *   (LP_ROOT / LP_PORT environment variables work too)
 *
 * Serves the private pricing editor on 127.0.0.1 only and exposes two POSTs:
 *   /save     - write pricing-data.js        (one click, no file dialogs)
 *   /publish  - git add/commit/push that file (one click, goes live)
 *
 * Nothing binds to 0.0.0.0, every request is rejected unless it comes from
 * this machine, and only the two hardcoded routes below are served, so the
 * rest of the project folder is never exposed.
 */
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');

const argv = process.argv.slice(2);
const flag = (name) => {
  const i = argv.indexOf(name);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : null;
};

const ROOT = path.resolve(flag('--root') || process.env.LP_ROOT || __dirname);
const PORT = Number(flag('--port') || process.env.LP_PORT || 8787);
const OPEN = argv.indexOf('--open') >= 0;
const MAX_BODY = 512 * 1024;          // 512 KB, the real config is ~36 KB
const SERVED_MARK = '<!--LP-SERVED-->';

const EDITOR = path.join(ROOT, 'pricing-admin.html');
const CONFIG = path.join(ROOT, 'pricing-data.js');

/* ------------------------------------------------------------------ guards */

function isLoopback(req) {
  const a = req.socket.remoteAddress;
  return a === '127.0.0.1' || a === '::1' || a === '::ffff:127.0.0.1';
}

function hostIsLocal(req) {
  const h = String(req.headers.host || '').toLowerCase();
  return h.startsWith('localhost') || h.startsWith('127.0.0.1') || h.startsWith('[::1]');
}

/* ------------------------------------------------------------- http basics */

function send(res, code, body, type) {
  res.writeHead(code, {
    'Content-Type': type || 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  });
  res.end(body);
}

function sendJSON(res, code, obj) {
  send(res, code, JSON.stringify(obj), 'application/json; charset=utf-8');
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    let overflow = false;
    let settled = false;
    const chunks = [];
    const HARD = MAX_BODY * 20;              // give up only at 10 MB
    const fail = (msg, code) => {
      if (settled) return;
      settled = true;
      reject(Object.assign(new Error(msg), { code: code }));
    };
    req.on('data', (c) => {
      size += c.length;
      if (size > MAX_BODY) overflow = true;  // stop buffering, keep draining
      if (size > HARD) { fail('body too large', 'LIMIT'); req.destroy(); return; }
      if (!overflow) chunks.push(c);
    });
    req.on('end', () => {
      if (overflow) return fail('body too large', 'LIMIT');
      if (settled) return;
      settled = true;
      resolve(Buffer.concat(chunks).toString('utf8'));
    });
    req.on('error', (e) => fail(e.message || 'read error', 'READ'));
  });
}

function validConfig(text) {
  if (!text || text.length > MAX_BODY) return false;
  if (!/window\.LP_PRICING\s*=/.test(text)) return false;
  try { new Function(text); } catch (e) { return false; }   // must at least parse
  return true;
}

/* ------------------------------------------------------------ file actions */

function saveConfig(text) {
  const tmp = CONFIG + '.tmp';
  fs.writeFileSync(tmp, text, 'utf8');
  fs.renameSync(tmp, CONFIG);           // atomic: no half-written config
  return Buffer.byteLength(text, 'utf8');
}

function git(args) {
  return new Promise((resolve) => {
    execFile('git', args, {
      cwd: ROOT,
      timeout: 120000,
      windowsHide: true,
      maxBuffer: 2 * 1024 * 1024
    }, (err, stdout, stderr) => {
      resolve({ ok: !err, out: String(stdout || '') + String(stderr || '') });
    });
  });
}

async function publish() {
  const log = [];
  const status = await git(['status', '--porcelain', '--', 'pricing-data.js']);
  if (!status.ok) return { ok: false, log: 'git status failed\n' + status.out };

  if (status.out.trim()) {
    const add = await git(['add', 'pricing-data.js']);
    if (!add.ok) return { ok: false, log: 'git add failed\n' + add.out };
    const commit = await git(['commit', '-m', 'Update pricing config']);
    if (!commit.ok) return { ok: false, log: 'git commit failed\n' + commit.out };
    log.push('Committed pricing-data.js');
  }

  const push = await git(['push']);
  if (!push.ok) return { ok: false, log: log.concat(push.out.trim()).join('\n') || 'push failed' };
  log.push(push.out.trim() || 'Pushed');
  return { ok: true, log: log.join('\n') };
}

/* ----------------------------------------------------------------- routes */

function serveEditor(res) {
  let html;
  try {
    html = fs.readFileSync(EDITOR, 'utf8');
  } catch (e) {
    return send(res, 500, 'pricing-admin.html not found in ' + ROOT);
  }
  // mark the page so it knows direct saving is available
  html = html.split(SERVED_MARK).join('<meta name="lp-local" content="1">');
  send(res, 200, html, 'text/html; charset=utf-8');
}

function serveConfig(res) {
  try {
    send(res, 200, fs.readFileSync(CONFIG, 'utf8'), 'text/javascript; charset=utf-8');
  } catch (e) {
    send(res, 404, 'pricing-data.js not found');
  }
}

const server = http.createServer(async (req, res) => {
  if (!isLoopback(req) || !hostIsLocal(req)) {
    return send(res, 403, 'localhost only');
  }

  const url = String(req.url || '/').split('?')[0];
  const method = String(req.method || 'GET').toUpperCase();

  if (method === 'GET') {
    if (url === '/' || url === '/pricing-admin.html') return serveEditor(res);
    if (url === '/pricing-data.js') return serveConfig(res);
    return send(res, 404, 'Not found');
  }

  if (method === 'POST') {
    if (url === '/save') {
      let body;
      try {
        body = await readBody(req);
      } catch (e) {
        return sendJSON(res, e.code === 'LIMIT' ? 413 : 400, { ok: false, error: e.message });
      }
      if (!validConfig(body)) {
        return sendJSON(res, 400, { ok: false, error: 'Not a valid pricing config' });
      }
      try {
        const bytes = saveConfig(body);
        return sendJSON(res, 200, { ok: true, bytes: bytes, file: 'pricing-data.js' });
      } catch (e) {
        return sendJSON(res, 500, { ok: false, error: e.message });
      }
    }

    if (url === '/publish') {
      try {
        const result = await publish();
        return sendJSON(res, result.ok ? 200 : 500, result);
      } catch (e) {
        return sendJSON(res, 500, { ok: false, log: e.message });
      }
    }

    return send(res, 404, 'Not found');
  }

  send(res, 405, 'Method not allowed');
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error('\n  Port ' + PORT + ' is already in use.');
    console.error('  Close the other pricing editor window, or run:');
    console.error('  node pricing-server.js --port 8788\n');
  } else {
    console.error('\n  Server error: ' + err.message + '\n');
  }
  process.exit(1);
});

server.listen(PORT, '127.0.0.1', () => {
  const port = server.address().port;
  const url = 'http://localhost:' + port + '/';
  console.log('');
  console.log('  LeadsPitch pricing editor');
  console.log('  ' + url);
  console.log('  root: ' + ROOT);
  console.log('');
  console.log('  Close this window to stop. Never share this URL.');
  console.log('');
  if (OPEN) {
    if (process.platform === 'win32') {
      execFile('cmd', ['/c', 'start', '""', url], { windowsHide: false }, () => {});
    } else {
      execFile('xdg-open', [url], () => {});
    }
  }
});
