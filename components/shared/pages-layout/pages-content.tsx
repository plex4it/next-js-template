import { cn } from '@/lib/utils';

interface PageContentProps {
  className?: string;
  children: React.ReactNode;
}

export function PageContent({ className, children }: Readonly<PageContentProps>) {
  return <div className={cn('flex min-h-0 flex-1 flex-col gap-4', className)}>{children}</div>;
}
