import { Details } from '@/components/shared/details';
import { TableWrapper } from './_components/table-wrapper';
import getRoleUsers from '@/lib/api/roles/users/get-role-users';
import { getT } from 'next-i18next/server';
import { notFound } from 'next/navigation';
import { ErrorState } from '@/components/shared/error-state';
import { AssignUserModal } from './_components/assign-user-modal';

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

  const result = await getRoleUsers(roleId);
  if (!result.ok) {
    return <ErrorState description={result.message} />;
  }

  const users = result.data;

  return (
    <Details.Content>
      <Details.ContentHeader>
        <Details.ContentTitle title={t('fields:users')} />
        <Details.Actions>
          <AssignUserModal roleId={roleId} users={users.map((u) => u.id.toString())} />
        </Details.Actions>
      </Details.ContentHeader>
      <Details.ContentBody>
        <TableWrapper users={users} roleId={roleId} />
      </Details.ContentBody>
    </Details.Content>
  );
}
