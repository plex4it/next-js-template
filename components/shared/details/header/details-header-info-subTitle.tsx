import { CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DetailsHeaderInfoBodyProps {
  className?: string;
  children: React.ReactNode;
}

export function DetailsHeaderInfoSubTitle({
  className,
  children,
}: Readonly<DetailsHeaderInfoBodyProps>) {
  return (
    <CardDescription className={cn('md:flex space-x-3', className)}>{children}</CardDescription>
  );
}
