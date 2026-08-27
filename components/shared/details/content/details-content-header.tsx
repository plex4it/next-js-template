import { CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface DetailsContentHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export function DetailsContentHeader({ className, children }: Readonly<DetailsContentHeaderProps>) {
  return (
    <CardHeader className={className}>
      <div className="w-full flex justify-between items-center mb-3">{children}</div>
      <Separator />
    </CardHeader>
  );
}
