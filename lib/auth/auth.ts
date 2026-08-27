import { prismaAdapter } from '@better-auth/prisma-adapter';
import { betterAuth } from 'better-auth/minimal';
import { genericOAuth, keycloak } from 'better-auth/plugins';
import { env } from '@/env';
import { prisma } from '@/lib/db/prisma';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  user: {
    additionalFields: {
      idp: {
        type: 'string',
        required: false,
        input: false,
      },
      firstName: {
        type: 'string',
        required: true,
        defaultValue: '',
      },
      lastName: {
        type: 'string',
        required: true,
        defaultValue: '',
      },
    },
  },
  plugins: [
    genericOAuth({
      config: [
        keycloak({
          clientId: env.KC_CLIENT_ID || 'build-placeholder',
          clientSecret: env.KC_CLIENT_SECRET || 'build-placeholder',
          issuer: env.KC_ISSUER || 'http://localhost:8085/realms/build',
          scopes: ['openid', 'profile', 'email', 'offline_access'],
        }),
      ],
    }),
  ],
});
