import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/auth';
import { getAuthEnv } from '@/lib/auth/env';
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
  const origin = process.env.BETTER_AUTH_URL || request.nextUrl.origin;
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

  const { kcIssuer, kcClientId } = getAuthEnv();
  const origin = process.env.BETTER_AUTH_URL || request.nextUrl.origin;

  const keycloakLogoutUrl = new URL(`${kcIssuer}/protocol/openid-connect/logout`);
  keycloakLogoutUrl.searchParams.set('client_id', kcClientId);
  keycloakLogoutUrl.searchParams.set('post_logout_redirect_uri', origin);
  keycloakLogoutUrl.searchParams.set('id_token_hint', idToken);

  return NextResponse.redirect(keycloakLogoutUrl.toString());
}
