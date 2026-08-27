'use server';

import { api } from '@/lib/api/utils';
import { revalidatePath } from 'next/cache';

export default async function deleteUser(id: bigint) {
  const result = await api.delete(`users/${id}`);

  if (!result.ok) {
    throw Error('An error occurred when deleting the user');
  }

  revalidatePath('/admin/users');
}
