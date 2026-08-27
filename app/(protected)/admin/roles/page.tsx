import { Page } from '@/components/shared/pages-layout';
import { UserKeyIcon } from 'lucide-react';
import { TableWrapper } from './_components/table-wrapper';
import { PageActionsWrapper } from './_components/page-actions-wrapper';
import { getT } from 'next-i18next/server';

export default async function RolesPage() {
  const { t } = await getT('roles');
  return (
    <Page>
      <Page.Header>
        <Page.Title title={t('roles:page_title')}>
          <Page.Icon icon={UserKeyIcon} />
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
