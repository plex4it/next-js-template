import { notFound } from 'next/navigation';
import { getT } from 'next-i18next/server';

import getUserDetails from '@/lib/api/users/get-user-details';

import { Breadcrumbs } from './breadcrumbs';
import type { BreadcrumbItem } from './types';

const USER_TAB_LABEL_KEYS: Record<string, string> = {
  security: 'users:security',
  activity: 'users:activity',
};

type UserDetailBreadcrumbProps = {
  id: string;
  tab: string;
};

export async function UserDetailBreadcrumb({ id, tab }: UserDetailBreadcrumbProps) {
  const { t } = await getT(['breadcrumbs', 'common', 'users']);
  const currentTab = tab;

  let userDetails;

  try {
    const result = await getUserDetails(BigInt(id));
    if (!result.ok) {
      notFound();
    }
    userDetails = result.data;
  } catch {
    notFound();
  }

  const userName = `${userDetails.firstName} ${userDetails.lastName}`;
  const items: BreadcrumbItem[] = [
    { label: t('breadcrumbs:admin') },
    { label: t('breadcrumbs:users'), href: '/admin/users' },
  ];

  if (currentTab === 'overview') {
    items.push({ label: userName });
  } else {
    const tabLabelKey = USER_TAB_LABEL_KEYS[currentTab];

    if (!tabLabelKey) {
      notFound();
    }

    items.push({ label: userName, href: `/admin/users/${id}/overview` });
    items.push({ label: t(tabLabelKey) });
  }

  return <Breadcrumbs items={items} backLabel={t('breadcrumbs:back')} />;
}
