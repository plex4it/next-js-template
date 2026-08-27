'use client';

import { Button } from '@/components/ui/button';
import { UsersEditForm } from './users-edit-form';
import { PencilIcon } from 'lucide-react';
import { ModalForm } from '@/components/shared/form/modal-form';
import { useT } from 'next-i18next/client';

interface EditUserModalProps {
  id: bigint;
  firstName: string;
  lastName: string;
  status: boolean;
  enabled: boolean;
}

export const UsersEditModal = ({
  id,
  firstName,
  lastName,
  enabled,
  status,
}: Readonly<EditUserModalProps>) => {
  const { t } = useT(['users', 'common']);
  return (
    <ModalForm
      form={<UsersEditForm id={id} firstName={firstName} lastName={lastName} status={status} />}
      title={t('users:edit_title')}
      trigger={
        <Button aria-label={t('users:edit_title')} disabled={!enabled}>
          <PencilIcon className="size-4" />
          {t('common:edit')}
        </Button>
      }
    />
  );
};
