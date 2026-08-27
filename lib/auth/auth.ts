import { prismaAdapter } from '@better-auth/prisma-adapter';
import { betterAuth } from 'better-auth/minimal';
import { genericOAuth, keycloak } from 'better-auth/plugins';
import { getAuthEnv } from '@/lib/auth/env';
import { prisma } from '@/lib/db/prisma';

const { kcClientId, kcClientSecret, kcIssuer } = getAuthEnv();

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
          clientId: kcClientId,
          clientSecret: kcClientSecret,
          issuer: kcIssuer,
          scopes: ['openid', 'profile', 'email', 'offline_access'],
        }),
      ],
    }),
  ],
});
