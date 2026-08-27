'use client';

import EmptyWrapper from '@/components/shared/empty-wrapper';
import { CircleXIcon } from 'lucide-react';
import { useT } from 'next-i18next/client';

export function ResetEmptyWrapper() {
  const { t } = useT('users');
  return (
    <EmptyWrapper
      description={t('user_no_sessions')}
      icon={CircleXIcon}
      title={t('sessions_not_available')}
    />
  );
}
