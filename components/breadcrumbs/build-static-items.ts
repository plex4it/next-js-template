import type { TFunction } from 'i18next';

import { formatSegment } from './format-segment';
import type { BreadcrumbItem } from './types';

const BREADCRUMB_SEGMENT_KEYS: Record<string, string> = {
  admin: 'breadcrumbs:admin',
  dashboard: 'breadcrumbs:dashboard',
  pages: 'breadcrumbs:pages',
  products: 'breadcrumbs:products',
  users: 'breadcrumbs:users',
  roles: 'breadcrumbs:roles',
  overview: 'common:overview',
  security: 'users:security',
  activity: 'users:activity',
  permissions: 'common:permissions',
};

const LABEL_ONLY_SEGMENTS = new Set(['admin']);

export function buildStaticBreadcrumbItems(segments: string[], t: TFunction): BreadcrumbItem[] {
  let fullHref = '';
  const items: BreadcrumbItem[] = [];

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    fullHref = fullHref ? `${fullHref}/${segment}` : `/${segment}`;
    const isLast = i === segments.length - 1;
    const translationKey = BREADCRUMB_SEGMENT_KEYS[segment];
    const label = translationKey ? t(translationKey) : formatSegment(segment);

    if (isLast) {
      items.push({ label });
      continue;
    }

    if (LABEL_ONLY_SEGMENTS.has(segment)) {
      items.push({ label });
      continue;
    }

    items.push({ label, href: fullHref });
  }

  return items;
}
