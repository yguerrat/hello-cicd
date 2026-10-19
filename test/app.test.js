const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { createServer } = require('../src/app');

let server;
let base;

before(async () => {
  server = createServer();
  await new Promise((resolve) => server.listen(0, resolve));
  base = `http://127.0.0.1:${server.address().port}`;
});

after(() => server.close());

test('GET / responde Hello World', async () => {
  const res = await fetch(base);
  assert.equal(res.status, 200);
  assert.match(await res.text(), /Hello World/);
});

test('GET /health responde status ok', async () => {
  const res = await fetch(`${base}/health`);
  assert.deepEqual(await res.json(), { status: 'ok' });
});
