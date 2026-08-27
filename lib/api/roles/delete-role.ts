'use server';

import { api } from '@/lib/api/utils';
import { revalidatePath } from 'next/cache';

export default async function deleteRole(id: bigint) {
  const result = await api.delete(`roles/${id}`);

  if (!result.ok) {
    throw Error('An error occurred when deleting the role');
  }

  revalidatePath('/admin/roles');
}
