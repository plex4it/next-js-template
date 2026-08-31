'use client';

import { Details } from '@/components/shared/details';
import { {{ENTITY_PASCAL}}RowActions } from './table-actions';
import { List{{ENTITY_PASCAL}}Response } from '@/lib/types/{{SINGULAR}}/response/list-{{SINGULAR}}-response';
import { TFunction } from 'i18next';

interface MobileCardTemplateProps {
  item: List{{ENTITY_PASCAL}}Response;
  t: TFunction<[string, string, string], undefined>;
}

export function MobileCardTemplate({ item, t }: Readonly<MobileCardTemplateProps>) {
  return (
    <Details.Header>
      <Details.Info className="flex-wrap">
        <Details.InfoTitle title={item.name} />
        <Details.Actions>
          <{{ENTITY_PASCAL}}RowActions item={item} t={t} />
        </Details.Actions>
        <Details.InfoSubTitle className="basis-full">
          <p className="text-sm text-muted-foreground">{item.createdBy}</p>
        </Details.InfoSubTitle>
      </Details.Info>
    </Details.Header>
  );
}
