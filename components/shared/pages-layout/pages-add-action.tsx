'use client';

import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PageAddActionProps {
  onClick?: () => void;
  className?: string;
}

export function PageAddAction({ onClick, className }: Readonly<PageAddActionProps>) {
  return (
    <Button className={cn('w-full md:w-auto', className)} onClick={onClick}>
      <PlusIcon data-icon="inline-start" />
      Add
    </Button>
  );
}
