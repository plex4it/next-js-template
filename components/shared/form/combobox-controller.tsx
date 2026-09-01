'use client';

import { useWatch } from 'react-hook-form';
import { useFormContext } from '@/components/shared/form/form';
import { FormController } from '@/components/shared/form/form-controller';
import { SelectFieldItem } from '@/components/shared/form/select-field';
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

interface ComboboxControllerProps {
  items: SelectFieldItem[];
  loading: boolean;
  label: string;
  emptyLabel: string;
}

export function ComboboxController({
  items,
  loading,
  emptyLabel,
  label,
}: Readonly<ComboboxControllerProps>) {
  const { control } = useFormContext();
  const anchor = useComboboxAnchor();
  const selectedItems = (useWatch({ control, name: 'users' }) ?? []) as Array<string>;

  return (
    <FormController
      name="users"
      label={label}
      loading={loading}
      nativeInput={false}
      render={(field) => (
        <Combobox
          disabled={loading}
          multiple
          items={items}
          itemToStringLabel={(r) => r.label}
          value={field.value}
          onValueChange={field.onChange}
        >
          <ComboboxChips ref={anchor} className="w-full">
            <ComboboxValue>
              {!loading &&
                selectedItems.map((itemId, index) => {
                  const item = items.find((i) => i.value == itemId);
                  return <ComboboxChip key={index}>{item?.label ?? ''}</ComboboxChip>;
                })}
            </ComboboxValue>
            <ComboboxChipsInput />
          </ComboboxChips>
          <ComboboxContent anchor={anchor}>
            <ComboboxEmpty>{emptyLabel}</ComboboxEmpty>
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
