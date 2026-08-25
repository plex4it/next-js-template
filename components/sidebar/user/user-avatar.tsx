import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserAvatarProps {
  className?: string;
  firstName: string;
  lastName: string;
  imageSrc?: string;
}

export function UserAvatar({
  className,
  firstName,
  lastName,
  imageSrc = '',
}: Readonly<UserAvatarProps>) {
  return (
    <Avatar className={className}>
      <AvatarImage src={imageSrc} alt={`${firstName} ${lastName}`} />
      <AvatarFallback className="uppercase">
        {`${firstName.charAt(0)}${lastName.charAt(0)}`}
      </AvatarFallback>
    </Avatar>
  );
}
