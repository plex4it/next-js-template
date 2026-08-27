'use client';

import { Details } from '@/components/shared/details';
import { RoleRowActions } from './table-actions';
import { ListRolesResponse } from '@/lib/types/roles/response/list-roles-response';
import { TFunction } from 'i18next';

interface MobileCardTemplateProps {
  role: ListRolesResponse;
  t: TFunction<[string, string], undefined>;
}

export function MobileCardTemplate({ role, t }: Readonly<MobileCardTemplateProps>) {
  return (
    <Details.Header>
      <Details.Info className="flex-wrap">
        <Details.InfoTitle title={role.name} />
        <Details.Actions>
          <RoleRowActions role={role} t={t} />
        </Details.Actions>
        <Details.InfoSubTitle className="basis-full">
          <p className="text-sm text-muted-foreground">{role.description}</p>
        </Details.InfoSubTitle>
      </Details.Info>
    </Details.Header>
  );
}
