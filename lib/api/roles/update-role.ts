'use server';

import { UpdateRoleRequest } from '@/lib/types/roles/request/update-role-request';
import { api } from '@/lib/api/utils';
import { revalidatePath } from 'next/cache';
import { permissions } from '@/lib/permissions/permissions';

export default async function updateRole(data: UpdateRoleRequest) {
  const result = await api.put(`roles/${data.roleId}`, data, permissions.roles.update);

  if (result.ok) {
    revalidatePath('/admin/roles');
    revalidatePath(`/admin/roles/${data.roleId}/overview`);
  }

  return result;
}
