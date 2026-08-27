'use server';

import { ListQuery } from '@/lib/types/list-query';
import { CursorPaginatedList } from '@/lib/types/cursor-paginated-list';
import { ListRolesResponse } from '@/lib/types/roles/response/list-roles-response';
import { api } from '@/lib/api/utils';

export default async function getRoles(
  data: ListQuery
): Promise<CursorPaginatedList<ListRolesResponse>> {
  const result = await api.get('roles', data);

  if (!result.ok) {
    throw Error('An error occurred when trying to retrieve the roles');
  }

  const resultData = await result.json();

  return {
    hasNextPage: resultData.hasNextPage,
    nextCursor: resultData.nextCursor,
    items: resultData.items,
  };
}
