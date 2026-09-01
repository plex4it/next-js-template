'use client';

import { Form } from '@/components/shared/form/form';
import { FormGroup } from '@/components/shared/form/form-group';
import { useModal } from '@/components/modal';
import { FormFooter } from '@/components/shared/form/modal-form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { FormController } from '@/components/shared/form/form-controller';
import create{{ENTITY_PASCAL}} from '@/lib/api/{{API_PATH}}/create-{{SINGULAR}}';
import { useT } from 'next-i18next/client';

export function Add{{ENTITY_PASCAL}}Form() {
  const { t } = useT(['{{I18N_NS}}', 'common', 'validation', 'fields']);
  const modal = useModal();
  const [isProcessing, setIsProcessing] = useState(false);

  const schema = z.object({
    name: z.string().nonempty({ error: t('validation:field_required') }),
  });

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (data) => {
    setIsProcessing(true);
    try {
      await create{{ENTITY_PASCAL}}({ name: data.name });
      toast.success(t('{{I18N_NS}}:notify_added'));
      modal.close();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t('{{I18N_NS}}:error_creating'));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Form schema={schema} onSubmit={onSubmit} defaultValues={{ name: '' }}>
      <FormGroup>
        <FormController name="name" label={t('fields:name')} render={() => <Input />} />
      </FormGroup>
      <FormFooter
        isProcessing={isProcessing}
        loadingLabel={t('common:processing')}
        actionLabel={t('common:add')}
      />
    </Form>
  );
}
