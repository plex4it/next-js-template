import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/env';
import { auth } from '@/lib/auth/auth';
import { prisma } from '@/lib/db/prisma';

async function getIdToken(userId: string): Promise<string | null> {
  const account = await prisma.account.findFirst({
    where: {
      userId,
      providerId: 'keycloak',
    },
    select: {
      idToken: true,
    },
  });

  return account?.idToken ?? null;
}

function redirectHome(request: NextRequest) {
  const origin = env.BETTER_AUTH_URL || request.nextUrl.origin;
  return NextResponse.redirect(origin);
}

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user?.id) {
    return redirectHome(request);
  }

  const idToken = await getIdToken(session.user.id);
  if (!idToken) {
    return redirectHome(request);
  }

  const { success } = await auth.api.signOut({ headers: request.headers });
  if (!success) {
    return redirectHome(request);
  }

  const origin = env.BETTER_AUTH_URL || request.nextUrl.origin;

  const keycloakLogoutUrl = new URL(`${env.KC_ISSUER}/protocol/openid-connect/logout`);
  keycloakLogoutUrl.searchParams.set('client_id', env.KC_CLIENT_ID);
  keycloakLogoutUrl.searchParams.set('post_logout_redirect_uri', origin);
  keycloakLogoutUrl.searchParams.set('id_token_hint', idToken);

  return NextResponse.redirect(keycloakLogoutUrl.toString());
}
