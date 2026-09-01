'use client';

import ModalInfo from '@/components/shared/modal-info';
import deleteRole from '@/lib/api/roles/delete-role';
import { useRouter } from 'next/navigation';
import { useT } from 'next-i18next/client';
import { toast } from 'sonner';

interface DeleteRoleModalProps {
  name: string;
  id: bigint;
}

export function DeleteRoleModal({ name, id }: Readonly<DeleteRoleModalProps>) {
  const { t } = useT(['roles', 'common']);
  const router = useRouter();
  const confirm = async () => {
    const result = await deleteRole(id);
    if (!result.ok) {
      toast.error(result.message);
    } else {
      toast.success(t('roles:notify_deleted', { name }));
      router.replace('/admin/roles');
    }
  };

  return (
    <ModalInfo
      title={t('roles:delete_modal_title')}
      description={t('roles:delete_modal_description', { name })}
      confirmClick={confirm}
      confirmLabel={t('common:delete')}
      triggerLabel={t('common:delete')}
    />
  );
}
