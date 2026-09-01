'use client';

import { getRolesDatatableColumns } from './roles-datatable-columns';
import { Table, TableMobileDataCard } from '@/components/shared/table';
import { UserRoundXIcon } from 'lucide-react';
import { MobileCardTemplate } from './mobile-card-template';
import getRoles from '@/lib/api/roles/get-roles';
import { useT } from 'next-i18next/client';
import { useIsMobile } from '@/hooks/use-mobile';

export function TableWrapper() {
  const isMobile = useIsMobile();
  const { t } = useT(['roles', 'fields', 'common']);
  const columns = getRolesDatatableColumns(t);
  const getItems = async (search: string | null, pageSize: number, cursor: string | null) => {
    return await getRoles({ cursor: cursor, page_size: pageSize, search_term: search });
  };

  return (
    <>
      {isMobile ? (
        <div className="space-y-4">
          <TableMobileDataCard
            getItems={getItems}
            template={(item) => <MobileCardTemplate role={item} t={t} />}
            emptyDescription={t('roles:items_not_created')}
            emptyIcon={UserRoundXIcon}
            emptyTitle={t('roles:items_not_available')}
          />
        </div>
      ) : (
        <Table
          columns={columns}
          getItems={getItems}
          emptyMessage={t('roles:items_not_available')}
        />
      )}
    </>
  );
}
