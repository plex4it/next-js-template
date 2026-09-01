'use client';

import { Table, TableMobileDataCard } from '@/components/shared/table';
import { CursorPaginatedList } from '@/lib/types/cursor-paginated-list';
import { UserRoundXIcon } from 'lucide-react';
import { MobileCardTemplate } from './mobile-card-template';
import { get{{PASCAL}}DatatableColumns } from './{{LEAF}}-datatable-columns';
import get{{PASCAL}} from '@/lib/api/{{API_PATH}}/get-{{LEAF}}';
import { List{{ENTITY_PASCAL}}Response } from '@/lib/types/{{SINGULAR}}/response/list-{{SINGULAR}}-response';
import { useT } from 'next-i18next/client';

export function TableWrapper() {
  const { t } = useT(['{{I18N_NS}}', 'common', 'fields']);
  const columns = get{{PASCAL}}DatatableColumns(t);
  const getItems = async (
    search: string | null,
    pageSize: number,
    cursor: string | null
  ): Promise<CursorPaginatedList<List{{ENTITY_PASCAL}}Response>> => {
    return await get{{PASCAL}}({ cursor, page_size: pageSize, search_term: search });
  };

  return (
    <>
      <div className="hidden lg:block">
        <Table
          columns={columns}
          getItems={getItems}
          emptyMessage={t('{{I18N_NS}}:items_not_available')}
        />
      </div>
      <div className="block lg:hidden space-y-4">
        <TableMobileDataCard
          template={(item) => <MobileCardTemplate item={item} t={t} />}
          getItems={getItems}
          emptyDescription={t('{{I18N_NS}}:items_not_created')}
          emptyIcon={UserRoundXIcon}
          emptyTitle={t('{{I18N_NS}}:items_not_available')}
        />
      </div>
    </>
  );
}
