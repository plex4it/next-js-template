import { Page } from '@/components/shared/pages-layout';
import { getT } from 'next-i18next/server';

export default async function ProductsPage() {
  const { t } = await getT('common');

  return (
    <Page>
      <Page.Header>
        <Page.Title title={t('welcome')} className="text-2xl font-bold" />
      </Page.Header>
      <Page.Content>
        <div className="min-h-[40vh] flex-1 rounded-xl bg-muted/50" />
        <div className="min-h-[40vh] flex-1 rounded-xl bg-muted/50" />
        <div className="min-h-[40vh] flex-1 rounded-xl bg-muted/50" />
      </Page.Content>
    </Page>
  );
}
