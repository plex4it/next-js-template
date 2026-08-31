'use server';

import { ListQuery } from '@/lib/types/list-query';
import { CursorPaginatedList } from '@/lib/types/cursor-paginated-list';
import { List{{ENTITY_PASCAL}}Response } from '@/lib/types/{{SINGULAR}}/response/list-{{SINGULAR}}-response';
import { api } from '@/lib/api/utils';

export default async function get{{PASCAL}}(
  data: ListQuery
): Promise<CursorPaginatedList<List{{ENTITY_PASCAL}}Response>> {
  const result = await api.get('{{API_PATH}}', data);

  if (!result.ok) {
    throw Error('An error occurred when trying to retrieve the {{LABEL}}');
  }

  const resultData = await result.json();

  return {
    hasNextPage: resultData.hasNextPage,
    nextCursor: resultData.nextCursor,
    items: resultData.items,
  };
}
