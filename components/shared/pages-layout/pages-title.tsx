import { cn } from '@/lib/utils';

interface PageTitleProps {
  className?: string;
  title?: string;
  children?: React.ReactNode;
}

export function PageTitle({ className, title, children }: Readonly<PageTitleProps>) {
  return (
    <h1 className={cn('flex items-center gap-2 text-xl font-bold text-foreground', className)}>
      {children}
      {title}
    </h1>
  );
}
