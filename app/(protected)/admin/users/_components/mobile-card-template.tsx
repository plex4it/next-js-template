'use client';

import { Separator } from '@/components/ui/separator';
import { Details } from '@/components/shared/details';
import { UserAvatar } from '@/components/sidebar/user/user-avatar';
import { UserRowActions } from './table-actions';
import { ListUserResponse } from '@/lib/types/user/response/list-user-response';
import { TFunction } from 'i18next';

interface EntryProps {
  label: string;
  value: string;
}

function Entry({ label, value }: Readonly<EntryProps>) {
  return (
    <div className="min-w-0">
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </p>
      <p className="truncate text-sm font-medium text-foreground decoration-border decoration-dotted underline-offset-4">
        {value}
      </p>
    </div>
  );
}

interface MobileCardTemplateProps {
  user: ListUserResponse;
  t: TFunction<[string, string], undefined>;
}

export function MobileCardTemplate({ user, t }: Readonly<MobileCardTemplateProps>) {
  return (
    <Details.Header>
      <Details.Info>
        <UserAvatar firstName={user.firstName} lastName={user.lastName} imageSrc="" />
        <Details.InfoTitle title={`${user.firstName} ${user.lastName}`} className="truncate" />
        <Details.Actions>
          <UserRowActions user={user} t={t} />
        </Details.Actions>
      </Details.Info>
      <Separator className="max-w-[90%] self-center" />
      <Details.HeaderContent className="grid grid-cols-2 gap-3">
        <Entry label={t('fields:email')} value={user.email} />
      </Details.HeaderContent>
    </Details.Header>
  );
}
