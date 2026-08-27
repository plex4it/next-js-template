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
import { Switch } from '@/components/ui/switch';
import updateUser from '@/lib/api/users/update-user';
import { useT } from 'next-i18next/client';

interface UsersEditFormProps {
  id: bigint;
  firstName: string;
  lastName: string;
  status: boolean;
}

export function UsersEditForm({ id, firstName, lastName, status }: Readonly<UsersEditFormProps>) {
  const { t } = useT(['users', 'common', 'validation', 'fields']);
  const modal = useModal();
  const [isProcessing, setIsProcessing] = useState(false);

  const schema = z.object({
    firstName: z.string().nonempty({ error: t('validation:field_required') }),
    lastName: z.string().nonempty({ error: t('validation:field_required') }),
    status: z.boolean(),
  });

  const userSubmit: SubmitHandler<z.infer<typeof schema>> = async (data) => {
    setIsProcessing(true);
    try {
      await updateUser({
        firstName: data.firstName,
        lastName: data.lastName,
        status: data.status,
        userId: id,
      });
      toast.success(t('users:notify_updated'));
      setIsProcessing(false);
      modal.close();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t('users:error_updating'));
      setIsProcessing(false);
    }
  };

  return (
    <Form
      schema={schema}
      onSubmit={userSubmit}
      defaultValues={{
        firstName: firstName,
        lastName: lastName,
        status: status,
      }}
    >
      <FormGroup>
        <FormController label={t('fields:first_name')} name="firstName" render={() => <Input />} />
        <FormController label={t('fields:last_name')} name="lastName" render={() => <Input />} />
        <FormController
          name="status"
          label={t('common:active')}
          orientation="horizontal"
          className="w-fit"
          nativeInput={false}
          render={(field) => (
            <Switch onCheckedChange={field.onChange} checked={field.value} name={field.name} />
          )}
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
