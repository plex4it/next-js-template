import { createEnv } from '@t3-oss/env-nextjs';
import * as z from 'zod';

export const env = createEnv({
  server: {
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.url(),
    PG_HOST: z.string().min(1),
    PG_PORT: z.string().min(1),
    PG_DATABASE: z.string().min(1),
    PG_USERNAME: z.string().min(1),
    PG_PASSWORD: z.string().min(1),
    KC_ISSUER: z.url(),
    KC_CLIENT_ID: z.string().min(1),
    KC_CLIENT_SECRET: z.string().min(1),
    API_URL: z.url(),
  },
  client: {},
  runtimeEnv: {
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    PG_HOST: process.env.PG_HOST,
    PG_PORT: process.env.PG_PORT,
    PG_DATABASE: process.env.PG_DATABASE,
    PG_USERNAME: process.env.PG_USERNAME,
    PG_PASSWORD: process.env.PG_PASSWORD,
    KC_ISSUER: process.env.KC_ISSUER,
    KC_CLIENT_ID: process.env.KC_CLIENT_ID,
    KC_CLIENT_SECRET: process.env.KC_CLIENT_SECRET,
    API_URL: process.env.API_URL,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
