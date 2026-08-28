import { getT } from 'next-i18next/server';

import { Breadcrumbs, buildStaticBreadcrumbItems } from '@/components/breadcrumbs';

type Props = {
  params: Promise<{
    catchAll: string[];
  }>;
};

export default async function BreadcrumbsSlot({ params }: Props) {
  const { catchAll } = await params;
  const { t } = await getT(['breadcrumbs', 'common', 'users']);

  const items = buildStaticBreadcrumbItems(catchAll, t);

  return <Breadcrumbs items={items} backLabel={t('breadcrumbs:back')} />;
}
