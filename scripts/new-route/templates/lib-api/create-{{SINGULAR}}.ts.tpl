'use server';

import { Create{{ENTITY_PASCAL}}Request } from '@/lib/types/{{SINGULAR}}/request/create-{{SINGULAR}}-request';
import { api } from '@/lib/api/utils';
import { revalidatePath } from 'next/cache';

export default async function create{{ENTITY_PASCAL}}(data: Create{{ENTITY_PASCAL}}Request) {
  const result = await api.post('{{API_PATH}}', data);

  if (!result.ok) {
    throw Error('An error occurred when creating the {{LABEL}}');
  }

  const resultData = await result.json();

  revalidatePath('{{URL_BASE}}');

  return resultData;
}
