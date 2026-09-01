import { Page } from '@/components/shared/pages-layout';
import { Badge } from '@/components/ui/badge';
import { Details } from '@/components/shared/details';
import { {{PASCAL}}Tabs } from './_components/{{LEAF}}-tabs';
import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';
import get{{ENTITY_PASCAL}}Details from '@/lib/api/{{API_PATH}}/get-{{SINGULAR}}-details';
import { notFound } from 'next/navigation';
import { getT } from 'next-i18next/server';

export default async function {{ENTITY_PASCAL}}DetailLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}>) {
  const { t } = await getT('{{I18N_NS}}');
  const { id } = await params;

  let entityId: bigint;
  try {
    entityId = BigInt(id);
  } catch {
    notFound();
  }

  let entityDetails;
  try {
    entityDetails = await get{{ENTITY_PASCAL}}Details(entityId);
  } catch {
    notFound();
  }

  if (!entityDetails) {
    notFound();
  }

  return (
    <Page>
      <Page.Header>
        <Page.Title title={t('{{I18N_NS}}:edit_title')}>
          <Link href="{{URL_BASE}}" aria-label={t('{{I18N_NS}}:back_to_page')}>
            <ArrowLeftIcon aria-hidden="true" />
          </Link>
        </Page.Title>
      </Page.Header>
      <Page.Content>
        <Details>
          <Details.Header className="pb-0">
            <Details.Info>
              <Details.Image firstName={entityDetails.name} lastName="" imageSrc="" />
              <Details.InfoContent className="gap-1 max-w-full">
                <Details.InfoTitle title={entityDetails.name} />
                <Badge variant="secondary" className="font-semibold">
                  {t('{{I18N_NS}}:layout_id')}: {entityDetails.id.toString()}
                </Badge>
              </Details.InfoContent>
            </Details.Info>
            <{{PASCAL}}Tabs id={id} />
          </Details.Header>
          {children}
        </Details>
      </Page.Content>
    </Page>
  );
}
