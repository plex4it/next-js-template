'use client';

import { PageExportAction } from '@/components/shared/pages-layout';
import { toast } from 'sonner';
import { useT } from 'next-i18next/client';
import { Add{{ENTITY_PASCAL}}Modal } from './add-{{LEAF}}-modal';

export function PageActionsWrapper() {
  const { t } = useT('common');
  const onExport = () => {
    toast.success(t('common:exported'));
  };

  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center">
      <Add{{ENTITY_PASCAL}}Modal />
      <PageExportAction onClick={onExport} />
    </div>
  );
}
