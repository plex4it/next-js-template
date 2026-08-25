import { cn } from '@/lib/utils';

interface PageHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export function PageHeader({ className, children }: Readonly<PageHeaderProps>) {
  return (
    <div className={cn('flex shrink-0 items-center justify-between', className)}>{children}</div>
  );
}
