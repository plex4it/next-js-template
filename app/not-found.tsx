import { NotFoundStatus } from '@/components/shared/not-found-status';
import { getT } from 'next-i18next/server';

export default async function NotFound() {
  const { t } = await getT('errors');

  return (
    <NotFoundStatus
      title={t('not_found_title')}
      description={t('not_found_description')}
      homeLabel={t('go_home')}
    />
  );
}
