'use client';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useT } from 'next-i18next/client';

interface StatusBadgeProps {
  status: boolean;
  className?: string;
}

export function StatusBadge({ status, className }: Readonly<StatusBadgeProps>) {
  const statusStyles = {
    active: 'bg-success/12 text-success',
    inactive: 'bg-muted text-muted-foreground',
  };

  const { t } = useT('common');

  return (
    <Badge className={cn('font-semibold', statusStyles[status ? 'active' : 'inactive'], className)}>
      <span
        aria-hidden="true"
        className={cn('rounded-full h-1.5 w-1.5', status ? 'bg-success' : 'bg-muted-foreground/60')}
      />
      {status ? t('common:active') : t('common:inactive')}
    </Badge>
  );
}
