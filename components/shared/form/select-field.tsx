'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ControllerRenderProps } from 'react-hook-form';

export type SelectFieldItem = { label: string; value: string };

interface SelectFieldProps {
  field: ControllerRenderProps;
  items: SelectFieldItem[];
  disabled?: boolean;
}

export function SelectField({ field, items, disabled = false }: Readonly<SelectFieldProps>) {
  return (
    <Select
      items={items}
      onValueChange={(value) => field.onChange(value === '' ? undefined : value)}
      value={disabled ? '' : (field.value?.toString() ?? '')}
      disabled={disabled}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false}>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value.toString()}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
