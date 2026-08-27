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
import createRole from '@/lib/api/roles/create-role';
import { useT } from 'next-i18next/client';

export function AddRoleForm() {
  const { t } = useT(['roles', 'validation', 'fields', 'common']);
  const modal = useModal();
  const [isProcessing, setIsProcessing] = useState(false);
  const schema = z.object({
    code: z
      .string()
      .nonempty({ error: t('validation:field_required') })
      .max(256, t('validation:code_maximum_characters', { number: 256 })),
    name: z
      .string()
      .nonempty({ error: t('validation:field_required') })
      .max(100, t('validation:name_maximum_characters', { number: 100 })),
    description: z
      .string()
      .max(200, t('validation:description_maximum_characters', { number: 200 }))
      .optional(),
  });

  const roleSubmit: SubmitHandler<z.infer<typeof schema>> = async (data) => {
    setIsProcessing(true);
    try {
      await createRole({
        code: data.code.toUpperCase(),
        name: data.name,
        description: data.description,
      });
      toast.success(t('roles:notify_added'));
      modal.close();
      setIsProcessing(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t('roles:error_creating'));
      setIsProcessing(false);
    }
  };

  return (
    <Form
      schema={schema}
      onSubmit={roleSubmit}
      defaultValues={{
        code: '',
        name: '',
        description: '',
      }}
    >
      <FormGroup>
        <FormController name="code" label={t('fields:code')} render={() => <Input />} />
        <FormController name="name" label={t('fields:name')} render={() => <Input />} />
        <FormController
          name="description"
          label={t('fields:description')}
          render={() => <Input />}
        />
      </FormGroup>
      <FormFooter
        isProcessing={isProcessing}
        loadingLabel={t('common:processing')}
        actionLabel={t('common:add')}
      />
    </Form>
  );
}
