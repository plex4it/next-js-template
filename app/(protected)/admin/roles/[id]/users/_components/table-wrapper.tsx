'use client';

import { Table, TableMobileDataCard } from '@/components/shared/table';
import { getRolesUsersDatatableColumns } from './roles-users-datatable-columns';
import { UserRoundXIcon } from 'lucide-react';
import { CursorPaginatedList } from '@/lib/types/cursor-paginated-list';
import { MobileCardTemplate } from './mobile-card-template';
import { useT } from 'next-i18next/client';
import { ListRoleUsersResponse } from '@/lib/types/roles/response/list-role-users-response';
import { useIsMobile } from '@/hooks/use-mobile';
import { Result } from '@/lib/api/utils';

interface TableWrapperProps {
  users: ListRoleUsersResponse[];
  roleId: bigint;
}

export function TableWrapper({ roleId, users }: Readonly<TableWrapperProps>) {
  const isMobile = useIsMobile();
  const { t } = useT(['users', 'roles']);

  const columns = getRolesUsersDatatableColumns(roleId, t);

  const getItems = async (
    search: string | null,
    pageSize: number,
    cursor: string | null
  ): Promise<Result<CursorPaginatedList<ListRoleUsersResponse>>> => {
    void pageSize;
    void cursor;
    if (search) {
      const s = search.toLowerCase();
      const filtered = users.filter(
        (u) => u.firstName.toLowerCase().includes(s) || u.lastName.toLowerCase().includes(s)
      );

      return { ok: true, data: { hasNextPage: false, items: filtered, nextCursor: null } };
    }

    return { ok: true, data: { hasNextPage: false, items: users, nextCursor: null } };
  };

  return (
    <>
      {isMobile ? (
        <TableMobileDataCard
          template={(user) => <MobileCardTemplate roleId={roleId} user={user} />}
          getItems={getItems}
          emptyDescription={t('users:items_not_created')}
          emptyIcon={UserRoundXIcon}
          emptyTitle={t('roles:no_users_assign')}
        />
      ) : (
        <Table columns={columns} getItems={getItems} emptyMessage={t('roles:no_users_assign')} />
      )}
    </>
  );
}
