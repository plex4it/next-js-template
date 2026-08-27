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
import createUser from '@/lib/api/users/create-user';
import { useT } from 'next-i18next/client';

export function AddUserForm() {
  const { t } = useT(['users', 'common', 'validation', 'fields']);
  const modal = useModal();
  const [isProcessing, setIsProcessing] = useState(false);

  const schema = z.object({
    firstName: z.string().nonempty({ error: t('validation:field_required') }),
    lastName: z.string().nonempty({ error: t('validation:field_required') }),
    email: z.email().nonempty({ error: t('validation:field_required') }),
  });

  const userSubmit: SubmitHandler<z.infer<typeof schema>> = async (data) => {
    setIsProcessing(true);
    try {
      await createUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      });
      toast.success(t('users:notify_added'));
      setIsProcessing(false);
      modal.close();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t('users:error_creating'));
      setIsProcessing(false);
    }
  };

  return (
    <Form
      schema={schema}
      onSubmit={userSubmit}
      defaultValues={{ email: '', firstName: '', lastName: '' }}
    >
      <FormGroup>
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3">
          <FormController
            name="firstName"
            label={t('fields:first_name')}
            render={() => <Input />}
          />
          <FormController name="lastName" label={t('fields:last_name')} render={() => <Input />} />
        </div>
        <FormController name="email" label={t('fields:email')} render={() => <Input />} />
      </FormGroup>
      <FormFooter
        isProcessing={isProcessing}
        loadingLabel={t('common:processing')}
        actionLabel={t('common:add')}
      />
    </Form>
  );
}
