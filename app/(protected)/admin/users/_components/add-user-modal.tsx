'use client';

import { AddUserForm } from './add-user-form';
import { ModalForm } from '@/components/shared/form/modal-form';
import { useT } from 'next-i18next/client';

export function AddUserModal() {
  const { t } = useT('users');
  return (
    <ModalForm
      form={<AddUserForm />}
      title={t('users:add_modal_title')}
      description={t('users:add_modal_description')}
      triggerAriaLabel={t('users:add_modal_title')}
    />
  );
}
