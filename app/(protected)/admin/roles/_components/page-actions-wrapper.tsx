'use client';

import { PageExportAction } from '@/components/shared/pages-layout';
import { toast } from 'sonner';
import { useT } from 'next-i18next/client';
import { AddRoleModal } from './add-role-modal';
import { RolesPermissionHandler } from '@/lib/permissions/handlers/roles-permission-handler';

export function PageActionsWrapper() {
  const { t } = useT('common');
  const handler = RolesPermissionHandler.getInstance();
  const onExport = () => {
    toast.success(t('common:exported'));
  };

  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center">
      {handler.canCreate() && <AddRoleModal />}
      <PageExportAction onClick={onExport} />
    </div>
  );
}
