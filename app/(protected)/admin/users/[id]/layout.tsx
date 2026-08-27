import { Page } from '@/components/shared/pages-layout';
import { Details } from '@/components/shared/details';
import { ArrowLeftIcon, MailIcon } from 'lucide-react';
import { UsersTabs } from './_components/users-tabs';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import getUserDetails from '@/lib/api/users/get-user-details';
import { notFound } from 'next/navigation';
import { getT } from 'next-i18next/server';

export default async function UsersEditLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}>) {
  const { t } = await getT('users');
  const { id } = await params;

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

  return (
    <Page>
      <Page.Header>
        <Page.Title title={t('users:edit_title')}>
          <Link href="/admin/users" aria-label={t('users:back_to_page')}>
            <ArrowLeftIcon aria-hidden="true" />
          </Link>
        </Page.Title>
      </Page.Header>
      <Page.Content>
        <Details>
          <Details.Header className="pb-0">
            <Details.Info>
              <div className="relative">
                <Details.Image
                  firstName={userDetails.firstName}
                  lastName={userDetails.lastName}
                  imageSrc=""
                  className="h-20 w-20"
                />
              </div>
              <Details.InfoContent className="gap-1">
                <Details.InfoTitle title={`${userDetails.firstName} ${userDetails.lastName}`} />
                <Details.InfoSubTitle>
                  <div className="flex gap-1 items-center">
                    <MailIcon size="20" aria-label="email" />
                    <span className="text-muted-foreground">{userDetails.email}</span>
                  </div>
                </Details.InfoSubTitle>
                <Badge variant="secondary" className="font-semibold">
                  {t('users:user_id')}: {userDetails.externalId}
                </Badge>
              </Details.InfoContent>
            </Details.Info>
            <UsersTabs id={id} />
          </Details.Header>
          {children}
        </Details>
      </Page.Content>
    </Page>
  );
}
