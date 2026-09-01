import { Page } from '@/components/shared/pages-layout';
import { Badge } from '@/components/ui/badge';
import { Details } from '@/components/shared/details';
import { RolesTabs } from './_components/roles-tabs';
import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';
import getRoleDetails from '@/lib/api/roles/get-role-details';
import { notFound } from 'next/navigation';
import { getT } from 'next-i18next/server';
import { ErrorState } from '@/components/shared/error-state';

interface EditPageProps {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}

export default async function EditPage({ params, children }: Readonly<EditPageProps>) {
  const { t } = await getT('roles');
  const { id } = await params;

  let roleId: bigint;
  try {
    roleId = BigInt(id);
  } catch {
    notFound();
  }

  const result = await getRoleDetails(roleId);

  if (!result.ok) {
    return (
      <Page>
        <Page.Content>
          <ErrorState description={result.message} />
        </Page.Content>
      </Page>
    );
  }

  const roleDetails = result.data;

  return (
    <Page>
      <Page.Header>
        <Page.Title title={t('roles:edit_title')}>
          <Link href="/admin/roles" aria-label={t('roles:back_to_page')}>
            <ArrowLeftIcon aria-hidden="true" />
          </Link>
        </Page.Title>
      </Page.Header>
      <Page.Content>
        <Details>
          <Details.Header className="pb-0">
            <Details.Info>
              <Details.Image firstName={roleDetails.name} lastName="" imageSrc="" />
              <Details.InfoContent className="gap-1 max-w-full">
                <Details.InfoTitle title={roleDetails.name} />
                <Details.InfoSubTitle className="text-wrap wrap-break-word">
                  {roleDetails.description}
                </Details.InfoSubTitle>
                <Badge variant="secondary" className="font-semibold">
                  {t('roles:layout_role_id')}: {roleDetails.externalId}
                </Badge>
              </Details.InfoContent>
            </Details.Info>
            <RolesTabs id={id} />
          </Details.Header>
          {children}
        </Details>
      </Page.Content>
    </Page>
  );
}
