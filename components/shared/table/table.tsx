'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  DataTable,
  type DataTableFeatures,
  type DataTableRowData,
} from '@/components/shared/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { CursorPaginatedList } from '@/lib/types/cursor-paginated-list';
import useDebounce from '@/hooks/use-debounce';
import { ErrorState } from '@/components/shared/error-state';
import { useT } from 'next-i18next/client';

interface TableProps<T extends DataTableRowData> {
  className?: string;
  getItems: (
    search: string | null,
    pageSize: number,
    cursor: string | null
  ) => Promise<CursorPaginatedList<T>>;
  columns: ColumnDef<DataTableFeatures, T>[];
  emptyMessage?: string;
}

const DEFAULT_PAGE_SIZE = 20;

interface PaginationState {
  pageIndex: number;
  pageSize: number;
  cursorHistory: (string | null)[];
}

function initialPagination(pageSize = DEFAULT_PAGE_SIZE): PaginationState {
  return { pageIndex: 0, pageSize, cursorHistory: [null] };
}

export function Table<T extends DataTableRowData>({
  className,
  columns,
  getItems,
  emptyMessage,
}: Readonly<TableProps<T>>) {
  const { t } = useT(['errors', 'common']);
  const [pagination, setPagination] = useState<PaginationState>(initialPagination());
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState<CursorPaginatedList<T> | null>(null);

  const debouncedSearchTerm = useDebounce(searchTerm.trim(), 500);
  const activeCursorRef = useRef<string | null>(null);
  const activeSearchTermRef = useRef('');

  const fetchPage = useCallback(
    async (cursor: string | null, pageSize: number, search: string, showLoading = true) => {
      if (showLoading) setIsLoading(true);
      setError(null);
      try {
        const result = await getItems(search, pageSize, cursor);
        setPage(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : t('errors:generic'));
        setPage(null);
      } finally {
        if (showLoading) setIsLoading(false);
      }
    },
    [getItems, t]
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPagination((prev) => initialPagination(prev.pageSize));
  }, [debouncedSearchTerm]);

  useEffect(() => {
    const cursor = pagination.cursorHistory[pagination.pageIndex] ?? null;
    activeSearchTermRef.current = debouncedSearchTerm;
    activeCursorRef.current = cursor;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPage(cursor, pagination.pageSize, debouncedSearchTerm);
  }, [pagination, debouncedSearchTerm, fetchPage]);

  const handleNext = () => {
    if (!page?.hasNextPage || !page.nextCursor || isLoading) return;
    setPagination((prev) => {
      const nextIndex = prev.pageIndex + 1;
      const newHistory =
        prev.cursorHistory[nextIndex] === undefined
          ? [...prev.cursorHistory.slice(0, nextIndex), page.nextCursor]
          : prev.cursorHistory;
      return { ...prev, pageIndex: nextIndex, cursorHistory: newHistory };
    });
  };

  const handlePrev = () => {
    if (pagination.pageIndex === 0 || isLoading) return;
    setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex - 1 }));
  };

  const handlePageSizeChange = (newSize: number) => {
    setPagination(initialPagination(newSize));
  };

  if (error) {
    return (
      <ErrorState
        description={error}
        onRetry={() =>
          fetchPage(activeCursorRef.current, pagination.pageSize, activeSearchTermRef.current)
        }
      />
    );
  }

  return (
    <DataTable
      className={className}
      columns={columns}
      data={page?.items ?? []}
      isLoading={isLoading}
      emptyMessage={emptyMessage}
      cursorPagination={{
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        totalCount: undefined,
        totalPages: undefined,
        hasNext: !!page?.hasNextPage,
        hasPrev: pagination.pageIndex > 0,
        onNext: handleNext,
        onPrev: handlePrev,
        onPageSizeChange: handlePageSizeChange,
      }}
    >
      <DataTable.Header>
        <DataTable.Search
          placeholder={t('common:table_search_placeholder')}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
        />
        <DataTable.ColumnsToggle />
      </DataTable.Header>
      <DataTable.Content>
        <DataTable.TableShell>
          <DataTable.TableHeader />
          <DataTable.TableBody />
        </DataTable.TableShell>
      </DataTable.Content>

      <DataTable.Footer>
        <DataTable.TotalCount />
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <DataTable.PageSize />
          <DataTable.Pagination />
        </div>
      </DataTable.Footer>
    </DataTable>
  );
}
