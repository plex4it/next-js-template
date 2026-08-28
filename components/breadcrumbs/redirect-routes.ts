import type { BreadcrumbItem } from './types';

const REDIRECT_ONLY_PATTERNS = [/^\/admin\/users\/\d+$/, /^\/admin\/roles\/\d+$/];

export function isRedirectOnlyRoute(href: string) {
  return REDIRECT_ONLY_PATTERNS.some((pattern) => pattern.test(href));
}

export function getMobileBackHref(items: BreadcrumbItem[]) {
  for (let i = items.length - 2; i >= 0; i--) {
    const item = items[i];
    if (item.href && !isRedirectOnlyRoute(item.href)) {
      return item.href;
    }
  }

  return undefined;
}
