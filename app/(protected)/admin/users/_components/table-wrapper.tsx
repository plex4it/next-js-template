'use client';

import { Table, TableMobileDataCard } from '@/components/shared/table';
import { UserRoundXIcon } from 'lucide-react';
import { MobileCardTemplate } from './mobile-card-template';
import { getUserDatatableColumns } from './users-datatable-columns';
import getUsers from '@/lib/api/users/get-users';
import { useT } from 'next-i18next/client';
import { useIsMobile } from '@/hooks/use-mobile';

export function TableWrapper() {
  const isMobile = useIsMobile();
  const { t } = useT(['users', 'common', 'fields']);
  const columns = getUserDatatableColumns(t);
  const getItems = async (search: string | null, pageSize: number, cursor: string | null) => {
    return await getUsers({ cursor: cursor, page_size: pageSize, search_term: search });
  };

  return (
    <>
      {isMobile ? (
        <div className="space-y-4">
          <TableMobileDataCard
            template={(user) => <MobileCardTemplate user={user} t={t} />}
            getItems={getItems}
            emptyDescription={t('users:items_not_created')}
            emptyIcon={UserRoundXIcon}
            emptyTitle={t('users:items_not_available')}
          />
        </div>
      ) : (
        <Table
          columns={columns}
          getItems={getItems}
          emptyMessage={t('users:items_not_available')}
        />
      )}
    </>
  );
}
