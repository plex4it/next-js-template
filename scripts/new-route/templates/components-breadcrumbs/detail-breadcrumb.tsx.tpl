import { notFound } from 'next/navigation';
import { getT } from 'next-i18next/server';

import get{{ENTITY_PASCAL}}Details from '@/lib/api/{{API_PATH}}/get-{{SINGULAR}}-details';

import { Breadcrumbs } from './breadcrumbs';
import type { BreadcrumbItem } from './types';

type {{ENTITY_PASCAL}}DetailBreadcrumbProps = {
  id: string;
  tab: string;
};

export async function {{ENTITY_PASCAL}}DetailBreadcrumb({ id, tab }: {{ENTITY_PASCAL}}DetailBreadcrumbProps) {
  const { t } = await getT(['breadcrumbs', 'common', '{{I18N_NS}}']);

  if (tab !== 'overview') {
    notFound();
  }

  let entityDetails;

  try {
    entityDetails = await get{{ENTITY_PASCAL}}Details(BigInt(id));
  } catch {
    notFound();
  }

  if (!entityDetails) {
    notFound();
  }

  const items: BreadcrumbItem[] = [
{{BREADCRUMB_PARENT_ITEMS}}
    { label: entityDetails.name },
  ];

  return <Breadcrumbs items={items} backLabel={t('breadcrumbs:back')} />;
}
