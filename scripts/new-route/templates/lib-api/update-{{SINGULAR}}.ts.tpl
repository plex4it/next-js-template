'use server';

import { Update{{ENTITY_PASCAL}}Request } from '@/lib/types/{{SINGULAR}}/request/update-{{SINGULAR}}-request';
import { api } from '@/lib/api/utils';
import { revalidatePath } from 'next/cache';

export default async function update{{ENTITY_PASCAL}}(data: Update{{ENTITY_PASCAL}}Request) {
  const result = await api.put(`{{API_PATH}}/${data.id}`, data);

  if (!result.ok) {
    throw Error('An error occurred when updating the {{LABEL}}');
  }

  revalidatePath('{{URL_BASE}}');
  revalidatePath(`{{URL_BASE}}/${data.id}/overview`);
}
