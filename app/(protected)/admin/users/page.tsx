import { Page } from '@/components/shared/pages-layout';
import { UsersRoundIcon } from 'lucide-react';
import PageActionsWrapper from './_components/page-actions-wrapper';
import { TableWrapper } from './_components/table-wrapper';
import { getT } from 'next-i18next/server';

export default async function UsersPage() {
  const { t } = await getT('users');

  return (
    <Page>
      <Page.Header>
        <Page.Title title={t('users:page_title')}>
          <Page.Icon icon={UsersRoundIcon} />
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
