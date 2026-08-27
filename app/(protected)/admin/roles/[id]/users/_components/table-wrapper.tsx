'use client';

import { Table, TableMobileDataCard } from '@/components/shared/table';
import { getRolesUsersDatatableColumns } from './roles-users-datatable-columns';
import { UserRoundXIcon } from 'lucide-react';
import { IUser } from '@/lib/types/user/user';
import { CursorPaginatedList } from '@/lib/types/cursor-paginated-list';
import { MobileCardTemplate } from './mobile-card-template';
import { useT } from 'next-i18next/client';

interface TableWrapperProps {
  users: IUser[];
  roleId: string;
}

export function TableWrapper({ users, roleId }: Readonly<TableWrapperProps>) {
  const { t } = useT(['users', 'common', 'roles']);
  const columns = getRolesUsersDatatableColumns(roleId, t);
  const getItems = async (
    _search: string | null,
    _pageSize: number,
    _cursor: string | null
  ): Promise<CursorPaginatedList<IUser>> => {
    return { hasNextPage: false, items: users, nextCursor: null };
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
          template={(user) => <MobileCardTemplate roleId={roleId} user={user} />}
          getItems={getItems}
          emptyDescription={t('users:items_not_created')}
          emptyIcon={UserRoundXIcon}
          emptyTitle={t('roles:no_users_assign')}
        />
      </div>
    </>
  );
}
