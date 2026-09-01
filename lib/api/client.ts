'use server';

import { auth } from '@/lib/auth/auth';
import { getSession, hasPermission } from '@/lib/auth/session';
import { env } from '@/env';
import { getT } from 'next-i18next/server';
import { headers } from 'next/headers';

export type Result<T> =
  { ok: true; data: T } | { ok: false; code: string; message: string; status: number };

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export async function apiRequest<T>(
  path: string,
  method: HttpMethod,
  data?: object,
  permission?: string
): Promise<Result<T>> {
  const { t } = await getT('errors');

  if (permission != null) {
    const hasPerm = await hasPermission(permission);
    if (!hasPerm) {
      return {
        ok: false,
        code: 'errors:forbidden',
        message: t('errors:forbidden'),
        status: 403,
      };
    }
  }

  const apiUrl = env.API_URL;
  const { lng } = await getT();

  if (!apiUrl) {
    throw new Error('Configuration Error: API_URL must be set.');
  }

  const h = await headers();
  const session = await getSession();

  if (!session) {
    return {
      ok: false,
      code: 'errors:forbidden',
      message: t('errors:forbidden'),
      status: 401,
    };
  }

  const token = await auth.api.getAccessToken({
    headers: h,
    body: {
      providerId: 'keycloak',
      userId: session.user.id,
    },
  });

  if (!token?.accessToken) {
    return {
      ok: false,
      code: 'errors:something_wrong',
      message: t('errors:something_wrong'),
      status: 502,
    };
  }

  const url = new URL(`${apiUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`);

  try {
    const result = await fetch(url.toString(), {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.accessToken}`,
        'Accept-Language': lng,
      },
      body:
        data &&
        JSON.stringify(data, (_, value) => (typeof value === 'bigint' ? value.toString() : value)),
    });

    if (result.status === 403 || result.status === 401) {
      return {
        code: 'errors:forbidden',
        message: t('errors:forbidden'),
        status: result.status,
        ok: false,
      };
    } else if (!result.ok) {
      return {
        code: 'errors:something_wrong',
        message: t('errors:something_wrong'),
        status: result.status,
        ok: false,
      };
    }

    return {
      ok: true,
      data: await result.json().catch(() => undefined),
    };
  } catch {
    return {
      code: 'errors:something_wrong',
      message: t('errors:something_wrong'),
      status: 502,
      ok: false,
    };
  }
}
