'use client';

import { Button } from '@/components/ui/button';
import { PencilIcon } from 'lucide-react';
import { EditRoleForm } from './edit-role-form';
import { ModalForm } from '@/components/shared/form/modal-form';
import { useT } from 'next-i18next/client';

interface EditRoleModalProps {
  id: bigint;
  description?: string;
}

export default function EditRoleModal({ id, description }: Readonly<EditRoleModalProps>) {
  const { t } = useT(['roles', 'common']);
  return (
    <ModalForm
      form={<EditRoleForm description={description} id={id} />}
      title={t('roles:edit_title')}
      trigger={
        <Button aria-label={t('roles:edit_title')}>
          <PencilIcon data-icon="inline-start" className="size-4" />
          {t('common:edit')}
        </Button>
      }
    />
  );
}
