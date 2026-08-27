import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth/auth';

export type Session = typeof auth.$Infer.Session;

export async function getSession(): Promise<Session | null> {
  return auth.api.getSession({ headers: await headers() }) as Promise<Session | null>;
}

export async function requireSession(): Promise<Session> {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }
  return session;
}
