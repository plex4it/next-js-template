'use client';

import { FrownIcon } from 'lucide-react';
import EmptyWrapper from '@/components/shared/empty-wrapper';
import { Button } from '@/components/ui/button';
import { useT } from 'next-i18next/client';

interface ErrorStateProps {
  description: string;
  onRetry?: () => void;
}

export function ErrorState({ description, onRetry }: Readonly<ErrorStateProps>) {
  const { t } = useT('common');
  return (
    <EmptyWrapper description={description} title={t('common:ups')} icon={FrownIcon}>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          {t('common:retry')}
        </Button>
      )}
    </EmptyWrapper>
  );
}
