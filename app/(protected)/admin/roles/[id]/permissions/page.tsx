import { Details } from '@/components/shared/details';
import { RoleGroup } from './_components/role-group';
import { getT } from 'next-i18next/server';
import { notFound } from 'next/navigation';
import { ErrorState } from '@/components/shared/error-state';
import getPermissionGroups from '@/lib/api/roles/permission-groups/get-permission-groups';

interface RolesPermissionsPageProps {
  params: Promise<{ id: string }>;
}

export default async function RolesPermissionsPage({
  params,
}: Readonly<RolesPermissionsPageProps>) {
  await params;
  const { t } = await getT('common');

  const { id } = await params;

  let roleId;

  try {
    roleId = BigInt(id);
  } catch {
    notFound();
  }

  const result = await getPermissionGroups(roleId);

  if (!result.ok) {
    return <ErrorState description={result.message} />;
  }

  const groups = result.data;

  return (
    <Details.Content>
      <Details.ContentHeader>
        <Details.ContentTitle title={t('common:permissions')} />
      </Details.ContentHeader>
      <Details.ContentBody>
        <div className="space-y-5">
          {groups.map((g) => (
            <RoleGroup
              key={g.id.toString()}
              description={g.description}
              groupId={g.id}
              roleId={roleId}
              title={g.name}
              isAssigned={g.isAssigned}
            />
          ))}
        </div>
      </Details.ContentBody>
    </Details.Content>
  );
}
