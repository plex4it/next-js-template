import { FieldGroup } from '@/components/ui/field';
import { cn } from '@/lib/utils';

interface FormGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function FormGroup({ children, className }: Readonly<FormGroupProps>) {
  return (
    <FieldGroup className={cn('min-h-0 flex-1 overflow-y-auto px-5 pb-6', className)}>
      {children}
    </FieldGroup>
  );
}
