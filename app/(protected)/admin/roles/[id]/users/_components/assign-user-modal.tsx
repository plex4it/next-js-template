'use client';

import { ModalForm } from '@/components/shared/form/modal-form';
import { AssignUserForm } from './assign-user-form';
import { useT } from 'next-i18next/client';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';

interface AssignUserModalProps {
  roleId: bigint;
  users: string[];
}

export function AssignUserModal({ roleId, users }: Readonly<AssignUserModalProps>) {
  const { t } = useT(['roles']);
  return (
    <ModalForm
      form={<AssignUserForm roleId={roleId} users={users} />}
      title={t('roles:assign_user')}
      triggerAriaLabel={t('roles:assign_user')}
      trigger={
        <Button aria-label={t('roles:assign_user')}>
          <PlusIcon data-icon="inline-start" className="size-4" />
          {t('roles:assign_user')}
        </Button>
      }
    />
  );
}
