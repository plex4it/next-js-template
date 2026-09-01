'use client';

import { ComboboxController } from '@/components/shared/form/combobox-controller';
import { Form } from '@/components/shared/form/form';
import { FormGroup } from '@/components/shared/form/form-group';
import { FormFooter } from '@/components/shared/form/modal-form';
import { useModal } from '@/components/modal';
import { useLookup } from '@/hooks/use-lookup';
import assignUsers from '@/lib/api/roles/users/assign-users';
import lookupUsers from '@/lib/api/users/lookup-users';
import { useT } from 'next-i18next/client';
import { useState } from 'react';
import { toast } from 'sonner';
import * as z from 'zod';

interface AssignUserFormProps {
  roleId: bigint;
  users: string[];
}

export function AssignUserForm({ roleId, users }: Readonly<AssignUserFormProps>) {
  const { t } = useT(['roles', 'common', 'validation', 'fields']);
  const [isProcessing, setIsProcessing] = useState(false);
  const allUsers = useLookup(lookupUsers);

  const modal = useModal();
  const schema = z.object({
    users: z
      .array(z.coerce.bigint().positive())
      .refine((values) => values.every((v) => allUsers.data.some((u) => BigInt(u.value) === v)), {
        error: t('validation:select_user'),
      })
      .nonempty({ error: t('validation:field_required') }),
  });

  const submit = async (data: z.infer<typeof schema>) => {
    setIsProcessing(true);

    const result = await assignUsers({ roleId: roleId, userIds: data.users });

    setIsProcessing(false);

    if (!result.ok) {
      toast.error(result.message);
    } else {
      toast.success(t('roles:notify_assigned'));
      modal.close();
    }
  };

  return (
    <Form
      schema={schema}
      onSubmit={submit}
      defaultValues={{
        users: [],
      }}
    >
      <FormGroup>
        <ComboboxController
          emptyLabel={t('users:items_not_available')}
          items={allUsers.data.filter((u) => !users.includes(u.value))}
          label={t('fields:users')}
          loading={allUsers.loading}
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
