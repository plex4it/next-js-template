import { Skeleton } from '@/components/ui/skeleton';
import { Details } from '@/components/shared/details';
import { UserAvatarLoading } from '@/components/shared/user-avatar-loading';

export function DetailsHeaderLoading() {
  return (
    <Details.Header>
      <Details.Info>
        <UserAvatarLoading className="h-20 w-20" />
        <Details.InfoContent>
          <Details.InfoTitle title="">
            <Skeleton className="h-4 w-30 mb-4" />
          </Details.InfoTitle>
          <Details.InfoSubTitle>
            <Skeleton className="h-4 w-40" />
          </Details.InfoSubTitle>
        </Details.InfoContent>
      </Details.Info>
    </Details.Header>
  );
}

export function DetailsContentLoading() {
  return (
    <Details.Content>
      <Details.ContentHeader>
        <Skeleton className="h-4 w-40" />
      </Details.ContentHeader>
      <Details.ContentBody>
        <Skeleton className="h-4 w-80 mb-7" />
        <Skeleton className="h-4 w-80 mb-7" />
        <Skeleton className="h-4 w-80 mb-7" />
      </Details.ContentBody>
    </Details.Content>
  );
}
