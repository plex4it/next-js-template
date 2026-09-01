'use server';

import { CreateRoleRequest } from '@/lib/types/roles/request/create-role-request';
import { api } from '@/lib/api/utils';
import { revalidatePath } from 'next/cache';
import { permissions } from '@/lib/permissions/permissions';

export default async function createRole(data: CreateRoleRequest) {
  const result = await api.post('roles', data, permissions.roles.create);

  if (result.ok) {
    revalidatePath('/admin/roles');
  }

  return result;
}
