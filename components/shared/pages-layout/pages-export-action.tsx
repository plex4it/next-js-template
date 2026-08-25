'use client';

import { DownloadIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PageExportActionProps {
  onClick: () => void;
  className?: string;
}

export function PageExportAction({ onClick, className }: Readonly<PageExportActionProps>) {
  return (
    <Button className={cn('w-full md:w-auto', className)} onClick={onClick}>
      <DownloadIcon data-icon="inline-start" />
      Export
    </Button>
  );
}
