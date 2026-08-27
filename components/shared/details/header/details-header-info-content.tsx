import { cn } from '@/lib/utils';

interface DetailsHeaderInfoContent {
  className?: string;
  children: React.ReactNode;
}

export function DetailsHeaderInfoContent({
  className,
  children,
}: Readonly<DetailsHeaderInfoContent>) {
  return <div className={cn('flex flex-col', className)}>{children}</div>;
}
