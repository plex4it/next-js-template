function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Configuration Error: ${name} must be set.`);
  }
  return value;
}

export function getAuthEnv() {
  return {
    databaseUrl: requireEnv('DATABASE_URL'),
    betterAuthSecret: requireEnv('BETTER_AUTH_SECRET'),
    betterAuthUrl: requireEnv('BETTER_AUTH_URL'),
    kcClientId: requireEnv('KC_CLIENT_ID'),
    kcClientSecret: requireEnv('KC_CLIENT_SECRET'),
    kcIssuer: requireEnv('KC_ISSUER'),
  };
}

export function getApiUrl() {
  return requireEnv('API_URL');
}
