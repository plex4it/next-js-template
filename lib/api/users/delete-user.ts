'use server';

import { permissions } from '@/lib/permissions/permissions';
import { api } from '@/lib/api/utils';
import { revalidatePath } from 'next/cache';

export default async function deleteUser(id: bigint) {
  const result = await api.delete(`users/${id}`, permissions.users.delete);

  if (result.ok) {
    revalidatePath('/admin/users');
  }

  return result;
}
