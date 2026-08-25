import * as React from 'react';
import { cn } from '@/lib/utils';

interface DataTableContentProps {
  children?: React.ReactNode;
  className?: string;
}

export function DataTableContent({ children, className }: Readonly<DataTableContentProps>) {
  return (
    <div className={cn('min-h-0 flex-1 overflow-auto rounded-md border', className)}>
      {children}
    </div>
  );
}
