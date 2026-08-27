import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface UserAvatarLoadingProps {
  className?: string;
}

export function UserAvatarLoading({ className }: Readonly<UserAvatarLoadingProps>) {
  return <Skeleton className={cn('rounded-full', className)} />;
}
