const { spawn } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const appRoot = path.resolve(__dirname, '..');
const entrypoint = path.join(appRoot, 'dist', 'main.js');
const port = process.env.API_PORT || '4100';
const baseUrl = `http://127.0.0.1:${port}`;
const runAuthChecks = process.env.SMOKE_WITH_AUTH === '1';
const smokeAuthEmail = process.env.SMOKE_AUTH_EMAIL || 'admin@misviajes.mx';
const smokeAuthPassword = process.env.SMOKE_AUTH_PASSWORD || 'Admin1234!';

if (!fs.existsSync(entrypoint)) {
  console.error('Smoke test failed: dist/main.js not found. Run build first.');
  process.exit(1);
}

const server = spawn(process.execPath, [entrypoint], {
  cwd: appRoot,
  env: {
    ...process.env,
    API_PORT: port,
    JWT_SECRET: process.env.JWT_SECRET || 'smoke-test-secret',
    CORS_ORIGINS: process.env.CORS_ORIGINS || 'http://localhost:3000',
    NODE_ENV: process.env.NODE_ENV || 'test',
  },
  stdio: ['ignore', 'pipe', 'pipe'],
});

let output = '';
server.stdout.on('data', (chunk) => {
  output += chunk.toString();
});
server.stderr.on('data', (chunk) => {
  output += chunk.toString();
});

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForReadiness() {
  const maxAttempts = 30;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    if (server.exitCode !== null) {
      throw new Error(`API process exited early with code ${server.exitCode}`);
    }

    try {
      const response = await fetch(`${baseUrl}/api/health/ready`);
      if (response.ok) {
        const body = await response.json();

        if (
          (body.status === 'ready' || body.status === 'not-ready') &&
          typeof body.db === 'string'
        ) {
          return body;
        }
      }
    } catch {
      // ignore until timeout
    }

    await delay(1000);
  }

  throw new Error('Readiness endpoint did not respond in time');
}

async function assertHealthPayload() {
  const response = await fetch(`${baseUrl}/api/health`);

  if (!response.ok) {
    throw new Error(`/api/health returned HTTP ${response.status}`);
  }

  const body = await response.json();
  const hasBaseFields = body.status === 'ok' && body.service === 'misviajes-api';
  const hasCounts = typeof body.counts === 'object' && body.counts !== null;

  if (!hasBaseFields || !hasCounts) {
    throw new Error('/api/health payload shape is invalid');
  }

  return body;
}

async function loginAndGetToken() {
  const response = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email: smokeAuthEmail,
      password: smokeAuthPassword,
    }),
  });

  if (!response.ok) {
    throw new Error(`/api/auth/login returned HTTP ${response.status}`);
  }

  const body = await response.json();

  if (typeof body.accessToken !== 'string' || !body.accessToken) {
    throw new Error('/api/auth/login did not return accessToken');
  }

  return body.accessToken;
}

async function assertProtectedProfile(accessToken) {
  const response = await fetch(`${baseUrl}/api/auth/me`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`/api/auth/me returned HTTP ${response.status}`);
  }

  const body = await response.json();

  if (typeof body.email !== 'string' || !body.id || !body.role) {
    throw new Error('/api/auth/me payload shape is invalid');
  }

  return body;
}

async function stopServer() {
  if (server.exitCode !== null) return;

  server.kill('SIGTERM');
  await delay(1500);

  if (server.exitCode === null) {
    server.kill('SIGKILL');
  }
}

(async () => {
  try {
    const readiness = await waitForReadiness();
    const health = await assertHealthPayload();
    console.log(
      `Smoke test passed: /api/health/ready -> ${JSON.stringify(readiness)}`,
    );
    console.log(
      `Smoke test passed: /api/health -> ${JSON.stringify({
        status: health.status,
        service: health.service,
        db: health.db,
      })}`,
    );

    if (runAuthChecks) {
      const accessToken = await loginAndGetToken();
      const profile = await assertProtectedProfile(accessToken);
      console.log(
        `Smoke test passed: auth flow -> ${JSON.stringify({
          email: profile.email,
          role: profile.role,
        })}`,
      );
    }
  } catch (error) {
    console.error('Smoke test failed.');
    console.error(error instanceof Error ? error.message : String(error));
    if (output.trim()) {
      console.error('--- API output ---');
      console.error(output.trim());
      console.error('------------------');
    }
    process.exitCode = 1;
  } finally {
    await stopServer();
  }
})();