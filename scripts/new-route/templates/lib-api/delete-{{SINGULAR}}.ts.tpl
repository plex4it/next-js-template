'use server';

import { api } from '@/lib/api/utils';
import { revalidatePath } from 'next/cache';

export default async function delete{{ENTITY_PASCAL}}(id: bigint) {
  const result = await api.delete(`{{API_PATH}}/${id}`);

  if (!result.ok) {
    throw Error('An error occurred when deleting the {{LABEL}}');
  }

  revalidatePath('{{URL_BASE}}');
}
