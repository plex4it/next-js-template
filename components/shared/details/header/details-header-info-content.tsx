import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface DetailsHeaderInfoContent {
  className?: string;
  children: ReactNode;
}

export function DetailsHeaderInfoContent({
  className,
  children,
}: Readonly<DetailsHeaderInfoContent>) {
  return <div className={cn('flex flex-col', className)}>{children}</div>;
}
