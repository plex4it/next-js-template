import { Details } from '@/components/shared/details';
import { TableWrapper } from './_components/table-wrapper';
import getRoleDetails from '@/lib/api/roles/get-role-details';
import { getT } from 'next-i18next/server';
import { notFound } from 'next/navigation';

export default async function RolesUsersPage({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const { id } = await params;
  const { t } = await getT(['users', 'fields']);

  let roleId: bigint;
  try {
    roleId = BigInt(id);
  } catch {
    notFound();
  }

  let roleDetails;
  try {
    roleDetails = await getRoleDetails(roleId);
  } catch {
    notFound();
  }

  return (
    <Details.Content>
      <Details.ContentHeader>
        <Details.ContentTitle title={t('fields:users')} />
      </Details.ContentHeader>
      <Details.ContentBody>
        <TableWrapper users={roleDetails.assignedUsers} roleId={id} />
      </Details.ContentBody>
    </Details.Content>
  );
}
