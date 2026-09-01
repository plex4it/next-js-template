'use client';

import ModalInfo from '@/components/shared/modal-info';
import { useIsMobile } from '@/hooks/use-mobile';
import unassignUser from '@/lib/api/roles/users/unassign-user';
import { XIcon } from 'lucide-react';
import { useT } from 'next-i18next/client';
import { toast } from 'sonner';

interface UnassignModalProps {
  roleId: bigint;
  userId: bigint;
  firstName: string;
  lastName: string;
}

export function UnassignModal({
  roleId,
  userId,
  firstName,
  lastName,
}: Readonly<UnassignModalProps>) {
  const isMobile = useIsMobile();
  const { t } = useT('roles');

  const confirm = async () => {
    const result = await unassignUser(roleId, userId);

    if (!result.ok) {
      toast.error(result.message);
    } else {
      toast.success(t('roles:notify_unassign'));
    }
  };

  return (
    <ModalInfo
      title={t('roles:unassign_modal_title')}
      description={t('roles:unassign_modal_description', { name: `${firstName} ${lastName}` })}
      confirmClick={confirm}
      confirmLabel={t('roles:unassign')}
      triggerIcon={XIcon}
      triggerLabel={!isMobile ? t('roles:unassign') : ''}
    />
  );
}
