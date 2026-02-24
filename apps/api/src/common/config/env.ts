export function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value || !value.trim()) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getApiPort(): number {
  const raw = process.env.API_PORT ?? '4000';
  const parsed = Number.parseInt(raw, 10);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error('Invalid API_PORT value');
  }

  return parsed;
}

export function getCorsOrigins(): string[] {
  const value = process.env.CORS_ORIGINS ?? 'http://localhost:3000';

  return value
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}
