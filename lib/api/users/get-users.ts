'use server';

import { CursorPaginatedList } from '@/lib/types/cursor-paginated-list';
import { api } from '@/lib/api/utils';
import { ListQuery } from '@/lib/types/list-query';
import { ListUserResponse } from '@/lib/types/user/response/list-user-response';

export default async function getUsers(
  data: ListQuery
): Promise<CursorPaginatedList<ListUserResponse>> {
  const result = await api.get('users', data);

  if (!result.ok) {
    throw Error('An error occurred when trying to retrieve the users');
  }

  const resultData = await result.json();

  return {
    hasNextPage: resultData.hasNextPage,
    nextCursor: resultData.nextCursor,
    items: resultData.items,
  };
}
