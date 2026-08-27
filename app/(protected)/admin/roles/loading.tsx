import { Page } from '@/components/shared/pages-layout';
import { Spinner } from '@/components/ui/spinner';
import { UserKeyIcon } from 'lucide-react';
import { getT } from 'next-i18next/server';

export default async function RolesLoading() {
  const { t } = await getT(['roles', 'common']);
  return (
    <Page className="h-full">
      <Page.Header>
        <Page.Title title={t('page_title')}>
          <Page.Icon icon={UserKeyIcon} />
        </Page.Title>
      </Page.Header>
      <Page.Content className="flex-1 justify-center items-center gap-3 flex-row">
        {t('common:loading')} <Spinner className="size-8" />
      </Page.Content>
    </Page>
  );
}
