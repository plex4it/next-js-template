'use client';

import { Details } from '@/components/shared/details';
import { DetailsHeaderTab } from '@/components/shared/details/header/details-header-tabs';
import { UserRoundPenIcon } from 'lucide-react';
import { useT } from 'next-i18next/client';

interface {{PASCAL}}TabsProps {
  id: string;
}

export function {{PASCAL}}Tabs({ id }: Readonly<{{PASCAL}}TabsProps>) {
  const { t } = useT('common');
  const routes: DetailsHeaderTab[] = [
    {
      href: `{{URL_BASE}}/${id}/overview`,
      name: t('common:overview'),
      icon: UserRoundPenIcon,
    },
  ];

  return <Details.Tabs tabs={routes} />;
}
