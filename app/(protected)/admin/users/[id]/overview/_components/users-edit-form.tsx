'use client';

import { Form, useFormContext } from '@/components/shared/form/form';
import { FormGroup } from '@/components/shared/form/form-group';
import { useModal } from '@/components/modal';
import { FormFooter } from '@/components/shared/form/modal-form';
import { Input } from '@/components/ui/input';
import { RefObject, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { FormController } from '@/components/shared/form/form-controller';
import { Switch } from '@/components/ui/switch';
import updateUser from '@/lib/api/users/update-user';
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
import { useLookup } from '@/hooks/use-lookup';
import { lookupRoles } from '@/lib/api/roles/lookup-roles';
import { SelectFieldItem } from '@/components/shared/form/select-field';
import { ErrorState } from '@/components/shared/error-state';
import { useT } from 'next-i18next/client';

interface UsersEditFormProps {
  id: bigint;
  firstName: string;
  lastName: string;
  status: boolean;
  roles: string[];
}

export function UsersEditForm({
  id,
  firstName,
  lastName,
  roles,
  status,
}: Readonly<UsersEditFormProps>) {
  const anchor = useComboboxAnchor();
  const { t } = useT(['users', 'roles', 'common', 'validation', 'fields']);
  const modal = useModal();
  const [isProcessing, setIsProcessing] = useState(false);
  const allRoles = useLookup(lookupRoles);

  const schema = z.object({
    firstName: z
      .string()
      .nonempty({ error: t('validation:field_required') })
      .max(256, { error: t('validation:first_name_maximum_characters', { number: 256 }) }),
    lastName: z
      .string()
      .nonempty({ error: t('validation:field_required') })
      .max(256, { error: t('validation:last_name_maximum_characters', { number: 256 }) }),
    status: z.boolean(),
    roles: z
      .array(z.coerce.bigint())
      .refine((values) => values.every((v) => allRoles.data.some((r) => BigInt(r.value) === v)), {
        error: t('validation:atleast_one_role'),
      })
      .nonempty({ error: t('validation:field_required') }),
  });

  const userSubmit = async (data: z.infer<typeof schema>) => {
    setIsProcessing(true);
    const result = await updateUser({
      firstName: data.firstName,
      lastName: data.lastName,
      status: data.status,
      userId: id,
      roles: data.roles,
    });

    setIsProcessing(false);
    if (!result.ok) {
      toast.error(result.message);
    } else {
      toast.success(t('users:notify_updated'));
      modal.close();
    }
  };

  if (allRoles.error) {
    return <ErrorState description={allRoles.error} onRetry={allRoles.fetchData} />;
  }

  return (
    <Form
      schema={schema}
      onSubmit={userSubmit}
      defaultValues={{
        firstName: firstName,
        lastName: lastName,
        status: status,
        roles: allRoles.loading ? [] : roles,
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
        <RolesBox anchor={anchor} roles={allRoles.data} loading={allRoles.loading} />
      </FormGroup>
      <FormFooter
        isProcessing={isProcessing}
        actionLabel={t('common:save')}
        loadingLabel={t('common:processing')}
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
  const { t } = useT(['fields', 'roles']);
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
              {!loading &&
                selectedRoles.map((roleId: string) => {
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
