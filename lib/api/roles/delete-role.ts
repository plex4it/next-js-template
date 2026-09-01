'use server';

import { permissions } from '@/lib/permissions/permissions';
import { api } from '@/lib/api/utils';
import { revalidatePath } from 'next/cache';

export default async function deleteRole(id: bigint) {
  const result = await api.delete(`roles/${id}`, permissions.roles.delete);

  if (result.ok) {
    revalidatePath('/admin/roles');
  }

  return result;
}
