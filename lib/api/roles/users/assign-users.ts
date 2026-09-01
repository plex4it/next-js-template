'use server';

import { revalidatePath } from 'next/cache';
import { api } from '@/lib/api/utils';
import { AssignRoleUsersRequest } from '@/lib/types/roles/request/assign-role-users-request';

export default async function assignUsers(data: AssignRoleUsersRequest) {
  const result = await api.post(`roles/${data.roleId}/users`, { userIds: data.userIds });

  if (result.ok) {
    revalidatePath(`/admin/roles/${data.roleId}/users`);
  }

  return result;
}
