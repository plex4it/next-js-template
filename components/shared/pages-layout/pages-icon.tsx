import { type LucideIcon } from 'lucide-react';

interface PagesIconProps {
  icon: LucideIcon;
  className?: string;
}

export function PageIcon({ icon: Icon, className }: Readonly<PagesIconProps>) {
  return <Icon className={className ?? 'size-5'} />;
}
