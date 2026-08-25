'use client';

import React from 'react';
import { Controller, ControllerFieldState, ControllerRenderProps } from 'react-hook-form';
import { JSX } from 'react/jsx-runtime';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { useFormContext } from './form';
import { Spinner } from '@/components/ui/spinner';

interface FormControllerProps {
  name: string;
  label: string;
  loading?: boolean;
  nativeInput?: boolean;
  render: (field: ControllerRenderProps, fieldState: ControllerFieldState) => JSX.Element;
  orientation?: 'horizontal' | 'vertical' | 'responsive';
  className?: string;
}

export function FormController({
  name,
  label,
  loading = false,
  render,
  nativeInput = true,
  orientation = 'vertical',
  className,
}: Readonly<FormControllerProps>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const element = render(field, fieldState);

        const inputElement = nativeInput
          ? React.cloneElement(element, {
              ...field,
            })
          : element;

        return (
          <Field data-invalid={fieldState.invalid} orientation={orientation} className={className}>
            <FieldLabel htmlFor={name}>
              {label} {loading && <Spinner className="size-4" />}
            </FieldLabel>
            {inputElement}
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
