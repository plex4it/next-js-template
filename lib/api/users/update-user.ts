'use server';

import { UpdateUserRequest } from '@/lib/types/user/request/update-user-request';
import { api } from '@/lib/api/utils';
import { revalidatePath } from 'next/cache';

export default async function updateUser(data: UpdateUserRequest) {
  const result = await api.put(`users/${data.userId}`, data);

  if (!result.ok) {
    throw Error('An error occurred when updating the user');
  }

  revalidatePath('/admin/users');
  revalidatePath(`/admin/users/${data.userId}/overview`);
}
