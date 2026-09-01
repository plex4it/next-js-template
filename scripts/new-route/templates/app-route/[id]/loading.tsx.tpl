import { Page } from '@/components/shared/pages-layout';
import { Details, DetailsContentLoading, DetailsHeaderLoading } from '@/components/shared/details';
import { ArrowLeftIcon } from 'lucide-react';
import { getT } from 'next-i18next/server';
import Link from 'next/link';

export default async function {{ENTITY_PASCAL}}DetailLoading() {
  const { t } = await getT('{{I18N_NS}}');

  return (
    <Page>
      <Page.Header>
        <Page.Title title={t('edit_title')}>
          <Link href="{{URL_BASE}}" aria-label={t('back_to_page')}>
            <ArrowLeftIcon aria-hidden="true" />
          </Link>
        </Page.Title>
      </Page.Header>
      <Page.Content>
        <Details>
          <DetailsHeaderLoading />
          <DetailsContentLoading />
        </Details>
      </Page.Content>
    </Page>
  );
}
