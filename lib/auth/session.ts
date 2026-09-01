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

export async function getPermissions() {
  return (await requireSession()).user.permissions;
}

export async function hasPermission(permission: string) {
  const permissions = (await requireSession()).user.permissions;
  return permissions.includes(permission);
}

export async function requirePermission(permission: string) {
  const allowed = await hasPermission(permission);
  if (!allowed) {
    redirect('/forbidden');
  }
}
