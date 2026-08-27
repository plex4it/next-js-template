'use server';

import { CreateUserRequest } from '@/lib/types/user/request/create-user-request';
import { api } from '@/lib/api/utils';
import { revalidatePath } from 'next/cache';

export default async function createUser(data: CreateUserRequest) {
  const result = await api.post('users', data);

  if (!result.ok) {
    throw Error('An error occurred when creating the user');
  }

  const resultData = await result.json();

  revalidatePath('/admin/users');
  return resultData;
}
