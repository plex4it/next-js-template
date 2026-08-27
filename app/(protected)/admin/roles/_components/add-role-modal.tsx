'use client';

import { useT } from 'next-i18next/client';
import { AddRoleForm } from './add-role-form';
import { ModalForm } from '@/components/shared/form/modal-form';

export function AddRoleModal() {
  const { t } = useT('roles');
  return (
    <ModalForm
      form={<AddRoleForm />}
      title={t('roles:add_modal_title')}
      triggerAriaLabel={t('roles:add_modal_title')}
    />
  );
}
