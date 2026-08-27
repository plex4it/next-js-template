'use client';

import EmptyWrapper from '@/components/shared/empty-wrapper';
import { CircleXIcon } from 'lucide-react';
import { useT } from 'next-i18next/client';

export function ActivityEmptyWrapper() {
  const { t } = useT('users');
  return (
    <EmptyWrapper
      description={t('user_no_activity')}
      icon={CircleXIcon}
      title={t('activity_not_available')}
    />
  );
}
