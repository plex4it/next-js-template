'use server';

import { ListQuery } from '@/lib/types/list-query';
import { CursorPaginatedList } from '@/lib/types/cursor-paginated-list';
import { ListRolesResponse } from '@/lib/types/roles/response/list-roles-response';
import { api } from '@/lib/api/utils';
import { permissions } from '@/lib/permissions/permissions';

export default async function getRoles(data: ListQuery) {
  return api.get<CursorPaginatedList<ListRolesResponse>>('roles', data, permissions.roles.read);
}
