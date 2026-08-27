import { Details } from '@/components/shared/details';
import { ActivityEmptyWrapper } from './_components/activity-empty-wrapper';
import { getT } from 'next-i18next/server';

export default async function UsersActivityPage() {
  const { t } = await getT('users');
  return (
    <Details.Content>
      <Details.ContentHeader>
        <Details.ContentTitle title={t('activity')} />
      </Details.ContentHeader>
      <Details.ContentBody>
        <ActivityEmptyWrapper />
      </Details.ContentBody>
    </Details.Content>
  );
}
