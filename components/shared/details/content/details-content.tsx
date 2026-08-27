import type { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

interface DetailsContentProps {
  className?: string;
  children: ReactNode;
}

export function DetailsContent({ className, children }: Readonly<DetailsContentProps>) {
  return <Card className={className}>{children}</Card>;
}
