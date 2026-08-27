'use client';

import { useEffect, useRef } from 'react';
import { redirect } from 'next/navigation';
import { authClient } from '@/lib/auth/auth-client';

export default function LoginPage() {
  const { data: session, isPending } = authClient.useSession();
  const hasRedirected = useRef(false);

  // React Strict Mode double-mount can fire two OAuth sign-ins with different state tokens.
  useEffect(() => {
    if (session) {
      redirect('/dashboard');
    }

    if (isPending || hasRedirected.current) {
      return;
    }

    hasRedirected.current = true;

    authClient.signIn.oauth2({
      providerId: 'keycloak',
      callbackURL: '/dashboard',
    });
  }, [session, isPending]);

  return null;
}
