'use client';

import EmptyWrapper from '@/components/shared/empty-wrapper';
import { Page } from '@/components/shared/pages-layout';
import { BanIcon } from 'lucide-react';
import { useT } from 'next-i18next/client';

export default function ForbiddenPage() {
  const { t } = useT('common');
  return (
    <Page className="w-full h-full">
      <Page.Content className="items-center justify-center">
        <EmptyWrapper
          description={t('common:no_permission')}
          icon={BanIcon}
          title={t('common:forbidden')}
        />
      </Page.Content>
    </Page>
  );
}
