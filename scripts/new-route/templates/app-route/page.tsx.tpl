import { Page } from '@/components/shared/pages-layout';
import { FolderIcon } from 'lucide-react';
import { PageActionsWrapper } from './_components/page-actions-wrapper';
import { TableWrapper } from './_components/table-wrapper';
import { getT } from 'next-i18next/server';

export default async function {{PASCAL}}Page() {
  const { t } = await getT('{{I18N_NS}}');

  return (
    <Page>
      <Page.Header>
        <Page.Title title={t('{{I18N_NS}}:page_title')}>
          <Page.Icon icon={FolderIcon} />
        </Page.Title>
        <Page.Actions>
          <PageActionsWrapper />
        </Page.Actions>
      </Page.Header>
      <Page.Content>
        <TableWrapper />
      </Page.Content>
    </Page>
  );
}
