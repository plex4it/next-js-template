'use client';

import { Separator } from '@/components/ui/separator';
import { Details } from '@/components/shared/details';
import { UnassignModal } from './unassign-modal';
import { ListRoleUsersResponse } from '@/lib/types/roles/response/list-role-users-response';
import { UserAvatar } from '@/components/sidebar/user/user-avatar';
import { useT } from 'next-i18next/client';

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
  roleId: bigint;
  user: ListRoleUsersResponse;
}

export function MobileCardTemplate({ roleId, user }: Readonly<MobileCardTemplateProps>) {
  const { t } = useT(['fields', 'common']);
  return (
    <Details.Header>
      <Details.Info>
        <UserAvatar firstName={user.firstName} lastName={user.lastName} imageSrc="" />
        <Details.InfoTitle title={`${user.firstName} ${user.lastName}`} className="truncate" />
        <Details.Actions>
          <UnassignModal
            roleId={roleId}
            firstName={user.firstName}
            lastName={user.lastName}
            userId={user.id}
          />
        </Details.Actions>
      </Details.Info>
      <Separator className="max-w-[90%] self-center" />
      <Details.HeaderContent className="grid grid-cols-2 gap-3">
        <Entry label={t('fields:email')} value={user.email} />
        <Entry
          label={t('fields:identity_provider')}
          value={user.identityProvider ?? t('common:not_available')}
        />
      </Details.HeaderContent>
    </Details.Header>
  );
}
