import { buttonVariants } from '@/components/ui/button';
import { getT } from 'next-i18next/server';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Home() {
  const { t } = await getT('home');

  //TODO: Implement session check and redirect if user is already logged in
  /*   const session = await auth.api.getSession({ headers: await headers() });

  if (session) {
    redirect('/dashboard');
  } */

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-4">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs flex flex-col gap-6 space-y-6">
            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="text-2xl font-bold">{t('welcome')}</h1>
            </div>
            <Link href="/dashboard" /*TODO: Add redirect logic*/ className={buttonVariants()}>
              {t('login')}
            </Link>
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block m-6">
        <Image
          fill
          src="/plex4it.jpg"
          alt="image"
          loading="eager"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="absolute inset-0 h-full w-full border rounded-2xl"
        />
      </div>
    </div>
  );
}
