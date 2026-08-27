'use client';

import { Session as ISession } from '@/lib/types/session';
import { Button } from '@/components/ui/button';
import { MonitorIcon, SmartphoneIcon } from 'lucide-react';
import { useT } from 'next-i18next/client';
import { toast } from 'sonner';

interface SessionProps {
  session: ISession;
}

export function Session({ session }: Readonly<SessionProps>) {
  const { t } = useT('session');
  const sessionSignOut = () => {
    toast.success(t('session:signout_success'));
  };

  return (
    <div className="flex items-center justify-between gap-6 pb-5 last:pb-0">
      <div className="flex-1 flex flex-wrap justify-between md:grid md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1">
          <p className="font-bold">{t('session:location')}</p>
          <p>{session.location}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-bold">{t('session:device')}</p>
          <div className="flex gap-1 items-center">
            {session.deviceType === 'desktop' ? (
              <MonitorIcon className="size-4" />
            ) : (
              <SmartphoneIcon className="size-4" />
            )}
            <p>{session.device}</p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-bold">{t('session:last_access')}</p>
          <p>{session.lastAccess}</p>
        </div>
      </div>
      <Button className="max-w-30 shrink-0" onClick={sessionSignOut}>
        {t('session:sign_out')}
      </Button>
    </div>
  );
}
