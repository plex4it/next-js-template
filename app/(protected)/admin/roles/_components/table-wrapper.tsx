'use client';

import { getRolesDatatableColumns } from './roles-datatable-columns';
import { Table, TableMobileDataCard } from '@/components/shared/table';
import { UserRoundXIcon } from 'lucide-react';
import { CursorPaginatedList } from '@/lib/types/cursor-paginated-list';
import { MobileCardTemplate } from './mobile-card-template';
import getRoles from '@/lib/api/roles/get-roles';
import { ListRolesResponse } from '@/lib/types/roles/response/list-roles-response';
import { useT } from 'next-i18next/client';

export function TableWrapper() {
  const { t } = useT(['roles', 'fields', 'common']);
  const columns = getRolesDatatableColumns(t);
  const getItems = async (
    search: string | null,
    pageSize: number,
    cursor: string | null
  ): Promise<CursorPaginatedList<ListRolesResponse>> => {
    return await getRoles({ cursor: cursor, page_size: pageSize, search_term: search });
  };

  return (
    <>
      <div className="hidden lg:block">
        <Table
          columns={columns}
          getItems={getItems}
          emptyMessage={t('roles:items_not_available')}
        />
      </div>
      <div className="block lg:hidden space-y-4">
        <TableMobileDataCard
          getItems={getItems}
          template={(item) => <MobileCardTemplate role={item} t={t} />}
          emptyDescription={t('roles:items_not_created')}
          emptyIcon={UserRoundXIcon}
          emptyTitle={t('roles:items_not_available')}
        />
      </div>
    </>
  );
}
