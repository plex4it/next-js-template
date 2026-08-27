'use client';

import { useEffect } from 'react';
import { FrownIcon } from 'lucide-react';
import { StatusHomeLink, StatusPage, StatusRetryButton } from '@/components/shared/status-page';
import { useT } from 'next-i18next/client';

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const { t } = useT(['errors', 'common']);

  useEffect(() => {
    console.error(error);
  }, [error]);

  const description = error.digest
    ? `${t('errors:page_description')} ${t('errors:error_digest', { digest: error.digest })}`
    : t('errors:page_description');

  return (
    <StatusPage icon={FrownIcon} title={t('errors:page_title')} description={description}>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <StatusRetryButton label={t('common:retry')} onRetry={retry} />
        <StatusHomeLink label={t('errors:go_home')} />
      </div>
    </StatusPage>
  );
}
