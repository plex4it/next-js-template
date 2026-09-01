'use server';

import { CursorPaginatedList } from '@/lib/types/cursor-paginated-list';
import { api } from '@/lib/api/utils';
import { ListQuery } from '@/lib/types/list-query';
import { ListUserResponse } from '@/lib/types/user/response/list-user-response';
import { permissions } from '@/lib/permissions/permissions';

export default async function getUsers(data: ListQuery) {
  return api.get<CursorPaginatedList<ListUserResponse>>('users', data, permissions.users.read);
}
