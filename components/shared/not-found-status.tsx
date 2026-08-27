'use client';

import { FileQuestionIcon } from 'lucide-react';
import { StatusHomeLink, StatusPage } from '@/components/shared/status-page';

export function NotFoundStatus({
  title,
  description,
  homeLabel,
}: Readonly<{ title: string; description: string; homeLabel: string }>) {
  return (
    <StatusPage icon={FileQuestionIcon} title={title} description={description}>
      <StatusHomeLink label={homeLabel} />
    </StatusPage>
  );
}
