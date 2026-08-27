import type { ReactNode } from 'react';
import { CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DetailsHeaderInfoTitleProps {
  title: string;
  className?: string;
  children?: ReactNode;
}

export function DetailsHeaderInfoTitle({
  title,
  className,
  children,
}: Readonly<DetailsHeaderInfoTitleProps>) {
  return (
    <CardTitle className={cn('text-xl font-semibold text-foreground', className)}>
      {title}
      {children}
    </CardTitle>
  );
}
