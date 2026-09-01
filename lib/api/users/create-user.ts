'use server';

import { CreateUserRequest } from '@/lib/types/user/request/create-user-request';
import { api } from '@/lib/api/utils';
import { revalidatePath } from 'next/cache';
import { permissions } from '@/lib/permissions/permissions';

export default async function createUser(data: CreateUserRequest) {
  const result = await api.post('users', data, permissions.users.create);

  if (result.ok) {
    revalidatePath('/admin/users');
  }

  return result;
}
