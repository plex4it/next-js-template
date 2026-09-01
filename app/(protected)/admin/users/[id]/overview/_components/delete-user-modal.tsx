'use client';

import ModalInfo from '@/components/shared/modal-info';
import deleteUser from '@/lib/api/users/delete-user';
import { useRouter } from 'next/navigation';
import { useT } from 'next-i18next/client';
import { toast } from 'sonner';

interface DeleteUserModalProps {
  id: bigint;
  firstName: string;
  lastName: string;
}

export function DeleteUserModal({ id, firstName, lastName }: Readonly<DeleteUserModalProps>) {
  const { t } = useT(['users', 'common']);
  const router = useRouter();
  const confirm = async () => {
    const result = await deleteUser(id);
    if (!result.ok) {
      toast.error(result.message);
    } else {
      toast.success(t('users:notify_deleted', { name: `${firstName} ${lastName}` }));
      router.replace('/admin/users');
    }
  };
  return (
    <ModalInfo
      title={t('users:delete_modal_title')}
      description={t('users:delete_modal_description', { name: `${firstName} ${lastName}` })}
      confirmClick={confirm}
      confirmLabel={t('common:delete')}
      triggerLabel={t('common:delete')}
    />
  );
}
