import type { ReactNode } from 'react';
import { CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DetailsContentContentProps {
  className?: string;
  children: ReactNode;
}

export function DetailsContentBody({ className, children }: Readonly<DetailsContentContentProps>) {
  return <CardContent className={className}>{children}</CardContent>;
}

interface DetailsContentEntryProps {
  label: string | ReactNode;
  value: string | ReactNode;
  className?: string;
}

export function DetailsContentEntry({
  label,
  value,
  className = '',
}: Readonly<DetailsContentEntryProps>) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-3', className)}>
      <p className="text-muted-foreground text-xs font-medium">{label}</p>
      <span className="font-semibold md:col-span-2 pt-2 sm:p-0">{value}</span>
    </div>
  );
}
