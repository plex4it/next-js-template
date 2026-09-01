import EditRoleModal from './_components/edit-role-modal';
import { Details, DetailsContentEntry } from '@/components/shared/details';
import { DeleteRoleModal } from './_components/delete-role-modal';
import getRoleDetails from '@/lib/api/roles/get-role-details';
import { getPermissions } from '@/lib/auth/session';
import { permissions } from '@/lib/permissions/permissions';
import { notFound } from 'next/navigation';
import { getT } from 'next-i18next/server';
import { ErrorState } from '@/components/shared/error-state';

interface RolesOverviewPageProps {
  params: Promise<{ id: string }>;
}

export default async function RolesOverviewPage({ params }: Readonly<RolesOverviewPageProps>) {
  const { t } = await getT(['roles', 'common', 'fields']);
  const { id } = await params;

  let roleId: bigint;
  try {
    roleId = BigInt(id);
  } catch {
    notFound();
  }

  const result = await getRoleDetails(roleId);

  if (!result.ok) {
    return <ErrorState description={result.message} />;
  }

  const roleDetails = result.data;
  const userPermissions = await getPermissions();

  return (
    <>
      <Details.Content>
        <Details.ContentHeader>
          <Details.ContentTitle title={t('roles:details_title')} />
          {userPermissions.includes(permissions.roles.update) && (
            <EditRoleModal description={roleDetails.description} id={roleDetails.id} />
          )}
        </Details.ContentHeader>
        <Details.ContentBody className="space-y-7">
          <DetailsContentEntry label={t('fields:description')} value={roleDetails.description} />
          <DetailsContentEntry
            label={t('common:last_updated')}
            value={`${roleDetails.lastUpdatedAt} - ${roleDetails.lastUpdatedBy}`}
          />
        </Details.ContentBody>
      </Details.Content>

      {userPermissions.includes(permissions.roles.delete) && (
        <Details.Content>
          <Details.ContentHeader>
            <Details.ContentTitle title={t('common:danger_zone')} className="text-red-500" />
          </Details.ContentHeader>
          <Details.ContentBody className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-foreground">{t('roles:details_delete_title')}</p>
              <p className="text-muted-foreground">{t('roles:details_delete_description')}</p>
            </div>
            <DeleteRoleModal name={roleDetails.name} id={roleDetails.id} />
          </Details.ContentBody>
        </Details.Content>
      )}
    </>
  );
}
