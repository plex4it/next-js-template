'use client';

import { Page } from '@/components/shared/pages-layout';
import { useTranslation } from 'react-i18next';

export default function DashboardPage() {
  const { t } = useTranslation('common');

  return (
    <Page>
      <Page.Header>
        <Page.Title title={t('welcome', { name: 'Ricardo' })} className="text-2xl font-bold" />
      </Page.Header>
      <Page.Content>
        <p className="max-w-3xl text-sm text-muted-foreground">{t('dashboardDescription')}</p>
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-[40vh] flex-1 rounded-xl bg-muted/50" />
      </Page.Content>
    </Page>
  );
}
