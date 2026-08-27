import type { ReactNode } from 'react';
import { CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DetailsHeaderInfo {
  children: ReactNode;
  className?: string;
}

export function DetailsHeaderInfo({ children, className }: Readonly<DetailsHeaderInfo>) {
  return <CardHeader className={cn('flex items-center gap-4', className)}>{children}</CardHeader>;
}
