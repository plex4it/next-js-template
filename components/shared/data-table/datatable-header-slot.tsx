import * as React from 'react';
import { cn } from '@/lib/utils';

interface DataTableHeaderSlotProps {
  children?: React.ReactNode;
  className?: string;
}

export function DataTableHeaderSlot({ children, className }: Readonly<DataTableHeaderSlotProps>) {
  if (!children) return null;
  return <div className={cn('flex items-center justify-center gap-2', className)}>{children}</div>;
}
