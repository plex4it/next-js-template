'use client';

import { useT } from 'next-i18next/client';
import { Add{{ENTITY_PASCAL}}Form } from './add-{{LEAF}}-form';
import { ModalForm } from '@/components/shared/form/modal-form';

export function Add{{ENTITY_PASCAL}}Modal() {
  const { t } = useT('{{I18N_NS}}');

  return (
    <ModalForm
      form={<Add{{ENTITY_PASCAL}}Form />}
      title={t('{{I18N_NS}}:add_modal_title')}
      triggerAriaLabel={t('{{I18N_NS}}:add_modal_title')}
    />
  );
}
