'use server';

import { revalidatePath } from 'next/cache';
import { api } from '@/lib/api/utils';

export default async function unassignUser(roleId: bigint, userId: bigint) {
  const result = await api.delete(`roles/${roleId}/users/${userId}`);

  if (result.ok) {
    revalidatePath(`/admin/roles/${roleId}/users`);
  }

  return result;
}
