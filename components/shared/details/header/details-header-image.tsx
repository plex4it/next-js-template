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
    <div className="relative z-0 shrink-0">
      <UserAvatar
        className={cn('z-0 h-20 w-20', className)}
        firstName={firstName}
        lastName={lastName}
        imageSrc={imageSrc}
      />
    </div>
  );
}
