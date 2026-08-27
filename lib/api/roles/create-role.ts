'use server';

import { CreateRoleRequest } from '@/lib/types/roles/request/create-role-request';
import { api } from '@/lib/api/utils';
import { revalidatePath } from 'next/cache';

export default async function createRole(data: CreateRoleRequest) {
  const result = await api.post('roles', data);

  if (!result.ok) {
    throw Error('An error occurred when creating the role');
  }

  const resultData = await result.json();

  revalidatePath('/admin/roles');

  return resultData;
}
