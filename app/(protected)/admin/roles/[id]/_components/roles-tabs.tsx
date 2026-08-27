'use client';

import { Details } from '@/components/shared/details';
import { DetailsHeaderTab } from '@/components/shared/details/header/details-header-tabs';
import { KeyRoundIcon, UserRoundPenIcon, UsersRoundIcon } from 'lucide-react';
import { useT } from 'next-i18next/client';

interface RolesTabsProps {
  id: string;
}

export function RolesTabs({ id }: Readonly<RolesTabsProps>) {
  const { t } = useT(['common', 'fields']);
  const routes: DetailsHeaderTab[] = [
    {
      href: `/admin/roles/${id}/overview`,
      name: t('common:overview'),
      icon: UserRoundPenIcon,
    },
    {
      href: `/admin/roles/${id}/permissions`,
      name: t('common:permissions'),
      icon: KeyRoundIcon,
    },
    {
      href: `/admin/roles/${id}/users`,
      name: t('fields:users'),
      icon: UsersRoundIcon,
    },
  ];

  return <Details.Tabs tabs={routes} />;
}
