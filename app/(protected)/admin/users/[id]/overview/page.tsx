import { UsersEditModal } from './_components/users-edit-modal';
import { Details, DetailsContentEntry } from '@/components/shared/details';
import { DeleteUserModal } from './_components/delete-user-modal';
import getUserDetails from '@/lib/api/users/get-user-details';
import { getPermissions } from '@/lib/auth/session';
import { permissions } from '@/lib/permissions/permissions';
import { notFound } from 'next/navigation';
import { StatusBadge } from '@/components/shared/status-badge';
import { getT } from 'next-i18next/server';
import { ErrorState } from '@/components/shared/error-state';
import { Badge } from '@/components/ui/badge';

export default async function UsersOverviewPage({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const { id } = await params;
  const { t } = await getT(['users', 'common', 'fields']);

  let userId;

  try {
    userId = BigInt(id);
  } catch {
    notFound();
  }

  const result = await getUserDetails(userId);

  if (!result.ok) {
    return <ErrorState description={result.message} />;
  }

  const userDetails = result.data;
  const userPermissions = await getPermissions();

  return (
    <>
      <Details.Content>
        <Details.ContentHeader>
          <Details.ContentTitle title={t('users:profile_details')} />
          {userPermissions.includes(permissions.users.update) && (
            <UsersEditModal
              id={userId}
              firstName={userDetails.firstName}
              lastName={userDetails.lastName}
              roles={userDetails.roles}
              enabled
              status={userDetails.status}
            />
          )}
        </Details.ContentHeader>
        <Details.ContentBody className="space-y-7">
          <DetailsContentEntry label={t('fields:first_name')} value={userDetails.firstName} />
          <DetailsContentEntry label={t('fields:last_name')} value={userDetails.lastName} />
          <DetailsContentEntry label={t('fields:email')} value={userDetails.email} />
          <DetailsContentEntry
            label={t('fields:roles')}
            value={
              userDetails.roles?.length > 0 ? (
                userDetails.roles?.map((role) => (
                  <Badge key={role} variant="secondary">
                    {role}
                  </Badge>
                ))
              ) : (
                <p>{t('users:no_roles_assigned')}</p>
              )
            }
          />
          <DetailsContentEntry
            label={t('common:status')}
            value={<StatusBadge status={userDetails.status} />}
          />
          <DetailsContentEntry
            label={t('common:last_updated')}
            value={`${userDetails.updatedAt} - ${userDetails.updatedBy}`}
          />
        </Details.ContentBody>
      </Details.Content>

      {userPermissions.includes(permissions.users.delete) && (
        <Details.Content>
          <Details.ContentHeader>
            <Details.ContentTitle title={t('common:danger_zone')} className="text-red-500" />
          </Details.ContentHeader>
          <Details.ContentBody className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-foreground">{t('users:details_delete_title')}</p>
              <p className="text-muted-foreground">{t('users:details_delete_description')}</p>
            </div>
            <DeleteUserModal
              id={userId}
              firstName={userDetails.firstName}
              lastName={userDetails.lastName}
            />
          </Details.ContentBody>
        </Details.Content>
      )}
    </>
  );
}
