import type { ReactNode } from 'react';
import { CardContent } from '@/components/ui/card';

interface DetailsHeaderContent {
  className?: string;
  children: ReactNode;
}

export function DetailsHeaderContent({ children, className }: Readonly<DetailsHeaderContent>) {
  return <CardContent className={className}>{children}</CardContent>;
}
