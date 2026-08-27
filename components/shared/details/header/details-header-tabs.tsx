'use client';

import { CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface DetailsHeaderTab {
  href: string;
  name: string;
  icon?: LucideIcon;
}

interface DetailsHeaderTabsProps {
  tabs: DetailsHeaderTab[];
  className?: string;
}

export function DetailsHeaderTabs({ tabs, className }: Readonly<DetailsHeaderTabsProps>) {
  const pathname = usePathname();

  return (
    <CardFooter className={cn('flex-wrap gap-4', className)}>
      {tabs.map((route) => (
        <Link
          key={route.name}
          href={route.href}
          className={cn(
            'flex items-center justify-center gap-2 w-30 text-center py-3 text-sm text-muted-foreground font-medium',
            pathname === route.href && 'border-primary border-b text-foreground font-semibold'
          )}
        >
          {route.icon && <route.icon className="size-4" />}
          {route.name}
        </Link>
      ))}
    </CardFooter>
  );
}
