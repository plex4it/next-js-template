import { cn } from '@/lib/utils';
import { UserAvatar } from '@/components/sidebar/user/user-avatar';

interface DetailsHeaderImageProps {
  className?: string;
  firstName: string;
  lastName: string;
  imageSrc: string;
}

export function DetailsHeaderImage({
  className,
  firstName,
  lastName,
  imageSrc,
}: Readonly<DetailsHeaderImageProps>) {
  return (
    <UserAvatar
      className={cn('h-20 w-20', className)}
      firstName={firstName}
      lastName={lastName}
      imageSrc={imageSrc}
    />
  );
}
