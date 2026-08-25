'use client';

import * as z from 'zod';
import { useForm, UseFormReturn, DefaultValues } from 'react-hook-form';
import React, { createContext, useContext } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormContext = createContext<UseFormReturn<any> | null>(null);

export function useFormContext() {
  const ctx = useContext(FormContext);

  if (!ctx) {
    throw new Error('Form must be used inside provider');
  }

  return ctx;
}

interface FormProps<TSchema extends z.ZodObject> {
  onSubmit: (data: z.output<TSchema>) => void;
  defaultValues?: DefaultValues<z.input<TSchema>>;
  children: React.ReactNode;
  className?: string;
  schema: TSchema;
}

export function Form<TSchema extends z.ZodObject>({
  onSubmit,
  defaultValues,
  children,
  className,
  schema,
}: Readonly<FormProps<TSchema>>) {
  const form = useForm<z.input<TSchema>, undefined, z.output<TSchema>>({
    // Zod 4 + RHF resolver generics do not line up cleanly yet
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema) as any,
    defaultValues,
  });

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn('flex min-h-0 flex-1 flex-col', className)}
    >
      <FormContext.Provider value={form}>{children}</FormContext.Provider>
    </form>
  );
}
