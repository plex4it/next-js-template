import { Details } from '@/components/shared/details';
import { getT } from 'next-i18next/server';

interface RolesPermissionsPageProps {
  params: Promise<{ id: string }>;
}

export default async function RolesPermissionsPage({
  params,
}: Readonly<RolesPermissionsPageProps>) {
  await params;
  const { t } = await getT('common');

  return (
    <Details.Content>
      <Details.ContentHeader>
        <Details.ContentTitle title={t('common:permissions')} />
      </Details.ContentHeader>
      <Details.ContentBody>
        <div></div>
      </Details.ContentBody>
    </Details.Content>
  );
}
