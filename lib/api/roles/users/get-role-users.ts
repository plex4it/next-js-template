'use server';

import { ListRoleUsersResponse } from '@/lib/types/roles/response/list-role-users-response';
import { api } from '@/lib/api/utils';

export default async function getRoleUsers(id: bigint) {
  return api.get<ListRoleUsersResponse[]>(`roles/${id}/users`);
}
