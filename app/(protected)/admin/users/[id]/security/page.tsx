import { Separator } from '@/components/ui/separator';
import { Details } from '@/components/shared/details';
import { Session } from '@/components/shared/session';
import getUserDetails from '@/lib/api/users/get-user-details';
import getSessions from '@/lib/api/users/sessions/get-sessions';
import { notFound } from 'next/navigation';
import { ResetPasswordButtonWrapper } from './_components/reset-password-button-wrapper';
import { ResetEmptyWrapper } from './_components/reset-empty-wrapper';
import { getT } from 'next-i18next/server';

export default async function UsersSecurityPage({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const { id } = await params;
  const { t } = await getT('users');

  let userDetails;
  let userId;

  try {
    userId = BigInt(id);
    userDetails = await getUserDetails(userId);
  } catch {
    notFound();
  }

  if (!userDetails) {
    notFound();
  }

  const sessions = await getSessions(id);

  return (
    <>
      <Details.Content>
        <Details.ContentHeader>
          <Details.ContentTitle title={t('users:sign_in_method')} />
        </Details.ContentHeader>
        <Details.ContentBody>
          <div className="mb-7">
            <label className="text-lg font-semibold">{t('users:email_address')}</label>
            <p className="font-medium text-muted-foreground">{userDetails.email}</p>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <label className="text-lg font-semibold">{t('users:password')}</label>
              <p className="font-medium text-muted-foreground">***********</p>
            </div>
            <ResetPasswordButtonWrapper id={id} />
          </div>
        </Details.ContentBody>
      </Details.Content>

      <Details.Content>
        <Details.ContentHeader>
          <Details.ContentTitle title={t('users:sessions')} />
        </Details.ContentHeader>
        <Details.ContentBody>
          <div className="flex flex-col gap-6">
            {sessions.length > 0 ? (
              sessions.map((session, index) => (
                <div key={session.id}>
                  <Session session={session} />
                  {index < sessions.length - 1 && <Separator />}
                </div>
              ))
            ) : (
              <ResetEmptyWrapper />
            )}
          </div>
        </Details.ContentBody>
      </Details.Content>
    </>
  );
}
