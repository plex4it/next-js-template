'use server';

import { UpdateRoleRequest } from '@/lib/types/roles/request/update-role-request';
import { api } from '@/lib/api/utils';
import { revalidatePath } from 'next/cache';

export default async function updateRole(data: UpdateRoleRequest) {
  const result = await api.put(`roles/${data.roleId}`, data);

  if (!result.ok) {
    throw Error('An error occurred when updating the role');
  }

  revalidatePath('/admin/roles');
  revalidatePath(`/admin/roles/${data.roleId}/overview`);
}
