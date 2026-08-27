'use client';

import { Table, TableMobileDataCard } from '@/components/shared/table';
import { CursorPaginatedList } from '@/lib/types/cursor-paginated-list';
import { UserRoundXIcon } from 'lucide-react';
import { MobileCardTemplate } from './mobile-card-template';
import { getUserDatatableColumns } from './users-datatable-columns';
import getUsers from '@/lib/api/users/get-users';
import { ListUserResponse } from '@/lib/types/user/response/list-user-response';
import { useT } from 'next-i18next/client';

export function TableWrapper() {
  const { t } = useT(['users', 'common', 'fields']);
  const columns = getUserDatatableColumns(t);
  const getItems = async (
    search: string | null,
    pageSize: number,
    cursor: string | null
  ): Promise<CursorPaginatedList<ListUserResponse>> => {
    return await getUsers({ cursor: cursor, page_size: pageSize, search_term: search });
  };

  return (
    <>
      <div className="hidden lg:block">
        <Table
          columns={columns}
          getItems={getItems}
          emptyMessage={t('users:items_not_available')}
        />
      </div>
      <div className="block lg:hidden space-y-4">
        <TableMobileDataCard
          template={(user) => <MobileCardTemplate user={user} t={t} />}
          getItems={getItems}
          emptyDescription={t('users:items_not_created')}
          emptyIcon={UserRoundXIcon}
          emptyTitle={t('users:items_not_available')}
        />
      </div>
    </>
  );
}
