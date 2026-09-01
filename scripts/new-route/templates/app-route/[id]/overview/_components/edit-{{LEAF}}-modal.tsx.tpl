'use client';

import { Button } from '@/components/ui/button';
import { PencilIcon } from 'lucide-react';
import { Edit{{ENTITY_PASCAL}}Form } from './edit-{{LEAF}}-form';
import { ModalForm } from '@/components/shared/form/modal-form';
import { useT } from 'next-i18next/client';

interface Edit{{ENTITY_PASCAL}}ModalProps {
  id: bigint;
  name: string;
}

export default function Edit{{ENTITY_PASCAL}}Modal({ id, name }: Readonly<Edit{{ENTITY_PASCAL}}ModalProps>) {
  const { t } = useT(['{{I18N_NS}}', 'common']);

  return (
    <ModalForm
      form={<Edit{{ENTITY_PASCAL}}Form id={id} name={name} />}
      title={t('{{I18N_NS}}:edit_title')}
      trigger={
        <Button aria-label={t('{{I18N_NS}}:edit_title')}>
          <PencilIcon data-icon="inline-start" className="size-4" />
          {t('common:edit')}
        </Button>
      }
    />
  );
}
