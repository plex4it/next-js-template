import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DetailsHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function DetailsHeader({ children, className }: Readonly<DetailsHeaderProps>) {
  return <Card className={cn('w-full', className)}>{children}</Card>;
}
