'use server';

import { UpdateUserRequest } from '@/lib/types/user/request/update-user-request';
import { api } from '@/lib/api/utils';
import { revalidatePath } from 'next/cache';
import { permissions } from '@/lib/permissions/permissions';

export default async function updateUser(data: UpdateUserRequest) {
  const result = await api.put(`users/${data.userId}`, data, permissions.users.update);

  if (result.ok) {
    revalidatePath('/admin/users');
    revalidatePath(`/admin/users/${data.userId}/overview`);
  }

  return result;
}
