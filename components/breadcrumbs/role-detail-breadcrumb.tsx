import { notFound } from 'next/navigation';
import { getT } from 'next-i18next/server';

import getRoleDetails from '@/lib/api/roles/get-role-details';

import { Breadcrumbs } from './breadcrumbs';
import type { BreadcrumbItem } from './types';

const ROLE_TAB_LABEL_KEYS: Record<string, string> = {
  permissions: 'common:permissions',
  users: 'fields:users',
};

type RoleDetailBreadcrumbProps = {
  id: string;
  tab: string;
};

export async function RoleDetailBreadcrumb({ id, tab }: RoleDetailBreadcrumbProps) {
  const { t } = await getT(['breadcrumbs', 'common', 'fields']);
  const currentTab = tab;

  let roleDetails;

  try {
    const result = await getRoleDetails(BigInt(id));
    if (!result.ok) {
      notFound();
    }
    roleDetails = result.data;
  } catch {
    notFound();
  }

  const items: BreadcrumbItem[] = [
    { label: t('breadcrumbs:admin') },
    { label: t('breadcrumbs:roles'), href: '/admin/roles' },
  ];

  if (currentTab === 'overview') {
    items.push({ label: roleDetails.name });
  } else {
    const tabLabelKey = ROLE_TAB_LABEL_KEYS[currentTab];

    if (!tabLabelKey) {
      notFound();
    }

    items.push({ label: roleDetails.name, href: `/admin/roles/${id}/overview` });
    items.push({ label: t(tabLabelKey) });
  }

  return <Breadcrumbs items={items} backLabel={t('breadcrumbs:back')} />;
}
