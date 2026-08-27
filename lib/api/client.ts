'use server';

import { headers } from 'next/headers';
import { auth } from '@/lib/auth/auth';
import { getApiUrl } from '@/lib/auth/env';
import { requireSession } from '@/lib/auth/session';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

async function getAccessToken(userId: string) {
  const token = await auth.api.getAccessToken({
    headers: await headers(),
    body: {
      providerId: 'keycloak',
      userId,
    },
  });

  if (!token?.accessToken) {
    throw new Error('Failed to resolve Keycloak access token.');
  }

  return token.accessToken;
}

export async function apiRequest(path: string, method: HttpMethod, data?: object) {
  const apiUrl = getApiUrl();
  const session = await requireSession();
  const accessToken = await getAccessToken(session.user.id);

  const url = new URL(`${apiUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`);

  return fetch(url.toString(), {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body:
      data &&
      JSON.stringify(data, (_, value) => (typeof value === 'bigint' ? value.toString() : value)),
  });
}
