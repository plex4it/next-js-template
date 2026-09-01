'use client';

import { Form } from '@/components/shared/form/form';
import { FormGroup } from '@/components/shared/form/form-group';
import { useModal } from '@/components/modal';
import { FormFooter } from '@/components/shared/form/modal-form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';
import * as z from 'zod';
import { FormController } from '@/components/shared/form/form-controller';
import updateRole from '@/lib/api/roles/update-role';
import { useT } from 'next-i18next/client';

interface EditRoleFormProps {
  id: bigint;
  description?: string;
}

export function EditRoleForm({ id, description }: Readonly<EditRoleFormProps>) {
  const { t } = useT(['roles', 'common', 'validation', 'fields']);
  const modal = useModal();
  const [isProcessing, setIsProcessing] = useState(false);
  const schema = z.object({
    description: z
      .string()
      .max(400, t('validation:description_maximum_characters', { number: 400 }))
      .optional(),
  });

  const onEditRoleSubmit = async (data: z.infer<typeof schema>) => {
    setIsProcessing(true);
    const result = await updateRole({
      roleId: id,
      description: data.description,
    });
    setIsProcessing(false);

    if (!result.ok) {
      toast.error(result.message);
    } else {
      toast.success(t('roles:notify_updated'));
      modal.close();
    }
  };

  return (
    <Form schema={schema} onSubmit={onEditRoleSubmit} defaultValues={{ description: description }}>
      <FormGroup>
        <FormController
          name="description"
          label={t('fields:description')}
          render={() => <Input />}
        />
      </FormGroup>
      <FormFooter
        isProcessing={isProcessing}
        actionLabel={t('common:save')}
        loadingLabel={t('common:processing')}
      />
    </Form>
  );
}
