import { Fragment, type ReactElement } from 'react';
import Link from 'next/link';
import { ChevronLeftIcon } from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { getMobileBackHref } from './redirect-routes';
import type { BreadcrumbItem as BreadcrumbItemType } from './types';

type BreadcrumbsProps = {
  items: BreadcrumbItemType[];
  backLabel: string;
};

export function Breadcrumbs({ items, backLabel }: BreadcrumbsProps) {
  if (items.length === 0) {
    return null;
  }

  const currentItem = items[items.length - 1];
  const parentItems = items.slice(0, -1);
  const mobileBackHref = getMobileBackHref(items);
  const breadcrumbItems: ReactElement[] = [];

  for (let i = 0; i < parentItems.length; i++) {
    const item = parentItems[i];
    const key = item.href ?? `${item.label}-${i}`;

    breadcrumbItems.push(
      <Fragment key={key}>
        <BreadcrumbItem className="hidden md:inline-flex">
          {item.href ? (
            <BreadcrumbLink render={<Link href={item.href} />}>{item.label}</BreadcrumbLink>
          ) : (
            <span>{item.label}</span>
          )}
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:list-item" />
      </Fragment>
    );
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {mobileBackHref ? (
          <BreadcrumbItem className="md:hidden">
            <BreadcrumbLink
              render={<Link href={mobileBackHref} aria-label={backLabel} />}
              className="flex items-center gap-1"
            >
              <ChevronLeftIcon className="size-4" />
            </BreadcrumbLink>
            <BreadcrumbPage>{currentItem.label}</BreadcrumbPage>
          </BreadcrumbItem>
        ) : (
          <BreadcrumbItem className="md:hidden">
            <BreadcrumbPage>{currentItem.label}</BreadcrumbPage>
          </BreadcrumbItem>
        )}

        {breadcrumbItems}
        <BreadcrumbItem className="hidden md:inline-flex">
          <BreadcrumbPage>{currentItem.label}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
