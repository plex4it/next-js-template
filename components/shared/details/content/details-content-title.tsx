import { CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DetailsContentTitleProps {
  className?: string;
  title: string;
}

export function DetailsContentTitle({ title, className }: Readonly<DetailsContentTitleProps>) {
  return (
    <CardTitle className={cn('font-semibold text-xl text-foreground', className)}>
      {title}
    </CardTitle>
  );
}
