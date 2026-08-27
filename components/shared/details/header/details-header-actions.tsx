import { CardAction } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DetailsHeaderActionsProps {
  children: React.ReactNode;
  className?: string;
}

export function DetailsHeaderActions({ children, className }: Readonly<DetailsHeaderActionsProps>) {
  return (
    <CardAction className={cn('ml-auto flex gap-2 self-center', className)}>{children}</CardAction>
  );
}
