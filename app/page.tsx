import { buttonVariants } from '@/components/ui/button';
import { getSession } from '@/lib/auth/session';
import { getT } from 'next-i18next/server';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getSession();
  if (session) {
    redirect('/dashboard');
  }

  const { t } = await getT('home');

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-4">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs flex flex-col gap-6 space-y-6">
            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="text-2xl font-bold">{t('welcome')}</h1>
            </div>
            <Link href="/login" className={buttonVariants()}>
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
