'use client';

import { AddUserModal } from './add-user-modal';
import { PageExportAction } from '@/components/shared/pages-layout';
import { toast } from 'sonner';
import { useT } from 'next-i18next/client';
import { UsersPermissionHandler } from '@/lib/permissions/handlers/users-permission-handler';

export default function PageActionsWrapper() {
  const { t } = useT('common');
  const handler = UsersPermissionHandler.getInstance();
  const onExport = () => {
    toast.success(t('common:exported'));
  };

  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center">
      {handler.canCreate() && <AddUserModal />}
      <PageExportAction onClick={onExport} />
    </div>
  );
}
