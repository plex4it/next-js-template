'use client';

import { Form, useFormContext } from '@/components/shared/form/form';
import { FormGroup } from '@/components/shared/form/form-group';
import { useModal } from '@/components/modal';
import { FormFooter } from '@/components/shared/form/modal-form';
import { Input } from '@/components/ui/input';
import { RefObject, useState } from 'react';
import { UseFormSetError, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { FormController } from '@/components/shared/form/form-controller';
import createUser from '@/lib/api/users/create-user';
import { useLookup } from '@/hooks/use-lookup';
import { lookupRoles } from '@/lib/api/roles/lookup-roles';
import { ErrorState } from '@/components/shared/error-state';
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from '@/components/ui/combobox';
import { SelectFieldItem } from '@/components/shared/form/select-field';
import { useT } from 'next-i18next/client';

export function AddUserForm() {
  const anchor = useComboboxAnchor();
  const { t } = useT(['users', 'roles', 'common', 'validation', 'fields']);
  const modal = useModal();
  const [isProcessing, setIsProcessing] = useState(false);
  const roles = useLookup(lookupRoles);

  const schema = z.object({
    firstName: z
      .string()
      .nonempty({ error: t('validation:field_required') })
      .max(256, { error: t('validation:first_name_maximum_characters', { number: 256 }) }),
    lastName: z
      .string()
      .nonempty({ error: t('validation:field_required') })
      .max(256, { error: t('validation:last_name_maximum_characters', { number: 256 }) }),
    email: z.email().nonempty({ error: t('validation:field_required') }),
    roles: z
      .array(z.coerce.bigint())
      .refine((values) => values.every((v) => roles.data.some((r) => BigInt(r.value) === v)), {
        error: t('validation:atleast_one_role'),
      })
      .nonempty({ error: t('validation:field_required') }),
  });

  const userSubmit = async (
    data: z.infer<typeof schema>,
    setError: UseFormSetError<z.infer<typeof schema>>
  ) => {
    setIsProcessing(true);
    const result = await createUser({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      roles: data.roles,
    });
    setIsProcessing(false);

    if (!result.ok) {
      if (result.status === 409) {
        setError('email', {
          type: 'validate',
          message: t('validation:email_already_exists'),
        });
      } else {
        toast.error(result.message);
      }
    } else {
      toast.success(t('users:notify_added'));
      modal.close();
    }
  };

  if (roles.error) {
    return <ErrorState description={roles.error} onRetry={roles.fetchData} />;
  }

  return (
    <Form
      schema={schema}
      onSubmit={userSubmit}
      defaultValues={{ email: '', firstName: '', lastName: '', roles: [] }}
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
        <RolesBox anchor={anchor} roles={roles.data} loading={roles.loading} />
      </FormGroup>
      <FormFooter
        isProcessing={isProcessing}
        loadingLabel={t('common:processing')}
        actionLabel={t('common:add')}
      />
    </Form>
  );
}

interface RolesBoxProps {
  anchor: RefObject<HTMLDivElement | null>;
  roles: SelectFieldItem[];
  loading: boolean;
}

function RolesBox({ anchor, roles, loading }: Readonly<RolesBoxProps>) {
  const { t } = useT(['roles', 'fields']);
  const { control } = useFormContext();
  const selectedRoles = (useWatch({ control, name: 'roles' }) ?? []) as Array<string>;

  return (
    <FormController
      name="roles"
      label={t('fields:roles')}
      loading={loading}
      nativeInput={false}
      render={(field) => (
        <Combobox
          disabled={loading}
          multiple
          items={roles}
          itemToStringLabel={(r) => r.label}
          value={field.value}
          onValueChange={field.onChange}
        >
          <ComboboxChips ref={anchor} className="w-full">
            <ComboboxValue>
              {selectedRoles.map((roleId: string) => {
                const role = roles.find((r) => r.value == roleId);
                return <ComboboxChip key={roleId}>{role?.label ?? ''}</ComboboxChip>;
              })}
            </ComboboxValue>
            <ComboboxChipsInput />
          </ComboboxChips>
          <ComboboxContent anchor={anchor}>
            <ComboboxEmpty>{t('roles:items_not_available')}</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item.value} value={item.value}>
                  {item.label}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      )}
    />
  );
}
