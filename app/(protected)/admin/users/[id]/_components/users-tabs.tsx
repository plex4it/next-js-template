'use client';

import { Details } from '@/components/shared/details';
import { DetailsHeaderTab } from '@/components/shared/details/header/details-header-tabs';
import { ActivityIcon, ShieldCheckIcon, UserRoundPenIcon } from 'lucide-react';
import { useT } from 'next-i18next/client';

interface UsersTabsProps {
  id: string;
}

export function UsersTabs({ id }: Readonly<UsersTabsProps>) {
  const { t } = useT(['users', 'common']);
  const routes: DetailsHeaderTab[] = [
    {
      href: `/admin/users/${id}/overview`,
      name: t('common:overview'),
      icon: UserRoundPenIcon,
    },
    {
      href: `/admin/users/${id}/security`,
      name: t('users:security'),
      icon: ShieldCheckIcon,
    },
    {
      href: `/admin/users/${id}/activity`,
      name: t('users:activity'),
      icon: ActivityIcon,
    },
  ];

  return <Details.Tabs tabs={routes} />;
}
